"use client";

import Modules from "../Modules/page";
import CourseStatus from "./Status";


export default function Home() {
  return (
    <div id="wd-home" className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-8">
          <Modules />
        </div>
        <div className="col-12 col-lg-4">
          <CourseStatus />
        </div>
      </div>
    </div>
  );
}
