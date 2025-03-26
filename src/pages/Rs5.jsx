import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import toast, { Toaster } from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";
import QRCODE from "../assets/5rs.jpeg"
import { Navigate, useNavigate } from "react-router-dom";

function Rs5() {
  const [gameFee, setGameFee] = useState(5);
  const [gameID, setGameID] = useState("");
  const [upiID, setUpiID] = useState("");
  const [utrNumber, setutrNumber] = useState("");
  const loadingBar = useRef(null); // Ref for loading bar
  const navigate=useNavigate("")

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gameFee || !gameID || !upiID || !utrNumber) {
      toast.error("⚠ Please fill all fields and upload a UTR Number");
      return;
    }

  
    const formData ={GameFee: gameFee,GameID: gameID ,UpiID:upiID ,UtrNumber:utrNumber}

    loadingBar.current.continuousStart(); // Start loading bar

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}participent/userDetails/rs5`,
        formData,
        { 
          withCredentials: true, // Correct Placement
        }
      );
      loadingBar.current.complete(); // Stop loading bar
      toast.success("✅ " + response.data.message);
      setGameID("");
      setUpiID("");
      setutrNumber("")
      navigate("/joinroom")
    } catch (error) {
      loadingBar.current.complete(); // Stop loading bar
      toast.error("❌ Error: Not a participant. Try again.");
    }
  };
  return (
    <div className="container mt-5">
      {/* Loading Bar */}
      <LoadingBar color="#29d" ref={loadingBar} />

      {/* Toast Notifications */}
      <Toaster position="top-center" />

      <h2 className="text-center text-primary fw-bold">Join ₹5 Contest</h2>

      {/* Prize Pool Section */}
      <div>
        <ul className="list-group list-group-flush text-center">
          <h3 className="card-title text-center text-primary fw-bold">
            ⚡ Contest Prize Pool ⚡
          </h3>
          <li className="list-group-item">1️⃣ 1st Winner Gets ₹100 ✅</li>
          <li className="list-group-item">2️⃣ 2nd Winner Gets ₹50 ✅</li>
          <li className="list-group-item">3️⃣ 3rd Winner Gets ₹25 ✅</li>
          <li className="list-group-item">4️⃣ 4th Winner Gets ₹10 ✅</li>
          <li className="list-group-item">5️⃣ 5th Winner Gets ₹10 ✅</li>
        </ul>
      </div>

      <br />

      {/* Steps to Participate */}
      <div>
        <ul className="list-group list-group-flush">
          <h3 className="card-title text-center text-primary fw-bold">
            ⚡ Steps To Participate ⚡
          </h3>
          <li className="list-group-item">👨‍💻 Scan QR Code in Any UPI App</li>
          <li className="list-group-item">💰 Pay and Take Screenshot</li>
          <li className="list-group-item">📌 Submit Your UPI ID</li>
          <li className="list-group-item">📌 Submit Your Game UID</li>
          <li className="list-group-item">📌 Upload UTR Number & Click Submit</li>
          <li className="list-group-item">📌 Room ID & Password Available at Game Time</li>
        </ul>
      </div>

      {/* QR Code for Payment */}
      <div className="text-center mt-4">
      <img src={QRCODE} className="w-75" alt="QR Code" />
        <p>Scan the QR code <br /> Any UPI APP to pay ₹5</p>
      </div>

      {/* Form for Participation */}
      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        {/* UPI ID Input */}
        <div className="mb-3">
          <label className="form-label fw-bold">UPI ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your UPI ID"
            value={upiID}
            onChange={(e) => setUpiID(e.target.value)}
            required
          />
        </div>

        {/* Game ID Input */}
        <div className="mb-3">
          <label className="form-label fw-bold">Game ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your Game ID"
            value={gameID}
            onChange={(e) => setGameID(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">UTR Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your Game ID"
            value={utrNumber}
            onChange={(e) => setutrNumber(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success w-100">
          Submit & Participate
        </button>
      </form>
    </div>
  );
}

export default Rs5;
