import React, { useEffect } from "react";
import "./DeleteModal.css";

export default function DeleteModal(props) {
  useEffect(() => {
    window.addEventListener("keydown", props.handleDeleteModal);
    return () => window.removeEventListener("keydown", props.handleDeleteModal);
  });

  return (
    <div className="deleteModalContainer" onClick={props.handleDeleteModal}>
      <div className="deleteModal">
        <h1>Delete {props.projectName}?</h1>
        <h3>This Action Cannot be Undone</h3>
        <div className="buttonDiv">
          <button className="cancelButton" onClick={props.handleDeleteModal}>
            Cancel
          </button>
          <button className="deleteButton" onClick={props.handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
