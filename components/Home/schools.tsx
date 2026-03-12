const schools = [
    { name: "Campus Paris Tech", location: "Paris, France", img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=500" },
    { name: "EPITECH Lyon", location: "Lyon, France", img: "https://f.hellowork.com/edito/sites/5/2021/02/18739.jpg" },
    { name: "EuraTechnologies", location: "Lille, France", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=500" },
    { name: "Université Bordeaux", location: "Bordeaux, France", img: "https://storage.letudiant.fr/mediatheque/educpros/6/2/106362-universite-bordeaux-segalen-le-site-de-la-victoire-universite-bordeaux-segalen-l-lizet-580x310.jpg" },
  ];
  
  export default function FeaturedSchools() {
    return (
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h3 className="text-orange-500 font-bold uppercase text-sm mb-4">Écoles en vue</h3>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Ils recrutent sur NexTep</h2>
          <p className="text-gray-500">Découvre une sélection d'écoles prestigieuses prêtes à échanger avec toi.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {schools.map((school, i) => (
            <div key={i} className="relative h-[350px] rounded-2xl overflow-hidden group cursor-pointer">
              <img src={school.img} alt={school.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-bold text-lg">{school.name}</p>
                <p className="text-sm opacity-80 flex items-center gap-1">📍{school.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }