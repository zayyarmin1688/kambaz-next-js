"use client";

import { ListGroup, ListGroupItem, Button, Dropdown } from "react-bootstrap";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import GreenCheckmark from "./GreenCheckmark";

export default function Modules() {
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


      <br />

      {/* WEEK 1 */}
      <ListGroup className="rounded-0 mb-5 border-gray">
        <ListGroupItem className="d-flex justify-content-between align-items-center bg-secondary text-dark">
          <div className="fw-semibold">Week 1</div>
          <ModuleControlButtons />
        </ListGroupItem>

        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="fw-semibold d-inline-block me-2">LEARNING OBJECTIVES</div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="ms-1">Introduction to the course</div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="ms-1">Learn what is Web Development</div>
          <LessonControlButtons />
        </ListGroupItem>
      </ListGroup>

      {/* WEEK 2 */}
      <ListGroup className="rounded-0 mb-5 border-gray">
        <ListGroupItem className="d-flex justify-content-between align-items-center bg-secondary text-dark">
          <div className="fw-semibold">Week 2</div>
          <ModuleControlButtons />
        </ListGroupItem>

        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="fw-semibold">READING</div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="ms-1">Full Stack Developer - Chapter 1</div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="ms-1">Full Stack Developer - Chapter 2</div>
          <LessonControlButtons />
        </ListGroupItem>

        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="fw-semibold">SLIDES</div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="ms-1">Intro to HTML and DOM</div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="ms-1">Formatting Web Content</div>
          <LessonControlButtons />
        </ListGroupItem>
      </ListGroup>

      {/* WEEK 3 */}
      <ListGroup className="rounded-0 mb-5 border-gray">
        <ListGroupItem className="d-flex justify-content-between align-items-center bg-secondary text-dark">
          <div className="fw-semibold">Week 3</div>
          <ModuleControlButtons />
        </ListGroupItem>

        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="fw-semibold">LEARNING OBJECTIVES</div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="ms-1">Learn CSS for styling</div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="ms-1">Box model and positioning</div>
          <LessonControlButtons />
        </ListGroupItem>

        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="fw-semibold">SLIDES</div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="ms-1">CSS Selectors</div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="ms-1">Flexbox and Grid Layout</div>
          <LessonControlButtons />
        </ListGroupItem>
      </ListGroup>

      {/* WEEK 4 */}
      <ListGroup className="rounded-0 mb-5 border-gray">
        <ListGroupItem className="d-flex justify-content-between align-items-center bg-secondary text-dark">
          <div className="fw-semibold">Week 4</div>
          <ModuleControlButtons />
        </ListGroupItem>

        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="fw-semibold">LEARNING OBJECTIVES</div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="ms-1">Finalizing Github</div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="ms-1">React Native</div>
          <LessonControlButtons />
        </ListGroupItem>

        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="fw-semibold">SLIDES</div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="ms-1">React Tutorial</div>
          <LessonControlButtons />
        </ListGroupItem>
        <ListGroupItem className="wd-lesson d-flex align-items-center">
          <div className="ms-1">Language Choice</div>
          <LessonControlButtons />
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
