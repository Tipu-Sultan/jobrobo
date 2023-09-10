import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DeleteMpdal, ViewDataModal } from "./CustomModal";
import { toast } from "react-toastify";

const SqlData = ({ searchTerm, sortOrder }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalView, setisModalView] = useState(false);
  const [itemViewDelete, setitemViewDelete] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    // Whenever 'sortOrder' changes, re-sort the data
    const sortedData = [...data];
    if (sortOrder === "asc") {
      sortedData.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else {
      sortedData.sort((a, b) => b.email.localeCompare(a.email));
    }
    setData(sortedData);
  }, [sortOrder]);

  useEffect(() => {
    // Make an API request to fetch data based on the search query
    axios
      .get(`http://localhost:8080/search?term=${searchTerm}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setTimeout(() => {
      axios
        .get("http://localhost:8080/sql")
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }, 500); // Change the delay time as needed (in milliseconds)
  };

  const handleDelete = (item) => {
    setitemViewDelete(item);
    setModalOpen(true);
  };

  const handleView = (item) => {
    setitemViewDelete(item);
    setisModalView(true);
  };

  const handleConfirmDelete = () => {
    // Make an API call to delete the item from the database
    axios
      .delete(`http://localhost:8080/delsql/${itemViewDelete._id}`)
      .then((response) => {
        toast.success(response.data.message);
        fetchData();
        // If needed, update the state to reflect the changes in the UI
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      })
      .finally(() => {
        // Close the modal after deletion or error
        setModalOpen(false);
      });
  };

  const handleCheckboxChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data.map((item) => item._id));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = () => {
    // Make an API call to delete selected items
    fetch(`http://localhost:8080/deleteall`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedIds: selectedItems }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        fetchData();
      })
      .catch((error) => console.error("Error deleting items:", error));
  };

  const handleCloseModal = () => {
    // Close the modal without performing the delete action
    setModalOpen(false);
    setisModalView(false);
  };

  return (
    <>
      <div className="container">
        <div className="row">
         
          {selectAll && (
            <label htmlFor="alldelte">
              <button onClick={handleDeleteSelected}>
                <i class="fas fa-trash-can"></i>
              </button>
            </label>
          )}
          <table className="table table-responsive" id="dataTable">
            <thead className="fw-bold">
              <tr>
              <td>Select <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />{" "}</td>
                <td>ID</td>
                <td>FirstName</td>
                <td>LastName</td>
                <td>DOB</td>
                <td>Gender</td>
                <td>Number</td>
                <td>Email</td>
                <td>Address</td>
                <td colSpan="3">Operations</td>
              </tr>
            </thead>
            <tbody>
              {data.map((item, id) => (
                <tr key={id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => handleCheckboxChange(item._id)}
                    />
                  </td>
                  <td>{id + 1}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.dob}</td>
                  <td>{item.gender}</td>
                  <td>{item.number}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-sm btn-primary"
                    >
                      delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleView(item)}
                      className="btn btn-sm btn-warning"
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/update/${item._id}`}
                      className="btn btn-sm btn-info"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <DeleteMpdal
            isOpen={isModalOpen}
            closeModal={handleCloseModal}
            onDelete={handleConfirmDelete}
            itemViewDelete={itemViewDelete}
          />

          <ViewDataModal
            isView={isModalView}
            itemViewDelete={itemViewDelete}
            closeModal={handleCloseModal}
          />
        </div>
      </div>
      {Loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
};

export default SqlData;
