"use client";

import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, Button } from "react-bootstrap";
import * as db from "../Database";

type RawCourse = {
  _id: string;
  name: string;
  description: string;
  image?: string;
};

const toCardModel = (cou: RawCourse) => ({
  cid: cou._id,
  title: cou.name,
  desc: cou.description,
  img: cou.image ?? "/images/reactjs.jpg", 
  href: `/Courses/${cou._id}/Home`,
});

export default function Dashboard() {
  const courses = (db.courses as RawCourse[]).map(toCardModel);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />

      <Row xs={1} md={5} className="g-4" id="wd-dashboard-courses">
        {courses.map(({ cid, title, desc, img, href }) => (
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

