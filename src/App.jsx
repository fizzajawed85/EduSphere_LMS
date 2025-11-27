import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/bars/Navbar";
import Sidebar from "./components/bars/Sidebar";
import PrivateRoute from "./components/auth/PrivateRoute";
import RoleRoute from "./components/auth/RoleRoute";

// Auth Pages
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import ResetPassword from "./pages/authentication/ResetPassword";

// Dashboards
import SuperAdminDashboard from "./pages/dashboards/SuperAdminDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import TeacherDashboard from "./pages/dashboards/TeacherDashboard";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import ParentDashboard from "./pages/dashboards/ParentDashboard";

// Other pages (Students, Teachers, Classes, Subjects, etc.)
import StudentList from "./pages/students/StudentList";
import StudentForm from "./pages/students/StudentForm";
import StudentTransfer from "./pages/students/StudentTransfer";
import TeacherList from "./pages/teacher/TeacherList";
import TeacherForm from "./pages/teacher/TeacherForm";
import TeacherAllocation from "./pages/teacher/TeacherAllocation";
import ClassList from "./pages/classes/ClassList";
import ClassForm from "./pages/classes/ClassForm";
import SubjectList from "./pages/subjects/SubjectList";
import SubjectForm from "./pages/subjects/SubjectForm";
import SyllabusList from "./pages/syllabus/SyllabusList";
import SyllabusForm from "./pages/syllabus/SyllabusForm";
import ExamSchedule from "./pages/exams/ExamSchedule";
import ExamResult from "./pages/exams/ExamResult";
import AIExamGenerator from "./pages/exams/AIExamGenerator";
import FeeStructure from "./pages/fees/FeeStructure";
import FeeSubmission from "./pages/fees/FeeSubmission";
import FeeVoucher from "./pages/fees/FeeVoucher";
import AIFeePrediction from "./pages/fees/AIFeePrediction";
import AdmissionForm from "./pages/admissons/AdmissionForm";
import SchoolRegistration from "./pages/school/SchoolRegistration";
import AdminStaffManagement from "./pages/school/AdminStaffManagement";

function App() {
  return (
    <Routes>
      {/* Public/Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Routes: Wrap in PrivateRoute to show Navbar/Sidebar/Footer */}
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 overflow-auto p-4">
                  <Routes>
                    {/* Dashboards */}
                    <Route
                      path="/dashboard/superadmin"
                      element={<RoleRoute role="superadmin"><SuperAdminDashboard /></RoleRoute>}
                    />
                    <Route
                      path="/dashboard/admin"
                      element={<RoleRoute role="admin"><AdminDashboard /></RoleRoute>}
                    />
                    <Route
                      path="/dashboard/teacher"
                      element={<RoleRoute role="teacher"><TeacherDashboard /></RoleRoute>}
                    />
                    <Route
                      path="/dashboard/student"
                      element={<RoleRoute role="student"><StudentDashboard /></RoleRoute>}
                    />
                    <Route
                      path="/dashboard/parent"
                      element={<RoleRoute role="parent"><ParentDashboard /></RoleRoute>}
                    />

                    {/* Students */}
                    <Route path="/students/list" element={<StudentList />} />
                    <Route path="/students/add" element={<StudentForm />} />
                    <Route path="/students/transfer" element={<StudentTransfer />} />

                    {/* Teachers */}
                    <Route path="/teachers/list" element={<TeacherList />} />
                    <Route path="/teachers/add" element={<TeacherForm />} />
                    <Route path="/teachers/allocation" element={<TeacherAllocation />} />

                    {/* Classes */}
                    <Route path="/classes/list" element={<ClassList />} />
                    <Route path="/classes/add" element={<ClassForm />} />

                    {/* Subjects */}
                    <Route path="/subjects/list" element={<SubjectList />} />
                    <Route path="/subjects/add" element={<SubjectForm />} />

                    {/* Syllabus */}
                    <Route path="/syllabus/list" element={<SyllabusList />} />
                    <Route path="/syllabus/add" element={<SyllabusForm />} />

                    {/* Exams */}
                    <Route path="/exams/schedule" element={<ExamSchedule />} />
                    <Route path="/exams/results" element={<ExamResult />} />
                    <Route path="/exams/ai-generator" element={<AIExamGenerator />} />

                    {/* Fees */}
                    <Route path="/fees/structure" element={<FeeStructure />} />
                    <Route path="/fees/submission" element={<FeeSubmission />} />
                    <Route path="/fees/voucher" element={<FeeVoucher />} />
                    <Route path="/fees/ai-prediction" element={<AIFeePrediction />} />

                    {/* Admissions */}
                    <Route path="/admissions/add" element={<AdmissionForm />} />

                    {/* School */}
                    <Route path="/school/registration" element={<SchoolRegistration />} />
                    <Route path="/school/admin-staff" element={<AdminStaffManagement />} />

                    {/* Default redirect inside protected */}
                    <Route path="*" element={<Navigate to="/dashboard/admin" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          </PrivateRoute>
        }
      />

      {/* Redirect unknown routes to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
