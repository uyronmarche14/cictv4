'use client';

import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api/axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Newspaper, Megaphone, UserCog } from "lucide-react";
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    users: 0,
    news: 0,
    announcements: 0,
    roles: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Parallel requests for better performance
        const [usersRes, newsRes, announcementsRes, rolesRes] = await Promise.all([
          api.get('/users?limit=1'),
          api.get('/news?limit=1'),
          // Assuming there is an endpoint for announcements similar to news
          api.get('/announcements?limit=1').catch(() => ({ data: { data: { pagination: { total: 0 } } } })), 
          api.get('/roles'),
        ]);

        setStats({
          users: usersRes.data.data.pagination.total,
          news: newsRes.data.data.pagination.total,
          announcements: announcementsRes.data?.data?.pagination?.total || 0,
          roles: rolesRes.data.data.roles.length, // Roles endpoint returns array, not pagination
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.firstName}. Here&apos;s an overview of the system.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.users}</div>
            <p className="text-xs text-muted-foreground">
              Registered users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">News Articles</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.news}</div>
            <p className="text-xs text-muted-foreground">
              Published news
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Announcements</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.announcements}</div>
            <p className="text-xs text-muted-foreground">
              Active announcements
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Roles</CardTitle>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.roles}</div>
            <p className="text-xs text-muted-foreground">
              Defined roles
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
