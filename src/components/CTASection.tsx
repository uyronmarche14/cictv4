'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

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

      setMessage('Thank you! We\'ll get back to you within 24 hours.');
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
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px]" 
        />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-balance bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-primary/80">
            Let&apos;s Build Your Future
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready to start your journey with CICT? Join a community of innovators and tech leaders today.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group rounded-[2.5rem] p-1 bg-gradient-to-br from-primary/30 to-secondary/30"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative rounded-[2.25rem] bg-card border border-border/50 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 p-8 md:p-12 lg:p-16">
              
              {/* Left Column: Form */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold">Send us a message</h3>
                  <p className="text-muted-foreground">
                    Have any questions about our programs or admissions? We&apos;d love to hear from you.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative group/input">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      required
                      className="w-full bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground/60 focus:bg-background focus:border-primary transition-all duration-300 h-14 rounded-xl px-5 outline-none focus:ring-4 focus:ring-primary/10"
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover/input:opacity-10 blur transition-opacity duration-300 rounded-xl" />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 group/btn"
                  >
                    <span className="flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Get Started
                          <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                        </>
                      )}
                    </span>
                  </Button>

                  <AnimatePresence>
                    {message && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`flex items-center gap-2 text-sm font-medium ${message.includes('Thank you') ? 'text-green-500' : 'text-red-500'}`}
                      >
                        {message.includes('Thank you') && <CheckCircle2 className="w-4 h-4" />}
                        {message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border/50">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br from-primary/${40+i*20} to-secondary/${40+i*20}`} />
                    ))}
                  </div>
                  <p>Join <span className="text-foreground font-semibold">1,000+</span> students this semester</p>
                </div>
              </div>

              {/* Right Column: Contact Info & Visuals */}
              <div className="flex flex-col justify-between space-y-12">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Mail, label: 'Email Us', value: 'cict@university.edu', href: 'mailto:cict@university.edu' },
                    { icon: Phone, label: 'Call Us', value: '(123) 456-7890', href: 'tel:+1234567890' },
                    { icon: MapPin, label: 'Visit Us', value: 'Main Campus, Bldg 4', href: '#' },
                    { icon: MessageCircle, label: 'Live Chat', value: 'Available 9am-5pm', href: '#' },
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      className="group/item flex flex-col gap-3 p-4 rounded-2xl bg-muted/30 hover:bg-muted/60 transition-colors border border-transparent hover:border-border/50"
                    >
                      <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center shadow-sm group-hover/item:scale-110 transition-transform duration-300">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                        <p className="text-sm font-medium text-foreground">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/10">
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                    <MessageCircle className="w-24 h-24 text-primary rotate-12" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Need immediate assistance?</h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    Our admission team is available to answer your questions via live chat.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-primary font-semibold hover:text-primary/80 group/link">
                    Start a conversation <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}