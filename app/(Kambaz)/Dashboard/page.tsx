"use client";

import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  addNewCourse,
  deleteCourse as deleteCourseFromStore,
  updateCourse as updateCourseInStore,
  setCourses,
  Course,
} from "../Courses/reducer";
import { RootState } from "../store";

import {
  enroll as enrollInStore,
  unenroll as unenrollInStore,
  setEnrollments,
  Enrollment,
} from "../Enrollments/reducer";

import * as coursesClient from "../Courses/client";
import * as enrollmentsClient from "../Enrollments/client";

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

  // ---------- fetch from server ----------

  const fetchCourses = async () => {
    try {
      const serverCourses = await coursesClient.fetchAllCourses();
      dispatch(setCourses(serverCourses));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const serverEnrollments: Enrollment[] =
        await enrollmentsClient.fetchEnrollments();
      dispatch(setEnrollments(serverEnrollments));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, [currentUser]);

  // ---------- helpers ----------

  const add = async () => {
    const newCourse = await coursesClient.createCourse({
      ...course,
      _id: uuidv4(),
    });
    dispatch(addNewCourse(newCourse));
  };

  const update = async () => {
    await coursesClient.updateCourse(course);
    dispatch(updateCourseInStore(course));
  };

  const onDeleteCourse = async (courseId: string) => {
    await coursesClient.deleteCourse(courseId);
    dispatch(deleteCourseFromStore(courseId));
  };

  const isEnrolled = (courseId: string): boolean => {
    if (!currentUser) return false;
    return enrollments.some(
      (enrollment) =>
        enrollment.user === currentUser._id &&
        enrollment.course === courseId
    );
  };

  const onEnroll = async (courseId: string) => {
    if (!currentUser) return;
    const newEnrollment = await enrollmentsClient.enrollInCourse({
      user: currentUser._id,
      course: courseId,
    });
    dispatch(enrollInStore(newEnrollment));
  };

  const onUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    const existing = enrollments.find(
      (e) => e.user === currentUser._id && e.course === courseId
    );
    if (!existing) return;
    await enrollmentsClient.unenrollFromCourse(existing._id);
    dispatch(unenrollInStore(existing._id));
  };

  const list = showAll ? courses : courses.filter((c) => isEnrolled(c._id));

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
        <h1 id="wd-dashboard-title" className="mb-0">
          Dashboard
        </h1>
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
        onChange={(e) =>
          setCourse({ ...course, description: e.target.value })
        }
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
                <Link
                  href={enrolled ? href : "#"}
                  onClick={(e) => handleCardLink(e, enrolled)}
                >
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
                    onDeleteCourse(cid);
                  }}
                >
                  Delete
                </Button>

                {currentUser &&
                  (enrolled ? (
                    <Button
                      variant="danger"
                      onClick={(e) => {
                        e.preventDefault();
                        onUnenroll(cid);
                      }}
                    >
                      Unenroll
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      onClick={(e) => {
                        e.preventDefault();
                        onEnroll(cid);
                      }}
                    >
                      Enroll
                    </Button>
                  ))}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

