"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = { cid: string };

type NavItem = {
  label: string;  
  slug?: string;  
  externalHref?: string;
  isActive?: (pathname: string) => boolean; 
};

const LINKS: NavItem[] = [
  { label: "Home",        slug: "Home" },
  { label: "Modules",     slug: "Modules" },
  { label: "Piazza",      externalHref: "https://piazza.com/class/mf1li76n4is6m/" },
  { label: "Zoom",        slug: "Zoom" },
  { label: "Assignments", slug: "Assignments" },
  { label: "Quizzes",     slug: "Quizzes" },
  { label: "Grades",      slug: "Grades" },

  {
    label: "People",
    slug: "People/Table",
    isActive: (pathname: string) => {
      const p = pathname.toLowerCase();
      return p.includes("/people");
    },
  },
];

export default function CourseNavigation({ cid }: Props) {
  const pathname = (usePathname() ?? "").toLowerCase();

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {LINKS.map(({ label, slug, externalHref, isActive }) => {
        if (externalHref) {
          return (
            <a
              key={label}
              id="wd-course-piazza-link"
              href={externalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="list-group-item text-danger border-0"
            >
              {label}
            </a>
          );
        }

        const href = `/Courses/${cid}/${slug}`;
        const active =
          typeof isActive === "function"
            ? isActive(pathname)
            : pathname.endsWith(`/${(slug ?? "").toLowerCase()}`);

        const className = `list-group-item border-0 ${
          active ? "active" : "text-danger"
        }`;

        return (
          <Link
            key={label}
            id={`wd-course-${label.toLowerCase()}-link`}
            href={href}
            className={className}
            style={active ? ({ color: "#000" } as React.CSSProperties) : undefined}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
