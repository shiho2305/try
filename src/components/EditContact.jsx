import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const EditContact = ({ user, handleEditCancel, handleUpdateUser }) => {
    const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

//   const handleSubmit = () => {
//     handleUpdateUser(editedUser);
//   };

const handleSubmit = () => {
    // Make API call to update the user data on the server
    fetch(`https://jsonplaceholder.typicode.com/users/${editedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedUser),
    })
    .then((response) => response.json())
    .then((data) => {
      // Update the changes in the parent component (UsersDetails)
      handleUpdateUser(data);
    })
    .catch((error) => {
      console.error('Error updating user:', error);
      // Handle any error that may occur during the API call
    });
  };

  const handleCancel = () => {
    handleEditCancel();
  };

  return (
    <div className="col-6">
      <div>
        <div>
          <h4 className="text-info">Contact: </h4>
        </div>
        <div className="mt-3">
          <div>
            <label
              htmlFor="email"
              className="mb-2"
              style={{ fontSize: "medium", fontWeight: "400" }}
            >
              Email:{" "}
            </label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="mb-2"
              style={{ fontSize: "medium", fontWeight: "400" }}
            >
              Phone:{" "}
            </label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="website"
              className="mb-2"
              style={{ fontSize: "medium", fontWeight: "400" }}
            >
              Website:{" "}
            </label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                name="website"
                value={editedUser.website}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <Button variant="success" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="danger" onClick={handleCancel}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default EditContact;
