import { React, useState } from "react";
import "./Filter.css";
import faker from "faker";

function Filter({ handleFilter }) {
  const [countries, setCountries] = useState(
    [...Array(5)].map(() => faker.address.country())
  );

  return (
    <div className="filters flex white">
      <div className="filter">
        <img src="" alt=""></img>
        <button onClick={handleFilter} value="hot">
          Hot
        </button>
      </div>
      <div className="filter">
        <img src="" alt=""></img>
        <select className="filter" onChange={handleFilter}>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="filter">
        <img src="" alt=""></img>
        <button onClick={handleFilter} value="new">
          New
        </button>
      </div>
      <div className="filter">
        <img src="" alt=""></img>
        <button onClick={handleFilter} value="top">
          Top
        </button>
      </div>

      <div className="filter">
        <img src="" alt=""></img>
        <button onClick={handleFilter} value="...">
          ...
        </button>
      </div>
    </div>
  );
}

export default Filter;
