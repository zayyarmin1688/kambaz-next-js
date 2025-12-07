/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(Kambaz)/Courses/[cid]/Quizzes/page.tsx
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  FormControl,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../store";
import {
  deleteQuiz as deleteQuizAction,
  setQuizzes,
  type Quiz,
} from "./reducer";
import * as client from "./client";
import UnpublishedIcon from "./UnpublishedIcon";

export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const { currentUser } = useSelector(
    (state: RootState) => (state as any).accountReducer
  );
  const isStudent = currentUser?.role === "STUDENT";

  const items = useSelector((s: RootState) =>
    s.quizzesReducer.quizzes.filter((q) => q.course === cid)
  );

  const visibleItems = isStudent
    ? items.filter((q) => !!q.published)
    : items;

  useEffect(() => {
    const load = async () => {
      if (!cid) return;
      try {
        const data = await client.findQuizzesForCourse(cid);
        dispatch(setQuizzes(data));
      } catch (e) {
        console.error("Failed to load quizzes", e);
      }
    };
    load();
  }, [cid, dispatch]);

  const handleDelete = async (quizId: string) => {
    const ok = confirm("Remove this quiz?");
    if (!ok) return;
    try {
      await client.deleteQuizOnServer(quizId);
      dispatch(deleteQuizAction(quizId));
    } catch (e) {
      console.error("Failed to delete quiz", e);
    }
  };

  return (
    <div id="wd-quizzes">
      <div className="d-flex mb-3">
        <div className="d-flex align-items-center flex-grow-1">
          <FaSearch className="me-2 text-secondary" />
          <FormControl
            placeholder="Search for Quizzes"
            id="wd-search-quiz"
          />
        </div>
        <Button variant="secondary" className="ms-2">
          + Group
        </Button>
        <Button
          variant="danger"
          className="ms-2"
          onClick={() => router.push(`/Courses/${cid}/Quizzes/new`)}
        >
          + Quiz
        </Button>
      </div>

      <ListGroup className="rounded-0">
        <ListGroupItem className="d-flex justify-content-between align-items-center bg-secondary fw-bold border-start border-end border-top border-bottom">
          <span>QUIZZES</span>
          <span>
            <Button variant="light" size="sm" className="me-2">
              Quizzes
            </Button>
            <Button variant="light" size="sm">
              +
            </Button>
          </span>
        </ListGroupItem>

        {visibleItems.length === 0 && (
          <ListGroupItem className="border-start border-end border-bottom">
            {isStudent ? (
              <>No quizzes are available for this course yet.</>
            ) : (
              <>
                No quizzes for this course yet. Click <b>+ Quiz</b> to add one.
              </>
            )}
          </ListGroupItem>
        )}

        {visibleItems.map((q: Quiz) => {
          const quizHref = isStudent
            ? `/Courses/${cid}/Quizzes/${q._id}/Take`
            : `/Courses/${cid}/Quizzes/${q._id}`;

          return (
            <ListGroupItem
              key={q._id}
              className="d-flex justify-content-between align-items-center border-start border-end border-bottom"
            >
              <div>
                <Link
                  href={quizHref}
                  className="fw-bold text-primary"
                >
                  {q.title}
                </Link>
                <div>
                  {q.availableFrom && (
                    <>
                      <b>Available from</b> {q.availableFrom} |{" "}
                    </>
                  )}
                  {q.due && (
                    <>
                      <b>Due</b> {q.due} |{" "}
                    </>
                  )}
                  <b>{q.points ?? 0} pts</b>
                </div>
              </div>

              <div className="d-flex align-items-center ms-3">
                {!isStudent && (
                  <Button
                    size="sm"
                    variant="outline-danger"
                    className="me-2"
                    onClick={() => handleDelete(q._id!)}
                  >
                    Delete
                  </Button>
                )}

                {q.published ? <GreenCheckmark /> : <UnpublishedIcon />}

                <IoEllipsisVertical className="fs-4 ms-2" />
              </div>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}
