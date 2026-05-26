"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  budgetOptions,
  serviceOptions,
  timelineOptions,
  wizardSteps,
} from "./get-started-data";

type ContactForm = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  phoneExt: string;
  notes: string;
};

const initialContact: ContactForm = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  phoneExt: "",
  notes: "",
};

const stepEase = [0.22, 1, 0.36, 1] as const;

function FieldLabel({ children, required }: { children: string; required?: boolean }) {
  return (
    <label className="mb-2 block text-sm font-medium text-white/85">
      {children}
      {required ? <span className="text-[var(--color-accent)]"> *</span> : null}
    </label>
  );
}

const inputClass = "get-started-input";

export function GetStartedWizard() {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [contact, setContact] = useState<ContactForm>(initialContact);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const progress = (step / wizardSteps.length) * 100;
  const currentMeta = wizardSteps[step - 1];

  const toggleService = useCallback((id: string) => {
    setServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  }, []);

  const updateContact = useCallback(
    (field: keyof ContactForm, value: string) => {
      setContact((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const validateStep = useCallback((): string | null => {
    if (step === 1 && services.length === 0) {
      return "Select at least one service to continue.";
    }
    if (step === 2 && !timeline) {
      return "Choose a project timeline.";
    }
    if (step === 3 && !budget) {
      return "Choose a budget range (or select Not sure).";
    }
    if (step === 4) {
      if (!contact.firstName.trim()) return "First name is required.";
      if (!contact.lastName.trim()) return "Last name is required.";
      if (!contact.email.trim()) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
        return "Enter a valid email address.";
      }
      if (!contact.phone.trim()) return "Phone is required.";
    }
    return null;
  }, [step, services.length, timeline, budget, contact]);

  const goNext = useCallback(() => {
    const message = validateStep();
    if (message) {
      setError(message);
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, wizardSteps.length));
  }, [validateStep]);

  const goPrev = useCallback(() => {
    setError(null);
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const selectedSummary = useMemo(() => {
    const serviceLabels = serviceOptions
      .filter((s) => services.includes(s.id))
      .map((s) => s.label);
    const timelineLabel = timelineOptions.find((t) => t.id === timeline)?.label;
    const budgetLabel = budgetOptions.find((b) => b.id === budget)?.label;
    return { serviceLabels, timelineLabel, budgetLabel };
  }, [services, timeline, budget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = validateStep();
    if (message) {
      setError(message);
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          services: selectedSummary.serviceLabels,
          timeline: selectedSummary.timelineLabel,
          budget: selectedSummary.budgetLabel,
          ...contact,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={false}
        animate={{ opacity: 1, scale: 1 }}
        className="get-started-wizard-glass"
      >
        <div className="get-started-wizard-inner p-10 text-center sm:p-14">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
            <Check className="h-8 w-8" strokeWidth={2.5} />
          </div>
          <h2 className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Thank you—we received your request
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/65 leading-relaxed">
            A member of our team will reach out shortly, usually within one business
            day. We&apos;re excited to learn more about your project.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex rounded-full bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold text-[var(--color-nav)] transition hover:brightness-110"
            >
              Back to home
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex rounded-full border border-white/15 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View portfolio
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="get-started-wizard-glass">
      <div className="get-started-wizard-inner get-started-divider border-b px-6 py-6 sm:px-10 sm:py-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
            Step {step} of {wizardSteps.length}
          </p>
          <div className="hidden gap-1 sm:flex">
            {wizardSteps.map((s) => (
              <span
                key={s.number}
                className={`h-1.5 w-8 rounded-full transition ${
                  s.number <= step ? "bg-[var(--color-accent)]" : "bg-black/10"
                }`}
                aria-hidden
              />
            ))}
          </div>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-strong)]"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.45, ease: stepEase }}
          />
        </div>
        <h2 className="mt-6 text-xl font-semibold tracking-tight text-white sm:text-2xl">
          {currentMeta.title}
        </h2>
        <p className="mt-2 text-sm text-white/55">{currentMeta.subtitle}</p>
      </div>

      <form
        onSubmit={step === 4 ? handleSubmit : (e) => e.preventDefault()}
        className="get-started-wizard-inner px-6 py-8 sm:px-10 sm:py-10"
      >
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step-1"
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: stepEase }}
              className="grid gap-3 sm:grid-cols-2"
            >
              {serviceOptions.map((service) => {
                const selected = services.includes(service.id);
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`get-started-chip group flex items-center gap-4 rounded-2xl p-4 text-left ${
                      selected ? "get-started-chip--selected" : ""
                    }`}
                    aria-pressed={selected}
                  >
                    <span className="get-started-chip-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[var(--color-accent)]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="font-semibold text-white/90">{service.label}</span>
                    {selected ? (
                      <Check className="ml-auto h-5 w-5 shrink-0 text-[var(--color-accent)]" />
                    ) : null}
                  </button>
                );
              })}
            </motion.div>
          ) : null}

          {step === 2 ? (
            <motion.div
              key="step-2"
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: stepEase }}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {timelineOptions.map((option) => {
                const selected = timeline === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setTimeline(option.id)}
                    className={`get-started-chip rounded-2xl p-6 text-center ${
                      selected ? "get-started-chip--selected" : ""
                    }`}
                    aria-pressed={selected}
                  >
                    <p className="text-2xl font-semibold tracking-tight text-white">
                      {option.label}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-widest text-white/45">
                      {option.short}
                    </p>
                  </button>
                );
              })}
            </motion.div>
          ) : null}

          {step === 3 ? (
            <motion.div
              key="step-3"
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: stepEase }}
              className="grid gap-3 sm:grid-cols-2"
            >
              {budgetOptions.map((option) => {
                const selected = budget === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setBudget(option.id)}
                    className={`get-started-chip rounded-2xl px-6 py-5 text-center text-lg font-semibold text-white/90 ${
                      selected ? "get-started-chip--selected" : ""
                    }`}
                    aria-pressed={selected}
                  >
                    {option.label}
                  </button>
                );
              })}
            </motion.div>
          ) : null}

          {step === 4 ? (
            <motion.div
              key="step-4"
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: stepEase }}
              className="space-y-6"
            >
              {(selectedSummary.serviceLabels.length > 0 || selectedSummary.timelineLabel) && (
                <div className="get-started-summary rounded-2xl p-5 text-sm">
                  <p className="font-semibold text-white">Your selections</p>
                  <ul className="mt-2 space-y-1 text-white/60">
                    {selectedSummary.serviceLabels.length > 0 ? (
                      <li>
                        <span className="font-medium text-white/85">Services: </span>
                        {selectedSummary.serviceLabels.join(", ")}
                      </li>
                    ) : null}
                    {selectedSummary.timelineLabel ? (
                      <li>
                        <span className="font-medium text-white/85">Timeline: </span>
                        {selectedSummary.timelineLabel}
                      </li>
                    ) : null}
                    {selectedSummary.budgetLabel ? (
                      <li>
                        <span className="font-medium text-white/85">Budget: </span>
                        {selectedSummary.budgetLabel}
                      </li>
                    ) : null}
                  </ul>
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel required>First name</FieldLabel>
                  <input
                    type="text"
                    className={inputClass}
                    value={contact.firstName}
                    onChange={(e) => updateContact("firstName", e.target.value)}
                    autoComplete="given-name"
                    required
                  />
                </div>
                <div>
                  <FieldLabel required>Last name</FieldLabel>
                  <input
                    type="text"
                    className={inputClass}
                    value={contact.lastName}
                    onChange={(e) => updateContact("lastName", e.target.value)}
                    autoComplete="family-name"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel>Company</FieldLabel>
                  <input
                    type="text"
                    className={inputClass}
                    value={contact.company}
                    onChange={(e) => updateContact("company", e.target.value)}
                    autoComplete="organization"
                  />
                </div>
                <div>
                  <FieldLabel required>Email</FieldLabel>
                  <input
                    type="email"
                    className={inputClass}
                    value={contact.email}
                    onChange={(e) => updateContact("email", e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
                <div>
                  <FieldLabel required>Phone</FieldLabel>
                  <input
                    type="tel"
                    className={inputClass}
                    value={contact.phone}
                    onChange={(e) => updateContact("phone", e.target.value)}
                    autoComplete="tel"
                    required
                  />
                </div>
                <div>
                  <FieldLabel>Phone ext.</FieldLabel>
                  <input
                    type="text"
                    className={inputClass}
                    value={contact.phoneExt}
                    onChange={(e) => updateContact("phoneExt", e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel>Notes / comments</FieldLabel>
                  <textarea
                    className={`${inputClass} min-h-[120px] resize-y`}
                    value={contact.notes}
                    onChange={(e) => updateContact("notes", e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {error ? (
          <p
            className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="get-started-divider mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-sm transition hover:border-white/25 hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>
          ) : (
            <span />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold text-[var(--color-nav)] transition hover:brightness-110"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold text-[var(--color-nav)] transition hover:brightness-110 disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                "Submit request"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
