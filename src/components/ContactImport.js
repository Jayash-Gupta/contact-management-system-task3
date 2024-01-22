import React, { useState } from "react";
import api from "../services/api";
import "./contactlist.css";

const ContactImport = ({ filter, setFilter }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError("");
  };

  const handleImport = async () => {
    try {
      if (!file) {
        setError("Please select a file.");
        return;
      }

      const result = await api.importContacts(file);

      setSuccessMessage(result.message);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="CI">
      <div className="">
        <input
          type="file"
          onChange={handleFileChange}
          placeholder="Select File"
          className="file"
        />
        <button onClick={handleImport}>Import Contacts</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {successMessage && (
          <div style={{ color: "green" }}>{successMessage}</div>
        )}
      </div>

      <div className="filter">
        <h4 className="fill"> Filters:</h4>
        <input
          type="text"
          placeholder="Name"
          className="filName"
          value={filter.name}
          onChange={(e) => setFilter((p) => ({ ...p, name: e.target.value }))}
        />
        <input
          type="date"
          placeholder="Date"
          value={filter.date}
          className="filDate"
          onChange={(e) => setFilter((p) => ({ ...p, date: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Country Code"
          value={filter.countryCode}
          className="filCon"
          onChange={(e) =>
            setFilter((p) => ({ ...p, countryCode: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="Phone Number"
          value={filter.phoneNumber}
          className="filNumb"
          onChange={(e) =>
            setFilter((p) => ({ ...p, phoneNumber: e.target.value }))
          }
        />
      </div>
    </div>
  );
};

export default ContactImport;
