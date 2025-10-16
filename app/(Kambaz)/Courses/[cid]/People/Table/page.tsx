// app/(Kambaz)/Courses/[cid]/People/Table/page.tsx
"use client";

import { useParams } from "next/navigation";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

// NOTE: from this file, Database is 4 levels up
import * as db from "../../../../Database";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
};

type Enrollment = { _id: string; user: string; course: string };

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();

  const users = (db.users as User[]) ?? [];
  const enrollments = (db.enrollments as Enrollment[]) ?? [];

  const courseUsers = users.filter((user) =>
    enrollments.some((enroll) => enroll.user === user._id && enroll.course === cid)
  );

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
          {courseUsers.map((user) => (
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
          {courseUsers.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-muted py-4">
                No people enrolled for this course.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

