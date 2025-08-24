import React, { useEffect, useState, useRef } from "react";
import {
  FaLinkedin,
  FaDownload,
  FaSun,
  FaMoon,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useRef();

  useEffect(() => {
    const root = window.document.documentElement;
    isDarkMode ? root.classList.add("dark") : root.classList.remove("dark");
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleSkills = () => {
    setShowSkills(!showSkills);
    setShowContactForm(false);
    setSuccess(false);
  };
  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
    setShowSkills(false);
    setSuccess(false);
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // Envoi mail EmailJS
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_pm5euyc",
        "template_kglq2fe",
        form.current,
        "yd-a9-SRb74iGWN1D"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess(true);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          setSuccess(false);
        }
      );
  };

  const SkillsSection = () => (
    <motion.div
      key="skills"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-10"
    >
      <h1 className="text-4xl font-bold mb-10 text-center">
        Mes Compétences Techniques
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 max-w-5xl mx-auto">
        {[FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs].map(
          (Icon, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <Icon className="text-8xl text-current" />
              <span>
                {["HTML5", "CSS3", "JavaScript", "React", "Node.js"][i]}
              </span>
            </div>
          )
        )}
      </div>
      <div className="mt-10 text-center">
        <button
          onClick={toggleSkills}
          className="px-6 py-3 bg-gray-300 dark:bg-gray-700 rounded-md font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          Retour à l'accueil
        </button>
      </div>
    </motion.div>
  );

  const ContactFormSection = () => (
    <motion.div
      key="contact"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-10 flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl font-bold mb-10 text-center">Contactez-moi</h1>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="w-full max-w-lg space-y-6"
      >
        <input
          type="text"
          name="user_name"
          placeholder="Votre nom"
          required
          className="w-full p-3 border rounded dark:bg-gray-800 dark:border-gray-600"
        />
        <input
          type="email"
          name="user_email"
          placeholder="Votre email"
          required
          className="w-full p-3 border rounded dark:bg-gray-800 dark:border-gray-600"
        />
        <textarea
          name="message"
          placeholder="Votre message"
          required
          rows={6}
          className="w-full p-3 border rounded dark:bg-gray-800 dark:border-gray-600 resize-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition"
        >
          Envoyer
        </button>
        {success && (
          <p className="text-green-500 mt-4 text-center">
            Message envoyé avec succès ! ✅
          </p>
        )}
      </form>
      <button
        onClick={toggleContactForm}
        className="mt-10 px-6 py-3 bg-gray-300 dark:bg-gray-700 rounded-md font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 transition"
      >
        Retour à l'accueil
      </button>
    </motion.div>
  );

  const MainContent = () => (
    <motion.div
      key="main"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <section
        className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1521737711867-e3b97375f902)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70 dark:bg-opacity-80" />
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 text-white">Fawzi Youjil</h1>
          <p className="text-xl mb-6 text-white">
            Customer Care Expert
          </p>
          <p className="max-w-xl mx-auto text-gray-300 mb-10">
            Passionné par la tech,le code, les voyages et le relationnel et l'expérience utilisateur,
            je construis des ponts entre humain et numérique.
          </p>
          <a
            href="/CV-FAWZI-YOUJIL.pdf"
            download
            className="inline-flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full font-semibold hover:bg-gray-300 transition"
          >
            <FaDownload /> Télécharger mon CV
          </a>

          {/* Flèche pour scroll */}
<div className="mt-6 flex justify-center">
  <button
    onClick={() => {
      const section = document.getElementById("parcours");
      section.scrollIntoView({ behavior: "smooth" });
    }}
    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-white text-white hover:bg-white hover:text-indigo-600 transition-colors animate-bounce"
    aria-label="Aller à Parcours professionnel"
  >
    ↓
  </button>
