"use client";

import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState, MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { addNewCourse, deleteCourse, updateCourse, Course } from "../Courses/reducer";
import { RootState } from "../store";
import { enroll, unenroll } from "../Enrollments/reducer";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { courses } = useSelector((s: RootState) => s.coursesReducer);
  const { currentUser } = useSelector((s: RootState) => s.accountReducer);
  const { enrollments } = useSelector((s: RootState) => s.enrollmentsReducer);

  const [showAll, setShowAll] = useState(true);

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    description: "New Description",
    image: "/images/reactjs.jpg",
  });

  const add = () => {
    dispatch(addNewCourse({ ...course, _id: uuidv4() }));
  };

  const update = () => {
    dispatch(updateCourse(course));
  };

  const isEnrolled = (courseId: string): boolean => {
    if (!currentUser) return false;
    return enrollments.some(
      (enrollment) =>
        enrollment.user === currentUser._id &&
        enrollment.course === courseId
    );
  }

  const list = showAll
    ? courses
    : courses.filter((c) => isEnrolled(c._id));

  const cards = list.map((c) => ({
    cid: c._id,
    title: c.name,
    desc: c.description,
    img: c.image ?? "/images/reactjs.jpg",
    href: `/Courses/${c._id}/Home`,
    enrolled: isEnrolled(c._id),
  }));

  const handleCardLink = (e: MouseEvent, enrolled: boolean) => {
    if (!enrolled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div id="wd-dashboard">
      <div className="d-flex align-items-center justify-content-between">
        <h1 id="wd-dashboard-title" className="mb-0">Dashboard</h1>
        <Button
          variant="primary"
          onClick={() => setShowAll((v) => !v)}
          id="wd-toggle-enrollments"
        >
          Enrollments
        </Button>
      </div>

      <hr />
      <h5>New Course</h5>

      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        value={course.description}
        as="textarea"
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <div className="mt-2">
        <Button className="me-2" onClick={update} id="wd-update-course-click">
          Update
        </Button>
        <Button onClick={add} id="wd-add-new-course-click">
          Add
        </Button>
      </div>

      <hr />
      <h2 id="wd-dashboard-published">
        {showAll ? "All Courses" : "My Courses"} ({cards.length})
      </h2>
      <hr />

      <Row xs={1} md={5} className="g-4" id="wd-dashboard-courses">
        {cards.map(({ cid, title, desc, img, href, enrolled }) => (
          <Col key={cid} className="wd-dashboard-course" style={{ width: 300 }}>
            <Card className="h-100">
              <Link
                href={href}
                className="wd-dashboard-course-link text-decoration-none text-dark"
                onClick={(e) => handleCardLink(e, enrolled)}
              >
                <Image
                  src={img}
                  alt={title}
                  width={1000}
                  height={600}
                  className="card-img-top"
                  style={{ width: "100%", height: 160, objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {title}
                  </Card.Title>
                  <Card.Text
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: 100 }}
                  >
                    {desc}
                  </Card.Text>
                </Card.Body>
              </Link>

              <Card.Footer className="d-flex gap-2">
                <Link href={enrolled ? href : "#"} onClick={(e) => handleCardLink(e, enrolled)}>
                  <Button variant="primary" disabled={!enrolled}>
                    Go
                  </Button>
                </Link>

                <Button
                  variant="warning"
                  id="wd-edit-course-click"
                  onClick={(e) => {
                    e.preventDefault();
                    const found = courses.find((x) => x._id === cid);
                    if (found) setCourse(found);
                  }}
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  id="wd-delete-course-click"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(deleteCourse(cid));
                  }}
                >
                  Delete
                </Button>

                {currentUser && (
                  enrolled ? (
                    <Button
                      variant="danger"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(unenroll({ user: currentUser._id, course: cid }));
                      }}
                    >
                      Unenroll
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(enroll({ user: currentUser._id, course: cid }));
                      }}
                    >
                      Enroll
                    </Button>
                  )
                )}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
