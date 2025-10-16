"use client";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, Button, Dropdown } from "react-bootstrap";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import GreenCheckmark from "./GreenCheckmark";
import * as db from "../../../Database";
type Lesson = { _id: string; name: string };
type Module = { _id: string; course: string; name: string; lessons?: Lesson[] };


export default function Modules() {
  const { cid } = useParams<{ cid: string }>();

  const modules: Module[] = (db.modules as Module[]).filter(
    (m) => m.course === cid
  );

  return (
    <div>
     <div
        id="wd-modules-controls"
        className="d-flex align-items-center gap-2 flex-wrap mb-3"
      >
        <Button id="wd-modules-collapse-all" variant="secondary">
          Collapse All
        </Button>

        <Button id="wd-modules-view-progress" variant="secondary">
          View Progress
        </Button>

        <Dropdown>
          <Dropdown.Toggle
            id="wd-modules-publish-all"
            variant="secondary"
            className="d-inline-flex align-items-center gap-2"
          >
            <GreenCheckmark /> Publish All
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item id="wd-publish-all">
              <GreenCheckmark /> Publish All
            </Dropdown.Item>
            <Dropdown.Item id="wd-publish-all-modules-and-items">
              <GreenCheckmark /> Publish all modules and items
            </Dropdown.Item>
            <Dropdown.Item id="wd-publish-modules-only">
              <GreenCheckmark /> Publish modules only
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item id="wd-unpublish-all-modules-and-items">
              Unpublish all modules and items
            </Dropdown.Item>
            <Dropdown.Item id="wd-unpublish-modules-only">
              Unpublish modules only
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Button id="wd-modules-add" variant="danger">
          + Module
        </Button>
      </div>


     <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module) => (
          <ListGroupItem key={module._id} className="p-0 mb-5 border-gray">
            <div className="d-flex justify-content-between align-items-center bg-secondary text-dark px-3 py-2">
              <div className="fw-semibold">{module.name}</div>
              <ModuleControlButtons />
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
