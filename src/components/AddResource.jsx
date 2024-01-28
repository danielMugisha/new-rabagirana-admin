import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Flatpickr from "react-flatpickr";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  width: 250,
  height: 250,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const selectFile = {
  opacity: 0,
  position: "absolute",
  left: 0,
  top: 0,
};

const AddResource = ({ handleFormSubmit, closeModal }) => {
  const [category, setCategory] = useState();
  const [file, setFile] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(
      file.name,
      category,
      file
    );
  };
  
  return (
    <div
      class="modal fade show"
      id="showModal"
      tabindex="1"
      aria-modal="true"
      role="dialog"
      style={{ display: "block" }}
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-light p-3">
            <h5 class="modal-title" id="exampleModalLabel">
              Add Resource
            </h5>
            <button
              type="button"
              class="btn-close"
              onClick={closeModal}
              id="close-modal"
            ></button>
          </div>
          <form class="tablelist-form" autocomplete="off">
            <div class="modal-body">
            <div class="mb-3">
                <label for="title-field" class="form-label">
                  File
                </label>
                <div class="d-flex justify-content-between">
                  <input
                    type="file"
                    id="selectedFile"
                    style={selectFile}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <input
                    value={file?.name}
                    id="title-field"
                    class="form-control"
                    style={{ width: "85%" }}
                    placeholder="Select a file"
                    disabled
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("selectedFile").click();
                    }}
                    class="btn btn-primary"
                    id="add-btn"
                  >
                    Select a File
                  </button>
                </div>
              </div>

              <div class="mb-3">
                <label for="title-field" class="form-label">
                  Category
                </label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  type="text"
                  id="title-field"
                  class="form-control"
                  placeholder="Enter Category"
                  required
                />
              </div>
              
            </div>
            <div class="modal-footer">
              <div class="hstack gap-2 justify-content-end">
                <button
                  type="button"
                  class="btn btn-light"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  class="btn btn-success"
                  id="add-btn"
                >
                  Add Resource
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddResource;
