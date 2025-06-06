export default function TaskFilter({ filterStatus, setFilterStatus }) {
  return (
    <div className="filter-buttons">
      <button
        onClick={() => setFilterStatus("all")}
        className={filterStatus === "all" ? "active" : ""}
      >
        הכל
      </button>

      <button
        onClick={() => setFilterStatus("done")}
        className={filterStatus === "done" ? "active" : ""}
      >
        בוצעו
      </button>

      <button
        onClick={() => setFilterStatus("not_done")}
        className={filterStatus === "not_done" ? "active" : ""}
      >
        לא בוצעו
      </button>
    </div>
  );
}
