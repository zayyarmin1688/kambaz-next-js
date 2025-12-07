/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Form, Button, Nav } from "react-bootstrap";

import type { RootState } from "../../../../store";
import {
  addQuiz,
  updateQuiz,
  type Quiz,
  type QuizQuestion,
} from "../reducer";
import * as client from "../client";
import QuizDetailsTab from "./QuizDetailsTab";
import QuizQuestionsTab from "./QuizQuestionsTab";

export default function QuizEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const { currentUser } = useSelector(
    (state: RootState) => (state as any).accountReducer
  );
  const isStudent = currentUser?.role === "STUDENT";

  const existing = useSelector((s: RootState) =>
    s.quizzesReducer.quizzes.find(
      (q) => q.course === cid && q._id === qid
    )
  );

  const isNew = qid === "new";

  const [activeTab, setActiveTab] =
    useState<"details" | "questions">("details");

  const [title, setTitle] = useState("New Quiz");
  const [description, setDescription] = useState("");

  const [quizType, setQuizType] = useState("Graded Quiz");
  const [assignmentGroup, setAssignmentGroup] =
    useState("Quizzes");
  const [points, setPoints] = useState<number>(0);

  const [shuffleAnswers, setShuffleAnswers] =
    useState(true);
  const [timeLimitMinutes, setTimeLimitMinutes] =
    useState<number>(20);
  const [multipleAttempts, setMultipleAttempts] =
    useState(false);
  const [maxAttempts, setMaxAttempts] =
    useState<number>(1);
  const [showCorrectAnswers, setShowCorrectAnswers] =
    useState("immediately");

  const [accessCode, setAccessCode] = useState("");
  const [oneQuestionAtATime, setOneQuestionAtATime] =
    useState(true);
  const [webcamRequired, setWebcamRequired] =
    useState(false);
  const [
    lockQuestionsAfterAnswering,
    setLockQuestionsAfterAnswering,
  ] = useState(false);

  const [due, setDue] = useState<string>("");
  const [availableFrom, setAvailableFrom] =
    useState<string>("");
  const [availableUntil, setAvailableUntil] =
    useState<string>("");

  const [published, setPublished] = useState(false);

  const [questions, setQuestions] = useState<QuizQuestion[]>(
    []
  );
  const [editingId, setEditingId] = useState<string | null>(
    null
  );

  // ---- load existing quiz into local state ----
  useEffect(() => {
    if (!existing) return;

    setTitle(existing.title ?? "New Quiz");
    setDescription(existing.description ?? "");
    setQuizType(existing.quizType ?? "Graded Quiz");
    setAssignmentGroup(
      existing.assignmentGroup ?? "Quizzes"
    );
    if (existing.points !== undefined)
      setPoints(existing.points);

    if (existing.shuffleAnswers !== undefined)
      setShuffleAnswers(!!existing.shuffleAnswers);
    if (existing.timeLimitMinutes !== undefined)
      setTimeLimitMinutes(existing.timeLimitMinutes);
    if (existing.multipleAttempts !== undefined)
      setMultipleAttempts(!!existing.multipleAttempts);
    if (existing.maxAttempts !== undefined)
      setMaxAttempts(existing.maxAttempts);
    if (existing.showCorrectAnswers)
      setShowCorrectAnswers(existing.showCorrectAnswers);

    setAccessCode(existing.accessCode ?? "");
    if (existing.oneQuestionAtATime !== undefined)
      setOneQuestionAtATime(
        !!existing.oneQuestionAtATime
      );
    if (existing.webcamRequired !== undefined)
      setWebcamRequired(!!existing.webcamRequired);
    if (
      existing.lockQuestionsAfterAnswering !==
      undefined
    )
      setLockQuestionsAfterAnswering(
        !!existing.lockQuestionsAfterAnswering
      );

    setDue(existing.due ?? "");
    setAvailableFrom(existing.availableFrom ?? "");
    setAvailableUntil(existing.availableUntil ?? "");

    setPublished(!!existing.published);

    setQuestions(existing.questions ?? []);
  }, [existing]);

  // ---- block students from editor ----
  useEffect(() => {
    if (!isStudent) return;

    if (qid && qid !== "new") {
      router.replace(
        `/Courses/${cid}/Quizzes/${qid}/Preview`
      );
    } else {
      router.replace(`/Courses/${cid}/Quizzes`);
    }
  }, [isStudent, cid, qid, router]);

  const goBack = () =>
    router.push(`/Courses/${cid}/Quizzes`);

  const goToPreview = () => {
    if (!cid || !qid || isNew) return;
    router.push(
      `/Courses/${cid}/Quizzes/${qid}/Preview`
    );
  };

  const save = async (newPublished?: boolean) => {
    if (!cid) return;

    const body: Partial<Quiz> = {
      title,
      description,
      quizType,
      assignmentGroup,
      points,
      shuffleAnswers,
      timeLimitMinutes,
      multipleAttempts,
      maxAttempts,
      showCorrectAnswers,
      accessCode,
      oneQuestionAtATime,
      webcamRequired,
      lockQuestionsAfterAnswering,
      due,
      availableFrom,
      availableUntil,
      published: newPublished ?? published,
      questions,
    };

    if (isNew) {
      const created = await client.createQuizForCourse(
        cid,
        body
      );
      dispatch(addQuiz(created));
    } else if (existing && existing._id) {
      const updated: Quiz = { ...existing, ...body };
      await client.updateQuizOnServer(updated);
      dispatch(updateQuiz(updated));
    }

    goBack();
  };

  const onSave = () => save();
  const onSaveAndPublish = () => save(true);

  if (isStudent) {
    return (
      <div className="p-3">
        <p>
          You do not have permission to edit this quiz.
          Redirecting…
        </p>
      </div>
    );
  }

  return (
    <div id="wd-quiz-editor" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">
          {isNew ? "New Quiz" : `Edit Quiz: ${title}`}
        </h3>

        {!isNew && (
          <Button
            variant="outline-secondary"
            onClick={goToPreview}
          >
            Preview
          </Button>
        )}
      </div>

      <Nav
        variant="tabs"
        activeKey={activeTab}
        className="mb-3"
        onSelect={(k) =>
          setActiveTab(
            (k as "details" | "questions") ?? "details"
          )
        }
      >
        <Nav.Item>
          <Nav.Link eventKey="details">
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="questions">
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Form>
        {activeTab === "details" ? (
          <QuizDetailsTab
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            quizType={quizType}
            setQuizType={setQuizType}
            assignmentGroup={assignmentGroup}
            setAssignmentGroup={setAssignmentGroup}
            points={points}
            setPoints={setPoints}
            shuffleAnswers={shuffleAnswers}
            setShuffleAnswers={setShuffleAnswers}
            timeLimitMinutes={timeLimitMinutes}
            setTimeLimitMinutes={setTimeLimitMinutes}
            multipleAttempts={multipleAttempts}
            setMultipleAttempts={setMultipleAttempts}
            maxAttempts={maxAttempts}
            setMaxAttempts={setMaxAttempts}
            showCorrectAnswers={showCorrectAnswers}
            setShowCorrectAnswers={setShowCorrectAnswers}
            accessCode={accessCode}
            setAccessCode={setAccessCode}
            oneQuestionAtATime={oneQuestionAtATime}
            setOneQuestionAtATime={setOneQuestionAtATime}
            webcamRequired={webcamRequired}
            setWebcamRequired={setWebcamRequired}
            lockQuestionsAfterAnswering={
              lockQuestionsAfterAnswering
            }
            setLockQuestionsAfterAnswering={
              setLockQuestionsAfterAnswering
            }
            due={due}
            setDue={setDue}
            availableFrom={availableFrom}
            setAvailableFrom={setAvailableFrom}
            availableUntil={availableUntil}
            setAvailableUntil={setAvailableUntil}
          />
        ) : (
          <QuizQuestionsTab
            questions={questions}
            setQuestions={setQuestions}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        )}

        <div className="d-flex justify-content-between align-items-center mt-4">
          <Form.Check
            type="switch"
            id="wd-published-toggle"
            label="Published"
            checked={published}
            onChange={(e) =>
              setPublished(e.target.checked)
            }
          />

          <div className="d-flex gap-2">
            <Button
              variant="secondary"
              onClick={goBack}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={onSave}>
              Save
            </Button>
            <Button
              variant="success"
              onClick={onSaveAndPublish}
            >
              Save &amp; Publish
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
