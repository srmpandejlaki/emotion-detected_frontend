import React from "react";
import ButtonChange from "../buttonChange";

function TabelValidation({ data = [] }) {
  return (
    <table className="dataset">
      <thead>
        <tr>
          <th className="nomor">No.</th>
          <th className="text3">Preprocessing Result</th>
          <th className="emotion2">Emotion</th>
          <th className="emotion2">Emotion Predicted</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.preprocessedText}</td>
              <td>{item.emotion}</td>
              <td>{item.predictedEmotion}</td>
              <td><ButtonChange item={item} /></td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }}>
              Tidak ada data tersedia.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TabelValidation;
