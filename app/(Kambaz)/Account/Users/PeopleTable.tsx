/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(Kambaz)/Account/Users/PeopleTable.tsx
"use client";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

type PeopleTableProps = {
  users: any[];
  fetchUsers: () => Promise<void>;
};

export default function PeopleTable({ users }: PeopleTableProps) {
  return (
    <div id="wd-people-table" className="mt-2">
      <Table striped hover responsive className="align-middle">
        <thead className="bg-light">
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-4 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-muted py-4">
                No people found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
