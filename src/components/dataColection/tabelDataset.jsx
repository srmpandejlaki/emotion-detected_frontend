import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../utils/api/fetcher";

function TabelDataset() {
  const { data, isLoading, error } = useQuery(
    ["dataset"],
    () => fetcher("http://localhost:8000/api/dataset") // Ganti sesuai URL backend-mu
  );

  if (isLoading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <table className="dataset">
        <thead>
          <tr>
            <th className="nomor">No</th>
            <th className="text1">Teks</th>
            <th className="emotion1">Emotion</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id || index}>
              <td>{index + 1}</td>
              <td>{item.text}</td>
              <td>{item.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TabelDataset;