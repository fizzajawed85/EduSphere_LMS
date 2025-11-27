import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import DataTable from "../../components/tables/DataTable";
import TableHeader from "../../components/tables/TableHeader";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { fetchClasses } from "../../redux/slices/classSlice";

const ClassList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes, loading } = useSelector((state) => state.classes);
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
      
      {/* Sidebar fixed */}
      <div className="fixed top-0 left-0 h-full w-64 z-40">
        <Sidebar />
      </div>

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        
        {/* Navbar fixed */}
        <div className="fixed top-0 left-0 z-30 w-full" style={{ marginLeft: sidebarWidth, height: 64 }}>
          <Navbar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 pt-20 overflow-auto">
          {/* Header */}
          <TableHeader title="Classes List" />

          {/* Add Class Button */}
          <div className="flex justify-end mb-4">
            <PrimaryButton onClick={() => navigate("/classes/add")}>
              Add Class
            </PrimaryButton>
          </div>

          {/* Data Table */}
          <div className="bg-eswhite text-esblack p-4 rounded-lg shadow">
            <DataTable
              loading={loading}
              data={classes}
              columns={[
                { label: "Class Name", field: "name" },
                { label: "Section", field: "section" },
                { label: "Total Students", field: "totalStudents" },
                { label: "Teacher Assigned", field: "teacherAssigned" },
                { label: "Start Date", field: "startDate" },
                { label: "End Date", field: "endDate" },
                { label: "Room", field: "roomNumber" },
                { label: "Timing", field: "timing" },
              ]}
            />
          </div>
        </main>

        {/* Footer */}
        <Footer style={{
          marginLeft: sidebarWidth,
          width: `calc(100% - ${sidebarWidth}px)`,
        }} />
      </div>
    </div>
  );
};

export default ClassList;
