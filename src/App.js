import React, { useState, useRef } from "react";
import "./styles.css";

export function App(props) {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();

  const handleDrop = (event) => {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles) => {
    const totalFiles = [...Array.from(files || []), ...Array.from(newFiles)];
    if (totalFiles.length > 3) {
      alert("Você pode selecionar no máximo 3 arquivos.");
    } else {
      setFiles(totalFiles);
    }
  };
  const handleRemoveImg = (id) => {
    setFiles(
      Array.from(files).filter((_, index) => {
        return index !== id;
      })
    );
  };
  return (
    <div className="App">
      <div
        className="drop-container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h1>Arraste seus arquivos aqui</h1>
        <h2>Ou</h2>
        <button onClick={() => inputRef.current.click()}>
          Selecione o arquivo
        </button>
        <input
          type="file"
          accept="image/png, image/jpeg"
          multiple
          onChange={handleFileChange}
          ref={inputRef}
          hidden
        />
      </div>
      {files && (
        <>
          <ul className="preview-container">
            {Array.from(files).map((item, index) => (
              <li key={index}>
                <img src={URL.createObjectURL(item)} alt={item.name} />{" "}
                <button onClick={() => handleRemoveImg(index)}>X</button>
              </li>
            ))}
          </ul>
          <div className="action-container">
            <button onClick={() => setFiles(null)}>limpar</button>
            <button onClick={() => {}}>enviar</button>
          </div>
        </>
      )}
    </div>
  );
}
