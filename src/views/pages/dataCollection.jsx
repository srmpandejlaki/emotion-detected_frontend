import React from "react";
import TableDataset from '../../components/dataColection/tabelDataset';
import InputFile from "../../components/dataColection/inputCSV";
import AddSave from "../../components/dataColection/addSave";

function DataCollectionPage() {
  return (
    <div className="container">
      <h1>Dataset</h1>
      <section>
        <div className="tabel">
          <TableDataset></TableDataset>
          <AddSave></AddSave>
        </div>
        <InputFile></InputFile>
      </section>
    </div>
  );
}

export default DataCollectionPage;