import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";


const Navbar = ({ onSearch,handleSortAscending, handleSortDescending }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(searchTerm);
  };

  return (
    <>
      <div className="container mt-5">
        <h3 className="text-center">Contact Management System</h3>
        <nav className="navbar navbar-expand-lg navbar-light bg-info">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {currentPath === "/" &&
                <form className="d-flex input-group w-auto">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </form>
              }
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link fw-bold text-white" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link fw-bold text-white"
                    to="/add_contact"
                  >
                    Add New Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="d-flex align-items-center">
              {currentPath === "/" && (
                <Link className="text-reset me-3" to="#" onClick={handleSortAscending}>
                  <i className="fas fa-arrow-up-z-a"></i>
                </Link>
              )}

              {currentPath === "/" && (
                <Link className="text-reset me-3" to="#" onClick={handleSortDescending}>
                  <i className="fas fa-arrow-down-z-a"></i>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
