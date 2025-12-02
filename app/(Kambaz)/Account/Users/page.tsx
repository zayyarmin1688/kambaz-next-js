/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(Kambaz)/Account/Users/page.tsx
"use client";

import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import PeopleTable from "../../Courses/[cid]/People/Table/page";
import * as client from "../client";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const fetchUsers = async () => {
    const all = await client.findAllUsers();
    setUsers(all);
  };

  const filterUsersByRole = async (roleValue: string) => {
    setRole(roleValue);
    if (roleValue) {
      const filtered = await client.findUsersByRole(roleValue);
      setUsers(filtered);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (nameValue: string) => {
    setName(nameValue);
    if (nameValue) {
      const filtered = await client.findUsersByPartialName(nameValue);
      setUsers(filtered);
    } else {
      fetchUsers();
    }
  };

  const createUser = async () => {
    const newUser = {
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
      loginId: `N${Math.floor(Math.random() * 1_000_000)}`,
      totalActivity: "0",
    };
    const created = await client.createUser(newUser);
    setUsers([...users, created]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div id="wd-account-users-page">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Users</h3>
        <button
          className="btn btn-success wd-add-user"
          onClick={createUser}
        >
          + Add User
        </button>
      </div>

      <div className="mb-2 d-flex">
        <FormControl
          value={name}
          onChange={(e) => filterUsersByName(e.target.value)}
          placeholder="Search people"
          className="float-start w-25 me-2 wd-filter-by-name"
        />
        <select
          value={role}
          onChange={(e) => filterUsersByRole(e.target.value)}
          className="form-select float-start w-25 wd-select-role"
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="FACULTY">Faculty</option>
          <option value="TA">Assistants</option>
          <option value="ADMIN">Administrators</option>
        </select>
      </div>

      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
