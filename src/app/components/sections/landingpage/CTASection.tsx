'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';

export default function ContactCTASection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate email sending - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1500));

      setMessage('Thank you! We&apos;ll get back to you within 24 hours.');
      setEmail('');

      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setMessage('Failed to send message. Please try again or contact us directly.');

      setTimeout(() => setMessage(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative py-20 mmax-w-6xl">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="text-center mb-12 relative z-10 max-w-6xl">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
          Ready to
        </p>
        <h2 className="text-balance text-4xl font-bold lg:text-6xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-6">
          Join the CICT Community?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Let&apos;s transform your passion for technology into a successful career
        </p>
      </div>

      {/* Main CTA container */}
      <div className="max-w-6xl w-full relative z-10 px-2 sm:px-4">
        <div className="relative bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70 backdrop-blur-xl rounded-3xl lg:py-16 shadow-2xl border border-border/50 transition-all duration-500 hover:scale-[1.02]">

          {/* Floating badges */}
          <div className="absolute -top-4 right-16 md:right-20 animate-pulse">
            <Badge className="bg-accent text-accent-foreground hover:bg-accent/80 border-border shadow-lg">
              Innovation
            </Badge>
          </div>
          <div className="absolute -bottom-4 left-32 md:left-40 animate-bounce">
            <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border shadow-lg">
              Excellence
            </Badge>
          </div>
          <div className="absolute bottom-1/4 -right-4 md:-right-8 animate-bounce delay-500">
            <Badge className="bg-muted text-muted-foreground hover:bg-muted/80 border-border shadow-lg">
              Future Ready
            </Badge>
          </div>
          <div className="absolute -top-1 left-1/4 -translate-y-1/2 animate-pulse delay-700">
            <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive/80 border-border shadow-lg">
              Tech Leaders
            </Badge>
          </div>

          {/* CTA Content */}
          <div className="w-full max-w-7xl text-start space-y-6 md:space-y-8 px-6 md:px-8">
            {/* Main CTA Heading */}
            <div className="space-y-2 md:space-y-4">
              <h3 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Let&apos;s Build Your Tech Future Together
              </h3>
            </div>

            {/* CTA Description */}
            <p className="text-sm md:text-lg lg:text-xl text-white/90 leading-relaxed">
              Whether you&apos;re interested in Computer Science, Information Systems, or Information Technology,
              CICT provides the education, resources, and community to help you succeed.
              Get in touch to learn more about our programs and opportunities.
            </p>

            {/* Email form */}
            <div className="space-y-4">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-2xl">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50 transition-all duration-300 h-12 rounded-xl px-4 outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="rounded-xl bg-white hover:bg-white/90 text-primary px-6 md:px-8 py-3 h-12 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 font-semibold"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    'Get Started'
                  )}relative 
                </Button>
              </form>
              {message && (
                <p className={`text-sm ${message.includes('Thank you') ? 'text-green-200' : 'text-red-200'}`}>
                  {message}
                </p>
              )}
            </div>

            {/* Trust text and contact alternatives */}
            <div className="pt-2 space-y-3">
              <p className="text-sm text-white/90">
                Prefer to reach out directly? We typically respond within 24 hours.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <a
                  href="mailto:cict@university.edu"
                  className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  cict@university.edu
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (123) 456-7890
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Visit Campus
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Live Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}