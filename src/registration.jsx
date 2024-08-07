import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    profession: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Registration Form</h2>
      <form onSubmit={handleSubmit} className="bg-black text-white p-5">
        <div className="mb-3 row">
          <label htmlFor="name" className="col-sm-2 col-form-label text-start">
            Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
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
            <button type="submit" className="btn btn-primary w-50">
              Register
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
