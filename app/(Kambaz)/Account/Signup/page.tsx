"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";

import * as client from "../client";
import { setCurrentUser } from "../reducer";

interface User {
  username: string;
  password: string;
}

export default function Signup() {
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const dispatch = useDispatch();

  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    redirect("/Profile"); // matches the book's instructions
  };

  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <FormControl
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username b-2"
        placeholder="username"
      />
      <FormControl
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="wd-password mb-2"
        placeholder="password"
        type="password"
      />
      <Button
        onClick={signup}
        className="wd-signup-btn btn btn-primary mb-2 w-100"
      >
        Sign up
      </Button>
      <Link href="/Account/Signin" className="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
