"use client";

import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import { useState, useEffect } from "react";
import {
  addModule as addModuleAction,
  deleteModule as deleteModuleAction,
  editModule as editModuleAction,
  updateModule as updateModuleAction,
  setModules,
  Module,
} from "./reducer";
import LessonControlButtons from "./LessonControlButtons";
import "./modules.css";
import * as client from "../../client";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const { modules } = useSelector((s: RootState) => s.modulesReducer);

  const [moduleName, setModuleName] = useState("");

  useEffect(() => {
    const fetchModules = async () => {
      if (!cid) return;
      try {
        const serverModules = await client.findModulesForCourse(cid);
        // we’re already on a per-course page, so the whole list is for this course
        dispatch(setModules(serverModules));
      } catch (err) {
        console.error("Error loading modules", err);
      }
    };
    fetchModules();
  }, [cid, dispatch]);

  const addModule = async () => {
    if (!moduleName.trim() || !cid) return;
    try {
      const created = await client.createModuleForCourse(cid, {
        name: moduleName.trim(),
      });

      // Make absolutely sure the module has the course ID attached
      const newModule: Module = {
        ...created,
        course: cid,
      };

      dispatch(addModuleAction(newModule));
      setModuleName("");
    } catch (err) {
      console.error("Error creating module", err);
    }
  };

  const deleteModule = async (moduleId: string) => {
    if (!cid) return;
    try {
      await client.deleteModule(cid, moduleId);
      dispatch(deleteModuleAction(moduleId));
    } catch (err) {
      console.error("Error deleting module", err);
    }
  };

  const editModule = (moduleId: string) => {
    dispatch(editModuleAction(moduleId));
  };

  const updateModule = async (module: Module) => {
    if (!cid) return;
    try {
      await client.updateModule(cid, module);
      dispatch(updateModuleAction(module));
    } catch (err) {
      console.error("Error updating module", err);
    }
  };

  const courseModules = modules;

  return (
    <div className="wd-modules">
      <div
        id="wd-modules-toolbar"
        className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3"
      >
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={addModule}
        />
      </div>

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
              <ListGroupItem className="text-muted">
                No lessons yet
              </ListGroupItem>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

