import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmins, createAdminThunk, deleteAdminThunk } from "../../redux/slices/schoolSlice";
import InputField from "../../components/forms/InputField";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SelectField from "../../components/forms/SelectField";
import { toast } from "react-hot-toast";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";

const AdminStaffManagement = () => {
  const dispatch = useDispatch();
  const { admins = [], loading } = useSelector((state) => state.school); 
  const { mode: theme } = useSelector((state) => state.theme);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Admin",
    photo: null,
  });

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let photoURL = "";
      if (formData.photo) {
        const photoRef = ref(storage, `adminPhotos/${formData.photo.name}`);
        await uploadBytes(photoRef, formData.photo);
        photoURL = await getDownloadURL(photoRef);
      }

      await dispatch(createAdminThunk({ ...formData, photo: photoURL })).unwrap();
      toast.success("Admin/Staff added successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "Admin",
        photo: null,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      try {
        await dispatch(deleteAdminThunk(id)).unwrap();
        toast.success("Staff deleted successfully!");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className={`p-6 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6 text-center">Admin & Staff Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
        <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
        <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
        <InputField label="Phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        <SelectField
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          options={["Admin", "Staff"]}
        />
        <div>
          <label className="block mb-1 font-semibold">Photo</label>
          <input type="file" name="photo" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <PrimaryButton type="submit" loading={loading}>Add Admin/Staff</PrimaryButton>
      </form>

      {/* List */}
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4">All Admin & Staff</h2>
        {loading ? <p>Loading...</p> : (
          <table className="min-w-full border rounded">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-2 border">Photo</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="p-2 border">
                    {admin.photo && <img src={admin.photo} alt="admin" className="w-12 h-12 rounded object-cover" />}
                  </td>
                  <td className="p-2 border">{admin.name}</td>
                  <td className="p-2 border">{admin.email}</td>
                  <td className="p-2 border">{admin.phone}</td>
                  <td className="p-2 border">{admin.role}</td>
                  <td className="p-2 border">
                    <button onClick={() => handleDelete(admin.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminStaffManagement;
