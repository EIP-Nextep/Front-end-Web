"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Quiz() {
    const router = useRouter();

    const [questions, setQuestions] = useState<any[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const [reponses, setReponses] = useState<Record<string, string>>({});

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        fetch('http://localhost:8080/api/matching/questions', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            if (!res.ok) throw new Error("Erreur " + res.status);
            return res.json();
        })
        .then((data) => {
            setQuestions(data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        setSelectedOptionId(null);
    }, [currentStep]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    
    const currentQuestion = questions[currentStep];

    const submitQuiz = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) return;
        
        const decoded: any = JSON.parse(atob(token.split('.')[1]));
        const payload = {
            userId: decoded.sub, 
            answers: Object.entries(reponses).map(([questionId, optionId]) => ({
                questionId,
                optionId
            }))
        };

        const res = await fetch('http://localhost:8080/api/matching/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });
        
        if (res.ok) {
            alert("Quiz envoyé avec succès !");
            // Navigation vers la page de swipe
            router.push('/swipecard'); 
        } else {
            const errorData = await res.json();
            console.error("Erreur serveur :", errorData);
            alert("Erreur lors de la soumission. Vérifie que ton profil est bien créé.");
        }
    };

    const handleOptionClick = (optionId: string) => {
        setSelectedOptionId(optionId);
        setReponses(prev => ({
            ...prev,
            [currentQuestion.id]: optionId
        }));
    };

    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl font-bold my-4">{currentQuestion.text}</h1>
            <div className="relative h-64 w-full">
                <Image src={currentQuestion.imageUrl || "/Quiz.png"} alt="Illustration" fill className="object-cover rounded-xl" />
            </div>
          </div>

          <div className="space-y-4">
            {currentQuestion.options?.map((opt: any) => (
              <button 
                key={opt.id}
                onClick={() => handleOptionClick(opt.id)}
                className={`w-full p-6 rounded-xl border-2 text-left transition ${
                    selectedOptionId === opt.id 
                    ? "border-[#1a367f] bg-blue-100 ring-2 ring-blue-300" 
                    : "border-gray-200 hover:border-[#1a367f]"
                }`}
              >
                <div className="font-bold">{opt.title}</div>
              </button>
            ))}
            
            <div className="flex justify-between mt-8">
              <button 
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))} 
                disabled={currentStep === 0}
                className="px-6 py-3 text-gray-600 hover:text-black"
              >
                ← Précédent
              </button>
              
              {currentStep === questions.length - 1 ? (
                <button 
                  onClick={submitQuiz}
                  disabled={!selectedOptionId}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  Soumettre mes résultats
                </button>
              ) : (
                <button 
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  disabled={!selectedOptionId}
                  className="bg-[#1a367f] text-white px-6 py-3 rounded-lg hover:bg-[#112456] transition disabled:opacity-50"
                >
                  Question suivante →
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    );
}