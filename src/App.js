import React, { useEffect, useRef, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaBars,
  FaCheck,
  FaCode,
  FaDownload,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaGlobe,
  FaHeadset,
  FaLightbulb,
  FaLinkedin,
  FaMapMarkerAlt,
  FaMoon,
  FaQuoteLeft,
  FaSun,
  FaTimes,
  FaTools,
} from "react-icons/fa";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import emailjs from "@emailjs/browser";

const experiences = [
  {
    year: "2023 - 2025",
    company: "Foodles",
    role: "Customer Care Expert",
    type: "B2B · B2C · Operations",
    color: "from-indigo-500 to-violet-500",
    description:
      "Gestion des flux multicanaux, amélioration des processus de résolution et accompagnement de partenaires stratégiques.",
    points: [
      "Gestion de demandes complexes sur plusieurs canaux.",
      "Optimisation des process de rétention et de résolution de litiges.",
      "Support technique de second niveau pour des partenaires stratégiques.",
    ],
  },
  {
    year: "2019 - 2023",
    company: "Apple",
    role: "Customer Care Expert",
    type: "Service · Technique · Satisfaction",
    color: "from-slate-500 to-slate-900",
    description:
      "Accompagnement client, diagnostic technique et application de standards de service exigeants dans un environnement premium.",
    points: [
      "Application des standards de service Apple.",
      "Diagnostic logiciel et résolution de problèmes techniques.",
      "Analyse des besoins et amélioration de l’expérience client.",
    ],
  },
];

const expertise = [
  {
    icon: FaHeadset,
    number: "01",
    title: "Customer Care",
    description:
      "Créer une relation client claire, rassurante et efficace, même dans les situations complexes.",
    tags: ["B2B", "B2C", "Support", "Rétention"],
  },
  {
    icon: FaTools,
    number: "02",
    title: "Process & qualité",
    description:
      "Identifier les irritants, fluidifier les opérations et transformer les problèmes récurrents en solutions durables.",
    tags: ["Qualité", "SLA", "Process", "Amélioration continue"],
  },
  {
    icon: FaCode,
    number: "03",
    title: "Culture technique",
    description:
      "Comprendre les outils, les produits et les contraintes techniques pour collaborer efficacement avec les équipes produit et tech.",
    tags: ["Diagnostic", "Produit", "Web", "Outils"],
  },
  {
    icon: FaLightbulb,
    number: "04",
    title: "Vision solution",
    description:
      "Ne pas seulement traiter une demande, mais comprendre sa cause et proposer une réponse utile pour le client comme pour l’entreprise.",
    tags: ["Analyse", "Empathie", "Autonomie", "Pragmatisme"],
  },
];

const education = [
  {
    title: "Développeur Web Full Stack",
    subtitle: "Titre professionnel RNCP",
  },
  {
    title: "Master Administration et Échanges Internationaux",
    subtitle: "UPEC - 2018",
  },
  {
    title: "Licence Administration et Échanges Internationaux",
    subtitle: "UPEC - 2015",
  },
];

const languages = [
  {
    name: "Français",
    level: "Langue maternelle",
    value: 100,
  },
  {
    name: "Anglais",
    level: "Professionnel",
    value: 85,
  },
  {
    name: "Espagnol",
    level: "Notions",
    value: 35,
  },
  {
    name: "Japonais",
    level: "Notions",
    value: 20,
  },
];

const Reveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) => {
  const reduceMotion = useReducedMotion();

  const directions = {
    up: { y: 45, x: 0 },
    left: { y: 0, x: -45 },
    right: { y: 0, x: 45 },
  };

  const initialPosition = directions[direction] || directions.up;

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              ...initialPosition,
              filter: "blur(8px)",
            }
      }
      whileInView={
        reduceMotion
          ? false
          : {
              opacity: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
            }
      }
      viewport={{
        once: true,
        amount: 0.2,
        margin: "0px 0px -80px 0px",
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Parallax = ({
  children,
  className = "",
  distance = 40,
}) => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [distance, -distance]
  );

  const y = useSpring(rawY, {
    stiffness: 100,
    damping: 25,
    mass: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? {} : { y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");

  const form = useRef(null);
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollY, scrollYProgress: pageProgress } = useScroll();

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothHeroProgress = useSpring(heroProgress, {
    stiffness: 90,
    damping: 25,
    mass: 0.4,
  });

  const heroImageScale = useTransform(
    smoothHeroProgress,
    [0, 1],
    [1, 1.13]
  );

  const heroImageY = useTransform(
    smoothHeroProgress,
    [0, 1],
    ["0%", "14%"]
  );

  const heroBlur = useTransform(
    smoothHeroProgress,
    [0, 0.7, 1],
    ["blur(0px)", "blur(2px)", "blur(8px)"]
  );

  const heroContentY = useTransform(
    smoothHeroProgress,
    [0, 1],
    ["0%", "35%"]
  );

  const heroContentOpacity = useTransform(
    smoothHeroProgress,
    [0, 0.55, 1],
    [1, 0.8, 0]
  );

  const heroOverlayOpacity = useTransform(
    smoothHeroProgress,
    [0, 1],
    [0.55, 0.9]
  );

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("portfolio-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("portfolio-theme", "light");
    }
  }, [isDarkMode]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30);
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowContactForm(false);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode((currentValue) => !currentValue);
  };

  const toggleContactForm = () => {
    setShowContactForm((currentValue) => !currentValue);
    setFormStatus("idle");
  };

  const sendEmail = async (event) => {
    event.preventDefault();
    setFormStatus("sending");

    try {
      await emailjs.sendForm(
        "service_pm5euyc",
        "template_kglq2fe",
        form.current,
        "yd-a9-SRb74iGWN1D"
      );

      setFormStatus("success");
      form.current.reset();
    } catch (error) {
      console.error("Erreur EmailJS :", error);
      setFormStatus("error");
    }
  };

  const ContactForm = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-5 backdrop-blur-xl"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setShowContactForm(false);
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] border border-white/10 bg-white p-7 shadow-2xl dark:bg-slate-900 md:p-10"
      >
        <button
          type="button"
          onClick={() => setShowContactForm(false)}
          aria-label="Fermer la fenêtre de contact"
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-indigo-500 hover:text-white dark:bg-white/10 dark:text-white"
        >
          <FaTimes />
        </button>

        <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-500">
          Contact
        </p>

        <h2
          id="contact-title"
          className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-950 dark:text-white"
        >
          Parlons de ton projet.
        </h2>

        <p className="mt-4 leading-relaxed text-slate-500 dark:text-slate-400">
          Décris-moi ton besoin, ton contexte et la manière dont je peux
          t’aider.
        </p>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="mt-8 space-y-4"
        >
          <input
            type="text"
            name="user_name"
            autoComplete="name"
            placeholder="Nom complet"
            required
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />

          <input
            type="email"
            name="user_email"
            autoComplete="email"
            placeholder="Email professionnel"
            required
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />

          <textarea
            name="message"
            placeholder="Ton message..."
            required
            rows={6}
            className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />

          <button
            type="submit"
            disabled={formStatus === "sending"}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-950 py-4 font-bold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950"
          >
            <FaEnvelope />

            {formStatus === "sending"
              ? "Envoi en cours..."
              : "Envoyer le message"}
          </button>

          {formStatus === "success" && (
            <p className="rounded-xl bg-emerald-50 p-4 text-center text-sm font-bold text-emerald-600">
              Merci, ton message a bien été envoyé.
            </p>
          )}

          {formStatus === "error" && (
            <p className="rounded-xl bg-red-50 p-4 text-center text-sm font-bold text-red-600">
              L’envoi a échoué. Tu peux aussi me contacter directement sur
              LinkedIn.
            </p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f7f5] font-sans text-slate-950 transition-colors duration-500 dark:bg-[#09090b] dark:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700;800;900&display=swap');

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          font-family: "Inter", sans-serif;
        }

        .font-mono {
          font-family: "DM Mono", monospace;
        }

        ::selection {
          background: #6366f1;
          color: white;
        }

        .noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.15'/%3E%3C/svg%3E");
          opacity: .08;
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="noise fixed inset-0 z-[80]" />

      <motion.div
        className="fixed left-0 top-0 z-[110] h-[3px] w-full origin-left bg-indigo-500"
        style={{ scaleX: pageProgress }}
      />

      <header
        className={`fixed left-0 right-0 top-0 z-50 px-4 transition-all duration-700 md:px-8 ${
          isScrolled ? "py-3" : "py-5"
        }`}
      >
        <motion.nav
          animate={{
            scale: isScrolled ? 0.97 : 1,
            y: isScrolled ? -2 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 backdrop-blur-2xl transition-all duration-700 md:px-6 ${
            isScrolled
              ? "border-slate-200/80 bg-white/95 shadow-2xl shadow-slate-900/10 dark:border-white/15 dark:bg-slate-950/90"
              : "border-slate-200/50 bg-white/60 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/50"
          }`}
        >
          <button
            type="button"
            onClick={() => scrollToSection("accueil")}
            className="group flex items-center gap-3"
            aria-label="Retour en haut"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white transition-transform duration-500 group-hover:rotate-12 dark:bg-white dark:text-slate-950">
              FY
            </span>

            <span className="hidden text-sm font-bold tracking-tight sm:block">
              Fawzi Youjil
            </span>
          </button>

          <div className="hidden items-center gap-7 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 md:flex">
            {[
              ["expertise", "Expertise"],
              ["parcours", "Parcours"],
              ["apropos", "À propos"],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className="transition-colors hover:text-indigo-500"
              >
                {label}
              </button>
            ))}

            <button
              type="button"
              onClick={toggleContactForm}
              className="rounded-full bg-slate-950 px-5 py-3 text-white transition hover:bg-indigo-600 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-400"
            >
              Contact
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label="Changer de thème"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:scale-110 hover:border-indigo-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen((value) => !value)}
              aria-label="Ouvrir le menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white md:hidden"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </motion.nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-auto mt-3 max-w-7xl rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-slate-950 md:hidden"
            >
              <div className="grid gap-2">
                {[
                  ["expertise", "Expertise"],
                  ["parcours", "Parcours"],
                  ["apropos", "À propos"],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => scrollToSection(id)}
                    className="rounded-xl px-4 py-3 text-left text-sm font-bold uppercase tracking-widest text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-white/5"
                  >
                    {label}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowContactForm(true);
                  }}
                  className="mt-2 rounded-xl bg-slate-950 px-4 py-3 text-left text-sm font-bold uppercase tracking-widest text-white dark:bg-white dark:text-slate-950"
                >
                  Me contacter
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10">
        <section
          ref={heroRef}
          id="accueil"
          className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-32"
        >
          <motion.div
            className="absolute inset-[-7%] bg-cover bg-center"
            style={{
              scale: reduceMotion ? 1 : heroImageScale,
              y: reduceMotion ? 0 : heroImageY,
              filter: reduceMotion ? "none" : heroBlur,
              backgroundImage:
                "url(https://images.unsplash.com/photo-1521737711867-e3b97375f902)",
            }}
          />

          <motion.div
            className="absolute inset-0 bg-slate-950"
            style={{
              opacity: reduceMotion ? 0.72 : heroOverlayOpacity,
            }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(99,102,241,0.35),transparent_30%)]" />

          <motion.div
            className="absolute right-[8%] top-[22%] hidden h-40 w-40 rounded-full border border-white/20 lg:block"
            animate={
              reduceMotion
                ? {}
                : {
                    rotate: 360,
                    scale: [1, 1.08, 1],
                  }
            }
            transition={{
              rotate: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />

          <motion.div
            style={{
              y: reduceMotion ? 0 : heroContentY,
              opacity: reduceMotion ? 1 : heroContentOpacity,
            }}
            className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_.9fr]"
          >
            <div className="text-left">
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 30,
                      }
                }
                animate={
                  reduceMotion
                    ? false
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                transition={{ duration: 0.8 }}
                className="mb-7 inline-flex items-center gap-3 rounded-full border border-indigo-300/20 bg-indigo-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-200"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Disponible pour une nouvelle opportunité
              </motion.div>

              <motion.p
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 25,
                      }
                }
                animate={
                  reduceMotion
                    ? false
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-white/50"
              >
                Customer Care · Operations · Product
              </motion.p>

              <motion.h1
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 30,
                      }
                }
                animate={
                  reduceMotion
                    ? false
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-4xl text-6xl font-black leading-[0.88] tracking-[-0.08em] text-white sm:text-7xl md:text-9xl"
              >
                Fawzi
                <span className="block text-indigo-400">Youjil.</span>
              </motion.h1>

              <motion.p
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 25,
                      }
                }
                animate={
                  reduceMotion
                    ? false
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-2xl"
              >
                J’améliore les expériences client, les processus internes et
                les produits digitaux grâce à une approche humaine, structurée
                et technique.
              </motion.p>

              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 25,
                      }
                }
                animate={
                  reduceMotion
                    ? false
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <button
                  type="button"
                  onClick={() => scrollToSection("parcours")}
                  className="group flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-2xl transition hover:-translate-y-1 hover:bg-indigo-400"
                >
                  Découvrir mon parcours
                  <FaArrowDown className="transition-transform group-hover:translate-y-1" />
                </button>

                <a
                  href="/CV-FAWZI-YOUJIL.pdf"
                  download
                  className="flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <FaDownload />
                  Télécharger mon CV
                </a>
              </motion.div>

              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 25,
                      }
                }
                animate={
                  reduceMotion
                    ? false
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-10 flex flex-wrap gap-6 text-sm text-white/60"
              >
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-indigo-400" />
                  Mobile en Suisse
                </span>

                <span className="flex items-center gap-2">
                  <FaCheck className="text-emerald-400" />
                  Français / Anglais
                </span>
              </motion.div>
            </div>

            <Parallax distance={35} className="relative mx-auto w-full max-w-md">
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.85,
                        rotate: 4,
                      }
                }
                animate={
                  reduceMotion
                    ? false
                    : {
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                      }
                }
                transition={{ duration: 1, delay: 0.4 }}
                className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-slate-950/80 p-7 text-white shadow-2xl backdrop-blur-xl"
              >
                <div className="absolute right-[-20%] top-[-20%] h-64 w-64 rounded-full bg-indigo-500/40 blur-3xl" />

                <div className="relative">
                  <div className="mb-16 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                      Profile / 2026
                    </span>

                    <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
                      Available
                    </span>
                  </div>

                  <p className="text-sm text-white/40">
                    My operating system
                  </p>

                  <h2 className="mt-3 text-4xl font-black leading-none tracking-[-0.06em]">
                    Make every interaction count.
                  </h2>

                  <div className="mt-12 grid grid-cols-2 gap-3">
                    {[
                      ["Customer Care", "B2B + B2C"],
                      ["Product mindset", "Solution first"],
                      ["Support", "Level 2"],
                      ["Languages", "FR / EN"],
                    ].map(([title, subtitle]) => (
                      <div
                        key={title}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:bg-white/10"
                      >
                        <p className="text-sm font-bold">{title}</p>
                        <p className="mt-1 text-xs text-white/40">
                          {subtitle}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-5 font-mono text-xs text-indigo-300">
                    empathy.exe is running smoothly
                  </div>
                </div>
              </motion.div>
            </Parallax>
          </motion.div>

          <motion.button
            type="button"
            onClick={() => scrollToSection("expertise")}
            animate={
              reduceMotion
                ? {}
                : {
                    y: [0, 8, 0],
                    opacity: [0.5, 1, 0.5],
                  }
            }
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 md:flex"
          >
            Scroll to explore
            <span className="h-12 w-px bg-white/30" />
          </motion.button>
        </section>

        <div className="overflow-hidden border-y border-slate-200 bg-slate-950 py-5 text-white dark:border-white/10">
          <motion.div
            animate={
              reduceMotion
                ? {}
                : {
                    x: ["0%", "-50%"],
                  }
            }
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max gap-10 whitespace-nowrap font-mono text-sm uppercase tracking-[0.25em] text-white/60"
          >
            {[...Array(2)].flatMap((_, groupIndex) =>
              [
                "Customer Care",
                "Operations",
                "Quality",
                "Product Thinking",
                "Continuous Improvement",
              ].map((item, index) => (
                <span
                  key={`${groupIndex}-${index}`}
                  className="flex items-center gap-10"
                >
                  {item}
                  <span className="text-indigo-400">✦</span>
                </span>
              ))
            )}
          </motion.div>
        </div>

        <section
          id="expertise"
          className="scroll-mt-28 px-6 py-32 md:px-12 md:py-40"
        >
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-16 max-w-2xl">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-indigo-500">
                Ce que j’apporte
              </p>

              <h2 className="text-4xl font-black tracking-[-0.06em] md:text-6xl">
                Plus qu’un support.
                <span className="block text-slate-400 dark:text-slate-500">
                  Une culture de la solution.
                </span>
              </h2>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2">
              {expertise.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.number}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 50,
                            rotateX: 8,
                          }
                    }
                    whileInView={
                      reduceMotion
                        ? false
                        : {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                          }
                    }
                    viewport={{
                      once: true,
                      amount: 0.25,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={
                      reduceMotion
                        ? {}
                        : {
                            y: -10,
                            rotateX: -2,
                            rotateY: 2,
                            scale: 1.015,
                          }
                    }
                    style={{
                      transformPerspective: 1200,
                    }}
                    className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rounded-full bg-indigo-500/10 blur-3xl transition group-hover:bg-indigo-500/30" />

                    <div className="relative flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-xl text-indigo-500 transition duration-500 group-hover:rotate-6 group-hover:bg-indigo-500 group-hover:text-white">
                        <Icon />
                      </div>

                      <span className="font-mono text-sm text-slate-300 dark:text-white/20">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="relative mt-12 text-2xl font-black">
                      {item.title}
                    </h3>

                    <p className="relative mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>

                    <div className="relative mt-7 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 dark:border-white/10 dark:text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="parcours"
          className="scroll-mt-28 bg-slate-950 px-6 py-32 text-white md:px-12 md:py-48"
        >
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">
            <div className="lg:sticky lg:top-32 lg:h-fit">
              <Reveal>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-indigo-400">
                  Expérience
                </p>

                <h2 className="max-w-xl text-5xl font-black leading-[0.95] tracking-[-0.08em] md:text-7xl">
                  Des environnements exigeants,
                  <span className="mt-3 block text-white/30">
                    des réflexes solides.
                  </span>
                </h2>

                <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/50">
                  Chaque expérience m’a appris à gérer la complexité, à garder
                  une communication claire et à chercher la cause réelle d’un
                  problème.
                </p>

                <div className="mt-10 hidden items-center gap-3 font-mono text-xs uppercase tracking-widest text-white/30 lg:flex">
                  <span className="h-px w-12 bg-indigo-500" />
                  Scroll to discover
                </div>
              </Reveal>
            </div>

            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <motion.article
                  key={experience.company}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 70,
                          scale: 0.96,
                        }
                  }
                  whileInView={
                    reduceMotion
                      ? false
                      : {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }
                  }
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 transition-colors duration-500 hover:bg-white/[0.08] md:p-12"
                >
                  <div
                    className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-r ${experience.color} opacity-10 blur-3xl transition duration-700 group-hover:opacity-30`}
                  />

                  <div className="relative flex flex-col justify-between gap-8 md:flex-row">
                    <div>
                      <span className="font-mono text-sm text-indigo-400">
                        {experience.year}
                      </span>

                      <h3 className="mt-4 text-5xl font-black tracking-[-0.08em] md:text-6xl">
                        {experience.company}
                      </h3>

                      <p className="mt-3 text-lg font-semibold text-white/70">
                        {experience.role}
                      </p>

                      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-white/30">
                        {experience.type}
                      </p>
                    </div>

                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 text-indigo-400 transition duration-500 group-hover:rotate-45 group-hover:bg-indigo-500 group-hover:text-white">
                      <FaExternalLinkAlt className="text-sm" />
                    </span>
                  </div>

                  <div className="relative mt-12 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-[0.8fr_1.2fr]">
                    <p className="text-lg leading-relaxed text-white/65">
                      {experience.description}
                    </p>

                    <ul className="space-y-4">
                      {experience.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-sm leading-relaxed text-white/50"
                        >
                          <FaCheck className="mt-1 shrink-0 text-indigo-400" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="apropos"
          className="scroll-mt-28 px-6 py-32 md:px-12 md:py-40"
        >
          <div className="mx-auto grid max-w-7xl gap-20 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-indigo-500">
                À propos
              </p>

              <h2 className="text-4xl font-black tracking-[-0.06em] md:text-6xl">
                La qualité se voit
                <span className="block text-slate-400 dark:text-slate-500">
                  dans les détails.
                </span>
              </h2>

              <div className="mt-10 flex items-start gap-4">
                <FaQuoteLeft className="mt-1 shrink-0 text-2xl text-indigo-500" />

                <p className="text-xl font-semibold leading-relaxed text-slate-700 dark:text-slate-300">
                  L’excellence n’est pas un acte, mais une habitude.
                </p>
              </div>
            </Reveal>

            <Reveal direction="right" className="space-y-6">
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Mon parcours se situe à la croisée de la relation client, de
                l’amélioration continue et de la compréhension technique des
                produits.
              </p>

              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                J’aime comprendre ce qui bloque, simplifier ce qui peut l’être
                et construire des réponses qui fonctionnent autant pour le
                client que pour les équipes internes.
              </p>

              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Aujourd’hui, je souhaite rejoindre une structure ambitieuse où
                l’expérience client est considérée comme un véritable levier de
                croissance et de fidélisation.
              </p>

              <div className="grid gap-3 pt-5 sm:grid-cols-2">
                {[
                  "Diplomatie",
                  "Rigueur",
                  "Autonomie",
                  "Esprit d’analyse",
                  "Orienté solution",
                  "Adaptabilité",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/10 text-xs text-indigo-500">
                      <FaCheck />
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-6 py-32 dark:border-white/10 dark:bg-white/[0.02] md:px-12">
          <div className="mx-auto grid max-w-7xl gap-20 lg:grid-cols-2">
            <Reveal>
              <div className="mb-10 flex items-center gap-4">
                <FaGraduationCap className="text-2xl text-indigo-500" />

                <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
                  Formation
                </h2>
              </div>

              <div className="space-y-8">
                {education.map((item, index) => (
                  <div key={item.title} className="flex gap-5">
                    <span className="font-mono text-sm text-indigo-500">
                      0{index + 1}
                    </span>

                    <div>
                      <h3 className="text-lg font-black tracking-tight">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="mb-10 flex items-center gap-4">
                <FaGlobe className="text-2xl text-indigo-500" />

                <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
                  Langues
                </h2>
              </div>

              <div className="space-y-6">
                {languages.map((language) => (
                  <div key={language.name}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-bold">{language.name}</span>

                      <span className="text-slate-500">
                        {language.level}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${language.value}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden bg-indigo-600 px-6 py-32 text-white md:px-12 md:py-48">
          <div className="absolute right-[-5%] top-[-30%] h-[500px] w-[500px] rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-[-30%] left-[-5%] h-[500px] w-[500px] rounded-full bg-slate-950/20 blur-3xl" />

          <Reveal className="relative mx-auto max-w-5xl text-center">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-indigo-100">
              Prochaine étape
            </p>

            <h2 className="text-5xl font-black leading-none tracking-[-0.08em] md:text-8xl">
              Construisons quelque chose d’utile.
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-indigo-100 md:text-xl">
              Tu cherches quelqu’un capable de comprendre les clients, les
              process et les enjeux techniques ? Parlons de ton projet.
            </p>

            <button
              type="button"
              onClick={() => setShowContactForm(true)}
              className="group mt-10 inline-flex items-center gap-4 rounded-full bg-white px-8 py-5 text-sm font-black uppercase tracking-widest text-indigo-600 shadow-2xl transition hover:-translate-y-1 hover:bg-slate-950 hover:text-white"
            >
              Me contacter
              <FaArrowUp className="transition-transform group-hover:-translate-y-1" />
            </button>
          </Reveal>
        </section>
      </main>

      <footer className="relative z-10 bg-slate-950 px-6 py-12 text-white md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-2xl font-black tracking-tight">
              Fawzi Youjil.
            </p>

            <p className="mt-2 text-sm text-white/40">
              Customer Care · Operations · Product
            </p>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/in/fawzi-youjil-39415b17a"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-indigo-400 hover:bg-indigo-500 hover:text-white"
            >
              <FaLinkedin />
            </a>

            <button
              type="button"
              onClick={() => scrollToSection("accueil")}
              aria-label="Retour en haut"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-indigo-400 hover:bg-indigo-500 hover:text-white"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[10px] uppercase tracking-widest text-white/30 md:flex-row">
          <span>© 2026 Fawzi Youjil</span>
          <span>Designed with intention</span>
        </div>
      </footer>

      <AnimatePresence>
        {showContactForm && <ContactForm />}
      </AnimatePresence>
    </div>
  );
}

export default App;