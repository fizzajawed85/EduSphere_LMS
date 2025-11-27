// src/pages/admissions/AdmissionForm.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { admissionService } from "../../pages/services/admissionService";
import { addAdmission, setAdmissions, updateAdmission } from "../../redux/slices/admissionSlice";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import RadioGroup from "../../components/forms/RadioGroup";
import DatePicker from "../../components/forms/DatePicker";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import IconButton from "../../components/buttons/IconButton";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdmissionForm = () => {
  const dispatch = useDispatch();
  const admissions = useSelector(state => state.admission.admissions);
  const theme = useSelector(state => state.theme.mode);
  const sidebarWidth = 256;

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    className: "",
    rollNumber: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    country: "",
    dob: "",
    photo: null,
  });

  useEffect(() => {
    admissionService.getAllAdmissions().then(data => dispatch(setAdmissions(data)));
  }, [dispatch]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = (e) => setForm({ ...form, photo: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const admissionData = { ...form, date: new Date().toISOString() };

    if (editing) {
      const updated = await admissionService.updateAdmission(editing.id, admissionData);
      dispatch(updateAdmission(updated));
      setEditing(null);
    } else {
      const added = await admissionService.addAdmission(admissionData);
      dispatch(addAdmission(added));
    }

    setForm({
      firstName: "",
      lastName: "",
      fatherName: "",
      className: "",
      rollNumber: "",
      email: "",
      phone: "",
      gender: "",
      address: "",
      country: "",
      dob: "",
      photo: null,
    });
  };

  const handleEdit = (adm) => {
    setEditing(adm);
    setForm({
      firstName: adm.firstName,
      lastName: adm.lastName,
      fatherName: adm.fatherName,
      className: adm.className,
      rollNumber: adm.rollNumber,
      email: adm.email,
      phone: adm.phone,
      gender: adm.gender,
      address: adm.address,
      country: adm.country,
      dob: adm.dob || "",
      photo: null,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this admission?")) {
      await admissionService.deleteAdmission(id);
      dispatch(setAdmissions(admissions.filter(a => a.id !== id)));
    }
  };

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 z-40">
        <Sidebar />
      </div>

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        {/* Navbar */}
        <div className="fixed top-0 left-0 z-30 w-full" style={{ marginLeft: sidebarWidth, height: 64 }}>
          <Navbar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 pt-20 overflow-auto">
          <div className="max-w-4xl mx-auto bg-eswhite text-esblack dark:bg-esdarkblack dark:text-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Student Admissions</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required />
              <InputField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} required />
              <InputField label="Father Name" name="fatherName" value={form.fatherName} onChange={handleChange} required />
              <InputField label="Class" name="className" value={form.className} onChange={handleChange} required />
              <InputField label="Roll Number" name="rollNumber" value={form.rollNumber} onChange={handleChange} required />
              <InputField label="Email" name="email" value={form.email} type="email" onChange={handleChange} required />
              <InputField label="Phone Number" name="phone" value={form.phone} onChange={handleChange} required />

              <RadioGroup
                label="Gender"
                name="gender"
                options={["Male","Female","Other"].map(g => ({ label: g, value: g }))}
                value={form.gender}
                onChange={(val) => setForm({ ...form, gender: val })}
              />

              <InputField label="Address" name="address" value={form.address} onChange={handleChange} />
              <InputField label="Country" name="country" value={form.country} onChange={handleChange} />
              <DatePicker label="Date of Birth" name="dob" value={form.dob} onChange={(val) => setForm({ ...form, dob: val })} />

              <div className="col-span-2">
                <label className="block font-medium mb-2">Profile Photo</label>
                <input type="file" onChange={handleFile} className="w-full p-2 border rounded" />
              </div>

              <div className="col-span-2">
                <PrimaryButton type="submit">{editing ? "Update Admission" : "Add Admission"}</PrimaryButton>
              </div>
            </form>
          </div>

          {/* Admissions List Table */}
          <div className="max-w-6xl mx-auto overflow-x-auto rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Admissions List</h2>
            <table className="w-full border-collapse">
              <thead className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200"}`}>
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Class</th>
                  <th className="p-3 text-left">Roll</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admissions.map(adm => (
                  <tr key={adm.id} className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} border-b hover:bg-gray-100 dark:hover:bg-gray-600`}>
                    <td className="p-3">{adm.firstName} {adm.lastName}</td>
                    <td className="p-3">{adm.className}</td>
                    <td className="p-3">{adm.rollNumber}</td>
                    <td className="p-3">{adm.email}</td>
                    <td className="p-3">{adm.phone}</td>
                    <td className="p-3 flex gap-2">
                      <IconButton onClick={() => handleEdit(adm)}><FaEdit /></IconButton>
                      <IconButton onClick={() => handleDelete(adm.id)}><FaTrash /></IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Footer */}
        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
};

export default AdmissionForm;
