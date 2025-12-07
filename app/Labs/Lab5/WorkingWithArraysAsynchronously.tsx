/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import * as client from "./client";
import {
  FaTrash,
  FaPlusCircle,
  FaTimesCircle,
  FaPencilAlt,
} from "react-icons/fa";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchTodos = async () => {
    const data = await client.fetchTodos();
    setTodos(data);
  };

  const createTodo = async () => {
    const updated = await client.createNewTodo();
    setTodos(updated);
    setErrorMessage(null);
  };

  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({
      title: "New Posted Todo",
      completed: false,
    });
    setTodos([...todos, newTodo]);
    setErrorMessage(null);
  };

  const removeTodo = async (todo: any) => {
    const updated = await client.removeTodo(todo);
    setTodos(updated);
    setErrorMessage(null);
  };

  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      const remaining = todos.filter((t) => t.id !== todo.id);
      setTodos(remaining);
      setErrorMessage(null);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.response?.data?.message ?? "Error deleting todo");
    }
  };

  const toggleCompleted = async (todo: any, completed: boolean) => {
    try {
      const updatedTodo = { ...todo, completed };
      await client.updateTodo(updatedTodo);
      setTodos(
        todos.map((t) => (t.id === todo.id ? updatedTodo : t))
      );
      setErrorMessage(null);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.response?.data?.message ?? "Error updating todo");
    }
  };

  const startEditing = (todo: any) => {
    setTodos(
      todos.map((t) =>
        t.id === todo.id ? { ...t, editing: true } : t
      )
    );
  };

  const finishEditing = async (todo: any, title: string) => {
    try {
      const updatedTodo = { ...todo, title, editing: false };
      await client.updateTodo(updatedTodo);
      setTodos(
        todos.map((t) => (t.id === todo.id ? updatedTodo : t))
      );
      setErrorMessage(null);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.response?.data?.message ?? "Error updating todo");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>

      {errorMessage && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mb-2 mt-2"
        >
          {errorMessage}
        </div>
      )}

      <h4>
        Todos{" "}
        <FaPlusCircle
          onClick={createTodo}
          className="text-success float-end fs-3"
          id="wd-create-todo"
        />
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3 me-2"
          id="wd-post-todo"
        />
      </h4>

      <ul className="list-group mb-3">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            {/* checkbox to toggle completed */}
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={todo.completed}
              onChange={(e) =>
                toggleCompleted(todo, e.target.checked)
              }
            />

            {/* title / editing field */}
            {!todo.editing ? (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            ) : (
              <input
                className="form-control d-inline w-50"
                defaultValue={todo.title}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    finishEditing(todo, (e.target as HTMLInputElement).value);
                  }
                }}
              />
            )}

            {/* icons on the right */}
            <FaPencilAlt
              onClick={() => startEditing(todo)}
              className="text-primary float-end ms-2"
            />
            <FaTimesCircle
              onClick={() => deleteTodo(todo)}
              className="text-danger float-end ms-2 fs-4"
              id="wd-delete-todo"
            />
            <FaTrash
              onClick={() => removeTodo(todo)}
              className="text-danger float-end mt-1"
              id="wd-remove-todo"
            />
          </li>
        ))}
      </ul>

      <hr />
    </div>
  );
}
