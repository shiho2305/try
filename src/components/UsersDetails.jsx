import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import EditContact from "./EditContact";
import { Outlet, NavLink, Link } from "react-router-dom";

const UsersDetails = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  const [albums, setAlbums] = useState([]);

  const [editing, setEditing] = useState(false);


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUser(data));

    fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
      .then((response) => response.json())
      .then((data) => setAlbums(data));
  }, [id]);

//   const handleDeleteAlbums = (id) => {
//     const deleteAlbums = albums.filter((album) => album.id !== id);
//     setAlbums(deleteAlbums);
//   }

const handleDeleteAlbum = (albumId) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
      method: 'DELETE',
    })
    .then((response) => response.json())
    .then(() => {
      setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== albumId));
    })
    .catch((error) => {
      console.error('Error deleting album:', error);
    });
  };

  const handleEditContact = () => {
    setEditing(true);
  }

  const handleEditCancel = () => {
    setEditing(false);
  }

//   const handleUpdateUser = (updatedUser) => {
//     setUser((prevUsers) => {
//       const updatedUsers = [...prevUsers];
//       updatedUsers[id - 1] = updatedUser;
//       return updatedUsers;
//     });
//     setEditing(false);
//   };

const handleUpdateUser = (updatedUser) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
    .then((response) => response.json())
    .then((data) => {
      // Update the changes in the user state
      setUser((prevUsers) => {
        const updatedUsers = [...prevUsers];
        updatedUsers[id - 1] = data;
        return updatedUsers;
      });
      setEditing(false);
    })
    .catch((error) => {
      console.error('Error updating user:', error);
      // Handle any error that may occur during the API call
    });
  };

  const handleAddAlbum = (albumTitle) => {
    fetch(`https://jsonplaceholder.typicode.com/albums`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: parseInt(id),
        title: albumTitle,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAlbums((prevAlbums) => [...prevAlbums, data]);
      })
      .catch((error) => {
        console.error('Error adding album:', error);
      });
  };


  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-3 mb-3 fw-bolder detail-content">
      <h2>{user[id - 1].name}</h2>
      
      <div className="mt-4 mb-4 row detail-parent">

      {/* {!editing ? ( */}
        <div className="col-6 detail-item">
            <div>
                <div>
                    <h4 className="text-info">Personal: </h4>
                </div>
                <div className="detail-child mt-3">
                    <div className="row">
                        <p className="col-3 fw-normal">Id: </p>
                        <p className="col-9 fw-bold">{user[id - 1].id}</p>
                    </div>
                    <div className="row">
                        <p className="col-3 fw-normal">Username: </p>
                        <p className="col-9 fw-bold">{user[id - 1].username}</p>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <div>
                    <h4 className="text-info">Address: </h4>
                </div>
                <div className="detail-child mt-3">
                    <div className="row">
                        <p className="col-3 fw-normal">Street: </p>
                        <p className="col-9 fw-bold">{user[id - 1].address.street}</p>
                    </div>
                    <div className="row">
                        <p className="col-3 fw-normal">Suite: </p>
                        <p className="col-9 fw-bold">{user[id - 1].address.suite}</p>
                    </div>
                    <div className="row">
                        <p className="col-3 fw-normal">City: </p>
                        <p className="col-9 fw-bold">{user[id - 1].address.city}</p>
                    </div>
                    <div className="row">
                        <p className="col-3 fw-normal">Zipcode: </p>
                        <p className="col-9 fw-bold">{user[id - 1].address.zipcode}</p>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <div>
                    <h4 className="text-info">Company: </h4>
                </div>
                <div className="detail-child mt-3">
                    <div className="row">
                        <p className="col-3 fw-normal">Name: </p>
                        <p className="col-9 fw-bold">{user[id - 1].company.name}</p>
                    </div>
                    <div className="row">
                        <p className="col-3 fw-normal">CatchPhrase: </p>
                        <p className="col-9 fw-bold">{user[id - 1].company.catchPhrase}</p>
                    </div>
                    <div className="row">
                        <p className="col-3 fw-normal">Bs: </p>
                        <p className="col-9 fw-bold">{user[id - 1].company.bs}</p>
                    </div>
                </div>
            </div>
        </div>

        {!editing ? (
        <div className="col-6">
            <div>
                <div>
                    <h4 className="text-info">Contact: </h4>
                </div>
                <div className="detail-child mt-3">
                    <div className="row">
                        <p className="col-3 fw-normal">Email: </p>
                        <p className="col-9 fw-bold">{user[id - 1].email}</p>
                    </div>
                    <div className="row">
                        <p className="col-3 fw-normal">Website: </p>
                        <p className="col-9 fw-bold">{user[id - 1].website}</p>
                    </div>
                    <div className="row">
                        <p className="col-3 fw-normal">Phone: </p>
                        <p className="col-9 fw-bold">{user[id - 1].phone}</p>
                    </div>
                </div>

            </div>

            <div>
              <Button variant="success" onClick={handleEditContact}>Edit</Button>
            </div>
          </div>
        ) : (
          <EditContact user={user[id - 1]} handleEditCancel={handleEditCancel} handleUpdateUser={handleUpdateUser} />
        )}

        {/* <EditContact/> */}
        
        

      </div>

      <hr style={{color: "gray"}} />

      <div className="container mt-3 mb-3">
          <h3>Photo Albums: </h3>
          <div className="row">
            <div className="col-6 col-md-6 col-sm-10 mt-3">
                <div className="input-group input-group-lg gap-3">
                <input
                type="text"
                className="form-control inputNewAlbum"
                placeholder="Title of new album"
                style={{ borderRadius: '5px' }}
              />
              <Button
                variant="success"
                style={{ borderRadius: '5px', paddingLeft: '1.7rem', paddingRight: '1.7rem' }}
                onClick={() => {
                  const input = document.querySelector('.inputNewAlbum');
                  handleAddAlbum(input.value);
                  input.value = '';
                }}
              >
                New Album
              </Button>
                </div>
            </div>

            <div className="inputPhoto-list mb-4">
            {albums.map((album, index) => (
              <div key={album.id} className="mt-4 d-flex justify-content-between align-items-center rounded text-decoration-none inputPhoto">
                <div className="py-2 border-end flex-shrink-0 d-flex justify-content-center align-items-center inputPhotoNumber">{index + 1}</div>
                <div className="py-2 w-100 px-4 text-truncate fw-bold text-start">{album.title}</div>
                <div className="text-center flex-shrink-0 py-2 inputPhotoButton">
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteAlbum(album.id)}>X</button>
                </div>
              </div>
            ))}                
            </div>

            </div>

      </div>

    </div>
  );
};

export default UsersDetails;
