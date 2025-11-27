import { Briefcase, User, GraduationCap, School, Users } from "lucide-react";

const roles = [
  { id: "superadmin", label: "Super Admin", icon: <Briefcase className="text-sky-500" /> },
  { id: "admin", label: "Admin", icon: <User className="text-sky-500" /> },
  { id: "teacher", label: "Teacher", icon: <GraduationCap className="text-sky-500" /> },
  { id: "student", label: "Student", icon: <School className="text-sky-500" /> },
  { id: "parent", label: "Parent", icon: <Users className="text-sky-500" /> },
];

export default function RoleSelect({ selectedRole, setSelectedRole }) {
  return (
    <div className="w-full">
      {/* Top row heading with divider */}
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold text-esblack dark:text-eswhite">Select Role</h2>
        <div className="flex-1 h-px bg-sky-200 ml-4"></div>
      </div>

      {/* Roles container */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {roles.map((roleItem) => (
          <button
            key={roleItem.id}
            onClick={() => setSelectedRole(roleItem.id)}
            className={`
              flex flex-col items-center justify-center p-4 rounded-lg border transition
              w-full h-28
              ${selectedRole === roleItem.id 
                ? "bg-esorange text-eswhite border-esorange" 
                : "bg-eswhite text-esblack border-gray-300 dark:bg-esdarkblack dark:text-eswhite"}
              hover:shadow-lg
            `}
          >
            <div className="text-3xl mb-2">{roleItem.icon}</div>
            <span className="font-semibold text-sm">{roleItem.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
