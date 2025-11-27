import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import RadioGroup from "../../components/forms/RadioGroup";
import DatePicker from "../../components/forms/DatePicker";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { addStudent } from "../../redux/slices/studentSlice";

const StudentForm = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    className: "",
    rollNo: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    country: "",
    dob: "",
    photo: null,
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = (e) => setForm({ ...form, photo: e.target.files[0] });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent(form));
    setForm({
      firstName: "",
      lastName: "",
      fatherName: "",
      className: "",
      rollNo: "",
      email: "",
      phone: "",
      gender: "",
      address: "",
      country: "",
      dob: "",
      photo: null,
    });
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
          <div className="max-w-4xl mx-auto bg-eswhite text-esblack shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Add New Student</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <InputField name="firstName" label="First Name" value={form.firstName} onChange={handleChange} />
              <InputField name="lastName" label="Last Name" value={form.lastName} onChange={handleChange} />
              <InputField name="fatherName" label="Father Name" value={form.fatherName} onChange={handleChange} />

              <SelectField
                name="className"
                label="Class"
                options={["Nursery","KG","1","2","3","4","5","6","7","8","9","10"].map((c) => ({ label: c, value: c }))}
                value={form.className}
                onChange={(val) => setForm({ ...form, className: val })}
              />

              <InputField name="rollNo" label="Roll Number" value={form.rollNo} onChange={handleChange} />
              <InputField name="email" label="Email" value={form.email} onChange={handleChange} />
              <InputField name="phone" label="Phone Number" value={form.phone} onChange={handleChange} />

              <RadioGroup
                name="gender"
                label="Gender"
                options={["Male","Female","Other"].map((g) => ({ label: g, value: g }))}
                value={form.gender}
                onChange={(val) => setForm({ ...form, gender: val })}
              />

              <InputField name="country" label="Country" value={form.country} onChange={handleChange} />
              <InputField name="address" label="Address" value={form.address} onChange={handleChange} />

              <DatePicker name="dob" label="Date of Birth" value={form.dob} onChange={(val) => setForm({ ...form, dob: val })} />

              <div className="col-span-2">
                <label className="block font-medium mb-2">Profile Photo</label>
                <input type="file" onChange={handleFile} className="w-full p-2 border rounded" />
              </div>

              <div className="col-span-2">
                <PrimaryButton onClick={handleSubmit}>
                  Save Student
                </PrimaryButton>
              </div>
            </form>
          </div>
        </main>

        {/* Footer */}
        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
};

export default StudentForm;
