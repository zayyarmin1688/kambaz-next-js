"use client";

import { Button } from "react-bootstrap";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { IoHomeOutline } from "react-icons/io5";
import { PiBroadcastLight } from "react-icons/pi";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { MdOutlineQueryStats, MdOutlineNotificationsNone } from "react-icons/md";

export default function CourseStatus() {
  return (
    <aside id="wd-course-status" className="d-none d-lg-block">
      <h2 className="mb-3">Course Status</h2>

      <div className="d-flex gap-2 mb-3">
        <Button variant="secondary" className="w-50 text-nowrap">
          <MdDoNotDisturbAlt className="me-2 fs-5" />
          Unpublish
        </Button>
        <Button variant="success" className="w-50 text-nowrap">
          <FaCheckCircle className="me-2 fs-5" />
          Publish
        </Button>
      </div>

      <div className="d-grid gap-2">
        <Button variant="secondary" className="w-100 text-start">
          <BiImport className="me-2 fs-5" />
          Import Existing Content
        </Button>
        <Button variant="secondary" className="w-100 text-start">
          <LiaFileImportSolid className="me-2 fs-5" />
          Import from Commons
        </Button>
        <Button variant="secondary" className="w-100 text-start">
          <IoHomeOutline className="me-2 fs-5" />
          Choose Home Page
        </Button>
        <Button variant="secondary" className="w-100 text-start">
          <PiBroadcastLight className="me-2 fs-5" />
          View Course Stream
        </Button>
        <Button variant="secondary" className="w-100 text-start">
          <HiOutlineMegaphone className="me-2 fs-5" />
          New Announcement
        </Button>
        <Button variant="secondary" className="w-100 text-start">
          <MdOutlineQueryStats className="me-2 fs-5" />
          New Analytics
        </Button>
        <Button variant="secondary" className="w-100 text-start">
          <MdOutlineNotificationsNone className="me-2 fs-5" />
          View Course Notifications
        </Button>
      </div>
    </aside>
  );
}
