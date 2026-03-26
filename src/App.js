import React, { useEffect, useState, useRef } from "react";
import {
  FaLinkedin,
  FaDownload,
  FaSun,
  FaMoon,
  FaGlobe,
  FaGraduationCap,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useRef();

  useEffect(() => {
    const root = window.document.documentElement;
    isDarkMode ? root.classList.add("dark") : root.classList.remove("dark");
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleContactForm = () => { setShowContactForm(!showContactForm); };

  const variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm("service_pm5euyc", "template_kglq2fe", form.current, "yd-a9-SRb74iGWN1D")
      .then(() => { setSuccess(true); form.current.reset(); }, () => setSuccess(false));
  };

  const ContactFormSection = () => (
    <motion.div key="contact" initial="hidden" animate="visible" exit="exit" variants={variants} className="min-h-screen bg-white dark:bg-slate-900 p-10 flex flex-col items-center justify-center relative z-50">
      <h2 className="text-3xl font-bold mb-10 tracking-tight text-slate-900 dark:text-white">Demande de Collaboration</h2>
      <form ref={form} onSubmit={sendEmail} className="w-full max-w-lg space-y-4">
        <input type="text" name="user_name" placeholder="Nom complet" required className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
        <input type="email" name="user_email" placeholder="Email professionnel" required className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
        <textarea name="message" placeholder="Votre message..." required rows={5} className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 resize-none text-slate-900 dark:text-white" />
        <button type="submit" className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-4 rounded-xl font-bold hover:opacity-90 transition-opacity">Envoyer</button>
        {success && <p className="text-green-600 font-bold text-center mt-4 italic">Votre message a été transmis avec succès.</p>}
      </form>
      <button onClick={toggleContactForm} className="mt-10 text-slate-500 underline text-sm uppercase tracking-widest hover:text-indigo-500 transition-colors">Fermer</button>
    </motion.div>
  );

  const MainContent = () => (
    <motion.div key="main" initial="hidden" animate="visible" exit="exit" variants={variants}>
      {/* Hero: Minimaliste, Professionnel et Épuré */}
      <section
        className="h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1521737711867-e3b97375f902)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70 dark:bg-black/85" />
        
        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white">
            Fawzi Youjil
          </h1>
          <p className="text-2xl font-light text-slate-200 mb-10 tracking-tight">
            Expert <span className="font-semibold text-white">Customer Care</span> & Product Optimization
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/CV-FAWZI-YOUJIL.pdf" download className="flex items-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-xl">
              <FaDownload className="text-sm" /> Dossier de candidature (CV)
            </a>
          </div>
        </div>

        <button onClick={() => document.getElementById("parcours").scrollIntoView({ behavior: "smooth" })} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold block mb-2">Découvrir</span>
          <div className="mx-auto w-[1px] h-12 bg-slate-300 dark:bg-slate-700" />
        </button>
      </section>

      {/* Parcours: Focus sur la Qualité (Apple/Foodles) */}
      <section id="parcours" className="py-32 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-[2px] bg-indigo-600" />
          <h2 className="text-sm uppercase tracking-[0.4em] font-black text-slate-400">Expériences Certifiées</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="p-10 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold">Foodles</h3>
              <span className="text-xs font-bold px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-full">2023 — 2025</span>
            </div>
            <p className="text-indigo-600 font-bold mb-4 uppercase text-xs tracking-widest">Customer Care Expert</p>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed text-left">
              <li className="flex gap-2"><span>•</span> Gestion des flux multicanaux complexes (B2B & B2C).</li>
              <li className="flex gap-2"><span>•</span> Optimisation des process de rétention et résolution de litiges.</li>
              <li className="flex gap-2"><span>•</span> Support technique de second niveau pour partenaires stratégiques.</li>
            </ul>
          </div>

          <div className="p-10 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold">Apple</h3>
              <span className="text-xs font-bold px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">2019 — 2023</span>
            </div>
            <p className="text-slate-500 font-bold mb-4 uppercase text-xs tracking-widest">Customer Care Expert</p>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed text-left">
              <li className="flex gap-2"><span>•</span> Ambassadeur des standards de service Apple (Net Promoter Score élevé).</li>
              <li className="flex gap-2"><span>•</span> Analyse comportementale et déploiement de stratégies de satisfaction.</li>
              <li className="flex gap-2"><span>•</span> Maintenance logicielle et diagnostic technique avancé.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section Langues & Soft Skills */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="text-left">
            <div className="flex items-center gap-4 mb-8">
              <FaGlobe className="text-indigo-400" />
              <h2 className="text-sm uppercase tracking-[0.4em] font-bold text-slate-300">Compétences Linguistiques</h2>
            </div>
            <div className="space-y-6">
              {[{l: "Français", v: "Langue maternelle / Expert", w: "100%"}, {l: "Anglais", v: "Professionnel (C1/C2)", w: "85%"}, {l: "Espagnol ", v: "Notions (A2/B1)", w: "35%"}, {l: "Japonais ", v: "Notions (A2/B1)", w: "20%"}].map((lang, idx) => (
                <div key={idx} className="border-b border-white/10 pb-4">
                  <div className="flex justify-between mb-2 italic text-sm">
                    <span>{lang.l}</span>
                    <span className="text-indigo-400">{lang.v}</span>
                  </div>
                  <div className="h-[2px] w-full bg-white/5">
                    <motion.div initial={{width: 0}} whileInView={{width: lang.w}} className="h-full bg-indigo-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-10">
            <h2 className="text-4xl font-light italic text-left">"L'excellence n'est pas un acte, mais une habitude."</h2>
            <div className="grid grid-cols-2 gap-6 text-sm uppercase tracking-tighter text-slate-400">
              <div className="p-4 border border-white/10 rounded-xl">Diplomatie</div>
              <div className="p-4 border border-white/10 rounded-xl">Rigueur</div>
              <div className="p-4 border border-white/10 rounded-xl">Analyse Data</div>
              <div className="p-4 border border-white/10 rounded-xl">Orienté Solution</div>
            </div>
          </div>
        </div>
      </section>

      {/* Formation */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <FaGraduationCap className="text-indigo-600" />
          <h2 className="text-sm uppercase tracking-[0.4em] font-black text-slate-400">Cursus Académique</h2>
        </div>
        <div className="space-y-6 text-left">
          {[
            {t: "Développeur Web Full Stack", d: "Titre Professionnel RNCP"},
            {t: "Master Administration / Échange International", d: "UPEC - 2018"},
            {t: "Licence Administration / Échange International", d: "UPEC - 2015"}
          ].map((item, i) => (
            <div key={i} className="flex gap-6 group cursor-default">
              <span className="text-slate-300 group-hover:text-indigo-500 transition-colors font-mono">0{i+1}</span>
              <div>
                <h4 className="font-bold text-lg">{item.t}</h4>
                <p className="text-slate-500 text-sm">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 bg-slate-900 text-white text-center">
        <h2 className="text-5xl font-black mb-10 tracking-tighter">Prêt pour une nouvelle étape ?</h2>
        <p className="text-indigo-100 mb-12 max-w-xl mx-auto font-medium">
          Je suis mobile et prêt à m'investir au sein du marché helvétique pour apporter mon expertise en relation client et ma vision technique.
        </p>
        <button onClick={toggleContactForm} className="bg-white text-indigo-600 px-12 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-110 transition-transform">
          Me Contacter
        </button>
      </section>

      {/* Footer Minimaliste */}
      <footer className="py-20 text-center text-slate-400 text-[10px] uppercase tracking-widest">
        <div className="flex justify-center gap-8 mb-6 text-xl">
           <a href="https://www.linkedin.com/in/fawzi-youjil-39415b17a" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition-colors"><FaLinkedin /></a>
        </div>
        © 2026 Fawzi Youjil — Quality Standard Applied.
      </footer>
    </motion.div>
  );

  return (
    <div className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-500 min-h-screen relative selection:bg-indigo-500 selection:text-white">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap'); body { font-family: 'Inter', sans-serif; }`}</style>
      
      <button onClick={toggleDarkMode} className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow-lg dark:text-white border border-slate-200 dark:border-slate-800 transition-transform hover:scale-110">
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </button>

      <AnimatePresence mode="wait">
        {showContactForm ? <ContactFormSection key="contact" /> : <MainContent key="main" />}
      </AnimatePresence>
    </div>
  );
};

export default App;