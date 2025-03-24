import React, { useState, useRef,useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import toast, { Toaster } from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";
import QRCODE from "../assets/10rs.jpeg"

function Rs10() {
  const [gameFee, setGameFee] = useState(10);
  const [gameID, setGameID] = useState("");
  const [upiID, setUpiID] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const loadingBar = useRef(null); // Ref for loading bar

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gameFee || !gameID || !upiID || !screenshot) {
      toast.error("⚠ Please fill all fields and upload a screenshot.");
      return;
    }

    const formData = new FormData();
    formData.append("GameFee", gameFee);
    formData.append("GameID", gameID);
    formData.append("UpiID", upiID);
    formData.append("screenshot", screenshot);

    loadingBar.current.continuousStart(); // Start loading bar

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}participent/userDetails/rs5`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      loadingBar.current.complete(); // Stop loading bar
      toast.success("✅ " + response.data.message);
      setGameID("");
      setUpiID("");
      setScreenshot(null);
    } catch (error) {
      loadingBar.current.complete(); // Stop loading bar
      toast.error("❌ Error: Not a participant. Try again.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mt-5">
      {/* Loading Bar */}
      <LoadingBar color="#29d" ref={loadingBar} />

      {/* Toast Notifications */}
      <Toaster position="top-center" />

      <h2 className="text-center text-primary fw-bold">Join ₹10 Contest</h2>

      {/* Prize Pool Section */}
      <div>
        <ul className="list-group list-group-flush text-center">
          <h3 className="card-title text-center text-primary fw-bold">
            ⚡ Contest Prize Pool ⚡
          </h3>
          <li className="list-group-item">1️⃣ 1st Winner Gets ₹200 ✅</li>
          <li className="list-group-item">2️⃣ 2nd Winner Gets ₹100 ✅</li>
          <li className="list-group-item">3️⃣ 3rd Winner Gets ₹50 ✅</li>
          <li className="list-group-item">4️⃣ 4th Winner Gets ₹25 ✅</li>
          <li className="list-group-item">5️⃣ 5th Winner Gets ₹25 ✅</li>
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
          <li className="list-group-item">📌 Upload Screenshot & Click Submit</li>
          <li className="list-group-item">📌 Room ID & Password Available at Game Time</li>
        </ul>
      </div>

      {/* QR Code for Payment */}
      <div className="text-center mt-4">
        <img src={QRCODE} className="w-75" alt="QR Code" />
        <p>Scan the QR code <br /> Any UPI APP to pay ₹10</p>
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

        {/* Screenshot Upload */}
        <div className="mb-3">
          <label className="form-label fw-bold">Upload Payment Screenshot</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setScreenshot(e.target.files[0])}
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

export default Rs10;
