const ValidationResultPage = ({ data }) => {
  return (
    <div>
      <h2>Hasil Prediksi</h2>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Teks</th>
            <th>Label Asli</th>
            <th>Prediksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{d.text}</td>
              <td>{d.true_label}</td>
              <td>{d.predicted_emotion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ValidationResultPage;
