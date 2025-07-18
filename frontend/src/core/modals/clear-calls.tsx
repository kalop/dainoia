import React from 'react'
import { Link } from 'react-router-dom'

const ClearCalls = () => {
  return (
    <>
    {/* Delete Chat */}
<div className="modal fade" id="clear-call">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">Clear Call Logs</h4>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i className="ti ti-x" />
        </button>
      </div>
      <div className="modal-body">
        <form >
          <div className="block-wrap text-center mb-3">
            <span className="user-icon mb-3 mx-auto bg-transparent-danger">
              <i className="ti ti-trash text-danger" />
            </span>
            <p className="text-grya-9">
            Clearing or deleting entire call will only remove call log from this device and your devices on the newer versions of DreamsChat.
            </p>
          </div>
          <div className="row g-3">
            <div className="col-6">
              <Link
                to="#"
                className="btn btn-outline-primary w-100"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cancel
              </Link>
            </div>
            <div className="col-6">
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary w-100">
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
{/* /Delete Chat */}
  </>
  )
}

export default ClearCalls