'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Sidebar, MobileSidebar } from '@/components/admin/Sidebar';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (loading) return;
    
    if (isLoginPage) return;

    if (!isAuthenticated) {
      router.push('/admin/login');
    } else {
      // Update role check to include full_admin
      const userRole = user?.role ? String(user.role) : '';
      if (userRole !== 'admin' && userRole !== 'superadmin' && userRole !== 'full_admin') {
        router.push('/'); // Redirect unauthorized users to home
      }
    }
  }, [loading, isAuthenticated, user, router, isLoginPage]);

  // Allow access to login page without checks
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Update render check as well
  const userRole = user?.role ? String(user.role) : '';
  if (!isAuthenticated || (userRole !== 'admin' && userRole !== 'superadmin' && userRole !== 'full_admin')) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="flex min-h-screen bg-gray-100/40 dark:bg-gray-900/40">
      <Sidebar />
      <div className="flex-1 md:pl-64">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6 md:hidden">
          <MobileSidebar />
          <div className="font-semibold">Dashboard</div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
