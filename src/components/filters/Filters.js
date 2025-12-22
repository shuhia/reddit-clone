import { React } from "react";
import "./Filters.css";

function Filters(props) {
  const { handleFilter, activeFilter } = props;
  const filters = [
    { label: "Best", value: "best", icon: "bi-magic" },
    { label: "Hot", value: "hot", icon: "bi-fire" },
    { label: "New", value: "new", icon: "bi-stars" },
    { label: "Top", value: "top", icon: "bi-graph-up" },
    { label: "Rising", value: "rising", icon: "bi-rocket" },
  ];

  return (
    <div className="filters" role="tablist" aria-label="Post filters">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`filter ${activeFilter === filter.value ? "active" : ""}`}
          onClick={handleFilter}
          value={filter.value}
          role="tab"
          aria-selected={activeFilter === filter.value}
        >
          <i className={`bi ${filter.icon}`} aria-hidden="true"></i>
          <span>{filter.label}</span>
        </button>
      ))}
      <button
        className="filter more"
        onClick={handleFilter}
        value="random"
        aria-label="More filters"
      >
        <i className="bi bi-three-dots" aria-hidden="true"></i>
      </button>
    </div>
  );
}

export default Filters;
