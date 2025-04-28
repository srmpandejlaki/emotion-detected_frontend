import React from "react";

function InputText() {
  return (
    <div className="formClassifier">
      <form action="">
        <input type="text" placeholder="Input your text here" />
      </form>
      <button className="btn-process">Classify</button>
    </div>
  );
};

export default InputText;