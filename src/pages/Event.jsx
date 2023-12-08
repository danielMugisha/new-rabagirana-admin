import React, { useState, useEffect } from "react";
import axios from "axios";
import AddEvent from "../components/AddEvent";
import EditEvent from "../components/EditEvent";
import ConfirmDeleteEvent from "../components/ConfirmDeleteEvent";

const Event = () => {
  const [selectedItem, setSelectedItem] = useState({});
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [events, setEvents] = useState();

  const handleFormSubmit = (
    title,
    summary,
    startDate,
    endDate,
    regLink,
    featuredImage,
    featuredPdf
  ) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("registrationForm", regLink);
    formData.append("featuredImage", featuredImage);
    formData.append("featuredPdf", featuredPdf);
    const url = process.env.REACT_APP_API_BASE_URL;
    const accessToken = localStorage.getItem("token");
    axios
      .post(`${url}event`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        fetchEvents();
        setAddDialog(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditFormSubmit = (
    title,
    summary,
    startDate,
    endDate,
    regLink,
    featuredImage,
    featuredPdf
  ) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("registrationForm", regLink);
    formData.append("featuredImage", featuredImage);
    formData.append("featuredPdf", featuredPdf);
    const url = process.env.REACT_APP_API_BASE_URL;
    const accessToken = localStorage.getItem("token");
    axios
      .put(`${url}event/${selectedItem._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        fetchEvents();
        setEditDialog(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (event) => {
    setSelectedItem(event);
    setEditDialog(true);
  };
  const handleRemove = (event) => {
    setSelectedItem(event);
    setConfirmDialog(true);
  };

  const CloseDeleteModal = () => {
    setSelectedItem({});
    fetchEvents();
    setConfirmDialog(false);
  };

  const closeAddModal = () => {
    setAddDialog(false);
  };
  const closeEditModal = () => {
    setEditDialog(false);
  };
  const fetchEvents = async (req, res) => {
    const url = process.env.REACT_APP_API_BASE_URL;
    await axios
      .get(`${url}event`)
      .then((res) => {
        setEvents(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div>
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 class="mb-sm-0">Events</h4>
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
                              <th class="email">Title</th>
                              <th class="phone">Summary</th>
                              <th class="date">Start Date</th>
                              <th class="status">End Date</th>
                              <th class="action">Reg Link</th>
                              <th class="action">Action</th>
                            </tr>
                          </thead>
                          <tbody class="list form-check-all">
                            {events?.map((event, count = 0) => (
                              <tr>
                                <th class="customer_name">{++count}</th>
                                <th class="email">{event.title}</th>
                                <th class="phone">{event.summary}</th>
                                <th class="date">{new Date(
                                    event.startDate
                                  ).toLocaleString()}</th>
                                <th class="status">{new Date(
                                    event.endDate
                                  ).toLocaleString()}</th>
                                <th class="action">{event.registrationForm}</th>
                                <td>
                                  <div class="d-flex gap-2">
                                    <div class="edit">
                                      <button
                                        class="btn btn-sm btn-success edit-item-btn"
                                        onClick={() => handleEdit(event)}
                                      >
                                        Edit
                                      </button>
                                    </div>
                                    <div class="remove">
                                      <button
                                        class="btn btn-sm btn-danger remove-item-btn"
                                        onClick={() => handleRemove(event)}
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
              <AddEvent
                handleFormSubmit={handleFormSubmit}
                closeModal={closeAddModal}
              />
            )}
            {editDialog && (
              <EditEvent
                handleFormSubmit={handleEditFormSubmit}
                event={selectedItem}
                closeModal={closeEditModal}
              />
            )}
            {confirmDialog && (
              <ConfirmDeleteEvent
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

export default Event;
