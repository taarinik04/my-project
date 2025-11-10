import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [ticketUpdates, setTicketUpdates] = useState({}); // Track status + message changes

  const token = localStorage.getItem("adminToken");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admindashboard", config);
      setTickets(res.data.tickets || []);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    } finally {
      setLoadingTickets(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/categories", config);
      setCategories(res.data || []);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await axios.post("http://localhost:3000/add-category", { name: newCategory });
      setNewCategory("");
      fetchCategories();
    } catch (err) {
      console.error("Add category failed:", err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete-category/${id}`, config);
      fetchCategories();
    } catch (err) {
      console.error("Delete category failed:", err);
    }
  };

  const handleUpdateTicket = async (ticketId) => {
    const update = ticketUpdates[ticketId];
    if (!update?.status && !update?.message) return;

    try {
      await axios.put(
        `http://localhost:3000/update-ticket/${ticketId}`,
        {
          status: update.status,
          message: update.message,

        },
        config
      );
      fetchTickets(); // Refresh data
    } catch (err) {
      console.error("Failed to update ticket:", err);
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchCategories();
  }, []);

  if (loadingTickets || loadingCategories) {
    return <div className="text-white text-center mt-20">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-purple-400 mb-6">🛠️ Admin Dashboard</h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 🎫 Tickets Section */}
        <div className="bg-zinc-900 p-6 rounded-2xl border border-purple-600 shadow-md overflow-auto max-h-[600px]">
          <h2 className="text-xl font-semibold mb-4 text-purple-300">🎫 All Tickets</h2>
          {tickets.length === 0 ? (
            <p className="text-gray-400">No tickets available.</p>
          ) : (
            <ul className="space-y-6">
              {tickets.map((ticket) => (
                <li key={ticket._id} className="border-b border-zinc-700 pb-4">
                  <h2 className="font-bold text-white text-xl">{ticket.title}</h2>
                  <p className="font-semibold text-zinc-300">{ticket.description}</p>
                  <p className="text-gray-400 text-sm">From: {ticket.user.email}</p>
                  <p className="text-gray-500 text-xs">Category: {ticket.category}</p>
                  <p className="font-bold text-red-800">Status: {ticket.status}</p>
             

                  {/* Status dropdown */}
                  <select
                    className="mt-2 px-2 py-1 bg-zinc-800 text-white border border-purple-600 rounded"
                    value={ticketUpdates[ticket._id]?.status || ticket.status}
                    onChange={(e) =>
                      setTicketUpdates((prev) => ({
                        ...prev,
                        [ticket._id]: {
                          ...prev[ticket._id],
                          status: e.target.value,
                        },
                      }))
                    }
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                    <option>Closed</option>
                  </select>

                  {/* Message textarea */}
                  <textarea
                    className="mt-2 w-full bg-zinc-800 text-white p-2 border border-zinc-700 rounded"
                    rows={2}
                    placeholder="Add admin message..."
                    value={ticketUpdates[ticket._id]?.message || ""}
                    onChange={(e) =>
                      setTicketUpdates((prev) => ({
                        ...prev,
                        [ticket._id]: {
                          ...prev[ticket._id],
                          message: e.target.value,
                        },
                      }))
                    }
                  ></textarea>

                  {/* Submit Button */}
                  <button
                    onClick={() => handleUpdateTicket(ticket._id)}
                    className="mt-2 px-4 py-1 bg-purple-600 hover:bg-purple-500 rounded text-black font-semibold"
                  >
                    Update Ticket
                  </button>
                  {/* Agent Comments Section */}
{ticket.comments?.length > 0 && (
  <div className="mt-4 text-sm text-gray-400">
    <h5 className="font-semibold mb-1 text-purple-300">Agent's Comments:</h5>
    <ul className="list-disc pl-5 space-y-1">
      {ticket.comments.map((c, idx) => (
        <li key={idx}>
          <span className="text-white">{c.text}</span>{" "}
          <span className="text-gray-500">({new Date(c.time).toLocaleString()})</span>
        </li>
      ))}
    </ul>
  </div>
)}

{/* Admin Comments Section */}
{ticket.Admincomments?.length > 0 && (
  <div className="mt-4 text-sm text-gray-400">
    <h5 className="font-semibold mb-1 text-blue-300">Admin's Comments:</h5>
    <ul className="list-disc pl-5 space-y-1">
      {ticket.Admincomments.map((c, idx) => (
        <li key={idx}>
          <span className="text-white">{c.text}</span>{" "}
          <span className="text-gray-500">({new Date(c.time).toLocaleString()})</span>
        </li>
      ))}
    </ul>
  </div>
)}

                    
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 📁 Category Section */}
        <div className="bg-zinc-900 p-6 rounded-2xl border border-pink-600 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-pink-300">📁 Manage Categories</h2>

          <div className="flex mb-4">
            <input
              type="text"
              placeholder="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 px-4 py-2 bg-zinc-800 border border-pink-600 rounded-l-xl text-white focus:outline-none"
            />
            <button
              onClick={handleAddCategory}
              className="px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-black font-bold rounded-r-xl hover:from-pink-400 hover:to-purple-500 transition"
            >
              Add
            </button>
          </div>

          {categories.length === 0 ? (
            <p className="text-gray-400">No categories yet.</p>
          ) : (
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li
                  key={cat._id}
                  className="flex justify-between items-center bg-zinc-800 px-4 py-2 rounded-xl"
                >
                  <span className="text-white">{cat.name}</span>
                  <button
                    onClick={() => handleDeleteCategory(cat._id)}
                    className="text-red-400 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
