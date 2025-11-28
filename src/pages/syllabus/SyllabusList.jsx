import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import DataTable from "../../components/tables/DataTable";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { Search } from "lucide-react";
import { fetchSyllabusThunk, deleteSyllabusThunk } from "../../redux/slices/syllabusSlice";
import { useNavigate } from "react-router-dom";

const SyllabusList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { syllabusList, loading } = useSelector((state) => state.syllabus);
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchSyllabusThunk());
  }, [dispatch]);

  const filtered = syllabusList.filter(syl =>
    `${syl.title} ${syl.className} ${syl.subject}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this syllabus?")) {
      dispatch(deleteSyllabusThunk(id));
    }
  };

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
      <div className="fixed top-0 left-0 h-full w-64 z-40"><Sidebar /></div>
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        <div className="fixed top-0 left-0 w-full z-30" style={{ marginLeft: sidebarWidth, height: 64 }}><Navbar /></div>
        <main className="flex-1 p-6 pt-20 overflow-auto">
          <div className={`flex flex-col md:flex-row justify-between items-center gap-4 mb-4 p-4 rounded-lg shadow ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
            <h2 className="text-2xl font-bold">Syllabus List</h2>
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search syllabus..." value={search} onChange={e => setSearch(e.target.value)}
                  className="pl-8 pr-2 py-2 border rounded-md focus:outline-esblue focus:ring-1 focus:ring-esblue"/>
              </div>
              <PrimaryButton onClick={() => navigate("/syllabus/add")}>Add Syllabus</PrimaryButton>
            </div>
          </div>

          <div className={`p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
            <DataTable
              loading={loading}
              data={filtered}
              columns={[
                { label: "Title", field: "title" },
                { label: "Class", field: "className" },
                { label: "Subject", field: "subject" },
                { label: "Description", field: "description" },
                {
                  label: "Actions", field: "actions", render: (syl) => (
                    <div className="flex gap-2">
                      <PrimaryButton size="sm" onClick={() => navigate(`/syllabus/edit/${syl.id}`)}>Edit</PrimaryButton>
                      <PrimaryButton size="sm" variant="danger" onClick={() => handleDelete(syl.id)}>Delete</PrimaryButton>
                    </div>
                  )
                }
              ]}
            />
          </div>
        </main>
        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
};

export default SyllabusList;
