"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment, type Assignment } from "../reducer";
import type { RootState } from "../../../../store";
import { useState, useMemo } from "react";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const existing = useSelector((s: RootState) =>
    s.assignmentsReducer.assignments.find((a) => a.course === cid && a._id === aid)
  );

  const isNew = aid === "new";

  // Defaults (preserve your current appearance/values)
  const [title, setTitle] = useState(existing?.title ?? "Untitled Assignment");
  const [description, setDescription] = useState(
    existing?.description ??
      `The assignment is available online.

The landing page should include:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories
• The Kanbas application should include a link back to the landing page.`
  );
  const [points, setPoints] = useState<number>(existing?.points ?? 100);
  const [due, setDue] = useState(existing?.due ?? "2024-05-13T23:59");
  const [availableFrom, setAvailableFrom] = useState(
    existing?.availableFrom ?? "2024-05-06"
  );
  const [availableUntil, setAvailableUntil] = useState(
    existing?.availableUntil ?? "2024-05-20"
  );

  const goBack = () => router.push(`/Courses/${cid}/Assignments`);

  const onSave = () => {
    if (isNew) {
      dispatch(
        addAssignment({
          course: cid,
          title,
          description,
          points,
          due,
          availableFrom,
          availableUntil,
        })
      );
    } else if (existing) {
      const updated: Assignment = {
        ...existing,
        title,
        description,
        points,
        due,
        availableFrom,
        availableUntil,
      };
      dispatch(updateAssignment(updated));
    }
    goBack();
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>
            <strong>Assignment Name</strong>
          </Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Control
            as="textarea"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-points">
          <Form.Label>
            <strong>Points</strong>
          </Form.Label>
          <Form.Control
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="wd-group">
              <Form.Label>
                <strong>Assignment Group</strong>
              </Form.Label>
              <Form.Select defaultValue="ASSIGNMENTS">
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
                <option>EXAMS</option>
                <option>PROJECT</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="wd-display-grade-as">
              <Form.Label>
                <strong>Display Grade as</strong>
              </Form.Label>
              <Form.Select defaultValue="Percentage">
                <option>Percentage</option>
                <option>Points</option>
                <option>Complete/Incomplete</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="wd-submission-type">
          <Form.Label>
            <strong>Submission Type</strong>
          </Form.Label>
          <Form.Select defaultValue="Online" className="mb-2">
            <option>Online</option>
            <option>On Paper</option>
          </Form.Select>

        <div className="border rounded p-2 bg-light">
          <strong>Online Entry Options</strong>
          <Form.Check type="checkbox" label="Text Entry" />
          <Form.Check type="checkbox" label="Website URL" defaultChecked />
          <Form.Check type="checkbox" label="Media Recordings" />
          <Form.Check type="checkbox" label="Student Annotation" />
          <Form.Check type="checkbox" label="File Uploads" />
        </div>
        </Form.Group>

        <div className="border rounded p-3 mb-3">
          <Form.Label>
            <strong>Assign</strong>
          </Form.Label>

          <Form.Group className="mb-3" controlId="wd-assign-to">
            <Form.Label>Assign to</Form.Label>
            <Form.Control type="text" defaultValue="Everyone" readOnly />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group controlId="wd-due-date">
                <Form.Label>Due</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={due}
                  onChange={(e) => setDue(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="wd-available-from">
                <Form.Label>Available from</Form.Label>
                <Form.Control
                  type="date"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="wd-available-until">
                <Form.Label>Available until</Form.Label>
                <Form.Control
                  type="date"
                  value={availableUntil}
                  onChange={(e) => setAvailableUntil(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={goBack}>Cancel</Button>
          <Button variant="danger" onClick={onSave}>Save</Button>
        </div>
      </Form>
    </div>
  );
}
