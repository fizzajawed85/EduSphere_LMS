// roleUtils.js
export const ROLES = [
  { id: "superadmin", label: "Super Admin" },
  { id: "admin", label: "Admin" },
  { id: "teacher", label: "Teacher" },
  { id: "student", label: "Student" },
  { id: "parent", label: "Parent" },
];

export function isAllowed(user, allowed = []) {
  if (!user) return false;
  return allowed.includes(user.role);
}

export function getDefaultRouteForRole(role) {
  switch (role) {
    case "superadmin": return "/superadmin";
    case "admin": return "/dashboard";
    case "teacher": return "/teacher/dashboard";
    case "student": return "/student/dashboard";
    case "parent": return "/parent/dashboard";
    default: return "/dashboard";
  }
}
