import React, { useEffect, useState } from "react";
import ButtonAction from '../preprocessing/buttonAction';
import { fetchAllPreprocessing } from '../../utils/api/preprocessing';

function TabelPreprocessing() {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const result = await fetchAllPreprocessing();
      console.log("Hasil fetchAllPreprocessing:", result);
      if (!result.error) {
        setData(result.data);
      } else {
        alert("Gagal memuat data preprocessing.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan saat memuat data.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="table-wrapper">
      <table className="dataset">
        <thead>
          <tr>
            <th className="nomor">No.</th>
            <th className="text2">Text</th>
            <th className="text2">Preprocessing Result</th>
            <th className="emotion1">Emotion</th>
            <th className="action">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.text}</td>
                <td>{item.preprocessing_result}</td>
                <td>{item.emotion}</td>
                <td>
                  <ButtonAction id={item.id} onActionDone={loadData} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>Tidak ada data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TabelPreprocessing;
