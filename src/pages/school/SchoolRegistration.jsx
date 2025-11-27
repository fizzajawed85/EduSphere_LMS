// src/pages/schools/SchoolRegistration.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchools, createSchool } from "../../redux/slices/schoolSlice";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import InputField from "../../components/forms/InputField";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";
import { toast } from "react-hot-toast";

const SchoolRegistration = () => {
  const dispatch = useDispatch();
  const { schools, loading } = useSelector((state) => state.school);
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    contactEmail: "",
    contactPhone: "",
    logo: null,
    principal: "",
  });

  useEffect(() => {
    dispatch(fetchSchools());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let logoURL = "";
      if (formData.logo) {
        const logoRef = ref(storage, `schoolLogos/${formData.logo.name}`);
        await uploadBytes(logoRef, formData.logo);
        logoURL = await getDownloadURL(logoRef);
      }

      await dispatch(createSchool({ ...formData, logo: logoURL })).unwrap();
      toast.success("School added successfully!");

      setFormData({
        name: "",
        address: "",
        city: "",
        country: "",
        contactEmail: "",
        contactPhone: "",
        logo: null,
        principal: "",
      });
    } catch (error) {
      toast.error(error.message);
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
          {/* Form Card */}
          <div className="max-w-4xl mx-auto bg-eswhite text-esblack dark:bg-esdarkblack dark:text-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">School Registration</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="School Name" name="name" value={formData.name} onChange={handleChange} required />
              <InputField label="Address" name="address" value={formData.address} onChange={handleChange} required />
              <InputField label="City" name="city" value={formData.city} onChange={handleChange} required />
              <InputField label="Country" name="country" value={formData.country} onChange={handleChange} required />
              <InputField label="Contact Email" type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required />
              <InputField label="Contact Phone" type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} required />
              <InputField label="Principal Name" name="principal" value={formData.principal} onChange={handleChange} required />

              <div className="col-span-2">
                <label className="block font-medium mb-2">School Logo</label>
                <input type="file" name="logo" onChange={handleChange} className="w-full p-2 border rounded" />
              </div>

              <div className="col-span-2">
                <PrimaryButton type="submit" loading={loading}>
                  Add School
                </PrimaryButton>
              </div>
            </form>
          </div>

          {/* Schools List Table */}
          <div className="max-w-6xl mx-auto overflow-x-auto rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">All Registered Schools</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="min-w-full border-collapse border rounded">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="p-2 border">Logo</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">City</th>
                    <th className="p-2 border">Country</th>
                    <th className="p-2 border">Principal</th>
                  </tr>
                </thead>
                <tbody>
                  {schools.map((school) => (
                    <tr key={school.id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                      <td className="p-2 border">
                        {school.logo && <img src={school.logo} alt="logo" className="w-12 h-12 object-cover rounded" />}
                      </td>
                      <td className="p-2 border">{school.name}</td>
                      <td className="p-2 border">{school.city}</td>
                      <td className="p-2 border">{school.country}</td>
                      <td className="p-2 border">{school.principal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>

        {/* Footer */}
        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
};

export default SchoolRegistration;

