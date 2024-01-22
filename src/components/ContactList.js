import React, { useState, useEffect } from "react";
import ContactRow from "./ContactRow";
import api from "../services/api";
import * as XLSX from "xlsx";

const ContactList = ({ filter: { name, date, countryCode, phoneNumber } }) => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalC, setTotalC] = useState(10);
  const [error, setError] = useState("");
  const [allChecked, setAllChecked] = useState(false);

  const contactsPerPage = totalC;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const result = await api.getContacts(currentPage, contactsPerPage);
        console.log(result);
        setContacts(result.contacts);
        setTotalPages(result.totalPages);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchContacts();
  }, [currentPage, totalC]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleCheckboxChange = () => {
    setAllChecked(!allChecked);
    const updatedContacts = [...contacts];
    updatedContacts.forEach((contact) => (contact.isSelected = !allChecked));
    setContacts(updatedContacts);
  };
  const filteredContacts = contacts.filter((contact) => {
    if (name && !contact.name.toLowerCase().includes(name.toLowerCase())) {
      return false;
    }

    if (phoneNumber && !contact.phoneNumber.includes(phoneNumber)) {
      return false;
    }

    return true;
  });
  const handleSelect = (index, isSelected) => {
    const updatedContacts = [...contacts];
    updatedContacts[index].isSelected = isSelected;
    setContacts(updatedContacts);
  };

  useEffect(() => {}, [filteredContacts]);
  const handleDownloadExcel = () => {
    const selectedContacts = filteredContacts.filter(
      (contact) => contact.isSelected
    );

    if (selectedContacts.length > 0) {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(selectedContacts);
      XLSX.utils.book_append_sheet(wb, ws, "SelectedContacts");
      XLSX.writeFile(wb, "SelectedContacts.xlsx");
    } else {
      alert("No selected contacts to download.");
    }
  };

  return (
    <div className="main">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allChecked}
                // onChange={() => setAllChecked(!allChecked)}
                onChange={handleCheckboxChange}
              ></input>
            </th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact, index) => (
            <ContactRow
              index={index}
              key={contact._id}
              contact={contact}
              isChecked={allChecked}
              handleSelect={handleSelect}
            />
          ))}
        </tbody>
      </table>
      <div className="bottom">
        {totalPages > 1 && (
          <div className="tabs">
            {/* {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button key={page} onClick={() => handlePageChange(page)}>
                  {page}
                </button>
              )
            )} */}
            <h4>Page No. / {totalPages}</h4>
            <input
              type="number"
              className="pageno"
              placeholder="Page No."
              onChange={(e) => handlePageChange(e.target.value)}
            ></input>
          </div>
        )}
        <div className="perpage">
          <h4>Contacts/page:</h4>
          <input
            type="number"
            placeholder=""
            className="entry"
            onChange={(e) => setTotalC(e.target.value)}
          ></input>
        </div>
        <button onClick={handleDownloadExcel}>
          Download Selected Contacts
        </button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default ContactList;
