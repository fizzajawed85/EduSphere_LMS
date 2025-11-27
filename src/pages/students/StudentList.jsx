import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/tables/DataTable";
import TableHeader from "../../components/tables/TableHeader";
import { fetchStudents } from "../../redux/slices/studentSlice";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, loading } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className="p-6">
      <TableHeader title="Students List" />
      <div className="flex justify-end mb-4">
        <PrimaryButton text="Add Student" onClick={() => navigate("/students/add")} />
      </div>

      <DataTable
        loading={loading}
        data={students}
        columns={[
          { label: "Full Name", field: "firstName" },
          { label: "Last Name", field: "lastName" },
          { label: "Roll No", field: "rollNo" },
          { label: "Class", field: "className" },
          { label: "Email", field: "email" },
          { label: "Phone", field: "phone" },
        ]}
      />
    </div>
  );
};

export default StudentList;
