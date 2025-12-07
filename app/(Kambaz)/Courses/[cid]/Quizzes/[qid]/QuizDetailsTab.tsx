// app/(Kambaz)/Courses/[cid]/Quizzes/[qid]/QuizDetailsTab.tsx
import { Form, Row, Col } from "react-bootstrap";

type Props = {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;

  quizType: string;
  setQuizType: (v: string) => void;
  assignmentGroup: string;
  setAssignmentGroup: (v: string) => void;
  points: number;
  setPoints: (v: number) => void;

  shuffleAnswers: boolean;
  setShuffleAnswers: (v: boolean) => void;
  timeLimitMinutes: number;
  setTimeLimitMinutes: (v: number) => void;
  multipleAttempts: boolean;
  setMultipleAttempts: (v: boolean) => void;
  maxAttempts: number;
  setMaxAttempts: (v: number) => void;
  showCorrectAnswers: string;
  setShowCorrectAnswers: (v: string) => void;

  accessCode: string;
  setAccessCode: (v: string) => void;
  oneQuestionAtATime: boolean;
  setOneQuestionAtATime: (v: boolean) => void;
  webcamRequired: boolean;
  setWebcamRequired: (v: boolean) => void;
  lockQuestionsAfterAnswering: boolean;
  setLockQuestionsAfterAnswering: (v: boolean) => void;

  due: string;
  setDue: (v: string) => void;
  availableFrom: string;
  setAvailableFrom: (v: string) => void;
  availableUntil: string;
  setAvailableUntil: (v: string) => void;
};

export default function QuizDetailsTab(props: Props) {
  const {
    title,
    setTitle,
    description,
    setDescription,
    quizType,
    setQuizType,
    assignmentGroup,
    setAssignmentGroup,
    points,
    setPoints,
    shuffleAnswers,
    setShuffleAnswers,
    timeLimitMinutes,
    setTimeLimitMinutes,
    multipleAttempts,
    setMultipleAttempts,
    maxAttempts,
    setMaxAttempts,
    showCorrectAnswers,
    setShowCorrectAnswers,
    accessCode,
    setAccessCode,
    oneQuestionAtATime,
    setOneQuestionAtATime,
    webcamRequired,
    setWebcamRequired,
    lockQuestionsAfterAnswering,
    setLockQuestionsAfterAnswering,
    due,
    setDue,
    availableFrom,
    setAvailableFrom,
    availableUntil,
    setAvailableUntil,
  } = props;

  return (
    <>
      <Form.Group className="mb-3" controlId="wd-quiz-title">
        <Form.Label>
          <strong>Quiz Name</strong>
        </Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="wd-quiz-description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="wd-quiz-type">
            <Form.Label>Quiz Type</Form.Label>
            <Form.Select
              value={quizType}
              onChange={(e) => setQuizType(e.target.value)}
            >
              <option>Graded Quiz</option>
              <option>Practice Quiz</option>
              <option>Graded Survey</option>
              <option>Ungraded Survey</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="wd-assignment-group">
            <Form.Label>Assignment Group</Form.Label>
            <Form.Select
              value={assignmentGroup}
              onChange={(e) => setAssignmentGroup(e.target.value)}
            >
              <option>Quizzes</option>
              <option>Exams</option>
              <option>Assignments</option>
              <option>Project</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs="3">
          <Form.Group controlId="wd-quiz-points">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value) || 0)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="wd-shuffle-answers">
            <Form.Check
              type="checkbox"
              label="Shuffle Answers"
              checked={shuffleAnswers}
              onChange={(e) => setShuffleAnswers(e.target.checked)}
            />
          </Form.Group>
          <Form.Group controlId="wd-one-question" className="mt-2">
            <Form.Check
              type="checkbox"
              label="One Question at a Time"
              checked={oneQuestionAtATime}
              onChange={(e) => setOneQuestionAtATime(e.target.checked)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="wd-time-limit">
            <Form.Label>Time Limit (minutes)</Form.Label>
            <Form.Control
              type="number"
              value={timeLimitMinutes}
              onChange={(e) =>
                setTimeLimitMinutes(Number(e.target.value) || 0)
              }
            />
          </Form.Group>
          <Form.Group controlId="wd-webcam-required" className="mt-2">
            <Form.Check
              type="checkbox"
              label="Webcam Required"
              checked={webcamRequired}
              onChange={(e) => setWebcamRequired(e.target.checked)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="wd-multiple-attempts">
            <Form.Check
              type="checkbox"
              label="Multiple Attempts"
              checked={multipleAttempts}
              onChange={(e) => setMultipleAttempts(e.target.checked)}
            />
          </Form.Group>
          {multipleAttempts && (
            <Form.Group controlId="wd-max-attempts" className="mt-2">
              <Form.Label>How Many Attempts</Form.Label>
              <Form.Control
                type="number"
                value={maxAttempts}
                onChange={(e) => setMaxAttempts(Number(e.target.value) || 1)}
              />
            </Form.Group>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="wd-show-correct">
            <Form.Label>Show Correct Answers</Form.Label>
            <Form.Select
              value={showCorrectAnswers}
              onChange={(e) => setShowCorrectAnswers(e.target.value)}
            >
              <option value="immediately">Immediately</option>
              <option value="later">Later</option>
              <option value="never">Never</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="wd-access-code">
            <Form.Label>Access Code</Form.Label>
            <Form.Control
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="wd-lock-questions">
            <Form.Check
              type="checkbox"
              label="Lock Questions After Answering"
              checked={lockQuestionsAfterAnswering}
              onChange={(e) =>
                setLockQuestionsAfterAnswering(e.target.checked)
              }
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="border rounded p-3 mb-3">
        <Form.Label>
          <strong>Assign</strong>
        </Form.Label>
        <Row>
          <Col>
            <Form.Group controlId="wd-quiz-due">
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
              <Form.Label>Available From</Form.Label>
              <Form.Control
                type="date"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="wd-available-until">
              <Form.Label>Until</Form.Label>
              <Form.Control
                type="date"
                value={availableUntil}
                onChange={(e) => setAvailableUntil(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </div>
    </>
  );
}
