import { ReactNode } from "react";
import CourseNavigation from "./Navigation";

type LayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ cid: string }>;
}>;

export default async function CoursesLayout({ children, params }: LayoutProps) {
  const { cid } = await params;

  return (
    <div id="wd-courses">
      <h2>Courses {cid}</h2>
      <hr />

      <table className="w-100">
        <tbody>
          <tr>
            <td
              valign="top"
              width="200"
              className="d-none d-md-table-cell pe-3"
            >
              <CourseNavigation />
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
