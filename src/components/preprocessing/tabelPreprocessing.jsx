import React from "react";
import ButtonAction from './buttonAction';

function TabelPreprocessing() {
  return (
    <>
      <table className="dataset preprocessing">
        <thead>
          <tr>
            <th className="nomor">No.</th>
            <th className="text1">Text</th>
            <th className="text1">Preprocessing Result</th>
            <th className="emotion">Emotion</th>
            <th className="action">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>tess</th>
            <th>tess</th>
            <th>tess</th>
            <th>tess</th>
            <th><ButtonAction></ButtonAction></th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TabelPreprocessing;