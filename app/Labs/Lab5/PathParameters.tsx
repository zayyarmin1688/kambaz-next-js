"use client";
import React, { useState } from "react";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function PathParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  return (
    <div id="wd-path-parameters">
      <h3>Path Parameters</h3>

      <input
        className="form-control mb-2"
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />

      <input
        className="form-control mb-2"
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />

      <a
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/add/${a}/${b}`}
      >
        Add {a} + {b}
      </a>

      <a
        className="btn btn-danger"
        href={`${HTTP_SERVER}/lab5/subtract/${a}/${b}`}
      >
        Subtract {a} − {b}
      </a>
      <a
        className="btn btn-success me-2"
        id="wd-path-parameter-multiply"
        href={`${HTTP_SERVER}/lab5/multiply/${a}/${b}`}
      >
        Multiply {a} × {b}
      </a>
      <a
        className="btn btn-warning"
        id="wd-path-parameter-divide"
        href={`${HTTP_SERVER}/lab5/divide/${a}/${b}`}
      >
        Divide {a} ÷ {b}
      </a>
      

    </div>
  );
}
