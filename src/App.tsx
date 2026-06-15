import { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Code2,
  ChevronDown,
  Send,
  BookOpen,
  Award,
  Layers,
  Terminal,
  Globe,
  GitBranch,
  Cpu,
  Brain,
  FileText,
  User,
  Briefcase,
  GraduationCap,
} from 'lucide-react';

const NAV_LINKS = ['Home', 'Skills', 'Projects', 'Resume', 'Contact'];

const SKILLS = [
  { name: 'C Programming', icon: Terminal, desc: 'Systems & procedural programming' },
  { name: 'C++', icon: Cpu, desc: 'Object-oriented programming' },
  { name: 'HTML', icon: Globe, desc: 'Web markup & structure' },
  { name: 'CSS', icon: Layers, desc: 'Styling & layout design' },
  { name: 'JavaScript', icon: Code2, desc: 'Dynamic web development' },
  { name: 'Git', icon: GitBranch, desc: 'Version control' },
  { name: 'GitHub', icon: Github, desc: 'Code hosting & collaboration' },
  { name: 'Problem Solving', icon: Brain, desc: 'Logical & analytical thinking' },
];

const PROJECTS = [
  {
    title: 'Fake News Detector',
    description:
      'Developed a machine learning application to classify news articles as real or fake. Built with a GUI showing color-coded predictions, confidence scores, and history tracking.',
    points: [
      'Implemented text preprocessing and feature extraction techniques.',
      'Built interactive GUI with color-coded predictions and confidence scores.',
      'Trained and evaluated multiple ML models for optimal accuracy.',
    ],
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Tkinter'],
    github: 'https://github.com/muchintha',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Bank Management System',
    description:
      'Developed a console-based application for managing bank accounts with full CRUD operations.',
    points: [
      'Features include account creation, deposit, withdrawal, and balance inquiry.',
      'Implemented secure transaction handling and data validation.',
      'Designed a user-friendly menu-driven interface.',
    ],
    tech: ['C++'],
    github: 'https://github.com/muchintha',
    color: 'from-blue-600 to-blue-400',
  },
  {
    title: 'CGPA Calculator',
    description:
      'Developed an application to calculate semester-wise and overall CGPA efficiently.',
    points: [
      'Supports multi-semester GPA tracking and cumulative CGPA computation.',
      'Clean input/output flow for easy semester data entry.',
      'Handles edge cases like missing grades and credit variations.',
    ],
    tech: ['C++'],
    github: 'https://github.com/muchintha',
    color: 'from-sky-500 to-blue-500',
  },
];

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sent'>('idle');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPos = window.scrollY + 120;
      for (const section of NAV_LINKS) {
        const el = sectionRefs.current[section];
        if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (section: string) => {
    const el = sectionRefs.current[section];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setNavOpen(false);
  };

  const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sent');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setFormStatus('idle'), 4000);
  };

  const setRef = (section: string) => (el: HTMLElement | null) => {
    sectionRefs.current[section] = el;
  };

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => scrollTo('Home')}
              className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-blue-700' : 'text-white'
              }`}
            >
              Muchintha<span className="text-blue-400">.</span>
            </button>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeSection === link
                        ? 'bg-blue-600 text-white shadow-sm'
                        : scrolled
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        : 'text-white/90 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile menu button */}
            <button
              onClick={() => setNavOpen(!navOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
              }`}
              aria-label="Toggle menu"
            >
              {navOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            navOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          } bg-white/95 backdrop-blur-md border-t border-gray-100`}
        >
          <ul className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(link)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === link
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── HOME ── */}
      <section
        id="home"
        ref={setRef('Home')}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-sky-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.2),transparent_60%)]" />

        {/* Floating shapes */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-sky-300/10 rounded-full blur-2xl animate-pulse delay-1000" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Profile photo */}
            <div className="flex-shrink-0 order-1 lg:order-2">
              <div className="relative">
                <div className="w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden ring-4 ring-white/30 ring-offset-4 ring-offset-blue-700/50 shadow-2xl">
                  <img
                    src="/muchiiii.jpeg"
                    alt="Muchintha"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-3 shadow-lg">
                  <Code2 size={22} className="text-blue-600" />
                </div>
              </div>
            </div>

            {/* Text content */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <p className="text-sky-300 font-medium text-sm sm:text-base tracking-widest uppercase mb-3 animate-fade-in">
                Hello, I am
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Muchintha
              </h1>
              <h2 className="text-lg sm:text-xl text-blue-200 font-medium mb-6">
                Computer Science Engineering Student
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                I am a passionate Computer Science Engineering student with a strong interest in
                software development, problem-solving, and emerging technologies. I enjoy learning
                new concepts, building projects, and continuously improving my technical skills
                through hands-on projects and practical experience.
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <button
                  onClick={() => scrollTo('Projects')}
                  className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-sm"
                >
                  View Projects
                </button>
                <a
                  href="/Muchintha_InternshalaResume_(1).pdf"
                  download
                  className="px-6 py-3 bg-blue-500/30 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full hover:bg-blue-500/50 hover:-translate-y-0.5 transition-all duration-200 text-sm flex items-center gap-2"
                >
                  <Download size={16} />
                  Download Resume
                </a>
                <a
                  href="https://github.com/muchintha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-900/50 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-gray-900/70 hover:-translate-y-0.5 transition-all duration-200 text-sm flex items-center gap-2"
                >
                  <Github size={16} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/muchintha-n-a1ba58376/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-600/40 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-blue-600/60 hover:-translate-y-0.5 transition-all duration-200 text-sm flex items-center gap-2"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollTo('Skills')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* ── SKILLS ── */}
      <section
        id="skills"
        ref={setRef('Skills')}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="What I Know"
            title="Technical Skills"
            subtitle="A snapshot of the technologies and concepts I have been working with."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mt-14">
            {SKILLS.map(({ name, icon: Icon, desc }) => (
              <div
                key={name}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center mb-4 transition-colors duration-300">
                  <Icon size={26} className="text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{name}</h3>
                <p className="text-xs text-gray-500 leading-snug">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section
        id="projects"
        ref={setRef('Projects')}
        className="py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="What I Built"
            title="Featured Projects"
            subtitle="A collection of projects that demonstrate my problem-solving skills and technical abilities."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-14">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RESUME ── */}
      <section
        id="resume"
        ref={setRef('Resume')}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="My Background"
            title="Resume"
            subtitle="My education, skills, and career aspirations at a glance."
          />

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Education */}
            <div className="lg:col-span-2 space-y-6">
              <ResumeBlock icon={GraduationCap} title="Education">
                <div className="space-y-5">
                  <EduItem
                    degree="B.E. Computer Science & Engineering"
                    school="St Joseph's College Of Engineering"
                    year="2025 – 2029"
                    note="Currently pursuing"
                  />
                  <EduItem
                    degree="Senior Secondary (XII) — Science, CBSE"
                    school="Velammal Vidyalaya, Madurai"
                    year="2025"
                  />
                  <EduItem
                    degree="Secondary (X) — Tamil Nadu State Board"
                    school="King Universe Matric HR SEC School"
                    year="2023"
                    note="91.60%"
                  />
                </div>
              </ResumeBlock>

              <ResumeBlock icon={Award} title="Certifications & Training">
                <div className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Python for Data Science</p>
                    <p className="text-gray-500 text-xs mt-0.5">NPTEL — Jan 2026 – Present</p>
                  </div>
                </div>
              </ResumeBlock>

              <ResumeBlock icon={Briefcase} title="Career Objective">
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  "Enthusiastic CSE student looking for an internship to enhance my software
                  development skills and contribute to real-world projects using my knowledge of
                  programming and logical thinking."
                </p>
              </ResumeBlock>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ResumeBlock icon={Code2} title="Technical Skills">
                <div className="flex flex-wrap gap-2">
                  {['C', 'C++', 'HTML', 'CSS', 'JavaScript', 'Git', 'GitHub', 'Python', 'VS Code', 'MS-Office', 'Canva'].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </ResumeBlock>

              <ResumeBlock icon={BookOpen} title="Achievements">
                <ul className="space-y-2 text-sm text-gray-600">
                  {[
                    'Solved 600+ problems on SkillRack',
                    'Active LeetCode practitioner',
                    'College hackathon participant',
                    'Coding club member',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </ResumeBlock>

              {/* Download button */}
              <a
                href="/Muchintha_InternshalaResume_(1).pdf"
                download
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <Download size={18} />
                Download Full Resume
              </a>
              <a
                href="/Muchintha_InternshalaResume_(1).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-blue-200 text-blue-600 font-semibold rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-sm"
              >
                <FileText size={16} />
                View Resume Online
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        ref={setRef('Contact')}
        className="py-24 bg-white"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Get In Touch"
            title="Contact Me"
            subtitle="I am open to internship opportunities, collaborations, and conversations."
          />

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <User size={20} />
                  Contact Information
                </h3>
                <div className="space-y-5">
                  <ContactInfoRow
                    icon={<User size={18} />}
                    label="Name"
                    value="Muchintha"
                  />
                  <ContactInfoRow
                    icon={<Mail size={18} />}
                    label="Email"
                    value="muchinthanavamani63@gmail.com"
                    href="mailto:muchinthanavamani63@gmail.com"
                  />
                  <ContactInfoRow
                    icon={<MapPin size={18} />}
                    label="Location"
                    value="Chennai, India"
                  />
                  <ContactInfoRow
                    icon={<Github size={18} />}
                    label="GitHub"
                    value="github.com/muchintha"
                    href="https://github.com/muchintha"
                  />
                  <ContactInfoRow
                    icon={<Linkedin size={18} />}
                    label="LinkedIn"
                    value="muchintha-n"
                    href="https://www.linkedin.com/in/muchintha-n-a1ba58376/"
                  />
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-4">
                <SocialBtn
                  href="mailto:muchinthanavamani63@gmail.com"
                  label="Email"
                  icon={<Mail size={20} />}
                />
                <SocialBtn
                  href="https://github.com/muchintha"
                  label="GitHub"
                  icon={<Github size={20} />}
                />
                <SocialBtn
                  href="https://www.linkedin.com/in/muchintha-n-a1ba58376/"
                  label="LinkedIn"
                  icon={<Linkedin size={20} />}
                />
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Send a Message</h3>

              {formStatus === 'sent' ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Send size={28} className="text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Message Sent!</h4>
                  <p className="text-gray-500 text-sm">Thank you for reaching out. I will get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="name">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleForm}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-gray-800 text-sm transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
                      Your Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleForm}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-gray-800 text-sm transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleForm}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white text-gray-800 text-sm resize-none transition-shadow"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Send size={17} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} <span className="text-white font-medium">Muchintha</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/muchintha"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/muchintha-n-a1ba58376/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:muchinthanavamani63@gmail.com"
              className="hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Sub-components ── */

function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <span className="inline-block text-blue-600 font-semibold text-xs tracking-widest uppercase mb-3 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-500 text-base leading-relaxed">{subtitle}</p>
      <div className="mt-5 flex justify-center gap-1.5">
        <span className="w-8 h-1 bg-blue-600 rounded-full" />
        <span className="w-3 h-1 bg-blue-300 rounded-full" />
        <span className="w-1.5 h-1 bg-blue-200 rounded-full" />
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  points,
  tech,
  github,
  color,
}: {
  title: string;
  description: string;
  points: string[];
  tech: string[];
  github: string;
  color: string;
}) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Card header */}
      <div className={`h-2 bg-gradient-to-r ${color}`} />
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">{description}</p>
        <ul className="space-y-1.5 mb-5 flex-1">
          {points.map((pt) => (
            <li key={pt} className="flex items-start gap-2 text-xs text-gray-600">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
              {pt}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors group/link"
        >
          <Github size={16} />
          View on GitHub
          <ExternalLink size={13} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
        </a>
      </div>
    </div>
  );
}

function ResumeBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2.5 text-base">
        <span className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
          <Icon size={16} className="text-blue-600" />
        </span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function EduItem({
  degree,
  school,
  year,
  note,
}: {
  degree: string;
  school: string;
  year: string;
  note?: string;
}) {
  return (
    <div className="relative pl-5 border-l-2 border-blue-100">
      <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-blue-400 border-2 border-white" />
      <p className="font-semibold text-gray-800 text-sm">{degree}</p>
      <p className="text-gray-500 text-xs mt-0.5">{school}</p>
      <div className="flex items-center gap-3 mt-1">
        <span className="text-blue-600 text-xs font-medium">{year}</span>
        {note && (
          <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">
            {note}
          </span>
        )}
      </div>
    </div>
  );
}

function ContactInfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-white/60 text-xs mb-0.5">{label}</p>
        <p className="text-white text-sm font-medium break-all">{value}</p>
      </div>
    </div>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
        {inner}
      </a>
    );
  }
  return <div>{inner}</div>;
}

function SocialBtn({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white rounded-xl border border-gray-200 hover:border-blue-600 text-sm font-medium transition-all duration-200"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}
