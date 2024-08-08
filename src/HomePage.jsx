import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await axios.get(
          "https://geegsenergybackend.onrender.com/api/v1/users/get-all-users"
        );
        console.log(usersData.data.data);

        setTimeout(() => {
          setUsers(usersData.data.data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    console.log("Edit user with ID:", userId);
    if (token) {
      navigate(`/registration/:${userId}`);
    } else {
      navigate("/login");
    }
  };

  const handleDelete = async (userId) => {
    console.log("Delete user with ID:", userId);

    try {
      const res = await axios.delete(
        `https://geegsenergybackend.onrender.com/api/v1/users/delete-account/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);

      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
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
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.profession}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleDelete(user._id)}
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
