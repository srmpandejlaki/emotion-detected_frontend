import React from "react";
import ButtonChange from '../buttonChange';

function TabelProcessing({ data }) {
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
