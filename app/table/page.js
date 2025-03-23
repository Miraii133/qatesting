"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TablePage() {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);

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
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    Cookies.set("qaTestingData", JSON.stringify(newData), {
      expires: 7,
      path: "/",
    });
    toast.success("Item deleted successfully");
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
  };

  const handleSaveEdit = () => {
    const updatedData = data.map((item) =>
      item.id === editingItem.id ? editingItem : item
    );
    setData(updatedData);
    Cookies.set("qaTestingData", JSON.stringify(updatedData), {
      expires: 7,
      path: "/",
    });
    setEditingItem(null);
    toast.success("Item updated successfully");
  };

  const handleView = (item) => {
    setViewingItem(item);
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
      <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-4xl mt-4">
        <h2 className="text-lg font-bold text-center mb-4">Table Page</h2>
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
                      className="text-green-500 mr-2"
                      onClick={() => handleView(item)}
                    >
                      View
                    </button>
                    <button
                      className="text-blue-500 mr-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
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
        {viewingItem && (
          <div className="mt-4 p-4 border rounded bg-gray-100">
            <h3 className="text-lg font-bold">View Entry</h3>
            <input
              className="block w-full p-2 border mt-2"
              type="text"
              readOnly
              value={viewingItem.firstName}
              onChange={(e) =>
                setViewingItem({ ...viewingItem, firstName: e.target.value })
              }
            />
            <input
              className="block w-full p-2 border mt-2"
              type="text"
              readOnly
              value={viewingItem.middleName}
              onChange={(e) =>
                setViewingItem({ ...viewingItem, middleName: e.target.value })
              }
            />
            <input
              className="block w-full p-2 border mt-2"
              type="text"
              readOnly
              value={viewingItem.lastName}
              onChange={(e) =>
                setViewingItem({ ...viewingItem, lastName: e.target.value })
              }
            />
            <input
              className="block w-full p-2 border mt-2"
              type="number"
              readOnly
              value={viewingItem.age}
              onChange={(e) =>
                setViewingItem({ ...viewingItem, age: e.target.value })
              }
            />
            <input
              className="block w-full p-2 border mt-2"
              type="date"
              readOnly
              value={viewingItem.birthday}
              onChange={(e) =>
                setViewingItem({ ...viewingItem, birthday: e.target.value })
              }
            />
            <select
              className="block w-full p-2 border mt-2"
              value={viewingItem.role}
              onChange={(e) =>
                setEditingItem({ ...viewingItem, role: e.target.value })
              }
            >
              <option value="Frontend Dev">Frontend Developer</option>
              <option value="Backend Dev">Backend Developer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
            </select>

            <button
              className="mt-2 p-2 bg-gray-500 text-white rounded ml-2"
              onClick={() => setViewingItem(null)}
            >
              Cancel
            </button>
          </div>
        )}

        {editingItem && (
          <div className="mt-4 p-4 border rounded bg-gray-100">
            <h3 className="text-lg font-bold">Edit Entry</h3>
            <input
              className="block w-full p-2 border mt-2"
              type="text"
              value={editingItem.firstName}
              onChange={(e) =>
                setEditingItem({ ...editingItem, firstName: e.target.value })
              }
            />
            <input
              className="block w-full p-2 border mt-2"
              type="text"
              value={editingItem.middleName}
              onChange={(e) =>
                setEditingItem({ ...editingItem, middleName: e.target.value })
              }
            />
            <input
              className="block w-full p-2 border mt-2"
              type="text"
              value={editingItem.lastName}
              onChange={(e) =>
                setEditingItem({ ...editingItem, lastName: e.target.value })
              }
            />
            <input
              className="block w-full p-2 border mt-2"
              type="number"
              value={editingItem.age}
              onChange={(e) =>
                setEditingItem({ ...editingItem, age: e.target.value })
              }
            />
            <input
              className="block w-full p-2 border mt-2"
              type="date"
              value={editingItem.birthday}
              onChange={(e) =>
                setEditingItem({ ...editingItem, birthday: e.target.value })
              }
            />
            <select
              className="block w-full p-2 border mt-2"
              value={editingItem.role}
              onChange={(e) =>
                setEditingItem({ ...editingItem, role: e.target.value })
              }
            >
              <option value="Frontend Dev">Frontend Dev</option>
              <option value="Backend Dev">Backend Dev</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
            </select>
            <button
              className="mt-2 p-2 bg-blue-500 text-white rounded"
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button
              className="mt-2 p-2 bg-gray-500 text-white rounded ml-2"
              onClick={() => setEditingItem(null)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
