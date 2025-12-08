'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Newspaper,
  Megaphone,
  LogOut,
  UserCog,
  Menu,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const routes = [
    {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      active: pathname === '/admin/dashboard',
    },
    {
      href: '/admin/users',
      label: 'Users',
      icon: Users,
      active: pathname.startsWith('/admin/users'),
    },
    {
       href: '/admin/events',
       label: 'Events',
       icon: Calendar,
       active: pathname.startsWith('/admin/events'),
    },
    {
      href: '/admin/news',
      label: 'News',
      icon: Newspaper,
      active: pathname.startsWith('/admin/news'),
    },
    {
      href: '/admin/announcements',
      label: 'Announcements',
      icon: Megaphone,
      active: pathname.startsWith('/admin/announcements'),
    },
    {
      href: '/admin/roles',
      label: 'Roles & Permissions',
      icon: UserCog,
      active: pathname.startsWith('/admin/roles'),
    },
  ];

  return (
    <div className={cn("pb-12 min-h-screen border-r bg-gray-100/40 dark:bg-gray-800/40 hidden md:block w-64 fixed left-0 top-0 h-full", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            CICT Admin
          </h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 w-full px-4">
        <div className="flex items-center gap-2 mb-4 px-2">
           <Avatar className="h-8 w-8">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}`} alt="@admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
             <span className="text-sm font-medium">{user?.firstName} {user?.lastName}</span>
             <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
          </div>
        </div>
        <Button 
            variant="outline" 
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
            onClick={logout}
        >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
        </Button>
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

    const routes = [
    {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      active: pathname === '/admin/dashboard',
    },
    {
      href: '/admin/users',
      label: 'Users',
      icon: Users,
      active: pathname.startsWith('/admin/users'),
    },
    {
      href: '/admin/news',
      label: 'News',
      icon: Newspaper,
      active: pathname.startsWith('/admin/news'),
    },
    {
      href: '/admin/announcements',
      label: 'Announcements',
      icon: Megaphone,
      active: pathname.startsWith('/admin/announcements'),
    },
    {
      href: '/admin/roles',
      label: 'Roles & Permissions',
      icon: UserCog,
      active: pathname.startsWith('/admin/roles'),
    },
  ];


  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-2 py-6">
           <h2 className="mb-6 px-2 text-lg font-semibold tracking-tight">
            CICT Admin
          </h2>
           <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 w-full px-6 pr-10">
             <div className="flex items-center gap-2 mb-4">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}`} alt="@admin" />
                    <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{user?.firstName} {user?.lastName}</span>
                    <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
                </div>
            </div>
            <Button 
                variant="outline" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                onClick={() => {
                    logout();
                    setOpen(false);
                }}
            >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
