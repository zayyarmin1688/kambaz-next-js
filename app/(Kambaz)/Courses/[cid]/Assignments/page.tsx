"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormControl, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store";
import {
  deleteAssignment as deleteAssignmentAction,
  setAssignments,
  type Assignment,
} from "./reducer";
import * as client from "./client";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const items = useSelector((s: RootState) =>
    s.assignmentsReducer.assignments.filter((a) => a.course === cid)
  );

  // Load assignments for this course from the server
  useEffect(() => {
    const load = async () => {
      if (!cid) return;
      try {
        const data = await client.findAssignmentsForCourse(cid);
        dispatch(setAssignments(data));
      } catch (e) {
        console.error("Failed to load assignments", e);
      }
    };
    load();
  }, [cid, dispatch]);

  const handleDelete = async (assignmentId: string) => {
    const ok = confirm("Remove this assignment?");
    if (!ok) return;
    try {
      await client.deleteAssignmentOnServer(assignmentId);
      dispatch(deleteAssignmentAction(assignmentId));
    } catch (e) {
      console.error("Failed to delete assignment", e);
    }
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex mb-3">
        <div className="d-flex align-items-center flex-grow-1">
          <FaSearch className="me-2 text-secondary" />
          <FormControl
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </div>
        <Button variant="secondary" className="ms-2">
          + Group
        </Button>
        <Button
          variant="danger"
          className="ms-2"
          onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
        >
          + Assignment
        </Button>
      </div>

      <ListGroup className="rounded-0">
        <ListGroupItem className="d-flex justify-content-between align-items-center bg-secondary fw-bold border-start border-end border-top border-bottom">
          <span>ASSIGNMENTS</span>
          <span>
            <Button variant="light" size="sm" className="me-2">
              40% of Total
            </Button>
            <Button variant="light" size="sm">
              +
            </Button>
          </span>
        </ListGroupItem>

        {items.length === 0 && (
          <ListGroupItem className="border-start border-end border-bottom">
            No assignments for this course yet.
          </ListGroupItem>
        )}

        {items.map((a: Assignment) => (
          <ListGroupItem
            key={a._id}
            className="d-flex justify-content-between align-items-center border-start border-end border-bottom"
          >
            <div>
              <Link
                href={`/Courses/${cid}/Assignments/${a._id}`}
                className="fw-bold text-primary"
              >
                {a.title}
              </Link>
              <div>
                Multiple Modules{" "}
                {a.availableFrom && (
                  <>
                    | <b>Not available until</b> {a.availableFrom}
                  </>
                )}{" "}
                <br />
                {a.due && (
                  <>
                    <b>Due</b> {a.due} |{" "}
                  </>
                )}
                <b>{a.points ?? 100} pts</b>
              </div>
            </div>

            <div className="d-flex align-items-center ms-3">
              <Button
                size="sm"
                variant="outline-danger"
                className="me-2"
                onClick={() => handleDelete(a._id!)}
              >
                Delete
              </Button>
              <GreenCheckmark />
              <IoEllipsisVertical className="fs-4 ms-2" />
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
