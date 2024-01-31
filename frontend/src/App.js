// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    // Fetch users from the backend on component mount
    axios
      .get("http://localhost:8080/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []); // Empty dependency array, runs on mount

  // Use useEffect with dependency array to run whenever 'users' changes
  useEffect(() => {
    // You can add any additional logic here if needed
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
      .post("http://localhost:8080/users", formData)
      .then((response) => {
        setUsers([...users, response.data]);
        setFormData({ username: "", email: "" });
      })
      .catch((error) => console.error("Error creating user:", error));
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* User creation form */}
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

      {/* User list */}
      <div>
        <h2>User List</h2>
        {users && users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username} - {user.email}
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

export default App;
