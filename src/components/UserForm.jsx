import React from "react";

function UserForm() {
  return (
    <div className="col-md-3 mx-auto">
      <h2 className="mb-3 text-center">Registrar usuario</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            minLength="2"
            maxLength="50"
            autoFocus
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Foundation</label>
          <input
            type="number"
            name="foundation"
            className="form-control"
            min="1900"
            max="2020"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Website</label>
          <input
            type="url"
            name="website"
            className="form-control"
            maxLength="100"
            required
          />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-block btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
