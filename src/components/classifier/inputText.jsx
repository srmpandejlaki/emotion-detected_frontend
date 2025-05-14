import React from "react";
import useInput from "../../hooks/useInput";

function InputText({ classify }) {
  const [text, onTextChange] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    classify({ text });
  };

  return (
    <form className="formClassifier" onSubmit={onSubmitHandler}>
      <input type="text" value={text} onChange={onTextChange} placeholder="Masukkan kalimatmu disini" />
      <button className="btn-process2" type="submit">Klasifikasi</button>
    </form>
  );
}

export default InputText;
