"use client";

import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import { useState } from "react";
import {
  addModule as addModuleAction,
  deleteModule as deleteModuleAction,
  editModule as editModuleAction,
  updateModule as updateModuleAction,
  Module,
} from "./reducer";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const { modules } = useSelector((s: RootState) => s.modulesReducer);

  const [moduleName, setModuleName] = useState("");

  const addModule = () => {
    if (!moduleName.trim()) return;
    dispatch(addModuleAction({ course: cid, name: moduleName.trim() }));
    setModuleName("");
  };

  const deleteModule = (moduleId: string) => {
    dispatch(deleteModuleAction(moduleId));
  };

  const editModule = (moduleId: string) => {
    dispatch(editModuleAction(moduleId));
  };

  const updateModule = (module: Module) => {
    dispatch(updateModuleAction(module));
  };

  const courseModules = modules.filter((m) => m.course === cid);

  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />

      <ListGroup id="wd-modules" className="rounded-0">
        {courseModules.map((module) => (
          <ListGroupItem key={module._id} className="p-0 mb-5 border-gray">
            <div className="d-flex justify-content-between align-items-center bg-secondary text-dark px-3 py-2">
              <div className="fw-semibold">
                {module.editing ? (
                  <FormControl
                    className="w-50 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) =>
                      updateModule({ ...module, name: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateModule({ ...module, editing: false });
                      }
                    }}
                  />
                ) : (
                  module.name
                )}
              </div>

              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={deleteModule}
                editModule={editModule}
              />
            </div>

            {module.lessons?.length ? (
              module.lessons.map((lesson) => (
                <ListGroupItem
                  key={lesson._id}
                  className="wd-lesson d-flex align-items-center"
                >
                  <div className="ms-1">{lesson.name}</div>
                  <LessonControlButtons />
                </ListGroupItem>
              ))
            ) : (
              <ListGroupItem className="text-muted">No lessons yet</ListGroupItem>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
