import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <div>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/registration">Users</NavLink>
      </div>
    </div>
  );
};

export default Header;
