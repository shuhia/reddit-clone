import { React } from "react";
import "./Filters.css";

const filters = [
  { label: "Best", value: "best", icon: "✨" },
  { label: "Hot", value: "hot", icon: "🔥" },
  { label: "New", value: "new", icon: "🌟" },
  { label: "Top", value: "top", icon: "📈" },
  { label: "Rising", value: "rising", icon: "🚀" },
];

function Filters({ activeFilter, onFilterChange }) {
  const handleFilterChange = (value) => {
    if (value && value !== activeFilter) {
      onFilterChange?.(value);
    }
  };

  return (
    <div className="filters ui-pill-group" role="tablist" aria-label="Post filters">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`ui-pill ${activeFilter === filter.value ? "active" : ""}`}
          onClick={() => handleFilterChange(filter.value)}
          role="tab"
          aria-selected={activeFilter === filter.value}
        >
          <span className="icon" aria-hidden="true">
            {filter.icon}
          </span>
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
}

export default Filters;
