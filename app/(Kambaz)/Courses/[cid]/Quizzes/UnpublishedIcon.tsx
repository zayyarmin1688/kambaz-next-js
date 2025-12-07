"use client";

import { IoBan } from "react-icons/io5";

export default function UnpublishedIcon() {
  return (
    <IoBan
      className="text-danger ms-2"
      style={{ fontSize: "1.3rem" }}
      title="Unpublished"
    />
  );
}