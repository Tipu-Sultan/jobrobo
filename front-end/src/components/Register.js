import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const lists = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    number: "",
    email: "",
    address: "",
  };
  const [Loading, setLoading] = useState(false);
  const [formData, setformData] = useState(lists);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setformData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  

  useEffect(() => {
    if(id){
      // Simulate a delay of 2 seconds before making the actual API request
    setTimeout(() => {
      axios
        .get(`http://localhost:8080/fetchdata/${id}`)
        .then((response) => {
          setformData({ ...response.data });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }, 500); // Change the delay time as needed (in milliseconds)
    }
  }, [id]);


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!id) {
      try {
        const response = await axios.post(
          "http://localhost:8080/add_contact",
          formData
        );
        console.log(response.data);

        toast.success(response.data.message);
        setTimeout(() => navigate("/", 500));
      } catch (error) {
        toast.error(error.response.data.error);
      }
    } else {
      try {
        const response = await axios.put(
          `http://localhost:8080/updatedata/${id}`,
          formData
        );
        console.log(response.data);
        toast.success(response.data.message);
        setTimeout(() => navigate("/", 500));
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <section className="vh-100 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col">
              <div className="card">
                <div className="card-header bg-info">
                  <h3 className="text-center ">Add New Contact</h3>
                </div>
                <div className="card-body">
                <form method="post" id="virtua" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <input
                          name="firstName"
                          className="form-control"
                          value={formData.firstName || ""}
                          onChange={handleInputs}
                          type="text"
                          placeholder="First Name"
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <input
                          name="lastName"
                          className="form-control"
                          value={formData.lastName || ""}
                          onChange={handleInputs}
                          type="text"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 d-flex align-items-center">
                        <input
                          name="dob"
                          className="form-control"
                          value={formData.dob || ""}
                          onChange={handleInputs}
                          type="text"
                          placeholder="DOB"
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <h6 className="mb-2 pb-1">Gender: </h6>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="femaleGender"
                            value="Female"
                            onChange={handleInputs}
                            checked={formData.gender === "Female"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="femaleGender"
                          >
                            Female
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="maleGender"
                            value="Male"
                            onChange={handleInputs}
                            checked={formData.gender === "Male"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="maleGender"
                          >
                            Male
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="otherGender"
                            value="Others"
                            onChange={handleInputs}
                            checked={formData.gender === "Others"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="otherGender"
                          >
                            Other
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
                        <input
                          name="number"
                          className="form-control"
                          value={formData.number || ""}
                          onChange={handleInputs}
                          type="number"
                          placeholder="Phone Number"
                        />
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                        <input
                          name="email"
                          className="form-control"
                          value={formData.email || ""}
                          onChange={handleInputs}
                          type="email"
                          placeholder="Email"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
                        <textarea 
                          name="address"
                          className="form-control"
                          value={formData.address || ""}
                          onChange={handleInputs}
                          placeholder="Add Address"
                        ></textarea >
                      </div>
                    </div>

                    <div className="mt-4 pt-2">
                      <button className="btn btn-primary btn-lg" type="submit">
                        {Loading ? (
                          <>
                            <div className="spinner-border text-danger spinner-border-sm"></div>{" "}
                            <span>Please Wait...</span>
                          </>
                        ) : id ? (
                          "Update"
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
