import React from "react";
import useInput from "../../hooks/useInput";

function InputText({ classify }) {
  const [ text, onTextChange ] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    classify({ text });
  };

  return (
    <form className="formClassifier" onSubmit={onSubmitHandler}>
      <input type="text" value={text} onChange={onTextChange} placeholder="Input your text here" />
      <button className="btn-process" type="submit">Classify</button>
    </form>
  );
};

export default InputText;