import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import { courses } from "../../Database";
import Breadcrumb from "./Breadcrumb";

type LayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ cid: string }>;
}>;

export default async function CoursesLayout({ children, params }: LayoutProps) {
  const { cid } = await params;

  const course = courses.find((c) => c._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course?.name ?? `Course ${cid}`}
        <Breadcrumb course={course ?? null} />
      </h2>
      <hr />

      <table className="w-100">
        <tbody>
          <tr>
            <td
              valign="top"
              width="200"
              className="d-none d-md-table-cell pe-3"
            >
              <CourseNavigation cid={cid} />
            </td>
            <td valign="top" width="100%">
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
