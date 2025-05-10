import React from "react";
import ButtonChange from '../buttonChange';

function TabelProcessing({ data }) {
  return (
    <table className="dataset">
      <thead>
        <tr>
          <th className="nomor">No.</th>
          <th className="text3">Hasil Pemrosesan</th>
          <th className="emotion2">Emosi Manual</th>
          <th className="emotion2">Emosi Prediksi</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={index}>
            <th>{item.no}</th>
            <th>{item.preprocessedText}</th>
            <th>{item.emotion}</th>
            <th>{item.predictedEmotion}</th>
            <th><ButtonChange /></th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TabelProcessing;
