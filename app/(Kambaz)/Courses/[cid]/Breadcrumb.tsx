"use client";

import React from "react";
import { usePathname } from "next/navigation";

type Props = {
  course?: { name: string } | null;
};

const LABELS: Record<string, string> = {
  home: "Home",
  modules: "Modules",
  piazza: "Piazza",
  zoom: "Zoom",
  assignments: "Assignments",
  quizzes: "Quizzes",
  grades: "Grades",
  people: "People",
};

export default function Breadcrumb({ course }: Props) {
  const pathname = usePathname();
  const last = pathname.split("/").filter(Boolean).pop() ?? "";
  const section = LABELS[last.toLowerCase()] ?? last;

  if (!section || section === course?.name) {
    return <span className="ms-2 text-danger"></span>;
  }

  return (
    <span className="ms-2 text-danger">
      {" > "} {section}
    </span>
  );
}
