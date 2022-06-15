import React, { useState } from 'react';

let searchUrl = "";


const Buscador = ({ setJsonData }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [priceRange, setPriceRange] = useState(0);
  

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
      if (priceRange === 0) {
      searchUrl = `/api/pisos`;
      }
      else {
        searchUrl = `/api/pisos?precio[between]=0..${priceRange}`;
      }
    }
    else {
      if (priceRange === 0) {
        searchUrl = `/api/pisos?ciudad=${searchKeyword}`;
        }
      else {
        searchUrl = `/api/pisos?ciudad=${searchKeyword}&precio[between]=0..${priceRange}`;
      }
      
    }
    console.log(searchUrl);
    getInfo(searchUrl);

  }

  const handleChange = (e) => {
    if (e.target.name === "inputBuscador") {
      setSearchKeyword(e.target.value);
    }

    if (e.target.name === "rangoPrecio") {
      setPriceRange(e.target.value);
    }
  }


  return (
    <form className="formBuscador" onSubmit={handleSubmit}>
      <input type="search" value={searchKeyword} onChange={handleChange} name="inputBuscador" className="form-control" id="inputBuscador" pattern="[a-zA-ZÀ-ÿ\s]+" title="Solo puede contener letras" 
      placeholder="Buscar piso por ciudad" />
      <button type="submit" name="btnBuscar" className="btn btn-info mt-0 ml-2" id="btnBuscar">Buscar</button>

      <div className="rangoPrecio">

      <input type="range" value={priceRange} min="0" max="1000" step="100" onChange={handleChange} name="rangoPrecio" className="rangoPrecio" list="tickmarks"/>


      <output id="output" for="rangeInput">Precio: 0€ - {priceRange}€</output>
      </div>
    </form>
  )
}

export default Buscador