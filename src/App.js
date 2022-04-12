import React, { useState, useEffect, useMemo } from "react";

let runningTimeout;

function DataList() {
  const [userList, setUserList] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [inputValue, setInputValue] = useState("");

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
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataList;
