'use client';

import { Fragment, useState, useEffect, useCallback } from 'react';
import { getAuditLogs, AuditLogsFilters } from '@/lib/api/auditAPI';
import { AuditLogs } from '@/types/AuditLogs';
import { DataTable, ColumnDef } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { usePermissions } from '@/hooks/permissions/use-permissions';
import { useAdminPageAccess } from '@/hooks/permissions/use-admin-page-access';
import { useDebounce } from '@/hooks/useDebounce';

const ACTION_COLORS: Record<string, string> = {
  created: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  updated: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  deleted: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
  published: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800',
  archived: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  'logged in': 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800',
  'logged out': 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800',
};

const RESOURCE_COLORS: Record<string, string> = {
  auth: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  news: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  announcement: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  event: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  user: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
  role: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  organization: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
};

function ActionBadge({ action }: { action: string }) {
  const lower = action.toLowerCase();
  const colorClass = Object.entries(ACTION_COLORS).find(([key]) =>
    lower.includes(key)
  )?.[1] || 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800';

  return (
    <Badge variant="outline" className={`font-mono text-xs ${colorClass}`}>
      {action}
    </Badge>
  );
}

function ResourceBadge({ resource }: { resource: string }) {
  const lower = resource.toLowerCase();
  const color = Object.entries(RESOURCE_COLORS).find(([key]) => lower.includes(key))?.[1] || '';

  return (
    <Badge variant="secondary" className={`font-mono text-xs ${color}`}>
      {resource}
    </Badge>
  );
}

function UserCell({ user }: { user: AuditLogs['user'] }) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarFallback className="text-[10px] bg-muted">S</AvatarFallback>
        </Avatar>
        <span className="text-xs font-medium">System</span>
      </div>
    );
  }

  const initials = `${(user.firstName?.charAt(0) || '')}${(user.lastName?.charAt(0) || '')}`.toUpperCase() || '?';
  const name = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.email || 'Unknown';

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-6 w-6">
        <AvatarFallback className="text-[10px] bg-muted">{initials}</AvatarFallback>
      </Avatar>
      <span className="text-xs font-medium">{name}</span>
    </div>
  );
}

function TimeCell({ createdAt }: { createdAt: string }) {
  const date = new Date(createdAt);
  return (
    <div className="whitespace-nowrap">
      <div className="text-xs font-medium tabular-nums">
        {format(date, 'MMM d, HH:mm')}
      </div>
      <div
        className="text-[11px] text-muted-foreground"
        title={format(date, 'EEEE, MMMM d, yyyy HH:mm:ss')}
      >
        {formatDistanceToNow(date, { addSuffix: true })}
      </div>
    </div>
  );
}

