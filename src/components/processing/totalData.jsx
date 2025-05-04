import React from "react";

function TotalData({ newData, oldData, totalData }) {
  return (
    <div className="totalDataProcessing">
      <p>Data Baru: {newData}</p>
      <p>Data Lama: {oldData}</p>
      <p>Total Data: {totalData}</p>
    </div>
  );
};

export default TotalData;
