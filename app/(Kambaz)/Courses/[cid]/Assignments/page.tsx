"use client";

import Link from "next/link";
import { FormControl, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <div className="d-flex mb-3">
        <div className="d-flex align-items-center flex-grow-1">
          <FaSearch className="me-2 text-secondary" />
          <FormControl
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </div>
        <Button variant="secondary" className="ms-2">
          + Group
        </Button>
        <Button variant="danger" className="ms-2">
          + Assignment
        </Button>
      </div>

      <ListGroup className="rounded-0">
        <ListGroupItem className="d-flex justify-content-between align-items-center bg-secondary fw-bold border-start border-end border-top border-bottom">
          <span>ASSIGNMENTS</span>
          <span>
            <Button variant="light" size="sm" className="me-2">
              40% of Total
            </Button>
            <Button variant="light" size="sm">+</Button>
          </span>
        </ListGroupItem>

        <ListGroupItem className="d-flex justify-content-between align-items-center border-start border-end border-bottom">
          <div>
            <Link href="/Courses/1234/Assignments/123" className="fw-bold text-primary">
              A1 - ENV + HTML
            </Link>
            <div>
              Multiple Modules | <b>Not available until</b> May 6 at 12:00am <br />
              <b>Due</b> May 13 at 11:59pm | <b>100 pts</b>
            </div>
          </div>
          <div className="d-flex align-items-center ms-3">
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4 ms-2" />
          </div>
        </ListGroupItem>

        <ListGroupItem className="d-flex justify-content-between align-items-center border-start border-end border-bottom">
          <div>
            <Link href="/Courses/1234/Assignments/124" className="fw-bold text-primary">
              A2 – CSS + BOOTSTRAP
            </Link>
            <div>
              Multiple Modules | <b>Not available until</b> May 13 at 12:00am <br />
              <b>Due</b> May 20 at 11:59pm | <b>100 pts</b>
            </div>
          </div>
          <div className="d-flex align-items-center ms-3">
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4 ms-2" />
          </div>
        </ListGroupItem>

        <ListGroupItem className="d-flex justify-content-between align-items-center border-start border-end border-bottom">
          <div>
            <Link href="/Courses/1234/Assignments/125" className="fw-bold text-primary">
              A3 – JAVASCRIPT + REACT
            </Link>
            <div>
              Multiple Modules | <b>Not available until</b> May 20 at 12:00am <br />
              <b>Due</b> May 27 at 11:59pm | <b>100 pts</b>
            </div>
          </div>
          <div className="d-flex align-items-center ms-3">
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4 ms-2" />
          </div>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
