import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await axios.get(
        "https://geegsenergybackend.onrender.com/api/v1/users/get-all-users"
      );
      setTimeout(() => {
        setUsers(usersData.data.data);
        setLoading(false);
      }, 1000);
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    console.log("Edit user with ID:", userId);
    navigate("/login");
  };

  const handleDelete = (userId) => {
    console.log("Delete user with ID:", userId);
    // Implement delete functionality here
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">User List</h2>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Profession</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.profession}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HomePage;
