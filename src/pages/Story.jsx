import React, { useState, useEffect } from "react";
import axios from "axios";
import ConfirmDeleteStory from "../components/ConfirmDeleteStory";
import EditStory from "../components/EditStory";
import AddStory from "../components/AddStory";

const Story = () => {
  const [selectedItem, setSelectedItem] = useState({});
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [stories, setStories] = useState();

  const handleFormSubmit = (title, summary, content, author, image) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("author", author);
    formData.append("featuredImage", image);
    const url = process.env.REACT_APP_API_BASE_URL;
    const accessToken = localStorage.getItem("token");
    axios
      .post(`${url}story`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        fetchStories();
        setAddDialog(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditFormSubmit = (title, summary, content, author, image) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("author", author);
    formData.append("featuredImage", image);
    const url = process.env.REACT_APP_API_BASE_URL;
    const accessToken = localStorage.getItem("token");
    axios
      .put(`${url}story/${selectedItem._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        fetchStories();
        setEditDialog(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (story) => {
    setSelectedItem(story);
    setEditDialog(true);
  };
  const handleRemove = (story) => {
    setSelectedItem(story);
    setConfirmDialog(true);
  };
  const CloseDeleteModal = () => {
    setSelectedItem({});
    fetchStories();
    setConfirmDialog(false);
  };
  const closeAddModal = () => {
    setAddDialog(false);
  };
  const closeEditModal = () => {
    setEditDialog(false);
  };
  const fetchStories = async (req, res) => {
    const url = process.env.REACT_APP_API_BASE_URL;
    await axios
      .get(`${url}stories`)
      .then((res) => {
        setStories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div>
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 class="mb-sm-0">Stories</h4>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title mb-0">Add, Edit & Remove</h4>
                  </div>

                  <div class="card-body">
                    <div class="listjs-table" id="customerList">
                      <div class="row g-4 mb-3">
                        <div class="col-sm-auto">
                          <div>
                            <button
                              type="button"
                              class="btn btn-success add-btn"
                              onClick={() => setAddDialog(true)}
                            >
                              <i class="ri-add-line align-bottom me-1"></i> Add
                            </button>
                          </div>
                        </div>
                      </div>

                      <div class="table-responsive table-card mt-3 mb-1">
                        <table
                          class="table align-middle table-nowrap"
                          id="customerTable"
                        >
                          <thead class="table-light">
                            <tr>
                              <th class="customer_name">Id</th>
                              <th class="email">Title</th>
                              <th class="date">Date Created</th>
                              <th class="status">Author</th>
                              <th class="action">Action</th>
                            </tr>
                          </thead>
                          <tbody class="list form-check-all">
                            {stories?.map((story, count = 0) => (
                              <tr>
                                <td class="customer_name">{++count}</td>
                                <td class="email">{story.title}</td>
                                <td class="date">
                                  {new Date(
                                    story.createdAt
                                  ).toLocaleDateString()}
                                </td>
                                <td class="date">{story.author}</td>
                                <td>
                                  <div class="d-flex gap-2">
                                    <div class="edit">
                                      <button
                                        class="btn btn-sm btn-success edit-item-btn"
                                        onClick={() => handleEdit(story)}
                                      >
                                        Edit
                                      </button>
                                    </div>
                                    <div class="remove">
                                      <button
                                        class="btn btn-sm btn-danger remove-item-btn"
                                        onClick={() => handleRemove(story)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div class="noresult" style={{ display: "none" }}>
                          <div class="text-center">
                            <lord-icon
                              src="https://cdn.lordicon.com/msoeawqm.json"
                              trigger="loop"
                              colors="primary:#121331,secondary:#08a88a"
                              style={{ width: "75px", height: "75px" }}
                            ></lord-icon>
                            <h5 class="mt-2">Sorry! No Result Found</h5>
                            <p class="text-muted mb-0">
                              We've searched more than 150+ Orders We did not
                              find any orders for you search.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {addDialog && (
              <AddStory
                handleFormSubmit={handleFormSubmit}
                closeModal={closeAddModal}
              />
            )}
            {editDialog && (
              <EditStory
                handleFormSubmit={handleEditFormSubmit}
                story={selectedItem}
                closeModal={closeEditModal}
              />
            )}
            {confirmDialog && (
              <ConfirmDeleteStory
                story={selectedItem}
                CloseDeleteModal={CloseDeleteModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
