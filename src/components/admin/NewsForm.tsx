import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { News, NewsStatus } from '@/types';
import api from '@/lib/api/axios';
import { Loader2 } from 'lucide-react';

const newsSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  excerpt: z.string().min(5, 'Excerpt must be at least 5 characters'),
  image: z.any().optional(),
  status: z.nativeEnum(NewsStatus),
  tags: z.string().optional(),
});

type NewsFormValues = z.infer<typeof newsSchema>;

interface NewsFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  news?: News | null;
  onSuccess: () => void;
}

export function NewsForm({ open, onOpenChange, news, onSuccess }: NewsFormProps) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(news?.imageUrl || null);

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: news?.title || '',
      content: news?.content || '',
      excerpt: news?.excerpt || '',
      status: news?.status || NewsStatus.DRAFT,
      tags: news?.tags?.join(', ') || '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: NewsFormValues) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('excerpt', data.excerpt);
      formData.append('status', data.status);
      
      if (data.tags) {
        const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(Boolean);
        tagsArray.forEach(tag => formData.append('tags', tag));
      }
      
      if (data.image) {
        formData.append('image', data.image);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      if (news) {
        await api.put(`/news/${news._id}`, formData, config);
      } else {
        await api.post('/news', formData, config);
      }
      onSuccess();
      onOpenChange(false);
      form.reset();
      setImagePreview(null);
    } catch (error: unknown) {
      console.error('Failed to save news:', error);
      
      let handled = false;
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const errorObj = error as { response?: { data?: { errors?: Array<{ path: string; msg: string }>, message?: string } } };
        
        if (errorObj.response?.data?.errors && Array.isArray(errorObj.response.data.errors)) {
          errorObj.response.data.errors.forEach((err) => {
            // @ts-expect-error - Dynamic field access
            form.setError(err.path, { message: err.msg });
          });
          handled = true;
        } else if (errorObj.response?.data?.message) {
          form.setError('root', {
            message: errorObj.response.data.message,
          });
          handled = true;
        }
      }

      if (!handled) {
        form.setError('root', {
           message: 'Something went wrong',
         });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{news ? 'Edit News Article' : 'Create News Article'}</DialogTitle>
          <DialogDescription>
            {news ? 'Update existing news article details.' : 'Add a new news article to the system.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="News title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief summary..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea className="h-32" placeholder="Full content..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={NewsStatus.DRAFT}>Draft</SelectItem>
                        <SelectItem value={NewsStatus.PUBLISHED}>Published</SelectItem>
                        <SelectItem value={NewsStatus.ARCHIVED}>Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="Comma separated tags" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Featured Image (Optional)</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleImageChange(e);
                          onChange(e.target.files?.[0]);
                        }}
                        {...field}
                        value={undefined}
                      />
                      {imagePreview && (
                        <div className="relative w-full h-48 rounded-md overflow-hidden border">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {news ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
