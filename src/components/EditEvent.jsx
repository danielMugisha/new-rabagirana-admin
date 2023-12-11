import React, { useState, useEffect, useRef } from "react";
import Flatpickr from "react-flatpickr";
import { useDropzone } from "react-dropzone";
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
  objectPosition: "center",
};

const img = {
  display: "block",
  width: "100%",
  objectFit: "contain",
};

const selectFile = {
  opacity: 0,
  position: "absolute",
  left: 0,
  top: 0,
};

const EditEvent = ({ handleFormSubmit, event, closeModal }) => {
  const [files, setFiles] = useState([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const [coverImage, setCoverImage] = useState();

  const [title, setTitle] = useState(event.title);
  const [startDate, setStartDate] = useState(event.startDate);
  const [endDate, setEndDate] = useState(event.endDate);
  const [regLink, setRegLink] = useState(event.registrationForm);
  const [featuredPdf, setFeaturedPdf] = useState(event.featuredPdf);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(files[0]);
    handleFormSubmit(
      title,
      startDate,
      endDate,
      regLink,
      files[0],
      featuredPdf
    );
  };
  useEffect(() => {
    setCoverImage(files[0]);
    return () => {
      files?.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);
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
              Edit Event
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
              <div class=" mb-3">
                <label for="photo-field" class="form-label">
                  Cover Image
                </label>
                <div
                    className=
                      " d-flex justify-content-center align-items-center"
                >
                  <div style={thumb}>
                    <div style={thumbInner}>
                      <img
                        src={
                          coverImage?.preview ??
                          `${process.env.REACT_APP_BASE_URL}${event.featuredImage}`
                        }
                        style={img}
                        alt="manna"
                      />
                    </div>
                  </div></div>
              </div>

              <div class="mb-3">
                <label for="title-field" class="form-label">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  id="title-field"
                  class="form-control"
                  placeholder="Enter Title"
                  required
                />
              </div>

              <div class="mb-3">
                <div>
                  <label class="form-label mb-0">Start time</label>
                  <Flatpickr
                    class="form-control"
                    data-enable-time
                    value={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                    }}
                  />
                </div>
              </div>

              <div class="mb-3">
                <div>
                  <label class="form-label mb-0">End time</label>
                  <Flatpickr
                    class="form-control"
                    data-enable-time
                    value={endDate}
                    onChange={(date) => {
                      setEndDate(date);
                    }}
                  />
                </div>
              </div>

              <div class="mb-3">
                <label for="title-field" class="form-label">
                  Registration Link
                </label>
                <input
                  value={regLink}
                  onChange={(e) => setRegLink(e.target.value)}
                  type="text"
                  id="title-field"
                  class="form-control"
                  placeholder="Enter Registration Link"
                />
              </div>

              <div class="mb-3">
                <label for="title-field" class="form-label">
                  Featured Document
                </label>
                <div class="d-flex justify-content-between">
                  <input
                    type="file"
                    id="selectedFile"
                    style={selectFile}
                    onChange={(e) => setFeaturedPdf(e.target.files[0])}
                  />
                  <input
                    value={featuredPdf.split("\\")[1]}
                    id="title-field"
                    class="form-control"
                    style={{ width: "85%" }}
                    placeholder="Select a file"
                    disabled
                  />
                 
                </div>
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
                  Add Event
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
