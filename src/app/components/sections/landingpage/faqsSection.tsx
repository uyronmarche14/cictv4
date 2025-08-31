'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';

// Import school-related FAQ data
const faqData = {
  "faqs": {
    "title": "Frequently Asked Questions",
    "subtitle": "Find answers to common questions about CICT",
    "topics": [
      { "id": "admission", "label": "Admission & Enrollment" },
      { "id": "programs", "label": "Programs & Courses" },
      { "id": "campus", "label": "Campus Life" },
      { "id": "resources", "label": "Student Resources" },
      { "id": "career", "label": "Career Services" },
      { "id": "support", "label": "Academic Support" }
    ],
    "questions": [
      {
        "category": "admission",
        "question": "What are the admission requirements for CICT?",
        "answer": "CICT requires a high school diploma or equivalent, passing the entrance examination, and submission of required documents including transcript of records and certificate of good moral character."
      },
      {
        "category": "admission",
        "question": "When is the enrollment period?",
        "answer": "Enrollment periods are typically June-July for the first semester, November-December for the second semester, and April-May for summer classes. Check our official announcements for exact dates."
      },
      {
        "category": "programs",
        "question": "What programs does CICT offer?",
        "answer": "CICT offers Bachelor of Science in Information Technology, Bachelor of Science in Computer Science, Bachelor of Science in Information Systems, and various diploma and certificate programs."
      },
      {
        "category": "programs",
        "question": "What are the specializations available?",
        "answer": "Students can specialize in areas such as Software Engineering, Network Administration, Database Management, Cybersecurity, Mobile Development, and Artificial Intelligence."
      },
      {
        "category": "campus",
        "question": "What facilities are available on campus?",
        "answer": "Our campus features modern computer laboratories, a digital library, collaborative workspaces, student lounges, cafeteria, and high-speed internet throughout the campus."
      },
      {
        "category": "campus",
        "question": "Are there student organizations?",
        "answer": "Yes! CICT has various student organizations including the CICT Student Council, programming clubs, cybersecurity groups, and special interest organizations for different tech fields."
      },
      {
        "category": "resources",
        "question": "What learning resources are available?",
        "answer": "Students have access to online learning platforms, software licenses, development tools, e-books, research databases, and 24/7 technical support for all campus systems."
      },
      {
        "category": "resources",
        "question": "Is there Wi-Fi on campus?",
        "answer": "Yes, CICT provides free high-speed Wi-Fi throughout the campus including classrooms, library, cafeteria, and outdoor areas. Students get dedicated login credentials upon enrollment."
      },
      {
        "category": "career",
        "question": "What career opportunities are available after graduation?",
        "answer": "Graduates pursue careers as Software Developers, System Analysts, Network Engineers, Cybersecurity Specialists, Database Administrators, IT Consultants, and Digital Innovation Leaders."
      },
      {
        "category": "career",
        "question": "Does CICT offer job placement assistance?",
        "answer": "Yes! Our Career Services Office provides job placement assistance, resume workshops, interview preparation, industry partnerships, and regular job fairs with top tech companies."
      }
    ]
  }
};

const FAQsSection = () => {
  const { title, subtitle, topics, questions } = faqData.faqs;

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-heading font-medium text-foreground leading-tight">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left column - Topics */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-6">Topics</h3>
              <div className="space-y-2">
                {topics.map((topic, index) => (
                  <div 
                    key={index} 
                    className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <p className="text-sm font-medium text-foreground">
                      {topic.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - FAQs */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {questions.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className="border border-border rounded-lg mb-3 overflow-hidden bg-card data-[state=open]:bg-primary/10 data-[state=open]:text-accent/10"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left font-medium text-foreground hover:bg-muted/50 transition-colors">
                      <span className="text-base leading-relaxed">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 text-muted-foreground border-t border-border">
                      <p className="text-sm leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;