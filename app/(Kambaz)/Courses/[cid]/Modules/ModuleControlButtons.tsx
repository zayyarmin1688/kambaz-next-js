"use client";

import { FaTrash, FaPen } from "react-icons/fa6";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (id: string) => void;
  editModule: (id: string) => void;
}) {
  return (
    <div className="float-end">
      <FaPen
        role="button"
        className="text-primary me-3"
        onClick={() => editModule(moduleId)}
      />
      <FaTrash
        role="button"
        className="text-danger"
        onClick={() => deleteModule(moduleId)}
      />
    </div>
  );
}
