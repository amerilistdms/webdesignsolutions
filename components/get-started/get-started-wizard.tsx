"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { serviceOptions } from "./get-started-data";

gsap.registerPlugin(useGSAP);

const WIZARD_SERVICES = [
  { id: "web-development", icon: "◈", title: "Web Design & Dev", desc: "Website or web app" },
  { id: "e-commerce", icon: "◉", title: "E-Commerce", desc: "Online store" },
  { id: "seo", icon: "◎", title: "SEO", desc: "Search rankings" },
  { id: "email-marketing", icon: "◫", title: "Email Marketing", desc: "Campaigns & automation" },
  { id: "social-media", icon: "◬", title: "Social Media", desc: "Management & ads" },
  { id: "graphic-design", icon: "◭", title: "Branding & Design", desc: "Logo & identity" },
  { id: "landing-pages", icon: "◮", title: "Digital Marketing", desc: "PPC & paid ads" },
  { id: "hosting", icon: "◲", title: "Hosting & Support", desc: "Infra & maintenance" },
  { id: "other", icon: "◌", title: "Other", desc: "Something else entirely" },
] as const;

const TIMELINES = [
  { id: "asap", label: "ASAP", sub: "I needed it yesterday" },
  { id: "1-3", label: "1–3 Months", sub: "Reasonable runway" },
  { id: "3-6", label: "3–6 Months", sub: "We have time to do it right" },
  { id: "6plus", label: "6+ Months", sub: "Long-term engagement" },
] as const;

const BUDGETS = [
  { id: "under1", label: "Less than $1K", sub: "Just getting started" },
  { id: "1-5", label: "$1K – $5K", sub: "Small project" },
  { id: "5-10", label: "$5K – $10K", sub: "Mid-range scope" },
  { id: "10plus", label: "More than $10K", sub: "Full-scale project" },
  { id: "notsure", label: "Not Sure", sub: "Help me figure it out" },
] as const;

const STEP_LABELS = ["Project", "Timeline", "Budget", "Contact"] as const;
const TOTAL_STEPS = 4;

type ContactForm = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
};

function serviceLabels(ids: string[], otherDesc: string) {
  return ids.map((id) => {
    if (id === "other") {
      return otherDesc.trim() ? `Other: ${otherDesc.trim()}` : "Other";
    }
    const wizard = WIZARD_SERVICES.find((s) => s.id === id);
    if (wizard) return wizard.title;
    const option = serviceOptions.find((s) => s.id === id);
    return option?.label ?? id;
  });
}

function splitName(full: string) {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ") || firstName;
  return { firstName, lastName };
}

const MIN_PROJECT_DETAILS_LENGTH = 20;

function getContactFormError(form: ContactForm): string | null {
  const name = form.name.trim();
  const email = form.email.trim();
  const phone = form.phone.trim();
  const company = form.company.trim();
  const message = form.message.trim();

  if (!name) return "Please enter your name.";
  if (!email) return "Please enter your email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address.";
  }
  if (!phone) return "Please enter your phone number.";
  if (phone.replace(/\D/g, "").length < 7) {
    return "Please enter a valid phone number.";
  }
  if (!company) return "Please enter your company name.";
  if (!message) return "Please tell us about your project.";
  if (message.length < MIN_PROJECT_DETAILS_LENGTH) {
    return `Please add more project details (at least ${MIN_PROJECT_DETAILS_LENGTH} characters).`;
  }
  return null;
}

