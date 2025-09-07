"use client";

import React, { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { MaxWidthWrapper } from "@/app/components/ui/max-width-wrapper";
import { useKeyboardNavigation } from "@/app/lib/hooks/use-keyboard-navigation";
import { KEYBOARD_KEYS } from "@/app/lib/utils/accessibility";

// Import school-related FAQ data
const faqData = {
  faqs: {
    title: "Frequently Asked Questions",
    subtitle: "Find answers to common questions about CICT",
    topics: [
      { id: "admission", label: "Admission & Enrollment" },
      { id: "programs", label: "Programs & Courses" },
      { id: "campus", label: "Campus Life" },
      { id: "resources", label: "Student Resources" },
      { id: "career", label: "Career Services" },
      { id: "support", label: "Academic Support" },
    ],
    questions: [
      {
        category: "admission",
        question: "What are the admission requirements for CICT?",
        answer:
          "CICT requires a high school diploma or equivalent, passing the entrance examination, and submission of required documents including transcript of records and certificate of good moral character.",
      },
      {
        category: "admission",
        question: "When is the enrollment period?",
        answer:
          "Enrollment periods are typically June-July for the first semester, November-December for the second semester, and April-May for summer classes. Check our official announcements for exact dates.",
      },
      {
        category: "programs",
        question: "What programs does CICT offer?",
        answer:
          "CICT offers Bachelor of Science in Information Technology, Bachelor of Science in Computer Science, Bachelor of Science in Information Systems, and various diploma and certificate programs.",
      },
      {
        category: "programs",
        question: "What are the specializations available?",
        answer:
          "Students can specialize in areas such as Software Engineering, Network Administration, Database Management, Cybersecurity, Mobile Development, and Artificial Intelligence.",
      },
      {
        category: "campus",
        question: "What facilities are available on campus?",
        answer:
          "Our campus features modern computer laboratories, a digital library, collaborative workspaces, student lounges, cafeteria, and high-speed internet throughout the campus.",
      },
      {
        category: "campus",
        question: "Are there student organizations?",
        answer:
          "Yes! CICT has various student organizations including the CICT Student Council, programming clubs, cybersecurity groups, and special interest organizations for different tech fields.",
      },
      {
        category: "resources",
        question: "What learning resources are available?",
        answer:
          "Students have access to online learning platforms, software licenses, development tools, e-books, research databases, and 24/7 technical support for all campus systems.",
      },
      {
        category: "resources",
        question: "Is there Wi-Fi on campus?",
        answer:
          "Yes, CICT provides free high-speed Wi-Fi throughout the campus including classrooms, library, cafeteria, and outdoor areas. Students get dedicated login credentials upon enrollment.",
      },
      {
        category: "career",
        question: "What career opportunities are available after graduation?",
        answer:
          "Graduates pursue careers as Software Developers, System Analysts, Network Engineers, Cybersecurity Specialists, Database Administrators, IT Consultants, and Digital Innovation Leaders.",
      },
      {
        category: "career",
        question: "Does CICT offer job placement assistance?",
        answer:
          "Yes! Our Career Services Office provides job placement assistance, resume workshops, interview preparation, industry partnerships, and regular job fairs with top tech companies.",
      },
    ],
  },
};

const FAQsSection = () => {
  const { title, subtitle, topics, questions } = faqData.faqs;
  const topicsNavRef = useRef<HTMLElement>(null);

  // Keyboard navigation for topics navigation
  useKeyboardNavigation({
    containerRef: topicsNavRef,
    enableArrowKeys: true,
    enableHomeEnd: true,
    customKeyHandlers: {
      [KEYBOARD_KEYS.ENTER]: (event) => {
        const target = event.target as HTMLButtonElement;
        if (target.tagName === "BUTTON") {
          target.click();
        }
      },
      [KEYBOARD_KEYS.SPACE]: (event) => {
        const target = event.target as HTMLButtonElement;
        if (target.tagName === "BUTTON") {
          event.preventDefault();
          target.click();
        }
      },
    },
  });

  return (
    <section className="bg-background py-20">
      <MaxWidthWrapper>
        {/* Header */}
        <div className="mb-16 space-y-4 text-center">
          <h2
            id="faq-heading"
            className="font-heading text-foreground text-4xl leading-tight font-medium md:text-5xl"
          >
            {title}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {subtitle}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left column - Topics */}
          <div className="lg:col-span-4">
            <nav
              ref={topicsNavRef}
              className="sticky top-8 space-y-4"
              aria-labelledby="topics-heading"
            >
              <h3
                id="topics-heading"
                className="text-foreground mb-6 text-lg font-semibold"
              >
                Topics
              </h3>
              <ul className="space-y-2" role="list">
                {topics.map((topic, index) => (
                  <li key={index} role="listitem">
                    <button
                      className="border-border hover:bg-muted/50 focus:bg-muted/50 focus:ring-primary w-full cursor-pointer rounded-lg border p-3 text-left transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
                      onClick={() => {
                        // Scroll to first question of this category
                        const firstQuestion = document.querySelector(
                          `[data-category="${topic.id}"]`
                        );
                        firstQuestion?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });

                        // Focus the first question for keyboard users
                        setTimeout(() => {
                          const firstQuestionTrigger =
                            firstQuestion?.querySelector(
                              '[role="button"]'
                            ) as HTMLElement;
                          if (firstQuestionTrigger) {
                            firstQuestionTrigger.focus();
                          }
                        }, 500);
                      }}
                      aria-label={`Jump to ${topic.label} questions`}
                      type="button"
                      tabIndex={0}
                    >
                      <p className="text-foreground text-sm font-medium">
                        {topic.label}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right column - FAQs */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                aria-labelledby="faq-heading"
              >
                {questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-border bg-card data-[state=open]:bg-primary/10 data-[state=open]:text-accent/10 mb-3 overflow-hidden rounded-lg border"
                    data-category={faq.category}
                  >
                    <AccordionTrigger
                      className="text-foreground hover:bg-muted/50 px-6 py-4 text-left font-medium transition-colors"
                      aria-label={`Question: ${faq.question}`}
                    >
                      <span className="text-base leading-relaxed">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent
                      className="text-muted-foreground border-border border-t px-6 py-4"
                      role="region"
                      aria-label={`Answer to: ${faq.question}`}
                    >
                      <p className="text-sm leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default FAQsSection;
