import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Card, CardContent } from "@/app/components/ui/card";
import { MaxWidthWrapper } from "@/app/components/ui/max-width-wrapper";
import { Header } from "@/app/components/headerTitleDes";
import testimonials from "@data/dynamic/testimonials.json";

type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
};

const chunkArray = (
  array: Testimonial[],
  chunkSize: number
): Testimonial[][] => {
  const result: Testimonial[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const testimonialChunks = chunkArray(
  (testimonials as Testimonial[]),
  Math.ceil((testimonials as Testimonial[]).length / 3)
);

export default function WallOfLoveSection() {
  return (
    <section>
      <div className="py-16 md:py-32">
        <MaxWidthWrapper>
          <Header
            title="What did our Alumni Said"
            description="We Value you even you are not with us anymore"
            badge="Alumni"
            badgeVariant="default"
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
            {testimonialChunks.map((chunk, chunkIndex) => (
              <div key={chunkIndex} className="space-y-3">
                {chunk.map(({ name, role, quote, image }, index) => (
                  <Card key={index}>
                    <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
                      <Avatar className="size-9">
                        <AvatarImage
                          alt={name}
                          src={image}
                          loading="lazy"
                          width="120"
                          height="120"
                        />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-medium">{name}</h3>

                        <span className="text-muted-foreground block text-sm tracking-wide">
                          {role}
                        </span>

                        <blockquote className="mt-3">
                          <p className="text-gray-700 dark:text-gray-300">
                            {quote}
                          </p>
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
}