function isContactFieldInvalid(
  field: keyof ContactForm,
  form: ContactForm,
  showErrors: boolean,
): boolean {
  if (!showErrors) return false;
  if (field === "name") return !form.name.trim();
  if (field === "email") {
    const email = form.email.trim();
    return !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  if (field === "phone") {
    return !form.phone.trim() || form.phone.replace(/\D/g, "").length < 7;
  }
  if (field === "company") return !form.company.trim();
  if (field === "message") {
    return form.message.trim().length < MIN_PROJECT_DETAILS_LENGTH;
  }
  return false;
}

export function GetStartedWizard() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [otherDesc, setOtherDesc] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showContactErrors, setShowContactErrors] = useState(false);
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          width: `${((step - 1) / (TOTAL_STEPS - 1)) * 100}%`,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    },
    { dependencies: [step], scope: rootRef },
  );

  const goTo = (next: number) => {
    if (!contentRef.current) {
      setStep(next);
      setError(null);
      return;
    }

    gsap.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setStep(next);
        setError(null);
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        );
      },
    });
  };

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const canContinueStep1 =
    selectedServices.length > 0 &&
    (!selectedServices.includes("other") || otherDesc.trim().length > 0);

  const contactFormError = useMemo(() => getContactFormError(form), [form]);
  const isContactFormComplete = contactFormError === null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setShowContactErrors(true);

    const validationError = getContactFormError(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    const { firstName, lastName } = splitName(form.name);

    setSubmitting(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          services: serviceLabels(selectedServices, otherDesc),
          timeline: TIMELINES.find((t) => t.id === timeline)?.label ?? timeline,
          budget: BUDGETS.find((b) => b.id === budget)?.label ?? budget,
          firstName,
          lastName,
          company: form.company.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          notes: form.message.trim(),
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      if (!contentRef.current) {
        setSubmitted(true);
        return;
      }

      gsap.to(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setSubmitted(true);
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, scale: 0.96 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" },
          );
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const serviceSummary = serviceLabels(selectedServices, otherDesc).join(", ");

  return (
    <div ref={rootRef} className="get-started-flow">
      <div className="get-started-flow__bg-orb get-started-flow__bg-orb--primary" aria-hidden />
      <div className="get-started-flow__bg-orb get-started-flow__bg-orb--secondary" aria-hidden />
      <div className="get-started-flow__bg-orb get-started-flow__bg-orb--accent" aria-hidden />

      {!submitted ? (
        <>
          <div className="get-started-flow__top-bar">
            <span className="get-started-flow__step-counter">
              Step <strong>{step}</strong> of <strong>{TOTAL_STEPS}</strong>
            </span>
          </div>

          <div className="get-started-flow__progress-track">
            <div ref={progressRef} className="get-started-flow__progress-fill" />
          </div>

          <nav className="get-started-flow__steps-nav" aria-label="Form progress">
            {STEP_LABELS.map((label, index) => (
              <span key={label} className="contents">
                <span
                  className={`get-started-flow__step-dot ${
                    step === index + 1
                      ? "get-started-flow__step-dot--active"
                      : step > index + 1
                        ? "get-started-flow__step-dot--done"
                        : ""
                  }`}
                  aria-hidden
                >
                  {step > index + 1 ? "✓" : index + 1}
                </span>
                {index < STEP_LABELS.length - 1 ? (
                  <span
                    className={`get-started-flow__step-line ${
                      step > index + 1 ? "get-started-flow__step-line--done" : ""
                    }`}
                    aria-hidden
                  />
                ) : null}
              </span>
            ))}
          </nav>
        </>
      ) : null}

      <div className="get-started-flow__main">
        <div ref={contentRef}>
          {error ? <p className="get-started-flow__error">{error}</p> : null}

          {submitted ? (
            <div className="get-started-flow__success">
              <div className="get-started-flow__success-icon">✓</div>
              <h1 className="get-started-flow__success-title">
                You&apos;re in.
                <br />
                <span>We&apos;ll be in touch.</span>
              </h1>
              <p className="get-started-flow__success-sub">
                Your brief was received. Someone from our team will reach out within
                one business day to schedule a discovery call.
              </p>
              <Link href="/" className="get-started-flow__success-back">
                Back to home →
              </Link>
            </div>
          ) : null}

          {step === 1 && !submitted ? (
            <>
              <h1 className="get-started-flow__title">
                What type of
                <br />
                <span>project</span> is it?
              </h1>
              <p className="get-started-flow__sub">
                Select all that apply — you can pick more than one.
              </p>
              <div className="get-started-flow__services-grid">
                {WIZARD_SERVICES.map((service) => {
                  const isOther = service.id === "other";
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      className={`get-started-flow__service-card ${
                        isSelected ? "get-started-flow__service-card--selected" : ""
                      }`}
                      onClick={(e) => {
                        if (
                          (e.target as HTMLElement).closest(
                            "textarea, input, label",
                          )
                        ) {
                          return;
                        }
                        toggleService(service.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.target instanceof HTMLTextAreaElement) return;
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault();
                          toggleService(service.id);
                        }
                      }}
                    >
                      <span className="get-started-flow__card-icon">{service.icon}</span>
                      <span className="get-started-flow__card-body">
                        <span className="get-started-flow__card-head">
                          <span className="get-started-flow__card-title">
                            {service.title}
                          </span>
                          <span className="get-started-flow__card-check">
                            {isSelected ? "✓" : ""}
                          </span>
                        </span>
                        <span className="get-started-flow__card-desc">{service.desc}</span>
                        {isOther && isSelected ? (
                          <textarea
                            className="get-started-flow__other-input"
                            rows={3}
                            placeholder="Briefly describe what you need..."
                            value={otherDesc}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                            onChange={(e) => setOtherDesc(e.target.value)}
                          />
                        ) : null}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="get-started-flow__nav-row">
                <span />
                <button
                  type="button"
                  className="get-started-flow__btn-next"
                  disabled={!canContinueStep1}
                  onClick={() => goTo(2)}
                >
                  Continue <span aria-hidden>→</span>
                </button>
              </div>
            </>
          ) : null}

          {step === 2 && !submitted ? (
            <>
              <h1 className="get-started-flow__title">
                What&apos;s your
                <br />
                <span>timeline?</span>
              </h1>
              <p className="get-started-flow__sub">When do you need this live?</p>
              <div className="get-started-flow__options-grid">
                {TIMELINES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`get-started-flow__option-card ${
                      timeline === item.id ? "get-started-flow__option-card--selected" : ""
                    }`}
                    onClick={() => setTimeline(item.id)}
                  >
                    <span className="get-started-flow__option-copy">
                      <span className="get-started-flow__option-label">{item.label}</span>
                      <span className="get-started-flow__option-sub">{item.sub}</span>
                    </span>
                    <span className="get-started-flow__option-radio" aria-hidden />
                  </button>
                ))}
              </div>
              <div className="get-started-flow__nav-row">
                <button type="button" className="get-started-flow__btn-back" onClick={() => goTo(1)}>
                  ← Back
                </button>
                <button
                  type="button"
                  className="get-started-flow__btn-next"
                  disabled={!timeline}
                  onClick={() => goTo(3)}
                >
                  Continue <span aria-hidden>→</span>
                </button>
              </div>
            </>
          ) : null}

          {step === 3 && !submitted ? (
            <>
              <h1 className="get-started-flow__title">
                What&apos;s your
                <br />
                <span>budget?</span>
              </h1>
              <p className="get-started-flow__sub">
                This helps us scope the right solution for you.
              </p>
              <div className="get-started-flow__options-grid get-started-flow__budget-grid">
                {BUDGETS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`get-started-flow__option-card ${
                      budget === item.id ? "get-started-flow__option-card--selected" : ""
                    }`}
                    onClick={() => setBudget(item.id)}
                  >
                    <span className="get-started-flow__option-copy">
                      <span className="get-started-flow__option-label">{item.label}</span>
                      <span className="get-started-flow__option-sub">{item.sub}</span>
                    </span>
                    <span className="get-started-flow__option-radio" aria-hidden />
                  </button>
                ))}
              </div>
              <div className="get-started-flow__nav-row">
                <button type="button" className="get-started-flow__btn-back" onClick={() => goTo(2)}>
                  ← Back
                </button>
                <button
                  type="button"
                  className="get-started-flow__btn-next"
                  disabled={!budget}
                  onClick={() => goTo(4)}
                >
                  Continue <span aria-hidden>→</span>
                </button>
              </div>
            </>
          ) : null}

          {step === 4 && !submitted ? (
            <>
              <h1 className="get-started-flow__title">
                Almost there —
                <br />
                <span>tell us about you.</span>
              </h1>
              <p className="get-started-flow__sub">
                We&apos;ll reach out within one business day to kick things off.
              </p>
              <div className="get-started-flow__summary">
                <div>
                  <p className="get-started-flow__summary-key">Services</p>
                  <p className="get-started-flow__summary-val">{serviceSummary}</p>
                </div>
                <div>
                  <p className="get-started-flow__summary-key">Timeline</p>
                  <p className="get-started-flow__summary-val">
                    {TIMELINES.find((t) => t.id === timeline)?.label}
                  </p>
                </div>
                <div>
                  <p className="get-started-flow__summary-key">Budget</p>
                  <p className="get-started-flow__summary-val">
                    {BUDGETS.find((b) => b.id === budget)?.label}
                  </p>
                </div>
              </div>
              <form onSubmit={handleSubmit} noValidate>
                <div className="get-started-flow__form-grid">
                  <div
                    className={`get-started-flow__field get-started-flow__field--full${
                      isContactFieldInvalid("name", form, showContactErrors)
                        ? " get-started-flow__field--invalid"
                        : ""
                    }`}
                  >
                    <label htmlFor="gs-name">Your name *</label>
                    <input
                      id="gs-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      aria-invalid={isContactFieldInvalid("name", form, showContactErrors)}
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div
                    className={`get-started-flow__field${
                      isContactFieldInvalid("email", form, showContactErrors)
                        ? " get-started-flow__field--invalid"
                        : ""
                    }`}
                  >
                    <label htmlFor="gs-email">Email *</label>
                    <input
                      id="gs-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      aria-invalid={isContactFieldInvalid("email", form, showContactErrors)}
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div
                    className={`get-started-flow__field${
                      isContactFieldInvalid("phone", form, showContactErrors)
                        ? " get-started-flow__field--invalid"
                        : ""
                    }`}
                  >
                    <label htmlFor="gs-phone">Phone *</label>
                    <input
                      id="gs-phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      required
                      aria-invalid={isContactFieldInvalid("phone", form, showContactErrors)}
                      placeholder="1-800-000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                  <div
                    className={`get-started-flow__field get-started-flow__field--full${
                      isContactFieldInvalid("company", form, showContactErrors)
                        ? " get-started-flow__field--invalid"
                        : ""
                    }`}
                  >
                    <label htmlFor="gs-company">Company *</label>
                    <input
                      id="gs-company"
                      type="text"
                      name="organization"
                      autoComplete="organization"
                      required
                      aria-invalid={isContactFieldInvalid("company", form, showContactErrors)}
                      placeholder="Your Company Inc."
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>
                  <div
                    className={`get-started-flow__field get-started-flow__field--full${
                      isContactFieldInvalid("message", form, showContactErrors)
                        ? " get-started-flow__field--invalid"
                        : ""
                    }`}
                  >
                    <label htmlFor="gs-message">Tell us about your project *</label>
                    <textarea
                      id="gs-message"
                      name="message"
                      rows={4}
                      required
                      minLength={MIN_PROJECT_DETAILS_LENGTH}
                      aria-invalid={isContactFieldInvalid("message", form, showContactErrors)}
                      placeholder="Goals, audience, timeline details..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                    <p className="get-started-flow__field-hint">
                      {form.message.trim().length}/{MIN_PROJECT_DETAILS_LENGTH} characters minimum
                    </p>
                  </div>
                </div>
                <div className="get-started-flow__nav-row">
                  <button type="button" className="get-started-flow__btn-back" onClick={() => goTo(3)}>
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="get-started-flow__btn-next"
                    disabled={submitting || !isContactFormComplete}
                  >
                    {submitting ? "Sending…" : "Send my brief"} <span aria-hidden>↗</span>
                  </button>
                </div>
              </form>
            </>
          ) : null}
        </div>
      </div>

      {!submitted ? (
        <p className="get-started-flow__fine-print">
          By submitting, you agree we may contact you about your project. We never sell
          your information.
        </p>
      ) : null}
    </div>
  );
}
