import { React, useState } from "react";

function Filter({ handleFilter }) {
  return (
    <div className="filter">
      <img src="" alt=""></img>
      <button onClick={handleFilter} value="new">
        New
      </button>
    </div>
  );
}

export default Filter;
