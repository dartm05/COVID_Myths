import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./layout/Navbar";
import Menu from "./components/Menu";
import Pregunta from "./components/Pregunta";

function App() {
  const [hayUsuario, sethayUsuario] = useState(false);
  const [q, setq] = useState("");
  const [show, setShow] = useState(false);
 
  const listarNoticias = (noticiass) => {
    return noticiass.map((elem) => {      
      return (
        <Pregunta
          user={hayUsuario}
          id={elem._id}
          key={elem._id}
          title={elem.titulo}
          contenido={elem.contenido}
          usuario={elem.usuario}
          mito={elem.mito}
          verdad={elem.verdad}
        ></Pregunta>
      );
    });
  };
  useEffect(() => {
    fetch("/preguntas/getPreguntas", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        const nn = listarNoticias(json);        
        setq(nn);
      });
  }, [hayUsuario]);

  return (
    <div>
      {hayUsuario ? (
        <Menu user={hayUsuario} q={q}></Menu>
      ) : (
        <Navbar setUsuario={sethayUsuario}></Navbar>
      )}
    </div>
  );
}

export default App;