</div>

        </div>
      </section>

      {/* Parcours */}
      <section id="parcours" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Parcours professionnel</h2>
        <div className="space-y-10 text-gray-700 dark:text-gray-300">
          <div>
            <h3 className="text-xl font-semibold">Customer Care Expert – Apple</h3>
            <p className="text-sm italic">2019 – 2023 </p>
            <ul className="list-disc list-inside mt-2">
              <li>Gestion des plaintes et résolutions des problèmes pour assurer la satisfaction client</li>
              <li>Mise en place de stratégie d’amélioration continue du service client</li>
              <li>Réparation modulaire</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Customer Care Expert – Foodles</h3>
            <p className="text-sm italic">2023 – 2025 </p>
            <ul className="list-disc list-inside mt-2">
              <li>Gestion multicanal de la relation client (email, téléphone, chat)</li>
              <li>Contribution à l'amélioration des process internes</li>
              <li>Support B2B pour les entreprises partenaires</li>
              <li>Suivi de dossiers clients complexes (retours produits, remboursements, litiges)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Formation */}
      <section className="py-20 px-6 max-w-4xl mx-auto bg-gray-100 dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-6">Formation</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-3">
          <li>
            <strong>Titre professionnel</strong> – Développeur Web Full Stack
          </li>
          <li>Master [Administration, Echange International] – [UPEC], [2018]</li>
          <li>Licence [Administration, Echange International] – [UPEC], [2015]</li>
          <li>Baccalauréat Technologique [Comptabilité, Finance, Entreprise] – [Langevin], [2012]</li>
        </ul>
      </section>

      {/* Valeurs */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 dark:text-white">
            🎖️ Mes valeurs / Mon approche
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: "🤝", title: "Empathie", desc: "Comprendre vraiment ce que le client vit, pas seulement ce qu’il dit." },
              { icon: "⚡", title: "Réactivité", desc: "Répondre vite, avec efficacité et clarté. Chaque minute compte." },
              { icon: "🧠", title: "Autonomie", desc: "Trouver des solutions par moi-même, en gardant l’objectif en tête." },
              { icon: "🔍", title: "Sens du détail", desc: "Chaque mot, chaque interaction a son importance dans l’expérience client." },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl shadow-lg bg-gray-50 dark:bg-gray-800"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compétences générales */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Compétences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
          <div>
            <h4 className="text-lg font-semibold mb-2">Relation client & Soft skills</h4>
            <ul className="list-disc list-inside">
              <li>Écoute active, gestion des conflits</li>
              <li>Empathie, diplomatie, rigueur</li>
              <li>Communication claire et synthétique</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Compétences techniques</h4>
            <ul className="list-disc list-inside">
              <li>React, JavaScript, Node.js</li>
              <li>CRM : Salesforce, Zendesk</li>
              <li>Support logiciel et matériel (Apple)</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center flex justify-center gap-6">
          
          <button
  onClick={toggleContactForm}
  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold hover:from-indigo-600 hover:to-purple-700 shadow-lg transition-all transform hover:scale-105"
>
  Me contacter
</button>

        </div>
      </section>

      {/* Pourquoi moi */}
      <section className="py-20 px-6 max-w-3xl mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-center text-white rounded-2xl shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ce qui me distingue ✨</h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Je ne me contente pas de résoudre un problème : je cherche à comprendre, anticiper et créer une expérience qui marque.  
          Curieux, déterminé et humain, je transforme chaque challenge en opportunité et chaque interaction en valeur ajoutée.  
          Si vous cherchez quelqu’un qui allie expertise technique et sens du relationnel, vous venez de le trouver.
        </p>
      </section>

      {/* Contact rapide */}
      <div className="flex justify-center gap-6 text-3xl mt-10 mb-20">
        <motion.a
          href="https://www.linkedin.com/in/fawzi-youjil-39415b17a"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="hover:text-blue-500 transition-colors"
        >
          <FaLinkedin />
        </motion.a>
      </div>

      <footer className="text-center text-sm text-gray-600 dark:text-gray-400 py-6 bg-white dark:bg-black">
        © 2025 Fawzi Youjil. Tous droits réservés.
      </footer>
    </motion.div>
  );

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white font-sans transition-colors duration-300 min-h-screen relative">
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:scale-110 transition-transform"
        aria-label="Changer de thème"
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </button>

      <AnimatePresence mode="wait" initial={false}>
        {showSkills ? (
          <SkillsSection key="skills" />
        ) : showContactForm ? (
          <ContactFormSection key="contact" />
        ) : (
          <MainContent key="main" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
