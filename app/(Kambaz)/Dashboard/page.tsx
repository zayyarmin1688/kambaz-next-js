"use client";

import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, Button } from "react-bootstrap";

type Course = {
  cid: string;
  title: string;
  desc: string;
  img: string;
  href: string;
};

const COURSES: Course[] = [
  { cid: "1234", title: "CS1234 React JS", desc: "Full Stack software developer", img: "/images/reactjs.jpg", href: "/Courses/1234/Home" },
  { cid: "5010", title: "Intro to Software Engineering", desc: "Foundations of building software systems", img: "/images/course2.jpg", href: "/Courses/5010/Home" },
  { cid: "6500", title: "Algorithms", desc: "Design and analyze algorithms", img: "/images/course3.jpg", href: "/Courses/6500/Home" },
  { cid: "1400", title: "East Asian History", desc: "Historical survey of East Asia", img: "/images/course4.jpg", href: "/Courses/1400/Home" },
  { cid: "7480", title: "Intro to Archery", desc: "Basics of archery and safe practice", img: "/images/course5.jpg", href: "/Courses/7480/Home" },
  { cid: "6200", title: "Calculus 2", desc: "Integration techniques and applications", img: "/images/course6.jpg", href: "/Courses/6200/Home" },
  { cid: "2432", title: "Communications", desc: "Principles of effective communication", img: "/images/course7.jpg", href: "/Courses/2432/Home" },
  { cid: "4500", title: "Intro to Improv", desc: "Learn the basics of improvisational performance", img: "/images/course8.jpg", href: "/Courses/4500/Home" },
];

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2>
      <hr />

      <Row xs={1} md={5} className="g-4" id="wd-dashboard-courses">
        {COURSES.map(({ cid, title, desc, img, href }) => (
          <Col key={cid} className="wd-dashboard-course" style={{ width: "300px" }}>
            <Link href={href} className="wd-dashboard-course-link text-decoration-none text-dark">
              <Card className="h-100">
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
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: 100 }}>
                    {desc}
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}
