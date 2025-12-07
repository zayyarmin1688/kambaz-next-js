/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(Kambaz)/Courses/[cid]/People/Details.tsx
"use client";

import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck, FaUserCircle, FaPencilAlt } from "react-icons/fa";
import * as client from "../../../Account/client";

export default function PeopleDetails({
  uid,
  onClose,
  fetchUsers,
}: {
  uid: string | null;
  onClose: () => void;
  fetchUsers?: () => void;
}) {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

  const loadUser = async () => {
    if (!uid) return;
    const data = await client.findUserById(uid);
    setUser(data);
    setName(`${data.firstName ?? ""} ${data.lastName ?? ""}`.trim());
  };

  useEffect(() => {
    if (uid) {
      loadUser();
    }
  }, [uid]);

  if (!uid || !user) return null;

  const handleDelete = async () => {
    await client.deleteUser(uid);
    if (fetchUsers) {
      await fetchUsers();
    }
    onClose();
  };

  const saveUser = async () => {
    if (!user) return;

    const trimmed = name.trim();
    const parts = trimmed.split(/\s+/);
    const firstName = parts[0] ?? "";
    const lastName = parts.slice(1).join(" ");

    const updatedUser = {
      ...user,
      firstName,
      lastName,
    };

    const saved = await client.updateUser(updatedUser);
    setUser(saved);
    setEditing(false);

    if (fetchUsers) {
      await fetchUsers();
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void saveUser();
    }
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={onClose}
        className="btn position-absolute end-0 top-0"
      >
        <IoCloseSharp className="fs-3" />
      </button>

      <div className="text-center mt-4 mb-3">
        <FaUserCircle className="fs-1 text-secondary" />
      </div>

      {/* Name row with edit/save icons */}
      <div className="mb-3">
        {!editing && (
          <>
            <div
              className="wd-name fs-4 text-danger"
              onClick={() => setEditing(true)}
            >
              {user.firstName} {user.lastName}
            </div>
            <FaPencilAlt
              className="float-end ms-5 mt-2 wd-edit"
              onClick={() => setEditing(true)}
            />
          </>
        )}

        {editing && (
          <>
            <FaCheck
              className="float-end ms-5 mt-2 wd-save"
              onClick={saveUser}
            />
            <FormControl
              className="w-50 wd-edit-name mt-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleNameKeyDown}
              placeholder="First Last"
            />
          </>
        )}
      </div>

      <div className="mt-3">
        <b>Role:</b> <span className="wd-roles">{user.role}</span>
        <br />
        <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span>
        <br />
        <b>Section:</b> <span className="wd-section">{user.section}</span>
        <br />
        <b>Total Activity:</b>{" "}
        <span className="wd-total-activity">{user.totalActivity}</span>
        <br />
      </div>

      <hr />
      <button
        onClick={handleDelete}
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>
      <button
        onClick={onClose}
        className="btn btn-secondary float-end me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}
