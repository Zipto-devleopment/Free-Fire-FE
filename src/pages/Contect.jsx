import { useState } from "react";
import axios from "axios";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";


const Contect = () => {
  const [gameID, setGameID] = useState("");
  const [problem, setProblem] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gameID || !problem || !summary) {
      toast.error("❌ Please fill all fields.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASEURL}/contact/submit`, {
        GameID: gameID,
        Problem: problem,
        Summary: summary,
      });

      toast.success(response.data.message); // Show success message
      setGameID("");
      setProblem("");
      setSummary("");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error("❌ Error submitting complaint. Try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">📩 Contact Us</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        <div className="mb-3">
          <label className="form-label">Game ID</label>
          <input
            type="text"
            className="form-control"
            value={gameID}
            onChange={(e) => setGameID(e.target.value)}
            placeholder="Enter your Game ID"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Problem</label>
          <input
            type="text"
            className="form-control"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Describe the problem"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Summary About Problem</label>
          <textarea
            className="form-control"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Provide more details..."
            rows="4"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    
    </div>
  );
};

export default Contect;
