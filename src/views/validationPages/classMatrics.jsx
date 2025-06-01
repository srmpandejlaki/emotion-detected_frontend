const MatricsValidationPage = ({ data }) => {
  if (!data) return <p>Belum ada data evaluasi</p>;

  return (
    <div>
      <h2>Evaluasi Model</h2>
      <p><strong>Akurasi:</strong> {data.accuracy.toFixed(4)}</p>

      <h3>Confusion Matrix</h3>
      <table>
        <tbody>
          {data.confusion_matrix.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Classification Report</h3>
      <pre>{JSON.stringify(data.classification_report, null, 2)}</pre>
    </div>
  );
};

export default MatricsValidationPage;
