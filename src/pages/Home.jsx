import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import rs5 from "../assets/5rs.webp";
import rs10 from "../assets/10rs.webp";
import rs20 from "../assets/20rs.webp";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container py-4">

      {/* Welcome Message */}
      <div className="text-center mb-4">
        <h1 className="fw-bold text-uppercase text-danger">Welcome to GameFact_42 <br /> Free Fire Contest</h1>
        <p className="fs-5 text-secondary">Join the challenge and win exciting rewards! 🎮🏆</p>
      </div>

      {/* Rules Section */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-center text-primary fw-bold">⚡ Contest Rules ⚡</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">🚫 Hecker Are Not Allow</li>
            <li className="list-group-item">🚫 If Hecker Play And Win He  &nbsp;&nbsp;&nbsp;&nbsp; Not Get Price</li>
            <li className="list-group-item">🚫 Don't Use Fake Payment App's Or Screen Shot</li>
            <li className="list-group-item">💰 Entry Fee Pay Online</li>
            <li className="list-group-item">🏆 Win exciting prizes</li>
            <li className="list-group-item">🎯 Don't TeamUp</li>
            <li className="list-group-item">📌 If Room Minimum 50 Player Not Complate So Prize is Change</li>
            <li className="list-group-item">📌 If Any Reason Room Is Cancel So Entry Fee Will Be Return To UPI ID</li>
            <li className="list-group-item">⚡ Play on Your Risk</li>
          </ul>
        </div>
      </div>

      {/* Participant Section */}
      <h2 className="text-center text-dark fw-bold mb-3">💥 Join a Contest 💥</h2>
      <div className="row g-3 justify-content-center">

        {/* Participant Game 5rs */}
        <div className="col-12 col-md-3">
          <div className="card text-center shadow-sm">
            <Link to={"/rs5"}>
              <img src={rs5} alt="Game 5rs" className="card-img-top" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">Participant Game ₹5</h5>
              <p>28 March 2025 <br /> 7:45 AM - 8:45 AM (Morning)</p>

            </div>
          </div>
        </div>

        {/* Participant Game 10rs */}
        <div className="col-12 col-md-3">
          <div className="card text-center shadow-sm">
            <Link to={"/rs10"}>
              <img src={rs10} alt="Game 10rs" className="card-img-top" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">Participant Game ₹10</h5>
              <p>28 March 2025 <br /> 8:45 AM - 9:45 AM (Morning)</p>

            </div>
          </div>
        </div>

        {/* Participant Game 20rs */}

        <div className="col-12 col-md-3">
          <div className="card text-center shadow-sm">
            <Link to={"/rs20"}>
              <img src={rs20} alt="Game 10rs" className="card-img-top" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">Participant Game ₹20</h5>
              <p>28 March 2025 <br /> 9:45 AM - 10:45 AM (Morning)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Join Room & Contact Section */}
      <div className="row g-3 mt-4 justify-content-center">
        
        {/* Join Room */}
        <div className="col-12 col-md-3">
          <Link to={"/joinroom"}>
          <div className="card bg-primary text-white text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Join Room</h5>
            </div>
          </div>
          </Link>
        </div>

        {/* Contact */}
        <div className="col-12 col-md-3">
          <div className="card bg-success text-white text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Contact</h5>
            </div>
          </div>
        </div>
        
      </div>

    </div>
  );
}

export default Home;
