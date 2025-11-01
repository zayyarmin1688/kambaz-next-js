"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

import * as db from "../../Database";
import { setCurrentUser } from "../reducer";

interface User {
  _id: string;
  username: string;
  password: string;
  [key: string]: unknown;
}

export default function Signin() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const signIn = () => {
    const users = (db as { users: User[] }).users;

    const user = users.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (!user) return; 

    dispatch(setCurrentUser(user)); 
    router.push("/Dashboard"); 
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
        <Button id="wd-signin-btn" className="w-100 mb-2" onClick={signIn}>
          Sign in
        </Button>
        <Link id="wd-signup-link" href="/Account/Signup" className="small">
          Signup
        </Link>
      </Form>
    </div>
  );
}

