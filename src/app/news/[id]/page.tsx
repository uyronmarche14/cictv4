'use client';

import { useParams, useRouter } from 'next/navigation';
import { CldImage } from 'next-cloudinary';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2 } from 'lucide-react';
import { newsArticles } from '@/app/lib/data/newsData';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import DetailPageCTA from '@/app/components/sections/DetailPageCTA';
import DetailPageFooter from '@/app/components/sections/DetailPageFooter';

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const newsId = params.id as string;

  const article = newsArticles.find(a => a.id === newsId);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
          <Button onClick={() => router.back()} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const relatedArticles = newsArticles
    .filter(a => a.id !== newsId && (a.category === article.category || a.tags.some(tag => article.tags.includes(tag))))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 sticky top-0 z-10 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2 hover:bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          <Badge variant="outline" className="text-xs font-medium">
            {article.category}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Title */}
        <h1 className="text-balance text-4xl font-bold lg:text-5xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-6">
          {article.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 shadow-2xl">
          <CldImage
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {article.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-foreground leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Tags
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {article.gallery && article.gallery.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {article.gallery.map((image, idx) => (
                <div key={idx} className="relative aspect-video rounded-xl overflow-hidden">
                  <CldImage
                    src={image}
                    alt={`Gallery image ${idx + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="flex items-center gap-4 py-6 border-t border-b border-border/50 mb-12">
          <span className="text-sm font-semibold text-foreground">Share this article:</span>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <a
                  key={related.id}
                  href={`/news/${related.id}`}
                  className="group block"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                    <CldImage
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <Badge variant="outline" className="text-xs mb-2">
                    {related.category}
                  </Badge>
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {related.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {related.readTime}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
      </article>

      <DetailPageCTA
        title="Never Miss an Update"
        subtitle="Stay Updated"
        description="Subscribe to get the latest news and updates from CICT"
        primaryButtonText="Contact Us"
        primaryButtonHref="mailto:cict@university.edu"
        contactEmail="cict@university.edu"
      />

      <DetailPageFooter />
    </div>
  );
}
