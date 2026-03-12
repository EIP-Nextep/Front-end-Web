"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';

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
            headers: { 'Authorization': `Bearer ${token}` },
        })
        .then((res) => res.ok ? res.json() : Promise.reject("Erreur " + res.status))
        .then((data) => { setQuestions(data); setLoading(false); })
        .catch((err) => { setError(err.message); setLoading(false); });
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-[#1a367f] font-bold">Chargement...</div>;
    
    const currentQuestion = questions[currentStep];

    const submitQuiz = async () => {
        const token = localStorage.getItem('authToken');
        const decoded: any = JSON.parse(atob(token!.split('.')[1]));
        const res = await fetch('http://localhost:8080/api/matching/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ userId: decoded.sub, answers: Object.entries(reponses).map(([q, o]) => ({ questionId: q, optionId: o })) }),
        });
        res.ok ? router.push('/swipecard') : alert("Erreur de soumission");
    };

    return (
      <main className="min-h-screen bg-[#f8fafc] flex flex-col p-6">
        <button 
          onClick={() => router.push('/')} 
          className="flex items-center gap-2 text-slate-500 hover:text-[#1a367f] transition-all mb-8 w-fit"
        >
          <Home size={20} /> Retour à l'accueil
        </button>

        <div className="max-w-5xl mx-auto w-full bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
          <div className="w-full bg-slate-100 h-2 rounded-full mb-10 overflow-hidden">
            <div className="bg-[#1a367f] h-full transition-all duration-500" style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-sm font-bold text-[#1a367f] uppercase tracking-wider">Question {currentStep + 1} / {questions.length}</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">{currentQuestion.text}</h1>
              <div className="relative h-64 w-full overflow-hidden rounded-2xl">
                  <Image src={currentQuestion.imageUrl || "/Quiz.png"} alt="Illustration" fill className="object-cover" />
              </div>
            </div>

            <div className="space-y-4">
              {currentQuestion.options?.map((opt: any) => (
                <button 
                  key={opt.id}
                  onClick={() => { setSelectedOptionId(opt.id); setReponses(p => ({...p, [currentQuestion.id]: opt.id})) }}
                  className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-200 transform hover:scale-[1.02] ${
                      selectedOptionId === opt.id 
                      ? "border-[#1a367f] bg-blue-50 shadow-md" 
                      : "border-slate-200 hover:border-[#1a367f]/50 hover:bg-slate-50"
                  }`}
                >
                  <p className="font-semibold text-slate-700">{opt.title}</p>
                </button>
              ))}
              
              <div className="flex justify-between mt-10 pt-6 border-t border-slate-100">
                <button 
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))} 
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-6 py-3 text-slate-400 disabled:opacity-0 transition-opacity"
                >
                  <ArrowLeft size={18} /> Précédent
                </button>
                
                {currentStep === questions.length - 1 ? (
                  <button onClick={submitQuiz} disabled={!selectedOptionId} className="bg-[#1a367f] text-white px-8 py-3 rounded-xl hover:bg-[#0f2150] shadow-lg disabled:opacity-50 transition-all">
                    Terminer le test
                  </button>
                ) : (
                  <button onClick={() => setCurrentStep(prev => prev + 1)} disabled={!selectedOptionId} className="flex items-center gap-2 bg-[#1a367f] text-white px-8 py-3 rounded-xl hover:bg-[#0f2150] shadow-lg disabled:opacity-50 transition-all">
                    Suivant <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}