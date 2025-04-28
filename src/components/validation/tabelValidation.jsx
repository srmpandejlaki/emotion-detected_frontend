import React from "react";
import ButtonChange from "../buttonChange";

function TabelValidation() {
  return (
    <>
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
          <tr>
            <th>tess</th>
            <th>tess</th>
            <th>tess</th>
            <th>tess</th>
            <th><ButtonChange></ButtonChange></th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TabelValidation;