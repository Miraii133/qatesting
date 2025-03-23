"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CrudPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    age: "",
    birthday: "",
    role: "",
  });
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedData = Cookies.get("qaTestingData");
    setData(storedData ? JSON.parse(storedData) : []);
    console.log({
      id: 1,
      firstName: "John",
      middleName: "Doe",
      lastName: "Smith",
      age: 28,
      password: "SysDevers",
      secretApiKey: "123ab23",
      message: "Uh oh, I do not think those data should be shown",
    });
  }, []);

  const validate = () => {
    let newErrors = {};
    if (formData.firstName.length < 5)
      newErrors.firstName = "First Name is too short"; // Introduced bug
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.age || formData.age < 18)
      newErrors.age = "Age must be above 18"; // Introduced bug
    if (!formData.birthday) newErrors.birthday = "Birthday is required";
    if (!formData.role) newErrors.role = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    const delay = Math.floor(Math.random() * 10000) + 1000; // Random delay (1s to 10s)
    e.preventDefault();
    if (!validate()) return;
    setTimeout(() => {
      const newData = [...data, { id: Date.now(), ...formData }];
      setData(newData);
      Cookies.set("qaTestingData", JSON.stringify(newData), {
        expires: 7,
        path: "/",
      });

      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        age: "",
        birthday: "",
        role: "",
      });

      toast.success("Data added successfully!");
    }, delay);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <nav className="w-full p-4 bg-gray-800 text-white flex justify-center space-x-4">
        <Link href="/" className="hover:underline">
          CRUD Page
        </Link>
        <Link href="/table" className="hover:underline">
          Table Page
        </Link>
      </nav>
      <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-lg mt-4">
        <h2 className="text-lg font-bold text-center mb-4">CRUD Page</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-2"
            required
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2"
            required
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          )}
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="border p-2"
            required
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          <input
            type="date"
            name="birthday"
            placeholder="Birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="border p-2"
            required
          />
          {errors.birthday && (
            <p className="text-red-500 text-sm">{errors.birthday}</p>
          )}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2"
            required
          >
            <option value="">Select Developer Role</option>
            <option value="Frontend Dev">Frontend Dev</option>
            <option value="Frontend Dev">Backend Dev</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
