import { useState } from "react";
import Navbar from "../components/Navbar";
import { isAxiosError } from "axios";
import Footer from "../components/Footer";
import PartnersCarousel from "../components/PartnersCarousel";
import "./Contact.css";
import api from "../lib/api";
import {
  Headphones,
  GraduationCap,
  ShieldCheck,
  Mail,
  Phone,
  Clock,
  MapPin,
  ChevronDown,
  Send,
  Lock,
} from "lucide-react";

const trustPoints = [
  {
    icon: Headphones,
    title: "Réponse rapide",
    text: "Nous répondons sous 48 heures",
  },
  {
    icon: GraduationCap,
    title: "Formateurs experts",
    text: "Des professionnels de l'audit et de la comptabilité",
  },
  {
    icon: ShieldCheck,
    title: "Votre réussite",
    text: "Un accompagnement jusqu'à la certification",
  },
];

const contactChannels = [
  {
    icon: Mail,
    title: "Écrivez-nous",
    lines: ["communication@asfifo.mg", "recrutement@asfifo.mg"],
  },
  {
    icon: Phone,
    title: "Appelez-nous",
    lines: ["032 05 436 49", "Lun - Ven, 8h - 17h"],
  },
  {
    icon: MapPin,
    title: "Rendez-nous visite",
    lines: [
      "Immeuble Heritage, 3e étage",
      "Lot IVX 72 BIS F Ankazomanga, Antananarivo",
    ],
  },
  {
    icon: Clock,
    title: "Horaires d'ouverture",
    lines: ["Lundi - Vendredi", "8h00 - 17h00"],
  },
];

const faqs = [
  {
    q: "Quelles formations proposez-vous ?",
    a: "Nous proposons des formations pratiques en Audit interne, Audit comptable et financier, Comptabilité, ainsi que des parcours en entrepreneuriat pour dirigeants.",
  },
  {
    q: "Combien de temps dure une formation ?",
    a: "La durée varie selon le programme choisi, de quelques semaines à plusieurs mois, adaptée à votre rythme.",
  },
  {
    q: "Les formations sont-elles certifiantes ?",
    a: "Oui, chaque parcours est sanctionné par une attestation reconnue par nos partenaires professionnels.",
  },
  {
    q: "Comment puis-je m'inscrire ?",
    a: "Il vous suffit de nous contacter via ce formulaire ou par téléphone pour connaître les prochaines sessions disponibles.",
  },
  {
    q: "Proposez-vous un accompagnement après la formation ?",
    a: "Oui, notre équipe reste disponible pour vous accompagner dans votre insertion professionnelle.",
  },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  organization: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: " ",
  subject: "",
  organization: "",
  message: "",
};

