import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function UserHome() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    console.log("Users updated:", users);
  }, [users]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = () => {
    axios
      .post("http://localhost:8080/user", formData)
      .then((response) => {
        setUsers([...users, response.data]);
        setFormData({ username: "", email: "" });
      })
      .catch((error) => console.error("Error creating user:", error));
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/user/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div>
      <h1>User Management</h1>

      <div>
        <h2>Create User</h2>
        <form>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="button" onClick={createUser}>
            Create User
          </button>
        </form>
      </div>

      <div>
        <h2>User List</h2>
        {users && users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username} - {user.email}
                <Link to={`/edit/${user.id}`}>
                  <button type="button">Edit</button>
                </Link>
                <button type="button" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users yet...</p>
        )}
      </div>
    </div>
  );
}

export default UserHome;
