import { z } from "zod";

// Program Benefit Schema
export const ProgramBenefitSchema = z.object({
  icon: z.string().min(1, "Benefit icon is required"),
  title: z.string().min(1, "Benefit title is required"),
});

// Program Schema
export const ProgramSchema = z.object({
  title: z.string().min(1, "Program title is required"),
  subtitle: z.string().min(1, "Program subtitle is required"),
  description: z.string().min(1, "Program description is required"),
  benefits: z
    .array(ProgramBenefitSchema)
    .min(1, "At least one benefit is required"),
  note: z.string().min(1, "Program note is required"),
  buttonText: z.string().min(1, "Button text is required"),
  theme: z.enum(["primary", "accent"], {
    errorMap: () => ({ message: "Theme must be either 'primary' or 'accent'" }),
  }),
});

// Programs Data Schema
export const ProgramsDataSchema = z.object({
  bscs: ProgramSchema,
  bsis: ProgramSchema,
});

// Testimonial Schema
export const TestimonialSchema = z.object({
  name: z.string().min(1, "Testimonial name is required"),
  role: z.string().min(1, "Testimonial role is required"),
  image: z.string().url("Testimonial image must be a valid URL"),
  quote: z.string().min(10, "Testimonial quote must be at least 10 characters"),
});

// Testimonials Array Schema
export const TestimonialsSchema = z
  .array(TestimonialSchema)
  .min(1, "At least one testimonial is required");

// FAQ Topic Schema
export const FAQTopicSchema = z.object({
  id: z.string().min(1, "FAQ topic ID is required"),
  label: z.string().min(1, "FAQ topic label is required"),
});

// FAQ Question Schema
export const FAQQuestionSchema = z.object({
  category: z.string().min(1, "FAQ question category is required"),
  question: z.string().min(5, "FAQ question must be at least 5 characters"),
  answer: z.string().min(10, "FAQ answer must be at least 10 characters"),
});

// FAQ Data Schema
export const FAQDataSchema = z.object({
  title: z.string().min(1, "FAQ title is required"),
  subtitle: z.string().min(1, "FAQ subtitle is required"),
  topics: z.array(FAQTopicSchema).min(1, "At least one FAQ topic is required"),
  questions: z
    .array(FAQQuestionSchema)
    .min(1, "At least one FAQ question is required"),
});

// Combined dynamic data schemas map
export const dynamicDataSchemas = {
  programs: ProgramsDataSchema,
  testimonials: TestimonialsSchema,
  faqs: FAQDataSchema,
} as const;

// Validation for FAQ question categories against topics
export const validateFAQConsistency = (data: z.infer<typeof FAQDataSchema>) => {
  const topicIds = new Set(data.topics.map((topic) => topic.id));
  const invalidCategories = data.questions
    .map((q) => q.category)
    .filter((category) => !topicIds.has(category));

  if (invalidCategories.length > 0) {
    throw new Error(
      `Invalid FAQ categories found: ${invalidCategories.join(", ")}. ` +
        `Valid categories are: ${Array.from(topicIds).join(", ")}`
    );
  }

  return true;
};
