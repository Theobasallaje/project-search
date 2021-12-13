import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import DeleteModal from "./Components/DeleteModal/DeleteModal";

var projects = [
  {
    id: 1,
    title: "cursus euismod quis",
    description: "elementum tempus egestas sed vulputate dignissim",
    tags: ["Work", "2020", "Assignment"]
  },
  {
    id: 2,
    title: "velit egestas dui",
    description: "in egestas erat imperdiet sed euismod nisi porta lorem",
    tags: ["Home", "Personal", "2021"]
  },
  {
    id: 3,
    title: "at erat pellentesque",
    description: "elementum pulvinar etiam non quam lacus suspendisse",
    tags: ["Home", "Personal", "2020"]
  },
  {
    id: 4,
    title: "erat velit scelerisque",
    description: "faucibus in ornare quam viverra orci sagittis",
    tags: ["Home", "Archive", "2019"]
  }
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState(projects);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectIdToBeDeleted, setProjectIdToBeDeleted] = useState(null);
  const [projectNameToBeDeleted, setProjectNameToBeDeleted] = useState("");

  const handleDeleteModal = (title) => {
    setShowDeleteModal(!showDeleteModal);
    setProjectNameToBeDeleted(title);
  };

  const handleDelete = () => {
    setFilteredResults((projects) =>
      projects.filter((project) => project.id !== projectIdToBeDeleted)
    );
    handleDeleteModal();
  };

  const Project = ({ title, description, tags, id }) => {
    return (
      <div className="container">
        <div className="card">
          <div className="cardContainer">
            <h3>
              <b>Project name</b>
            </h3>
            <p>{title}</p>
            <h3>
              <b>Description</b>
            </h3>
            <p>{description}</p>
            <h3>
              <b>Tags</b>
            </h3>
            {tags.map((tag) => (
              <div className="chip">{tag}</div>
            ))}
            <button
              className="removeButton"
              onClick={() => {
                handleDeleteModal(title);
                setProjectIdToBeDeleted(id);
              }}
            >
              <FontAwesomeIcon className="removeIcon" icon={faTrash} />
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (searchTerm !== "") {
      const filteredData = projects.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(projects);
    }
  }, [searchTerm]);

  return (
    <div className="App">
      <div className="searchContainer">
        <input
          type="text"
          placeholder=" Enter a Keyword to Filter"
          className="searchBar"
          name="search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FontAwesomeIcon className="searchIcon" icon={faSearch} />
      </div>
      {filteredResults.length > 0 ? (
        filteredResults.map((project) => (
          <Project
            key={project.id}
            title={project.title}
            description={project.description}
            tags={project.tags}
            id={project.id}
          />
        ))
      ) : (
        <h1 className="noResults">No Results</h1>
      )}
      {showDeleteModal && (
        <DeleteModal
          handleDelete={handleDelete}
          handleDeleteModal={handleDeleteModal}
          projectName={projectNameToBeDeleted}
        />
      )}
    </div>
  );
}
