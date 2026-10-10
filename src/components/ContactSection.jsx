import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Heart } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address (e.g. name@example.com).';
      }
    }

    if (!formData.message.trim()) {
      errs.message = 'Please write a message.';
    } else if (formData.message.trim().length < 8) {
      errs.message = 'Your message must be at least 8 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulated graceful client-side submission with clear demo notice
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header as requested */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#DB2777] bg-[#FCE7ED] px-4 py-1 rounded-full border border-[#FBCFE8]">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#291D22] mt-3">
            Let’s Connect
          </h2>
          <p className="text-base sm:text-lg text-[#4E3C44]/85 mt-3 font-normal">
            Have a creative idea or simply want to say hello? I would love to hear from you.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-[#FBCFE8] shadow-2xl relative overflow-hidden">
          {/* Subtle floral watermark glow */}
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#FCE7ED]/70 rounded-full blur-3xl pointer-events-none" />

          {/* Friendly Success state banner with clear demo notice */}
          {isSubmitted && (
            <div className="mb-8 p-5 bg-[#FCE7ED] border border-[#FBCFE8] rounded-2xl flex items-start gap-3.5 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-[#DB2777] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-[#291D22] text-base">
                  Thank You for Reaching Out!
                </h4>
                <p className="text-xs sm:text-sm text-[#4E3C44]/90">
                  Your message was received in demo mode! Because no external email service or backend is currently connected to this static portfolio, no real email was dispatched. You can connect services like Formspree, EmailJS, or Cloudflare Workers whenever you're ready.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-bold text-[#DB2777] underline pt-1 block"
                >
                  Send another message
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#291D22]">
                Name <span className="text-[#DB2777]">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={`w-full px-4 py-3 rounded-2xl bg-white/90 border text-sm text-[#291D22] placeholder:text-[#4E3C44]/40 focus:outline-none focus:ring-2 focus:ring-[#DB2777] transition-all ${
                  errors.name ? 'border-rose-400 bg-rose-50/50' : 'border-[#FBCFE8]'
                }`}
              />
              {errors.name && (
                <p id="name-error" className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#291D22]">
                Email <span className="text-[#DB2777]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`w-full px-4 py-3 rounded-2xl bg-white/90 border text-sm text-[#291D22] placeholder:text-[#4E3C44]/40 focus:outline-none focus:ring-2 focus:ring-[#DB2777] transition-all ${
                  errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-[#FBCFE8]'
                }`}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#291D22]">
                Message <span className="text-[#DB2777]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your thoughts, question, or a creative idea..."
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`w-full px-4 py-3 rounded-2xl bg-white/90 border text-sm text-[#291D22] placeholder:text-[#4E3C44]/40 focus:outline-none focus:ring-2 focus:ring-[#DB2777] transition-all resize-y ${
                  errors.message ? 'border-rose-400 bg-rose-50/50' : 'border-[#FBCFE8]'
                }`}
              />
              {errors.message && (
                <p id="message-error" className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            {/* Submit Button & Demo Notice */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#4E3C44]/70 text-center sm:text-left">
                *Demo note: Messages validate locally and provide instant feedback.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#DB2777] text-white font-semibold text-sm shadow-[0_6px_20px_rgba(219,39,119,0.35)] hover:bg-[#be185d] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
