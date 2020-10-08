import React from "react";
import PropTypes from "prop-types";
import "./SideBar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const SideBar = props => {
  return (
    <div className="sideBar">
      <label className="title">Меню</label>
      <ul>
        <li className="sideBar_titles">
          <Link
            to={"/admincp/years"}
            className={
              window.location.pathname === "/admincp/years"
                ? "sideBar_titles_hover"
                : "sideBar_titles"
            }
          >
            Учебни години
          </Link>
        </li>
        <li className="sideBar_titles">
          <Link
            to={"/admincp/class/create"}
            className={
              window.location.pathname === "/admincp/class/create"
                ? "sideBar_titles_hover"
                : "sideBar_titles"
            }
          >
            Създаване на класове по предмети
          </Link>
        </li>
        <li className="sideBar_titles">
          <Link
            to={"/admincp/category"}
            className={
              window.location.pathname === "/admincp/category"
                ? "sideBar_titles_hover"
                : "sideBar_titles"
            }
          >
            Категории
          </Link>
        </li>
        <li className="sideBar_titles">
          <Link
            to={"/admincp/users"}
            className={
              window.location.pathname === "/admincp/users"
                ? "sideBar_titles_hover"
                : "sideBar_titles"
            }
          >
            Ученици
          </Link>
        </li>
        <li className="sideBar_titles">
          <Link
            to={"/admincp/teachers"}
            className={
              window.location.pathname === "/admincp/teachers"
                ? "sideBar_titles_hover"
                : "sideBar_titles"
            }
          >
            Учители
          </Link>
        </li>
        <li className="sideBar_titles">
          <a href="/" target="_blank" className="sideBar_titles">
            <FontAwesomeIcon icon={faHome} />
          </a>
        </li>
      </ul>
    </div>
  );
};

SideBar.propTypes = {};

export default SideBar;
