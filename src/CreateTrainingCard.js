import React, { useState } from "react";
import { 
  // collection, addDoc, 
  setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const CreateTrainingCard = () => {
  const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  const [embedCodes, setEmbedCodes] = useState({
    Embed: "",
    // field: "",
    // main: "",
    // quiz: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // const handleContentChange = (e) => {
  //   setContent(e.target.value);
  // };

  const handleEmbedCodeChange = (field, e) => {
    setEmbedCodes((prevCodes) => ({
      ...prevCodes,
      [field]: e.target.value,
    }));
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCreateTraining = async () => {
    if (title) {
      try {
        const docRef = doc(db, "trainings", title);
  
        const data = {
          title: title,
          embedCodes: { ...embedCodes },
        };
  
        await setDoc(docRef, data);
  
        setTitle("");
        // setContent("");
        setEmbedCodes({
          Embed: "",
          // field: "",
          // main: "",
          // quiz: "",
        });
      } catch (error) {
        console.error("Error adding training document: ", error);
        setShowErrorMessage(true);
      }
    }
  };
  

  return (
    <div className="container">
      <div className="card" style={{ border: !showForm ? "none" : "" }}>
        <div className="card-body" style={{ position: "relative" }}>
          <span className="tt" data-bs-placement="bottom" title="Add Training">
            <button
              onClick={handleToggleForm}
              style={{
                background: "none",
                border: "none",
                outline: "none",
                boxShadow: "none",
                position: "absolute",
                top: "1rem",
                left: "2.1rem",
                transform: "translate(-50%, -50%)",
                display: showForm ? "none" : "flex",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              <i
                className={`fa-solid fa-plus fa-lg ${
                  showForm ? "collapsed" : ""
                }`}
                style={{
                  color: "#034284",
                }}
              ></i>
            </button>
          </span>
          <span className="tt" data-bs-placement="bottom" title="Cancel">
            <button
              onClick={handleToggleForm}
              style={{
                background: "none",
                border: "none",
                outline: "none",
                boxShadow: "none",
                position: "absolute",
                top: "1rem",
                left: "2.1rem",
                transform: "translate(-50%, -50%)",
                display: !showForm ? "none" : "flex",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              <i
                className={`fa-solid fa-minus fa-lg ${
                  showForm ? "collapsed" : ""
                }`}
                style={{
                  color: "#034284",
                }}
              ></i>
            </button>
          </span>
          {showForm && (
            <>
              <form>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={title}
                  onChange={handleTitleChange}
                  required
                  style={{ marginTop: "15px", marginBottom: "15px" }}
                />
                {/* <textarea
                  id="content"
                  className="form-control"
                  name="content"
                  placeholder="Training Content"
                  value={content}
                  onChange={handleContentChange}
                  required
                ></textarea> */}
                {Object.entries(embedCodes).map(([field, value]) => (
                  <textarea
                    key={field}
                    id={`embedCode-${field}`}
                    className="form-control"
                    name={`embedCode-${field}`}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={value}
                    onChange={(e) => handleEmbedCodeChange(field, e)}
                    style={{ marginTop: "15px", marginBottom: "15px" }}
                  ></textarea>
                ))}
              </form>
              <br />
              <button className="btn btn-custom" onClick={handleCreateTraining}>
                Create
              </button>
              {showErrorMessage && (
                <p className="text-danger">
                  Something went wrong. Please try again.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTrainingCard;