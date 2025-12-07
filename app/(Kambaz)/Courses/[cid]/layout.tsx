"use client";

import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams<{ cid: string }>();
  const { courses } = useSelector((s: RootState) => s.coursesReducer);
  const course = courses.find(c => c._id === cid) ?? null;

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course ? course.name : `Course ${cid}`}
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <table className="w-100">
        <tbody>
          <tr>
            <td valign="top" width="200" className="d-none d-md-table-cell pe-3">
              <CourseNavigation cid={cid} />
            </td>
            <td valign="top" width="100%">{children}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
