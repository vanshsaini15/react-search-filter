import React, { useState, useEffect, useMemo, useReducer } from "react";

const initialState = {
  searchName: "",
  searchUsername: "",
  searchEmail: "",
  searchPhone: "",
  inputValue: "",
  // name: "",
  // email: "",
  // phone: "",
  // username: ""
};

const reducerFunc = (state, action) => {
  console.log(action);
  switch (action.type) {
    // case ("UpdateItem"):
    //   return {...state, item: action.payload}

    default:
      return { ...state, ...action };
  }
};

let runningTimeout;

function DataList() {
  const [userList, setUserList] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [addUserData, setAddUserData] = useState();
  // const [searchName, setSearchName] = useState("");
  // const [searchUsername, setSearchUsername] = useState("");
  // const [searchEmail, setSearchEmail] = useState("");
  // const [searchPhone, setSearchPhone] = useState("");
  // const [inputValue, setInputValue] = useState("");

  const [state, dispatch] = useReducer(reducerFunc, initialState);

  const handleEvent = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    dispatch({ [id]: value });

    console.log("working");
  };

  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserList(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  let filteredData = useMemo(() => {
    return userList.filter((data) => {
      if (
        state.searchName === "" &&
        state.searchEmail === "" &&
        state.searchUsername === "" &&
        state.searchPhone === ""
      ) {
        return data;
      } else if (
        data.name.toLowerCase().includes(state.searchName.toLowerCase()) &&
        data.email.toLowerCase().includes(state.searchEmail.toLowerCase()) &&
        data.username
          .toLowerCase()
          .includes(state.searchUsername.toLowerCase()) &&
        data.phone.toLowerCase().includes(state.searchPhone.toLowerCase())
      ) {
        return data;
      }
    });
  }, [
    state.searchName,
    state.searchUsername,
    state.searchEmail,
    state.searchPhone,
    userList,
  ]);

  const debouncedOnChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;

    if (runningTimeout) clearTimeout(runningTimeout);
    runningTimeout = setTimeout(() => {
      dispatch({ [id]: value });
    }, 600);
  };

  useEffect(() => {
    console.log("api call");
  }, [state.searchName]);

  function selectUser(id) {
    let data = userList[id - 1];
    setName(data.name);
    setUsername(data.username);
    setEmail(data.email);
    setPhone(data.phone);
    setUserId(data.id);
  }

  function updateUser() {
    let newList = userList.map((data) => {
      if (data.id == userId) {
        return {
          ...data,
          name: name,
          email: email,
          phone: phone,
          username: username,
        };
      } else {
        return data;
      }
    });
    setUserList(newList);
  }

  const handleAddUser = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newUserData = { ...addUserData };
    newUserData[fieldName] = fieldValue;

    setAddUserData(newUserData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: addUserData.name,
      username: addUserData.username,
      phone: addUserData.phone,
      email: addUserData.email,
    };

    const newUsers = [...userList, newUser];
    setUserList(newUsers);
  };

  return (
    <div className="table">
      <table id="styling">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>

          <tr>
            <td>
              <input
                id="searchName"
                type="text"
                onChange={debouncedOnChange}
                placeholder="Search"
              />
            </td>
            <td>
              <input
                id="searchUsername"
                type="text"
                value={state.searchUsername}
                onChange={handleEvent}
                placeholder="Search"
              />
            </td>
            <td>
              <input
                id="searchEmail"
                type="text"
                value={state.searchEmail}
                onChange={handleEvent}
                placeholder="Search"
              />
            </td>
            <td>
              <input
                id="searchPhone"
                type="text"
                value={state.searchPhone}
                onChange={handleEvent}
                placeholder="Search"
              />
            </td>
          </tr>
        </thead>

        <tbody id="body">
          {filteredData.map((user) => {
            return (
              <tr key={user.id}>
                <td onClick={() => selectUser(user.id)}>{user.name}</td>
                <td onClick={() => selectUser(user.id)}>{user.username}</td>
                <td onClick={() => selectUser(user.id)}>{user.email}</td>
                <td onClick={() => selectUser(user.id)}>{user.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br></br>
      <div id="form2">
        {"Add User Data"}
        <br></br>

        <form onSubmit={handleAddFormSubmit}>
          <br></br>
          <input
            type="text"
            name="name"
            required="required"
            placeholder="Enter name"
            onChange={handleAddUser}
          />
          <input
            type="text"
            name="username"
            required="required"
            placeholder="Enter username"
            onChange={handleAddUser}
          />
          <input
            type="text"
            name="phone"
            required="required"
            placeholder="Enter phone"
            onChange={handleAddUser}
          />
          <input
            type="email"
            name="email"
            required="required"
            placeholder="Enter email"
            onChange={handleAddUser}
          />
          <button type="submit">Add</button>
        </form>
        <br></br>
      </div>
      <br></br>
      <div id="form">
        {"Update User Data "} <br></br> <br></br>
        {"Name: "}
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {""}
        <br />
        <br />
        {"Username: "}
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />{" "}
        <br />
        <br />
        {"Email: "}
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />{" "}
        <br />
        <br />
        {"Phone: "}
        <input
          type="text"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />{" "}
        <br />
        <br />
        <button onClick={updateUser}>Update User</button>
      </div>
    </div>
  );
}

export default DataList;
