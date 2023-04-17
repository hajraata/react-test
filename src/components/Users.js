import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getusers } from "../apis/apis";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [ageSortOrder, setAgeSortOrder] = useState("asc");
  const [nameSortOrder, setNameSortOrder] = useState("asc");

  useEffect(() => {
    getusers(setUsers);
  }, []);

  const sortByName = () => {
    const sortName = [...users];
    if (nameSortOrder === "asc") {
      sortName.sort((a, b) => {
        return a.name.first.concat(a.name.last) >
          b.name.first.concat(b.name.last)
          ? 1
          : a.name.first.concat(a.name.last) < b.name.first.concat(b.name.last)
          ? -1
          : 0;
      });
      setUsers(sortName);
      console.log(users);
      setNameSortOrder("des");
    } else {
      sortName.sort((a, b) =>
        a.name.first.concat(a.name.last) < b.name.first.concat(b.name.last)
          ? 1
          : a.name.first.concat(a.name.last) > b.name.first.concat(b.name.last)
          ? -1
          : 0
      );

      setUsers(sortName);
      setNameSortOrder("asc");
    }
  };

  const sortByAge = () => {
    const sortAge = [...users];
    if (ageSortOrder === "asc") {
      sortAge.sort((a, b) => a.dob.age - b.dob.age);
      setUsers(sortAge);
      setAgeSortOrder("des");
    } else {
      sortAge.sort((a, b) => b.dob.age - a.dob.age);
      setUsers(sortAge);
      setAgeSortOrder("asc");
    }
  };

  return (
    <>
      <Table className="table-users">
        <thead>
          <tr>
            <th>
              Name
              <span className="btn-sort" onClick={() => sortByName()}>
                <i className="fa-solid fa-sort fa-xs" title="Sort"></i>
              </span>
            </th>
            <th>
              Age
              <span className="btn-sort" onClick={() => sortByAge()}>
                <i className="fa-solid fa-sort fa-xs" title="Sort"></i>
              </span>
            </th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id.value ? user.id.value : user.name.first}>
              <td>
                {user.name.first} {user.name.last}
              </td>
              <td>{user.dob.age}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                {user.location.city}, {user.location.state}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
