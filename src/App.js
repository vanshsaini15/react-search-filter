import React, { useState, useEffect, useMemo, useReducer } from "react";

// const initialState ={
//   userList: [],
//   searchName: "",
//   searchUsername: "",
//   searchEmail: "",
//   searchPhone: "",
//   inputValue: "",
//   name: "",
//   email: "",
//   phone: "",
//   username: ""
// }

// const reducerFunc = (state, action) =>{
//   switch (action.type){
//     case ("UpdateItem"):
//       return {...state, item: action.payload}

//     default:
//       return{ ...state, ...action}
//   }
// }

let runningTimeout;

function DataList() {
  const [userList, setUserList] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  // const [state, dispatch] = useReducer(reducerFunc, initialState)

  // const handleEvent = (e) => {
  //   const value = e.target.value
  //   const id = e.target.id
  //   dispatchEvent({[id]: value})
  // }

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
        searchName === "" &&
        searchEmail === "" &&
        searchUsername === "" &&
        searchPhone === ""
      ) {
        return data;
      } else if (
        data.name.toLowerCase().includes(searchName.toLowerCase()) &&
        data.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
        data.username.toLowerCase().includes(searchUsername.toLowerCase()) &&
        data.phone.toLowerCase().includes(searchPhone.toLowerCase())
      ) {
        return data;
      }
    });
  }, [searchName, searchUsername, searchEmail, searchPhone, userList]);

  const debouncedOnChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (runningTimeout) clearTimeout(runningTimeout);
    runningTimeout = setTimeout(() => {
      setSearchName(value);
    }, 600);
  };

  useEffect(() => {
    console.log("api call");
  }, [searchName]);

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
                type="text"
                value={inputValue}
                onChange={debouncedOnChange}
                placeholder="Search"
              />
            </td>
            <td>
              <input
                type="text"
                // value={userList}
                onChange={(e) => setSearchUsername(e.target.value)}
                placeholder="Search"
              />
            </td>
            <td>
              <input
                type="text"
                // value={userList}
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder="Search"
              />
            </td>
            <td>
              <input
                type="text"
                // value={userList}
                onChange={(e) => setSearchPhone(e.target.value)}
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
