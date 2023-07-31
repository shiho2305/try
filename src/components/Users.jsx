import React, { useEffect, useState } from "react";
import "./style.css";
import {useNavigate} from 'react-router-dom';

const Users = () => {

  const nav = useNavigate();

  const [users, setUsers] = useState([]);

//  const fetchUsers = async () => {
//       try{
//         const response = await fetch('https://jsonplaceholder.typicode.com/users');
//         if(!response.ok){
//           throw new Error("Network response was not ok.")
//         }
//         const data = await response.json();
//         setUsers(data);
//       } catch(error){
//         console.error("Error fetching data: ", error);
//       }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => setUsers(data));
  }, []);

  const handleDetail = (index) => {
    nav(`/users/` + (index + 1));
  }


  return (
    <div className="container mt-3 mb-3 fw-bolder table-Users">
      <h2>Users</h2>
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">name</th>
              <th scope="col">username</th>
              <th scope="col">email</th>
              <th scope="col">phone</th>
              <th scope="col">website</th>
              <th scope="col">city</th>
              <th scope="col">Company name</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {users.map((user, index) => {
              return(
                <tr key={user.id} className="tbody-item" onClick={() => handleDetail(index)}>
                  <td scope="row">{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.website}</td>
                  <td>{user.address.city}</td>
                  <td>{user.company.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
