// src/pages/admissions/AdmissionForm.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { admissionService } from "../../pages/services/admissionService";
import { addAdmission, setAdmissions, updateAdmission } from "../../redux/slices/admissionSlice";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import DatePicker from "../../components/forms/DatePicker";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import IconButton from "../../components/buttons/IconButton";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdmissionForm = () => {
  const dispatch = useDispatch();
  const admissions = useSelector(state => state.admission.admissions);
  const theme = useSelector(state => state.theme.mode);

  const [editing, setEditing] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [className, setClassName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    admissionService.getAllAdmissions().then(data => dispatch(setAdmissions(data)));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const admissionData = { firstName, lastName, fatherName, className, rollNumber, email, phone, gender, address, photo, country, date: new Date().toISOString() };

    if (editing) {
      const updated = await admissionService.updateAdmission(editing.id, admissionData);
      dispatch(updateAdmission(updated));
      setEditing(null);
    } else {
      const added = await admissionService.addAdmission(admissionData);
      dispatch(addAdmission(added));
    }

    setFirstName(""); setLastName(""); setFatherName(""); setClassName(""); setRollNumber("");
    setEmail(""); setPhone(""); setGender(""); setAddress(""); setPhoto(""); setCountry("");
  };

  const handleEdit = (adm) => {
    setEditing(adm);
    setFirstName(adm.firstName);
    setLastName(adm.lastName);
    setFatherName(adm.fatherName);
    setClassName(adm.className);
    setRollNumber(adm.rollNumber);
    setEmail(adm.email);
    setPhone(adm.phone);
    setGender(adm.gender);
    setAddress(adm.address);
    setPhoto(adm.photo);
    setCountry(adm.country);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this admission?")) {
      await admissionService.deleteAdmission(id);
      dispatch(setAdmissions(admissions.filter(a => a.id !== id)));
    }
  };

  return (
    <div className={`p-4 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6">Student Admissions</h1>

      <form className="mb-6 p-4 rounded shadow-md grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <InputField label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
        <InputField label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
        <InputField label="Father Name" value={fatherName} onChange={e => setFatherName(e.target.value)} required />
        <InputField label="Class" value={className} onChange={e => setClassName(e.target.value)} required />
        <InputField label="Roll Number" value={rollNumber} onChange={e => setRollNumber(e.target.value)} required />
        <InputField label="Email" value={email} type="email" onChange={e => setEmail(e.target.value)} required />
        <InputField label="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
        <SelectField label="Gender" value={gender} onChange={e => setGender(e.target.value)} options={[
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
          { value: "Other", label: "Other" }
        ]} required />
        <InputField label="Address" value={address} onChange={e => setAddress(e.target.value)} />
        <InputField label="Country" value={country} onChange={e => setCountry(e.target.value)} />
        <InputField label="Photo URL" value={photo} onChange={e => setPhoto(e.target.value)} />
        <PrimaryButton type="submit">{editing ? "Update Admission" : "Add Admission"}</PrimaryButton>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Admissions List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-md">
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
              <tr key={adm.id} className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} border-b`}>
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
    </div>
  );
};

export default AdmissionForm;
