import { useEffect, useState } from "react";
import "./App.css";
import data from "./data";
import toastr from "toastr";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(0);
  const [editUser, setEditUser] = useState(false);

  useEffect(() => {
    setUsers(data);
  }, []);

  const handleEdit = (id) => {
    setEditUser(true);
    const user = users.find((user) => user.id === id);
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setId(user.id);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      toastr.success("User Deleted Successfully");
    }
  };

  const handleSave = () => {
    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      name,
      email,
    };
    setUsers([...users, newUser]);
    toastr.success("User Created Successfully");
    handleClear();
  };

  const handleUpdate = () => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, name, email } : user
    );
    setUsers(updatedUsers);
    toastr.success("User Updated Successfully");
    handleClear();
  };

  const handleClear = () => {
    setEditUser(false);
    setName("");
    setEmail("");
    setId(0);
  };

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();
    const filteredRows = users.filter(
      (item) =>
        item.name.toLowerCase().includes(searchValue) ||
        item.email.toLowerCase().includes(searchValue)
    );
    setUsers(filteredRows);
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          {editUser ? (
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          )}
          <button className="btn btn-danger" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Email</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                &nbsp;
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
