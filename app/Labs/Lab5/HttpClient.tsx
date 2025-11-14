"use client";

import React, { useEffect, useState } from "react";
import * as client from "./client";

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState("");
  const [welcomeOnLoad, setWelcomeOnLoad] = useState("");

  // when user clicks the button
  const fetchWelcomeOnClick = async () => {
    const message = await client.fetchWelcomeMessage();
    setWelcomeOnClick(message);
  };

  // when component first loads
  const fetchWelcomeOnLoad = async () => {
    const message = await client.fetchWelcomeMessage();
    setWelcomeOnLoad(message);
  };

  useEffect(() => {
    fetchWelcomeOnLoad();
  }, []);

  return (
    <div id="wd-http-client">
      <h3>HTTP Client</h3>
      <hr />
      <h4>Requesting on Click</h4>
      <button
        className="btn btn-primary me-2"
        onClick={fetchWelcomeOnClick}
        id="wd-fetch-welcome"
      >
        Fetch Welcome
      </button>
      <br />
      Response from server: <b>{welcomeOnClick}</b>
      <hr />
      <h4>Requesting on Load</h4>
      Response from server: <b>{welcomeOnLoad}</b>
      <hr />
    </div>
  );
}
