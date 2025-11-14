"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

import * as client from "../client";
import { setCurrentUser } from "../reducer";

interface Credentials {
  username: string;
  password: string;
}

export default function Signin() {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });

  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;                 // no match, stay on page
    dispatch(setCurrentUser(user));    // save logged-in user in Redux
    redirect("/Dashboard");            // go to dashboard (same as before)
  };

  return (
    <div id="wd-signin-screen" className="p-3" style={{ maxWidth: 320 }}>
      <h5 className="mb-3">Signin</h5>

      <Form>
        <FormControl
          id="wd-username"
          placeholder="username"
          className="mb-2"
          value={credentials.username}
          onChange={(e) =>
            setCredentials((c) => ({ ...c, username: e.target.value }))
          }
        />
        <FormControl
          id="wd-password"
          placeholder="password"
          type="password"
          className="mb-2"
          value={credentials.password}
          onChange={(e) =>
            setCredentials((c) => ({ ...c, password: e.target.value }))
          }
        />
        <Button
          id="wd-signin-btn"
          className="w-100 mb-2"
          type="button"
          onClick={signin}
        >
          Sign in
        </Button>
        <Link id="wd-signup-link" href="/Account/Signup" className="small">
          Signup
        </Link>
      </Form>
    </div>
  );
}
