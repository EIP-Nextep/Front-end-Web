"use client";
import React, { useState } from 'react';
import { Search, Send, Settings, MoreVertical, CheckCircle2, Phone, Video, Paperclip, Smile, Star, ChevronRight, LogOut, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { NexTepLogo, NexTepIcon } from '@/components/Logo/nextepLogo';

const AMBASSADORS = [
  {
    id: 1, name: "Léa Martin", school: "ESSEC Business School", initials: "LM",
    color: "from-orange-400 to-orange-600", lastMsg: "Le campus est top, très actif...", time: "14:32",
    unread: 2, online: true, verified: false,
    program: "Global BBA", rating: 4.9,
  },
  {
    id: 2, name: "Kévin Dupont", school: "CentraleSupélec", initials: "KD",
    color: "from-blue-500 to-blue-700", lastMsg: "N'hésite pas à me poser tes questions !", time: "11:05",
    unread: 0, online: true, verified: true,
    program: "Génie Logiciel", rating: 5.0,
  },
  {
    id: 3, name: "Sarah Chen", school: "Gobelins", initials: "SC",
    color: "from-violet-400 to-violet-600", lastMsg: "Les projets sont vraiment ambitieux", time: "Hier",
    unread: 0, online: false, verified: true,
    program: "Design UX/UI", rating: 4.8,
  },
  {
    id: 4, name: "Marc Osei", school: "Sciences Po Paris", initials: "MO",
    color: "from-teal-400 to-teal-600", lastMsg: "La vie associative est incroyable ici", time: "Lun",
    unread: 1, online: false, verified: false,
    program: "Relations Internationales", rating: 4.7,
  },
];

const MESSAGES = [
  { id: 1, text: "Bonjour Léa ! Je m'intéresse vraiment au programme Global BBA à l'ESSEC. Est-ce que tu pourrais m'en dire plus sur le déroulé des études ?", sender: "student", time: "14:20" },
  { id: 2, text: "Bien sûr avec plaisir ! 😊 Le programme Global BBA est vraiment unique — on a des semestres à l'étranger et un campus super dynamique. Tu veux que je te parle de quoi en particulier ?", sender: "ambassador", time: "14:25" },
  { id: 3, text: "Le campus est top, très actif et dynamique ! Les associations sont nombreuses et il y a toujours quelque chose à faire en dehors des cours.", sender: "ambassador", time: "14:26" },
  { id: 4, text: "Génial ! Est-ce que c'est vraiment intense au niveau des cours ? J'ai entendu que le rythme pouvait être soutenu…", sender: "student", time: "14:30" },
  { id: 5, text: "C'est vrai que ça demande de l'organisation, mais c'est faisable si tu es motivé(e). La charge est bien répartie sur l'année. Et les profs sont très accessibles !", sender: "ambassador", time: "14:32" },
];

export default function ChatDashboard() {
  const [active, setActive] = useState(0);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(MESSAGES);
  const amb = AMBASSADORS[active];
  const router = useRouter();

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), text: input, sender: 'student', time: new Date().toLocaleTimeString('fr', { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-[#f0f4fa] font-sans">
      <div className="bg-white border-b border-slate-200 px-8 py-0 flex items-center justify-between h-14">
      <div className="flex items-center gap-2 shrink-0">
      <NexTepIcon size={40} />
        </div>
       

        <nav className="flex items-center gap-1">
          {[
            { label: 'Accueil', active: false },
            { label: 'Formations', active: false },
            { label: 'Étudiants', active: false },
            { label: 'Messages', active: true },
            { label: 'Statistiques', active: false },
            { label: 'Paramètres', active: false },
          ].map(({ label, active: isActive }) => (
            <button
              key={label}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#e8edff] text-[#3b5bdb]'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-lg transition-all">
          <LogOut size={14} />
          Déconnexion
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
        <button
    onClick={() => router.back()}
    className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0b1b35] transition-colors group"
  >
    <span className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 bg-white group-hover:border-[#0b1b35] group-hover:bg-[#eef2ff] transition-all">
      <ArrowLeft size={15} />
    </span>
    Retour
  </button>
          <h1 className="text-2xl font-bold text-[#0b1b35] tracking-tight">Échangez avec nos Ambassadeurs</h1>
          <p className="text-slate-500 text-sm mt-1">Posez vos questions et obtenez des retours authentiques d'étudiants.</p>
        </div>

        <div className="grid grid-cols-12 gap-5 h-[680px]">

          <div className="col-span-4 bg-white rounded-2xl border border-slate-100 flex flex-col overflow-hidden shadow-sm">
            <div className="px-5 pt-5 pb-4 border-b border-slate-100">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">Ambassadeurs</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  placeholder="Rechercher..."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 rounded-xl text-sm border border-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-2 px-3 space-y-1">
              {AMBASSADORS.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => setActive(i)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-150 group ${active === i ? 'bg-[#0b1b35]' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${a.color} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                        {a.initials}
                      </div>
                      {a.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-sm font-semibold flex items-center gap-1 ${active === i ? 'text-white' : 'text-[#0b1b35]'}`}>
                          {a.name}
                          {a.verified && <CheckCircle2 size={12} className="text-orange-400 shrink-0" />}
                        </span>
                        <span className={`text-[10px] ${active === i ? 'text-white/50' : 'text-slate-400'}`}>{a.time}</span>
                      </div>
                      <p className={`text-[11px] truncate ${active === i ? 'text-white/60' : 'text-slate-400'}`}>{a.lastMsg}</p>
                    </div>
                    {a.unread > 0 && (
                      <span className="ml-1 shrink-0 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {a.unread}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-8 bg-white rounded-2xl border border-slate-100 flex flex-col overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${amb.color} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                    {amb.initials}
                  </div>
                  {amb.online && <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#0b1b35] text-base">{amb.name}</h3>
                    {amb.verified && <CheckCircle2 size={14} className="text-orange-400" />}
                    <span className="flex items-center gap-1 bg-orange-50 text-orange-500 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-orange-100">
                      <Star size={9} fill="currentColor" /> {amb.rating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Ambassadeur · {amb.school} · {amb.program}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-400 hover:text-[#0b1b35] transition-colors">
                  <Phone size={17} />
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-400 hover:text-[#0b1b35] transition-colors">
                  <Video size={17} />
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-400 hover:text-[#0b1b35] transition-colors">
                  <MoreVertical size={17} />
                </button>
              </div>
            </div>

            <div className="mx-5 mt-4 mb-2 rounded-xl bg-gradient-to-r from-[#0b1b35] to-[#162d55] p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${amb.color} flex items-center justify-center text-white font-bold text-xs`}>{amb.initials}</div>
                <div>
                  <p className="text-white font-semibold text-sm">{amb.name} — {amb.program}</p>
                  <p className="text-white/50 text-xs">{amb.school}</p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 transition-colors text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                Voir profil <ChevronRight size={12} />
              </button>
            </div>

            <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4 bg-slate-50/40">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'} gap-3`}>
                  {msg.sender === 'ambassador' && (
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${amb.color} flex items-center justify-center text-white text-xs font-bold shrink-0 self-end`}>
                      {amb.initials}
                    </div>
                  )}
                  <div className={`flex flex-col ${msg.sender === 'student' ? 'items-end' : 'items-start'} max-w-[65%]`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'student'
                        ? 'bg-[#0b1b35] text-white rounded-br-sm'
                        : 'bg-white border border-slate-100 text-slate-700 shadow-sm rounded-bl-sm'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-2 flex gap-2 overflow-x-auto border-t border-slate-50 scrollbar-none">
              {["Comment sont les logements ?", "Y a-t-il des stages ?", "C'est quoi la vie étudiante ?"].map(q => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="shrink-0 text-xs text-orange-500 border border-orange-200 bg-orange-50 hover:bg-orange-100 rounded-full px-3 py-1.5 transition-colors whitespace-nowrap font-medium"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-5 pb-5 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-orange-400/20 focus-within:border-orange-300 transition-all">
                <button className="text-slate-400 hover:text-slate-600 transition-colors shrink-0">
                  <Paperclip size={17} />
                </button>
                <input
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  placeholder="Écrire un message à l'ambassadeur..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                />
                <button className="text-slate-400 hover:text-slate-600 transition-colors shrink-0">
                  <Smile size={17} />
                </button>
                <button
                  onClick={send}
                  className="bg-[#0b1b35] hover:bg-orange-500 transition-colors text-white w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}