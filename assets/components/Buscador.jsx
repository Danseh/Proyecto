import React, { useState } from 'react';

const defaultUrl = `/api/pisos`;

const Buscador = ({ setJsonData }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const searchUrl = `/api/pisos?ciudad=${searchKeyword}`;

  const getInfo = async (url) => {
    try {
      let respuesta = await fetch(url);
      let data = await respuesta.json();
      console.log(data);
      setJsonData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.length === 0) {
      getInfo(defaultUrl);
    }
    getInfo(searchUrl);
  }

  const handleChange = (e) => {
    setSearchKeyword(e.target.value);
  }
  

  return (
    <form className="formBuscador" onSubmit={handleSubmit}>
      <input type="search" value={searchKeyword} onChange={handleChange} name="inputBuscador" className="form-control" id="inputBuscador" />
      <button type="submit" name="btnBuscar" className="btn btn-info mt-0 ml-2" id="btnBuscar">Buscar por Ciudad</button>
    </form>
  )
}

export default Buscador