export interface AuditLogs {
  _id: string;
  user?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: unknown;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}
