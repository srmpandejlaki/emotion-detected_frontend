import React, { useEffect, useState } from "react";
import ButtonAction from './buttonAction';
import { fetchAllPreprocessing } from '../../utils/api/preprocessing';

function TabelPreprocessing() {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const result = await fetchAllPreprocessing();
    if (!result.error) {
      setData(result.data);
    } else {
      alert("Gagal memuat data preprocessing.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
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
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.text}</td>
              <td>{item.preprocessing_result}</td>
              <td>{item.emotion}</td>
              <td>
                <ButtonAction id={item.id} onActionDone={loadData} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TabelPreprocessing;