function ExpandedDetails({ log }: { log: AuditLogs }) {
  const details = log.details;
  const fields: { label: string; value: string }[] = [];

  if (details && typeof details === 'object') {
    const d = details as Record<string, unknown>;

    if (d.method && typeof d.method === 'string') {
      fields.push({ label: 'Method', value: d.method });
    }

    const path = typeof d.path === 'string' ? d.path : '';
    if (path) {
      fields.push({ label: 'Path', value: path });
    }

    if (d.query && typeof d.query === 'object') {
      const q = d.query as Record<string, unknown>;
      for (const [key, val] of Object.entries(q)) {
        if (val) fields.push({ label: key.charAt(0).toUpperCase() + key.slice(1), value: String(val) });
      }
    }

    if (d.body && typeof d.body === 'object') {
      const body = d.body as Record<string, unknown>;
      for (const [key, val] of Object.entries(body)) {
        if (['password', 'token', 'secret', 'apiKey'].includes(key)) continue;
        if (typeof val === 'string' && val.length < 100) {
          fields.push({ label: key.charAt(0).toUpperCase() + key.slice(1), value: val });
        } else if (typeof val === 'boolean' || typeof val === 'number') {
          fields.push({ label: key.charAt(0).toUpperCase() + key.slice(1), value: String(val) });
        } else if (Array.isArray(val) && val.length <= 5) {
          fields.push({ label: key.charAt(0).toUpperCase() + key.slice(1), value: val.join(', ') });
        }
      }
    }
  }

  let summary = '';
  const action = log.action.toLowerCase();
  if (action.includes('logged in')) {
    summary = 'Signed in to the admin panel';
  } else if (action.includes('logged out')) {
    summary = 'Signed out of the admin panel';
  }

  return (
    <td colSpan={100} className="bg-muted/30 p-0">
      <div className="p-4 space-y-3 text-sm">
        {summary && (
          <div className="text-xs text-muted-foreground italic">{summary}</div>
        )}
        {fields.length > 0 && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
            {fields.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground min-w-[80px]">{f.label}</span>
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs truncate">{f.value}</code>
              </div>
            ))}
          </div>
        )}
        {(log.ipAddress || log.userAgent) && (
          <div className="flex gap-6 text-xs text-muted-foreground">
            {log.ipAddress && (
              <div>
                <span className="text-[10px] uppercase tracking-wider">IP Address</span>
                <p className="mt-0.5 font-mono">{log.ipAddress}</p>
              </div>
            )}
            {log.userAgent && (
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase tracking-wider">Browser</span>
                <p className="mt-0.5 truncate" title={log.userAgent}>{log.userAgent}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </td>
  );
}

function LogRow({
  log,
  isOpen,
  onToggle,
}: {
  log: AuditLogs;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const hasDetails = log.details || log.ipAddress || log.userAgent;

  return (
    <Fragment>
      <tr
        className="cursor-pointer hover:bg-muted/50 group border-b"
        onClick={onToggle}
      >
        <td className="w-6 p-0 pl-4 align-middle">
          {hasDetails ? (
            isOpen
              ? <ChevronDown className="h-3 w-3 text-muted-foreground" />
              : <ChevronRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100" />
          ) : null}
        </td>
        <td className="p-2 align-middle"><TimeCell createdAt={log.createdAt} /></td>
        <td className="p-2 align-middle"><UserCell user={log.user} /></td>
        <td className="p-2 align-middle"><ActionBadge action={log.action} /></td>
        <td className="p-2 align-middle"><ResourceBadge resource={log.resource} /></td>
        <td className="p-2 align-middle text-xs font-mono max-w-[140px] truncate text-muted-foreground">
          {log.resourceId ? (
            <span title={log.resourceId}>#{log.resourceId.slice(-8)}</span>
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </td>
      </tr>
      {isOpen && hasDetails && (
        <tr className="border-b"><ExpandedDetails log={log} /></tr>
      )}
    </Fragment>
  );
}

const columns: ColumnDef<AuditLogs>[] = [
  { header: '', headerClassName: 'w-6', cell: () => null },
  { header: 'Time', cell: () => null },
  { header: 'User', cell: () => null },
  { header: 'Action', cell: () => null },
  { header: 'Resource', cell: () => null },
  { header: 'ID', cell: () => null },
];

export default function LogsPage() {
  const { canAccessLogsModule } = usePermissions();
  const { shouldRender } = useAdminPageAccess(canAccessLogsModule());

  const [logs, setLogs] = useState<AuditLogs[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [searchInput, setSearchInput] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [resourceFilter, setResourceFilter] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchInput, 300);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const filters: AuditLogsFilters = {};
      if (actionFilter) filters.action = actionFilter;
      if (resourceFilter) filters.resourceType = resourceFilter;

      const result = await getAuditLogs(page, 50, filters, debouncedSearch || undefined);
      setLogs(result.data);
      setTotalPages(result.pages);
      setTotal(result.total);
    } catch {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, actionFilter, resourceFilter]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
    setExpandedId(null);
  };

  const handleActionFilter = (value: string) => {
    setActionFilter(value === 'all' ? '' : value);
    setPage(1);
    setExpandedId(null);
  };

  const handleResourceFilter = (value: string) => {
    setResourceFilter(value === 'all' ? '' : value);
    setPage(1);
    setExpandedId(null);
  };

  if (!shouldRender) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Activity Logs</h1>
        <p className="text-muted-foreground">
          Audit trail of admin actions across the system
        </p>
      </div>

      <DataTable
        columns={columns}
        data={logs}
        loading={loading}
        total={total}
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => { setPage(p); setExpandedId(null); }}
        search={searchInput}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search logs..."
        emptyMessage="No activity logs found"
        keyExtractor={(log) => log._id}
        skeletonCount={8}
        filters={
          <>
            <Select value={actionFilter || 'all'} onValueChange={handleActionFilter}>
              <SelectTrigger className="w-[140px] h-9 text-sm">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All actions</SelectItem>
                <SelectItem value="created">Created</SelectItem>
                <SelectItem value="updated">Updated</SelectItem>
                <SelectItem value="deleted">Deleted</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
                <SelectItem value="logged in">Logged in</SelectItem>
                <SelectItem value="logged out">Logged out</SelectItem>
              </SelectContent>
            </Select>
            <Select value={resourceFilter || 'all'} onValueChange={handleResourceFilter}>
              <SelectTrigger className="w-[160px] h-9 text-sm">
                <SelectValue placeholder="Resource" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All resources</SelectItem>
                <SelectItem value="news">News</SelectItem>
                <SelectItem value="announcement">Announcements</SelectItem>
                <SelectItem value="event">Events</SelectItem>
                <SelectItem value="user">Users</SelectItem>
                <SelectItem value="role">Roles</SelectItem>
                <SelectItem value="organization">Organizations</SelectItem>
                <SelectItem value="auth">Auth</SelectItem>
              </SelectContent>
            </Select>
          </>
        }
        renderCustomRows={(items) => (
          <>
            {items.map((log) => (
              <LogRow
                key={log._id}
                log={log}
                isOpen={expandedId === log._id}
                onToggle={() => setExpandedId((prev) => (prev === log._id ? null : log._id))}
              />
            ))}
          </>
        )}
      />
    </div>
  );
}
