/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(Kambaz)/Courses/[cid]/Quizzes/client.ts
import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

export const findQuizzesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/quizzes`
  );
  return data;
};

export const createQuizForCourse = async (courseId: string, quiz: any) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return data;
};

export const updateQuizOnServer = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return data;
};

export const deleteQuizOnServer = async (quizId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return data;
};

export const findQuizById = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}`
  );
  return data;
};

export const createQuizAttempt = async (quizId: string, body: any) => {
  const response = await fetch(`${QUIZZES_API}/${quizId}/attempts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    if (response.status === 403) {
      const data = await response.json();
      const error: any = new Error(data.message || "Maximum attempts reached");
      error.code = data.error || "MAX_ATTEMPTS_REACHED";
      error.details = data;
      throw error;
    }
    throw new Error("Failed to create quiz attempt");
  }

  return response.json();
};

/**
 * Old name that Next is expecting.
 * We *ignore* the studentId parameter and just call the
 * /attempts/mine endpoint, since the backend uses the
 * logged-in user from the session.
 */
export const findAttemptsForQuizAndStudent = async (
  quizId: string,
  _studentId: string
) => {
  const response = await fetch(
    `${QUIZZES_API}/${quizId}/attempts/mine`,
    { credentials: "include" }
  );
  if (!response.ok) {
    throw new Error("Failed to load quiz attempts");
  }
  return response.json();
};
