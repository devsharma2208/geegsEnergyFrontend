import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const fetchlogin = async () => {
    try {
      const res = await axios.post(
        "https://geegsenergybackend.onrender.com/api/v1/users/login",
        formData
      );
      console.log(res);
      sessionStorage.setItem("token", res.data.data.accessToken);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    fetchlogin();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Login</h2>
      <form onSubmit={handleSubmit} className="bg-black text-white p-5">
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
            />
          </div>
        </div>
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

        <div className="row mt-5">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary w-50">
              Login
            </button>
          </div>
        </div>
        <div className="text-start">
          <NavLink
            to="/registration"
            className="text-decoration-none cursor-pointer"
          >
            Register a new User
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
