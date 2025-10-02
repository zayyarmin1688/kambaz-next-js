"use client";

import Link from "next/link";
import { Form, FormControl } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="p-3" style={{ maxWidth: 320 }}>
      <h5 className="mb-3">Signin</h5>

      <Form>
        <FormControl
          id="wd-username"
          placeholder="username"
          className="mb-2"
        />
        <FormControl
          id="wd-password"
          placeholder="password"
          type="password"
          className="mb-2"
        />

        <Link
          id="wd-signin-btn"
          href="/Dashboard"
          className="btn btn-primary w-100 mb-2"
        >
          Signin
        </Link>

        <Link id="wd-signup-link" href="/Account/Signup" className="small">
          Signup
        </Link>
      </Form>
    </div>
  );
}
