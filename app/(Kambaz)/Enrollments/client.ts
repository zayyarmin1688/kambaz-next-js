"use client";

import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

export type EnrollmentPayload = {
  user: string;
  course: string;
};

export const fetchEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(ENROLLMENTS_API);
  return data;
};

export const enrollInCourse = async (payload: EnrollmentPayload) => {
  const { data } = await axiosWithCredentials.post(ENROLLMENTS_API, payload);
  return data;
};

export const unenrollFromCourse = async (enrollmentId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${ENROLLMENTS_API}/${enrollmentId}`
  );
  return data;
};
