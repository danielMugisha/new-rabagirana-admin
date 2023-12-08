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

const AddEvent = ({ handleFormSubmit, closeModal }) => {
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
  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  const [title, setTitle] = useState();
  const [summary, setSummary] = useState();
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());
  const [regLink, setRegLink] = useState();
  const [featuredPdf, setFeaturedPdf] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(
      title,
      summary,
      startDate,
      endDate,
      regLink,
      files[0],
      featuredPdf
    );
  };
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      files?.forEach((file) => URL.revokeObjectURL(file.preview));
      setCoverImage(files[0]?.preview);
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
              Add Event
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
                  {...getRootProps({
                    className:
                      "dropzone d-flex justify-content-center align-items-center",
                  })}
                >
                  <input {...getInputProps()} />
                  {thumbs.length ? (
                    <aside style={thumbsContainer}>{thumbs}</aside>
                  ) : (
                    <p>
                      Drag 'n' drop cover image here , or click to select file
                    </p>
                  )}
                </div>
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
                <label for="summary-field" class="form-label">
                  Summary
                </label>
                <input
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  type="text"
                  id="summary-field"
                  class="form-control"
                  placeholder="Enter Summary"
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
                    value={featuredPdf?.name}
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

export default AddEvent;
