"use client";

import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const API = `${HTTP_SERVER}/lab5/todos`;

export default function WorkingWithArrays() {
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    completed: false,
  });

  return (
    <div id="wd-working-with-arrays">
      <h2>Working with Arrays</h2>


      <h3>Retrieving Arrays</h3>
      <a
        id="wd-retrieve-todos"
        className="btn btn-primary"
        href={API}
      >
        Get Todos
      </a>
      <hr />

      <h3>Retrieving an Item from an Array by ID</h3>
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}`}
      >
        Get Todo by ID
      </a>
      <FormControl
        id="wd-todo-id"
        className="w-50"
        defaultValue={todo.id}
        onChange={(e) =>
          setTodo({ ...todo, id: e.target.value })
        }
      />
      <br />
      <br />

      <h3>Filtering Array Items</h3>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />

      <h3>Creating new Items in an Array</h3>
      <a
        id="wd-create-todo"
        className="btn btn-primary"
        href={`${API}/create`}
      >
        Create Todo
      </a>
      <hr />

      {/* Removing from the array */}
      <h3>Removing from an Array</h3>
      <a
        id="wd-remove-todo"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/delete`}
      >
        Remove Todo with ID = {todo.id}
      </a>
      <FormControl
        defaultValue={todo.id}
        className="w-50"
        onChange={(e) =>
          setTodo({ ...todo, id: e.target.value })
        }
      />
      <br />
      <br />
      <hr />

      {/* Updating title */}
      <h3>Updating an Item in an Array</h3>
      <a
        id="wd-update-todo-title"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/title/${todo.title}`}
      >
        Update Todo
      </a>
      <FormControl
        className="w-25 float-start me-2"
        defaultValue={todo.id}
        onChange={(e) =>
          setTodo({ ...todo, id: e.target.value })
        }
      />
      <FormControl
        className="w-50 float-start"
        defaultValue={todo.title}
        onChange={(e) =>
          setTodo({ ...todo, title: e.target.value })
        }
      />
      <br />
      <br />
      <br />
      <hr />

      <h3>Updating Description and Completed</h3>

      <a
        id="wd-update-todo-description"
        className="btn btn-primary float-end ms-2"
        href={`${API}/${todo.id}/description/${todo.description}`}
      >
        Describe Todo ID = {todo.id}
      </a>

      {/* Link that updates completed */}
      <a
        id="wd-update-todo-completed"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/completed/${todo.completed}`}
      >
        Complete Todo ID = {todo.id}
      </a>

      <div className="w-75">
        <label htmlFor="wd-todo-description" className="form-label mt-2">
          Description
        </label>
        <FormControl
          id="wd-todo-description"
          defaultValue={todo.description}
          onChange={(e) =>
            setTodo({ ...todo, description: e.target.value })
          }
        />
      </div>

      <div className="form-check mt-2">
        <input
          id="wd-todo-completed"
          className="form-check-input"
          type="checkbox"
          checked={todo.completed}
          onChange={(e) =>
            setTodo({ ...todo, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-todo-completed">
          Completed
        </label>
      </div>

      <br />
    </div>
  );
}
