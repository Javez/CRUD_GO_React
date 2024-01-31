import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UserUpdate() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    // Fetch user data using id when the component mounts
    axios
      .get(`http://localhost:8080/user/${id}`)
      .then((response) => setUserData(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [id]);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const updateUser = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8080/user/${id}`, userData) // Change PATCH to PUT
      .then((response) => {
        console.log("User updated successfully:", response.data);
        navigate("/");
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={updateUser}>
          Update User
        </button>
      </form>
    </div>
  );
}

export default UserUpdate;
