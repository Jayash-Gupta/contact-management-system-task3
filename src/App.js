// App.js
import "./App.css";
import React, { useState } from "react";
import ContactImport from "./components/ContactImport";
import ContactList from "./components/ContactList";

const App = () => {
  const [filter, setFilter] = useState({
    name: "",
    date: "",
    countryCode: "",
    phoneNumber: "",
  });

  return (
    <div>
      <h1 className="head">Contact Management App</h1>
      <ContactImport filter={filter} setFilter={setFilter} />
      <ContactList filter={filter} />
    </div>
  );
};

export default App;
