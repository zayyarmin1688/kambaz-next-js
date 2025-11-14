/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(Kambaz)/Courses/Assignments/client.ts
import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/assignments`
  );
  return data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: any
) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return data;
};

export const updateAssignmentOnServer = async (assignment: any) => {
  const { data } = await axiosWithCredentials.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return data;
};

export const deleteAssignmentOnServer = async (assignmentId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${ASSIGNMENTS_API}/${assignmentId}`
  );
  return data;
};

export const findAssignmentById = async (assignmentId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${ASSIGNMENTS_API}/${assignmentId}`
  );
  return data;
};
