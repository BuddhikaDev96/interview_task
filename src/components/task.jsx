import { useState } from "react";

function Task({ props }) {
  const [tags, setTags] = useState([]);
  function addTag(e) {
    if (e.key === "Enter") {
        
     tags.push(e.target.value);
      setTags([...tags]);
      e.target.value = "";
    }
  }
  function removeTag(tag) {
  //  props.tags.splice(props.tags.indexOf(tag), 1);
    setTags([...props.tags]);
  }
  return (
    <div className="card task">
      <div className="card-body">
        <p className="card-title">{props.name}</p>
        <select
          name="task"
          id=""
          onChange={(e) => {
            props.status = e.target.value;
          }}
          value={props.status}
        >
          <option key="todo" value="todo">
            TODO
          </option>
          <option key="ongoing" value="ongoing">
            ONGOING
          </option>
          <option key="completed" value="completed">
            COMPLETED
          </option>
        </select>
        <input
          type="text"
          placeholder="Add Tags"
          className="col-12"
          disabled={props.tags.length >= 2}
          onKeyDown={addTag}
        ></input>
        {tags.map((tag) => (
            
          <div >
            <p>{tag}</p>
            <button className="btn" onClick={removeTag(tag)}>
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Task;
