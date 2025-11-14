/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormControl, Button, FormSelect } from "react-bootstrap";

import * as client from "../client";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";

export default function Profile() {
  const currentUser = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState<any>(currentUser);

  const updateProfile = async () => {
    const updated = await client.updateUser(profile);
    dispatch(setCurrentUser(updated));
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    window.location.href = "/Account/Signin";
  };

  if (!profile) {
    return <div className="p-3">Loading...</div>;
  }

  return (
    <div id="wd-profile-screen" className="p-3" style={{ maxWidth: 360 }}>
      <h5 className="mb-3">Profile</h5>

      <Form>
        <FormControl
          id="wd-username"
          className="mb-2"
          placeholder="username"
          value={profile.username || ""}
          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        />

        <FormControl
          id="wd-password"
          type="password"
          className="mb-2"
          placeholder="password"
          value={profile.password || ""}
          onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        />

        <FormControl
          id="wd-firstname"
          className="mb-2"
          placeholder="First Name"
          value={profile.firstName || ""}
          onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })
          }
        />

        <FormControl
          id="wd-lastname"
          className="mb-2"
          placeholder="Last Name"
          value={profile.lastName || ""}
          onChange={(e) =>
            setProfile({ ...profile, lastName: e.target.value })
          }
        />

        <FormControl
          id="wd-dob"
          type="date"
          className="mb-2"
          value={profile.dob || ""}
          onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
        />

        <FormControl
          id="wd-email"
          type="email"
          className="mb-2"
          placeholder="email"
          value={profile.email || ""}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />

        <FormSelect
          id="wd-role"
          className="mb-3"
          value={profile.role || "USER"}
          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </FormSelect>

        <Button
          className="btn btn-primary w-100 mb-2"
          onClick={updateProfile}
        >
          Update
        </Button>

        <Button
          className="btn btn-danger w-100"
          onClick={signout}
        >
          Signout
        </Button>
      </Form>
    </div>
  );
}

