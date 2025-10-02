"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname() || "";

  const isActive = (slug: string) =>
    pathname.toLowerCase().includes(`/${slug.toLowerCase()}`);

  const linkClass = (slug: string) =>
    `list-group-item border-0 ${isActive(slug) ? "active" : "text-danger"}`;

  const activeStyle = (slug: string) =>
    isActive(slug) ? ({ color: "#000" } as React.CSSProperties) : undefined;

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        href="/Courses/1234/Home"
        id="wd-course-home-link"
        className={linkClass("Home")}
        style={activeStyle("Home")}
      >
        Home
      </Link>

      <Link
        href="/Courses/1234/Modules"
        id="wd-course-modules-link"
        className={linkClass("Modules")}
        style={activeStyle("Modules")}
      >
        Modules
      </Link>

      <a
        href="https://piazza.com/class/mf1li76n4is6m/"
        id="wd-course-piazza-link"
        target="_blank"
        rel="noopener noreferrer"
        className="list-group-item text-danger border-0"
      >
        Piazza
      </a>

      <Link
        href="/Courses/1234/Zoom"
        id="wd-course-zoom-link"
        className={linkClass("Zoom")}
        style={activeStyle("Zoom")}
      >
        Zoom
      </Link>

      <Link
        href="/Courses/1234/Assignments"
        id="wd-course-assignments-link"
        className={linkClass("Assignments")}
        style={activeStyle("Assignments")}
      >
        Assignments
      </Link>

      <Link
        href="/Courses/1234/Quizzes"
        id="wd-course-quizzes-link"
        className={linkClass("Quizzes")}
        style={activeStyle("Quizzes")}
      >
        Quizzes
      </Link>

      <Link
        href="/Courses/1234/Grades"
        id="wd-course-grades-link"
        className={linkClass("Grades")}
        style={activeStyle("Grades")}
      >
        Grades
      </Link>

      <Link
        href="/Courses/1234/People"
        id="wd-course-people-link"
        className={linkClass("People")}
        style={activeStyle("People")}
      >
        People
      </Link>
    </div>
  );
}
