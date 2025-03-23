"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TablePage() {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const storedData = Cookies.get("qaTestingData");
    setData(storedData ? JSON.parse(storedData) : []);
  }, []);

  const handleSort = (key) => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setData(sortedData);
  };

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id === id);
    setData(newData);
    Cookies.set("qaTestingData", JSON.stringify(newData), {
      expires: 7,
      path: "/",
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <nav className="w-full p-4 bg-gray-800 text-white flex justify-center space-x-4">
        <Link href="/" className="hover:underline">
          CRUD Page
        </Link>
        <Link href="/table" className="hover:underline">
          Table
        </Link>
      </nav>
      <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-4xl mt-4">
        <h2 className="text-lg font-bold text-center mb-4">Employee Table</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th
                className="border p-2 cursor-pointer"
                onClick={() => handleSort("firstName")}
              >
                First Name
              </th>
              <th className="border p-2">Middle Name</th>
              <th
                className="border p-2 cursor-pointer"
                onClick={() => handleSort("lastName")}
              >
                Last Name
              </th>
              <th
                className="border p-2 cursor-pointer"
                onClick={() => handleSort("age")}
              >
                Age
              </th>
              <th className="border p-2">Birthday</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">{item.firstName}</td>
                  <td className="border p-2">{item.middleName}</td>
                  <td className="border p-2">{item.lastName}</td>
                  <td className="border p-2">{item.age}</td>
                  <td className="border p-2">{item.birthday}</td>
                  <td className="border p-2">{item.role}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="text-blue-500 mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center border p-2">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">View Details</h2>
            <form>
              <label className="block mb-2">First Name:</label>
              <input
                type="text"
                value={selectedItem.firstName}
                readOnly
                className="w-full p-2 border rounded"
              />

              <label className="block mb-2">Middle Name:</label>
              <input
                type="text"
                value={selectedItem.middleName}
                readOnly
                className="w-full p-2 border rounded"
              />

              <label className="block mb-2">Last Name:</label>
              <input
                type="text"
                value={selectedItem.lastName}
                className="w-full p-2 border rounded"
              />

              <label className="block mb-2">Age:</label>
              <input
                type="text"
                value={25}
                readOnly
                className="w-full p-2 border rounded"
              />

              <label className="block mb-2">Birthday:</label>
              <input
                type="text"
                value={selectedItem.birthday}
                readOnly
                className="w-full p-2 border rounded"
              />

              <label className="block mb-2">Role:</label>
              <input
                type="text"
                value={selectedItem.role}
                readOnly
                className="w-full p-2 border rounded"
              />
            </form>
            <button
              onClick={() => setSelectedItem(null)}
              className="mt-4 bg-gray-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
