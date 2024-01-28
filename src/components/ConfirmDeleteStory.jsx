import React from 'react'
import axios from 'axios';

const ConfirmDelete = ({story, CloseDeleteModal}) => {
    const handleDelete = () => {
        const url = process.env.REACT_APP_API_BASE_URL;
        const accessToken = localStorage.getItem('token');
        axios.delete(`${url}story/${story._id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
      .then(res => {
        CloseDeleteModal();
      }).catch(err => {console.log(err);});

    }
  return (
    <div class="modal fade zoomIn show" id="deleteRecordModal" tabindex="1" aria-modal="true" role='dialog' style={{display:'block'}}>
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="btn-close" onClick={CloseDeleteModal} id="btn-close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mt-2 text-center">
                                        <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style={{width:"100px", height:"100px"}}></lord-icon>
                                        <div class="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                                            <h4>Are you Sure ?</h4>
                                            <p class="text-muted mx-4 mb-0">Are you Sure You want to Remove this Record ?</p>
                                        </div>
                                    </div>
                                    <div class="d-flex gap-2 justify-content-center mt-4 mb-2">
                                        <button type="button" class="btn w-sm btn-light" onClick={CloseDeleteModal}>Cancel</button>
                                        <button type="button" class="btn w-sm btn-danger " id="delete-record" onClick={handleDelete}>Yes, Delete It!</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
  )
}

export default ConfirmDelete
