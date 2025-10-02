"use client";

import Link from "next/link";
import { Form, FormControl, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-3" style={{ maxWidth: 360 }}>
      <h5 className="mb-3">Profile</h5>

      <Form>
        <FormControl
          id="wd-username"
          className="mb-2"
          placeholder="username"
          defaultValue="alice"
        />

        <FormControl
          id="wd-password"
          className="mb-2"
          type="password"
          placeholder="password"
          defaultValue="123"
        />

        <FormControl
          id="wd-firstname"
          className="mb-2"
          placeholder="First Name"
          defaultValue="Alice"
        />

        <FormControl
          id="wd-lastname"
          className="mb-2"
          placeholder="Last Name"
          defaultValue="Wonderland"
        />

        {/* Date: leave empty to show placeholder like the spec */}
        <FormControl
          id="wd-dob"
          className="mb-2"
          type="date"
          placeholder="mm/dd/yyyy"
        />

        <FormControl
          id="wd-email"
          className="mb-2"
          type="email"
          placeholder="email"
          defaultValue="alice@wonderland.com"
        />

        <Form.Select id="wd-role" className="mb-3" defaultValue="USER">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </Form.Select>

        {/* Full-width red button like the screenshot */}
        <Link href="/Account/Signin" className="btn btn-danger w-100">
          Signout
        </Link>
      </Form>
    </div>
  );
}
