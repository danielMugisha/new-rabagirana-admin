import React, { useState, useEffect } from "react";
import axios from "axios";
import AddResource from "../components/AddResource";
import ConfirmDeleteResource from "../components/ConfirmDeleteResource";

const Resource = () => {
  const [selectedItem, setSelectedItem] = useState({});
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const url = process.env.REACT_APP_API_BASE_URL;
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [resources, setResources] = useState();

  const handleFormSubmit = (
    name,
    category,
    file,
  ) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("file", file);
    const accessToken = localStorage.getItem("token");
    axios
      .post(`${url}resource`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        fetchResources();
        setAddDialog(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const handleRemove = (event) => {
    setSelectedItem(event);
    setConfirmDialog(true);
  };

  const CloseDeleteModal = () => {
    setSelectedItem({});
    fetchResources();
    setConfirmDialog(false);
  };

  const closeAddModal = () => {
    setAddDialog(false);
  };
  
  const fetchResources = async (req, res) => {
    await axios
      .get(`${url}resources`)
      .then((res) => {
        setResources(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchResources();
  }, []);
  return (
    <div>
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 class="mb-sm-0">Resources</h4>
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
                              onClick={()=>setAddDialog(true)}
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
                              <th class="email">File Name</th>
                              <th class="date">Category</th>
                              <th class="action">Action</th>
                            </tr>
                          </thead>
                          <tbody class="list form-check-all">
                            {resources?.map((resource, count = 0) => (
                              <tr>
                                <th class="customer_name">{++count}</th>
                                <th class="email">{resource.name}</th>
                                <th class="email">{resource.category}</th>
                                <td>
                                  <div class="d-flex gap-2">
                                    <div class="edit">
                                      <a
                                        class="btn btn-sm btn-success edit-item-btn"
                                        href={`${baseUrl}${resource.featuredFile}`}
                                        target="_blank"
                                      >
                                        View
                                      </a>
                                    </div>
                                    <div class="remove">
                                      <button
                                        class="btn btn-sm btn-danger remove-item-btn"
                                        onClick={() => handleRemove(resource)}
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
              <AddResource
                handleFormSubmit={handleFormSubmit}
                closeModal={closeAddModal}
              />
            )}
            {confirmDialog && (
              <ConfirmDeleteResource
                item={selectedItem}
                CloseDeleteModal={CloseDeleteModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resource;
