"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "../Details";
import { findUsersForCourse } from "../../../client";

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

export default function PeopleTablePage() {
  const params = useParams<{ cid: string }>();
  const courseId = params.cid;

  const [users, setUsers] = useState<User[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);

  const fetchUsers = async () => {
    if (!courseId) return;
    const data = await findUsersForCourse(courseId);
    setUsers(data);
  };

  useEffect(() => {
    void fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const handleOpenDetails = (userId: string) => {
    setShowUserId(userId);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setShowUserId(null);
  };

  return (
    <div id="wd-people-table" className="mt-2">
      {showDetails && showUserId && (
        <PeopleDetails
          uid={showUserId}
          onClose={handleCloseDetails}
          fetchUsers={fetchUsers}
        />
      )}

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
          {users.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-4 text-secondary" />
                <span
                  className="wd-first-name text-decoration-none"
                  onClick={() => handleOpenDetails(user._id)}
                  style={{ cursor: "pointer" }}
                >
                  {user.firstName}
                </span>{" "}
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
                No people enrolled for this course.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
