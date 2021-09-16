import React from "react";
import "./Filter.css";

function Filter({ handleFilter }) {
  return (
    <div className="filters flex white">
      <div className="filter">
        <img src="" alt=""></img>
        <button onClick={handleFilter}>Hot</button>
      </div>
      <div className="filter">
        <img src="" alt=""></img>
        <button onClick={handleFilter}>Sweden</button>
      </div>
      <div className="filter">
        <img src="" alt=""></img>
        <button onClick={handleFilter}>New</button>
      </div>
      <div className="filter">
        <img src="" alt=""></img>
        <button onClick={handleFilter}>Top</button>
      </div>

      <div className="filter">
        <img src="" alt=""></img>
        <button onClick={handleFilter}>...</button>
      </div>
    </div>
  );
}

export default Filter;
