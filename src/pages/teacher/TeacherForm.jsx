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
import { addTeacher } from "../../redux/slices/teacherSlice";

const TeacherForm = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    qualification: "",
    gender: "",
    address: "",
    country: "",
    dob: "",
    photo: null,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => setForm({ ...form, photo: e.target.files[0] });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.email) {
      alert("Please fill required fields");
      return;
    }

    dispatch(addTeacher(form));

    alert("Teacher added successfully!");
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      qualification: "",
      gender: "",
      address: "",
      country: "",
      dob: "",
      photo: null,
    });
  };

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark"
          ? "bg-esdarkblack text-white"
          : "bg-eswhite text-esblack"
      }`}
    >
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 z-40">
        <Sidebar />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        {/* Navbar */}
        <div
          className="fixed top-0 left-0 w-full z-30"
          style={{ marginLeft: sidebarWidth, height: 64 }}
        >
          <Navbar />
        </div>

        {/* Main */}
        <main className="flex-1 p-6 pt-20 overflow-auto">
          <div className="max-w-4xl mx-auto bg-eswhite dark:bg-esdarkblack shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Add New Teacher</h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
              <InputField
                name="firstName"
                label="First Name"
                value={form.firstName}
                onChange={handleChange}
              />

              <InputField
                name="lastName"
                label="Last Name"
                value={form.lastName}
                onChange={handleChange}
              />

              <InputField
                name="email"
                label="Email"
                value={form.email}
                onChange={handleChange}
              />

              <InputField
                name="phone"
                label="Phone"
                value={form.phone}
                onChange={handleChange}
              />

              <SelectField
                name="subject"
                label="Subject"
                value={form.subject}
                onChange={(val) => setForm({ ...form, subject: val })}
                options={[
                  "Math", "Physics", "Chemistry", "Biology",
                  "Computer", "English", "Urdu", "Islamiyat", "History"
                ].map((s) => ({ label: s, value: s }))}
              />

              <InputField
                name="qualification"
                label="Qualification"
                value={form.qualification}
                onChange={handleChange}
              />

              <RadioGroup
                name="gender"
                label="Gender"
                value={form.gender}
                onChange={(val) => setForm({ ...form, gender: val })}
                options={["Male", "Female", "Other"].map((g) => ({
                  label: g,
                  value: g
                }))}
              />

              <InputField
                name="country"
                label="Country"
                value={form.country}
                onChange={handleChange}
              />

              <InputField
                name="address"
                label="Address"
                value={form.address}
                onChange={handleChange}
              />

              <DatePicker
                name="dob"
                label="Date of Birth"
                value={form.dob}
                onChange={(val) => setForm({ ...form, dob: val })}
              />

              {/* Photo Upload */}
              <div className="col-span-1 md:col-span-2">
                <label className="block mb-2 font-medium">Profile Photo</label>
                <input
                  type="file"
                  onChange={handleFile}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Submit */}
              <div className="col-span-1 md:col-span-2">
                <PrimaryButton type="submit">Save Teacher</PrimaryButton>
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

export default TeacherForm;

