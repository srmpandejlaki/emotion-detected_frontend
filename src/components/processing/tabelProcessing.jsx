import React from "react";
import ButtonChange from './buttonChange';

function TabelProcessing() {
  return (
    <>
      <table className="dataset">
        <thead>
          <tr>
            <th className="nomor">No.</th>
            <th className="text">Preprocessing Result</th>
            <th className="emotion">Emotion</th>
            <th className="emotion">Emotion Predicted</th>
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

export default TabelProcessing;