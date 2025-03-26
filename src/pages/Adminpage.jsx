import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function Adminpage() {
  const [roomID, setRoomID] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [participants, setParticipants] = useState([]);
  const [filter, setFilter] = useState("all"); // Default filter
  const [filterDelete, setFilterDelete] = useState("all"); // Default filter
  const [loading, setLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BASEURL}joinRoom/roomID`, {
        RoomID: roomID,
        RoomPassword: roomPassword,
      });
      toast.success("✅ Room ID & Password updated successfully!");
      setRoomID("");
      setRoomPassword("");
    } catch (error) {
      console.error("Axios Error:", error);
      toast.error("❌ Error: " + (error.response?.data?.message || error.message || "Something went wrong"));
    }
  };

  const handleDeleteRoom = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete the room?");
    if (!confirmDelete) return;
  
    try {
      const roomResponse = await axios.get(`${import.meta.env.VITE_BASEURL}joinRoom/getroomID`);
      const room = roomResponse.data;
  
      if (!room || !room._id) {
        toast.error("❌ No room found to delete!");
        return;
      }
  
      await axios.delete(`${import.meta.env.VITE_BASEURL}joinRoom/deleteID/${room._id}`);
      toast.success("✅ Room deleted successfully!");
  
      setRoomID("");
      setRoomPassword("");
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error("❌ Error deleting room!");
    }
  };

  useEffect(() => {
    fetchParticipants();
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASEURL}contact/all`);
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, [filter, filterDelete]); // Refetch when filter or filterDelete changes

  const fetchParticipants = async () => {
    setLoading(true);
    let url = `${import.meta.env.VITE_BASEURL}participent/getUserDetails`; // Default all users
    
    if (filter === "5") {
      url = `${import.meta.env.VITE_BASEURL}participent/getAll5rsUserDetails`;
    } else if (filter === "10") {
      url = `${import.meta.env.VITE_BASEURL}participent/getAll10rsUserDetails`;
    } else if (filter === "20") {
      url = `${import.meta.env.VITE_BASEURL}participent/getAll20rsUserDetails`;
    }

    try {
      const response = await axios.get(url);
      setParticipants(response.data);
    } catch (error) {
      console.error("Error fetching participants:", error);
      toast.error("❌ Failed to fetch participants");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (filterDelete === "all") {
      toast.error("⚠️ Please select a valid Game Fee to delete.");
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete all ₹${filterDelete} participants?`);
    if (!confirmDelete) return;

    const deleteURL = `${import.meta.env.VITE_BASEURL}participent/deleteAll${filterDelete}rsUserDetails`;

    try {
      await axios.delete(deleteURL);
      toast.success(`✅ Deleted all ₹${filterDelete} participants successfully!`);

      // Reset the filterDelete state
      setFilterDelete("all");

      // Refresh the participant list after deletion
      fetchParticipants();
    } catch (error) {
      console.error("Error deleting participants:", error);
      toast.error("❌ Error deleting participants.");
    }
  };

  const handleDeleteParticipant = async (id) => {
    if (!id) {
      toast.error("❌ Error: Invalid Participant ID!");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this participant?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BASEURL}participent/deleteParticipant/${id}`);
      toast.success("✅ Participant deleted successfully!");

      // Refresh participant list after deletion
      fetchParticipants();
    } catch (error) {
      console.error("Error deleting participant:", error);
      toast.error("❌ Error deleting participant!");
    }
  };

  const handleVerifyToggle = async (id, verified) => {
    try {
      console.log("🔍 Sending Data:", { id, verified: !verified });
  
      if (!id) {
        console.error("❌ Error: ID is missing!");
        return;
      }
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}participent/verifyParticipant`,
        { id, verified: !verified } // Toggle the verified status
      );
  
      console.log("✅ Verification updated:", response.data);
  
      // Refresh the participant list after verification
      fetchParticipants();
    } catch (error) {
      console.error("❌ Error updating verification status:", error.response?.data || error.message);
      toast.error("❌ Failed to update verification status");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-danger fw-bold">Add Room ID & Password</h2>

      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        <div className="mb-3">
          <label className="form-label fw-bold">Room ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Room ID"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Room Password</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Room Password"
            value={roomPassword}
            onChange={(e) => setRoomPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-danger w-100">
          Submit
        </button>
      </form>

      {/* Delete Room Button */}
      <button className="btn btn-danger w-100 mt-3" onClick={handleDeleteRoom}>
        Delete Room
      </button>

      <h2 className="text-center text-danger fw-bold mt-4">All Participants</h2>

      {/* Filter Dropdown */}
      <div className="mb-3 text-center">
        <label className="fw-bold me-2">Filter by Game Fee:</label>
        <select className="form-select d-inline w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="5">₹5 Participants</option>
          <option value="10">₹10 Participants</option>
          <option value="20">₹20 Participants</option>
        </select>
      </div>

      {/* Filter And Delete All */}
      <div className="mb-3 text-center">
        <label className="fw-bold me-2">Delete by Game Fee:</label>
        <select
          className="form-select d-inline w-auto"
          value={filterDelete}
          onChange={(e) => setFilterDelete(e.target.value)}
        >
          <option value="all">Select Game Fee</option>
          <option value="5">₹5 Participants</option>
          <option value="10">₹10 Participants</option>
          <option value="20">₹20 Participants</option>
        </select>
        <button className="btn btn-danger ms-2" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {/* Display Participants */}
      <div className="p-4 shadow rounded bg-light">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : participants.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Game Fee</th>
                <th>Game ID</th>
                <th>UPI ID</th>
                <th>Payment UTR</th>
                <th>Verify</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant, index) => (
                <tr key={index}>
                  <td>{participant.GameFee}</td>
                  <td>{participant.GameID}</td>
                  <td>{participant.UpiID}</td>
                  <td>{participant.UtrNumber}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={participant.verified}
                      onChange={() => handleVerifyToggle(participant._id, participant.verified)}
                    />
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDeleteParticipant(participant._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-muted">No participants found.</p>
        )}
      </div>

      <div className="container mt-5">
      <h2 className="text-center">📜 User Complaints</h2>
      <ul className="list-group">
        {complaints.map((complaint, index) => (
          <li key={index} className="list-group-item">
            <strong>Game ID:</strong> {complaint.GameID} <br />
            <strong>Problem:</strong> {complaint.Problem} <br />
            <strong>Summary:</strong> {complaint.Summary} <br />
            <small className="text-muted">Submitted: {new Date(complaint.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default Adminpage;