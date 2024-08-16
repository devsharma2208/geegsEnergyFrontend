import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

function RegistrationForm() {
  const { id } = useParams(); // Use the id directly

  const token = sessionStorage.getItem("token");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    profession: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (id) {
        try {
          console.log(token);
          const res = await axios.get(
            `https://geegsenergybackend.onrender.com/api/v1/users/get-user/${
              id.split(":")[1]
            }`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const userData = res.data.data;
          setFormData({
            username: userData.username,
            password: "", // Keep password field empty for security
            email: userData.email,
            phone: userData.phone,
            profession: userData.profession,
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };
    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchRegistration = async () => {
    if (id) {
      try {
        const res = await axios.patch(
          `https://geegsenergybackend.onrender.com/api/v1/users/update-account/${id.replace(
            ":",
            ""
          )}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data.data);
        navigate("/"); // Navigate after successful registration
      } catch (error) {
        console.error("Error registering user:", error);
        alert("Invalid Details");
      }
    } else {
      try {
        const res = await axios.post(
          "https://geegsenergybackend.onrender.com/api/v1/users/register",
          formData
        );
        console.log(res.data.data);
        navigate("/login"); // Navigate after successful registration
      } catch (error) {
        console.error("Error registering user:", error);
        alert("Invalid Details");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRegistration();
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-4">
        {!id ? "Registration Form" : "Update"}
      </h2>

      <form onSubmit={handleSubmit} className="bg-black text-white p-5">
        <div className="mb-3 row">
          <label
            htmlFor="username"
            className="col-sm-2 col-form-label text-start"
          >
            Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {!id && (
          <div className="mb-3 row">
            <label
              htmlFor="password"
              className="col-sm-2 col-form-label text-start"
            >
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        )}
        <div className="mb-3 row">
          <label htmlFor="email" className="col-sm-2 col-form-label text-start">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={id ? true : false}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="phone" className="col-sm-2 col-form-label text-start">
            Phone Number
          </label>
          <div className="col-sm-10">
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="profession"
            className="col-sm-2 col-form-label text-start"
          >
            Profession
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary w-50 ">
              {id ? "Update" : "Register"}
            </button>
          </div>
        </div>
        <div className="text-start">
          <NavLink to="/login" className="text-decoration-none cursor-pointer">
            Already have a User
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
