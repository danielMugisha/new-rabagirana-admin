import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
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

const EditStory = ({ handleFormSubmit, story, closeModal }) => {
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
  const [coverImage, setCoverImage] = useState(story.featuredImage);

  const editorRef = useRef(null);
  const [title, setTitle] = useState(story.title);
  const [summary, setSummary] = useState(story.summary);
  const [content, setContent] = useState(story.content);
  const [author, setAuthor] = useState(story.author);

  const handleTextEditor = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(files[0]);
    handleFormSubmit(title, summary, content, author, files[0] ?? null);
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
              Edit Story
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
                        files[0]?.preview ??
                          `https://pixabay.com/photos/urban-fashion-denim-outfit-9639853/`
                        }
                        style={img}
                        alt="story"
                      />
                    </div>
                  </div>
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
                <label for="content-field" class="form-label">
                  Content
                </label>
                <Editor
                  apiKey="wvg3xm3sog3b04e0m2ahy1g15n7s70whihvq83f9k9ucu4sl"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={content}
                  init={{
                    branding: false,
                    height: 300,
                    menubar: true,
                    plugins:
                      "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
                    toolbar:
                      "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
                  }}
                  onChange={handleTextEditor}
                />
              </div>

              <div class="mb-3">
                <label for="author-field" class="form-label">
                  Author
                </label>
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  type="text"
                  id="author-field"
                  class="form-control"
                  placeholder="Enter Author"
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
                  Save Story
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStory;
