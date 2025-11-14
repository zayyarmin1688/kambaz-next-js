"use client";

import React, { useEffect, useState } from "react";
import * as client from "./client";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<any>({});

  const fetchAssignment = async () => {
    const data = await client.fetchAssignment();
    setAssignment(data);
  };

  const updateAssignmentTitle = async () => {
    const updated = await client.updateTitle(assignment.title);
    setAssignment(updated);
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>

      <div className="mb-2">
        <label htmlFor="wd-assignment-title" className="form-label">
          Title
        </label>
        <input
          id="wd-assignment-title"
          className="form-control"
          value={assignment.title ?? ""}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
      </div>

      <div className="mb-2">
        <label htmlFor="wd-assignment-description" className="form-label">
          Description
        </label>
        <textarea
          id="wd-assignment-description"
          className="form-control"
          rows={3}
          value={assignment.description ?? ""}
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
        />
      </div>

      <div className="mb-2">
        <label htmlFor="wd-assignment-due" className="form-label">
          Due date
        </label>
        <input
          id="wd-assignment-due"
          type="date"
          className="form-control"
          value={assignment.due ?? ""}
          onChange={(e) =>
            setAssignment({ ...assignment, due: e.target.value })
          }
        />
      </div>

      <div className="form-check form-switch mb-3">
        <input
          id="wd-assignment-completed"
          className="form-check-input"
          type="checkbox"
          checked={assignment.completed ?? false}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label
          className="form-check-label"
          htmlFor="wd-assignment-completed"
        >
          Completed
        </label>
      </div>

      <button
        className="btn btn-primary me-2"
        onClick={updateAssignmentTitle}
        id="wd-update-assignment-title"
      >
        Update Title
      </button>

      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}
