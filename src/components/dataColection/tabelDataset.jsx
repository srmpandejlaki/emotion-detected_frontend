import React from "react";

function TabelDataset({ dataset, onUpdate }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Teks</th>
          <th>Label Emosi</th>
        </tr>
      </thead>
      <tbody>
        {dataset.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <input
                type="text"
                value={item.text}
                onChange={(e) => onUpdate(index, "text", e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={item.label}
                onChange={(e) => onUpdate(index, "label", e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TabelDataset;