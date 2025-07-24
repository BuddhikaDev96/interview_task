import { useState } from "react";

function Task({ task, onUpdate, onDelete }) {
  const [tagInput, setTagInput] = useState("");

  function addTag(e) {
    if (e.key === "Enter" && tagInput.trim() !== "" && task.tags.length < 3) {
      task.tags.push(tagInput.trim());
      setTagInput("");
      onUpdate();
    }
  }

  function removeTag(tag) {
    task.tags = task.tags.filter((t) => t !== tag);
    onUpdate();
  }

  return (
    <div className="card task ">
      <div className="d-flex">
        <button className="btn-close ms-auto" onClick={() => onDelete(task.id)} aria-label="Delete" ></button>
      </div>

      <div className="card-body pt-0">
        <p className="card-title">{task.name}</p>
        <select
          className="form-select col-12 mb-3"
          value={task.status}
          onChange={(e) => {
            task.status = e.target.value;
            onUpdate();
          }}
        >
          <option
            value="todo"
            disabled={task.status === "ongoing" || task.status === "completed"}
          >
            TODO
          </option>
          <option value="ongoing" disabled={task.status === "completed"}>
            ONGOING
          </option>
          <option value="completed">COMPLETED</option>
        </select>

        <input
          type="text"
          className="form-control col-12"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={addTag}
          placeholder="Add Tags"
          disabled={task.tags.length >= 3}
        />

        <div className="d-flex flex-wrap mt-2">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="badge  me-2 mb-2 d-flex align-items-center"
              style={{
                fontSize: "1em",
                padding: "0.5em 0.75em",
                backgroundColor: "gray",
                color: "white",
              }}
            >
              {tag}
              <button
                type="button"
                className="btn-close btn-close-white ms-2"
                aria-label="Remove"
                onClick={() => removeTag(tag)}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Task;
