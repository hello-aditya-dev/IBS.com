"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { careerFormSchema, type CareerFormValues } from "@/lib/validation/career";
import { openPositions } from "@/lib/content";
import { EASE_OUT_EXPO, SPRING_SNAPPY } from "@/lib/motion";

// Build the role options from the open positions list. We also add an
// "Other / General application" entry so candidates who don't see a fit
// can still apply — those go into the same pipeline and get reviewed.
const roleOptions = [
  ...openPositions.map((p) => p.title),
  "Other / General application",
];

export function CareerForm() {
  const [submitted, setSubmitted] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CareerFormValues>({
    resolver: zodResolver(careerFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      experience: "",
      location: "",
      resumeLink: "",
      message: "",
    },
  });

  async function onSubmit(values: CareerFormValues) {
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, hp: honeypotRef.current?.value ?? "" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(data?.error ?? "Something went wrong. Please try again or email us directly.");
        return;
      }
      setSubmitted(true);
      reset();
    } catch {
      toast.error("Something went wrong. Please try again or email us directly.");
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        className="flex h-full flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-card p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, ...SPRING_SNAPPY }}
        >
          <CheckCircle2 className="h-14 w-14 text-deep-blue" />
        </motion.div>
        <h3 className="text-xl font-semibold text-charcoal font-heading">Application received</h3>
        <p className="max-w-sm text-sm text-steel">
          Thanks for applying. Our hiring team reviews every application within 5 working days. If
          your profile fits an open role, we&apos;ll reach out by email with next steps.
        </p>
        <Button variant="outline" className="mt-2 rounded-full" onClick={() => setSubmitted(false)}>
          Submit another application
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-5 sm:p-6 md:p-8"
    >
      {/* Honeypot: hidden from real users, filled by bots. */}
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="career-name">Full name *</Label>
          <Input
            id="career-name"
            placeholder="Your name"
            aria-describedby={errors.name ? "career-name-error" : undefined}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p id="career-name-error" className="text-xs text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="career-email">Email *</Label>
          <Input
            id="career-email"
            type="email"
            placeholder="you@email.com"
            aria-describedby={errors.email ? "career-email-error" : undefined}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p id="career-email-error" className="text-xs text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="career-phone">Phone</Label>
          <Input
            id="career-phone"
            placeholder="+91 "
            aria-describedby={errors.phone ? "career-phone-error" : undefined}
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="career-phone-error" className="text-xs text-destructive">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="career-role">Role you&apos;re applying for *</Label>
          <Input
            id="career-role"
            list="career-roles"
            placeholder="Select or type a role"
            aria-describedby={errors.role ? "career-role-error" : undefined}
            aria-invalid={!!errors.role}
            {...register("role")}
          />
          <datalist id="career-roles">
            {roleOptions.map((r) => (
              <option key={r} value={r} />
            ))}
          </datalist>
          {errors.role && (
            <p id="career-role-error" className="text-xs text-destructive">
              {errors.role.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="career-experience">Experience (optional)</Label>
          <Input
            id="career-experience"
            placeholder="e.g. 4 years in AV installation"
            {...register("experience")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="career-location">Current location (optional)</Label>
          <Input
            id="career-location"
            placeholder="e.g. Your city, State"
            {...register("location")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="career-resume">Link to your resume (optional)</Label>
        <Input
          id="career-resume"
          type="url"
          placeholder="https://drive.google.com/..."
          aria-describedby={errors.resumeLink ? "career-resume-error" : "career-resume-hint"}
          aria-invalid={!!errors.resumeLink}
          {...register("resumeLink")}
        />
        <p id="career-resume-hint" className="text-xs text-steel">
          Upload your resume to Google Drive, Dropbox, or any public link and paste it here.
        </p>
        {errors.resumeLink && (
          <p id="career-resume-error" className="text-xs text-destructive">
            {errors.resumeLink.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="career-message">Why are you applying? *</Label>
        <Textarea
          id="career-message"
          rows={5}
          placeholder="Tell us about your background, what you're looking for, and why IBS..."
          aria-describedby={errors.message ? "career-message-error" : undefined}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && (
          <p id="career-message-error" className="text-xs text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="cta"
        size="xl"
        disabled={isSubmitting}
        className="mt-2 self-start"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isSubmitting ? (
            <motion.span
              key="loading"
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Submit application <Send className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </form>
  );
}
