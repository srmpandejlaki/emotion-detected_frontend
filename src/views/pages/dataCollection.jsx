import React from "react";
import TableDataset from '../../components/dataColection/tabelDataset';
import InputFile from "../../components/dataColection/inputCSV";
import AddSave from "../../components/dataColection/addSave";

function DataCollectionPage() {
  return (
    <div className="container">
      <h1>Dataset</h1>
      <div className="tabel">
        <TableDataset></TableDataset>
        <AddSave></AddSave>
      </div>
      <InputFile></InputFile>
    </div>
  );
}

export default DataCollectionPage;