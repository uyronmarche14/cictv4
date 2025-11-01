'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, MessageCircle } from 'lucide-react';
import Header from "@/components/ui/header"
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { Badge } from '@/components/ui/shadcn/badge';
import { sendEmail, initializeEmailJS } from '@/lib/services/email';

const CallToActionSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Initialize EmailJS on component mount
  useEffect(() => {
    initializeEmailJS();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const emailParams = {
        from_email: email,
        to_email: 'uyronmarcherhyssq@gmail.com',
        message: `New client inquiry from portfolio: ${email}`,
        reply_to: email,
        subject: 'New Client Inquiry - Portfolio',
      };

      await sendEmail(emailParams);
      
      // Success state
      setMessage('Thank you! I\'ll get back to you within 24 hours.');
      setEmail('');
      
      // Clear success message after 5 seconds
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setMessage('Failed to send message. Please try again or contact me directly.');
      
      // Clear error message after 5 seconds
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative">
      {/* Background gradient effects */}
   
      <Header
              introText='Ready to'
              highlightText='Build Something Amazing?'
              description='Let&apos;s transform your vision into a high-performance web application'
            />

      {/* Main CTA container */}
      <div className="max-w-6xl w-full relative z-10 px-2 sm:px-4 pb-8 sm:pb-12 md:pb-16 pt-12 sm:pt-16 md:pt-24">
        <div className="relative bg-gradient-to-br from-primary/90 via-secondary/90 to-accent/90 backdrop-blur-xl rounded-3xl py-8 md:py-12 lg:py-16 shadow-2xl border border-border/50 max-w-7xl w-full hover:scale-105">

          {/* Floating badges */}
          <div className="absolute -top-4 right-16 md:right-20 animate-pulse">
            <Badge className="bg-accent text-accent-foreground hover:bg-accent/80 border-border shadow-lg">Building Your Brand</Badge>
          </div>
          <div className="absolute -bottom-4 left-32 md:left-40 animate-bounce">
            <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border shadow-lg">Vision</Badge>
          </div>
          <div className="absolute bottom-1/4 -right-4 md:-right-8 animate-bounce delay-500">
            <Badge className="bg-muted text-muted-foreground hover:bg-muted/80 border-border shadow-lg">Excellence</Badge>
          </div>
          <div className="absolute -top-1 left-1/4 -translate-y-1/2 animate-pulse delay-700">
            <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive/80 border-border shadow-lg">Creative</Badge>
          </div>

          

          {/* CTA Content */}
          <div className="w-full max-w-7xl text-start space-y-6 md:space-y-8 px-6 md:px-8">

            

            {/* Main CTA Heading */}
            <div className="space-y-2 md:space-y-4">
              <h2 className="font-rawkner text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">Let's Create Something Extraordinary</h2>
            </div>

            {/* CTA Description */}
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              I specialize in creating high-performance web applications that drive business results. 
              Whether you need a complete web solution, UI/UX improvements, or technical and hardware consultation, 
              I&apos;m here to help bring your vision to life.
            </p>

            {/* Email form */}
            <div className="space-y-4">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-2xl">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder="your.email@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background/20 border-border/50 text-foreground placeholder:text-muted-foreground focus:bg-background/30 focus:border-border/80 transition-all duration-300 h-12 rounded-xl"
                  />
                </div>
                <Button type="submit" disabled={isSubmitting || !email} className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 py-3 h-12 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shrink-0">
                  {isSubmitting ? (
                    <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />Sending...</div>
                  ) : ('Start Your Project')}
                </Button>
              </form>
              {message && (
                <p className={`text-sm ${message.includes('Thank you') ? 'text-green-300' : 'text-red-300'}`}>
                  {message}
                </p>
              )}
            </div>

            {/* Trust text and contact alternatives */}
            <div className="pt-2 space-y-3">
              <p className="text-sm text-gray-100">Prefer to reach out directly? I typically respond within 24 hours.</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <a href="mailto:ronbusinessemail4@gmail.com" className="flex items-center gap-2 text-secondary-foreground hover:text-secondary transition-colors">
                  <Mail className="w-4 h-4" />
                  ronbusinessemail4@gmail.com
                </a>
                <a href="tel:+639605875124" className="flex items-center gap-2 text-secondary-foreground hover:text-secondary transition-colors">
                  <Phone className="w-4 h-4" />
                  09605875124
                </a>
                <a href="https://www.linkedin.com/in/ron-marche-rhyss-uy-578b80240/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-secondary-foreground hover:text-secondary transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  LinkedIn
                </a>
                <a href="https://calendly.com/your-calendar-link" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-secondary-foreground hover:text-secondary transition-colors">
                  <Calendar className="w-4 h-4" />
                  Book a Meeting
                </a>
              </div>
            </div>

        
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;