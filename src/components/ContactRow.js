import React from "react";
import { useState } from "react";
const ContactRow = ({ contact, isChecked, handleSelect, index }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleCheckboxChange = () => {
    setIsSelected(!isSelected);
    handleSelect(index, !isSelected);
  };
  const css = index % 2 == 0 ? "" : "#C5C6D0";
  return (
    <tr style={{ background: css }}>
      <td>
        <input
          type="checkbox"
          checked={isChecked | isSelected}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>{contact.name}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.email}</td>
    </tr>
  );
};

export default ContactRow;
