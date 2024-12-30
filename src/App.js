import { useEffect, useState } from "react";
import "./App.css";
import data from "./data";
import toastr from "toastr";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id,setId] = useState(0);
  const [editUser, setEditUser] = useState(false);

  useEffect(() => {
    setUsers(data);
  }, []);

  const handleEdit = (id) => {
    setEditUser(true);
    if (id > 0) {
      const data_new = [...data];
      const dt = data_new.filter((item) => item.id === id);
      if (dt !== undefined) {
        setName(dt[0].name);
        setEmail(dt[0].email);
        setId(dt[0].id);
      }
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are You Sure")) {
        const dt = data.filter((item) => item.id !== id);
        setUsers(dt);
      }
    }
  };

  const handleSave = () => {
    const dt = [...data];
    const formData = {
      id:dt.length + 1,
      name:name,
      email:email,
    };
    dt.push(formData);
    setUsers(dt);
    toastr.success('User Created Successfully');
    handleClear();
  };

  const handleUpdate = () => {
    const index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);
    const dt = [...data];
    dt[index].name = name;
    dt[index].email = email;
    setUsers(dt);
    handleClear();
  };

  const handleClear = () => {
    setEditUser(false);
    setName("");
    setEmail("");
  };

  const handleSearch = (value) => {
    const dt = [...data];
    const filteredrows = dt.filter((item) => item.name.includes(value.toLowerCase()) || item.email.includes(value.toLowerCase()));
    setUsers(filteredrows);
  };

  return (
    <div className="App">

      <div>
        <input type="text" placeholder="Search" onChange={(e) => handleSearch(e.target.value)} />
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
          {editUser === false ? (
            <button className="btn btn-primary" onClick={() => handleSave()}>
              Save
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => handleUpdate()}>
              Update
            </button>
          )}
          <button className="btn btn-danger" onClick={() => handleClear()}>
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