/*Composant*/

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrors({});

    try {
      await api.post("/contact-messages", form);
      setStatus("success");
      setForm(initialForm);
    }
    catch (err: unknown) {
      setStatus("error");

      if (isAxiosError(err) && err.response?.status === 422) {
        setErrors(err.response.data?.errors || {});
      }
    }
  };

  return (
    <div className="contact-page">
      <Navbar />

      {/* Hero + Form */}
      <section className="hero-section">
        <div className="hero-grid">
          {/* Left image panel */}
          <div
            className="hero-image"
            style={{
              backgroundImage:
                "linear-gradient(160deg, rgba(0,40,45,0.88), rgba(0,72,81,0.72)), url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80')",
            }}
          >
            <h1 className="hero-title">
              Nous serions ravis
              <br />
              de vous entendre
            </h1>
            <p className="hero-text">
              Devenir professionnel dans votre métier grâce à nos formations
              pratiques en Comptabilité, Audit et Entrepreneuriat.
              Contactez-nous pour en savoir plus.
            </p>

            <div className="trust-points">
              {trustPoints.map(({ icon: Icon, title, text }) => (
                <div key={title} className="trust-point">
                  <span className="trust-icon">
                    <Icon className="icon-sm" />
                  </span>
                  <div>
                    <p className="trust-point-title">{title}</p>
                    <p className="trust-point-text">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form panel */}
          <div className="form-panel">
            <h2 className="section-title">Envoyez-nous un message</h2>

            {status === "success" && (
              <p className="form-success">
                Votre message a bien été envoyé. Nous vous répondrons sous 48
                heures.
              </p>
            )}
            {status === "error" && !Object.keys(errors).length && (
              <p className="form-error">
                Une erreur est survenue lors de l'envoi. Veuillez réessayer.
              </p>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nom complet"
                    className="input"
                    required
                  />
                  {errors.name && (
                    <p className="field-error">{errors.name[0]}</p>
                  )}
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Adresse e-mail"
                    className="input"
                    required
                  />
                  {errors.email && (
                    <p className="field-error">{errors.email[0]}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="form-label">Numéro de télephone</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Numéro de téléphone (facultatif)"
                  className="input"
                />
                {errors.phone && (
                  <p className="field-error">{errors.phone[0]}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Sujet</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="select"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="audit-interne">Audit interne</option>
                  <option value="audit-comptable">
                    Audit comptable et financier
                  </option>
                  <option value="comptabilite">Comptabilité</option>
                  <option value="entrepreneuriat">
                    Initiation à l'entrepreneuriat
                  </option>
                  <option value="parcours-dirigeants">
                    Parcours dirigeants en entrepreneuriat
                  </option>
                  <option value="other">Autre</option>
                </select>
                {errors.subject && (
                  <p className="field-error">{errors.subject[0]}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Votre entreprise (facultatif)
                </label>
                <input
                  name="organization"
                  value={form.organization}
                  onChange={handleChange}
                  placeholder="Nom de votre entreprise ou organisation"
                  className="input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Votre message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Comment pouvons-nous vous aider ?"
                  rows={4}
                  className="textarea"
                  required
                />
                {errors.message && (
                  <p className="field-error">{errors.message[0]}</p>
                )}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={status === "sending"}
              >
                {status === "sending" ? "ENVOI..." : "ENVOYER LE MESSAGE"}
                <Send className="icon-sm" />
              </button>

              <p className="form-note">
                <Lock className="icon-xs" />
                Vos informations sont en sécurité avec nous.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Other ways to reach us                                     */}
      <section className="channels-section">
        <h2 className="section-title">Autres moyens de nous contacter</h2>
        <div className="channels-grid">
          {contactChannels.map(({ icon: Icon, title, lines }) => (
            <div key={title} className="channel-card">
              <span className="channel-icon">
                <Icon className="icon-sm" />
              </span>
              <p className="channel-title">{title}</p>
              {lines.map((line) => (
                <p key={line} className="channel-line">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ + image block */}
      <section className="faq-outer">
        <div className="faq-box">
          {/* FAQ accordion */}
          <div>
            <h2 className="section-title">Questions fréquentes</h2>
            <div className="faq-list">
              {faqs.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={item.q} className="faq-item">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="faq-question"
                    >
                      {item.q}
                      <ChevronDown
                        className={`icon-sm faq-chevron ${isOpen ? "faq-chevron-open" : ""
                          }`}
                      />
                    </button>
                    {isOpen && <p className="faq-answer">{item.a}</p>}
                  </div>
                );
              })}
            </div>
            <a href="#" className="faq-link">
              VOIR TOUTES LES FAQ →
            </a>
          </div>

          {/* Image + copy */}
          <div className="info-block">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80"
              alt="Session de formation ASFIFO"
              className="info-image"
            />
            <div>
              <h3 className="info-title">
                Nous sommes là pour vous accompagner vers la réussite
              </h3>
              <p className="info-text">
                De l'initiation à l'entrepreneuriat à la certification en audit
                et en comptabilité, notre équipe s'engage à faire de chaque
                étape de votre formation avec ASFIFO une expérience
                professionnalisante.
              </p>
              <button className="info-btn">EN SAVOIR PLUS SUR NOUS →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires                                                */}
      <section className="instagram-section">
        <div className="instagram-header">
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            Nos partenaires
          </h2>
        </div>
        <PartnersCarousel />
      </section>

      <Footer />
    </div>
  );
}
