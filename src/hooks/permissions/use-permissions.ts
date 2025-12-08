import { useAuthStore } from '@/lib/store/authStore';
import { PERMISSIONS } from '@/config/permissions';

export const usePermissions = () => {
  const {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getUserPermissions,
    isAuthenticated,
    isAdmin,
    isModerator,
    isUser,
    isGuest,
  } = useAuthStore();

  return {
    // Permission checking
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getUserPermissions,

    // Authentication status
    isAuthenticated,
    isAdmin,
    isModerator,
    isUser,
    isGuest,

    // Common permission checks
    canCreateUser: () => hasPermission(PERMISSIONS.USER_CREATE),
    canReadUsers: () => hasPermission(PERMISSIONS.USER_READ_ALL),
    canUpdateUser: () => hasPermission(PERMISSIONS.USER_UPDATE),
    canDeleteUser: () => hasPermission(PERMISSIONS.USER_DELETE),
    canUpdateOwnProfile: () => hasPermission(PERMISSIONS.USER_UPDATE_OWN),

    canCreateRole: () => hasPermission(PERMISSIONS.ROLE_CREATE),
    canReadRoles: () => hasPermission(PERMISSIONS.ROLE_READ_ALL),
    canUpdateRole: () => hasPermission(PERMISSIONS.ROLE_UPDATE),
    canDeleteRole: () => hasPermission(PERMISSIONS.ROLE_DELETE),

    canUploadMedia: () => hasPermission(PERMISSIONS.MEDIA_UPLOAD),
    canDeleteMedia: () => hasPermission(PERMISSIONS.MEDIA_DELETE),
    canDeleteOwnMedia: () => hasPermission(PERMISSIONS.MEDIA_DELETE_OWN),

    canCompleteOnboarding: () => hasPermission(PERMISSIONS.ONBOARDING_COMPLETE),

    // Role-based checks
    canAccessAdminPanel: () =>
      hasAnyPermission([PERMISSIONS.SYSTEM_ADMIN, PERMISSIONS.USER_READ_ALL]),
    canManageUsers: () =>
      hasAnyPermission([
        PERMISSIONS.USER_CREATE,
        PERMISSIONS.USER_UPDATE,
        PERMISSIONS.USER_DELETE,
      ]),
    canManageRoles: () =>
      hasAnyPermission([
        PERMISSIONS.ROLE_CREATE,
        PERMISSIONS.ROLE_UPDATE,
        PERMISSIONS.ROLE_DELETE,
      ]),
    canCreateDepartment: () => hasPermission(PERMISSIONS.DEPARTMENT_CREATE),
    canCreateProgram: () => hasPermission(PERMISSIONS.PROGRAM_CREATE),
    canCreateSubject: () => hasPermission(PERMISSIONS.SUBJECT_CREATE),
    canCreateAnnouncement: () => hasPermission(PERMISSIONS.ANNOUNCEMENT_CREATE),
  };
};
