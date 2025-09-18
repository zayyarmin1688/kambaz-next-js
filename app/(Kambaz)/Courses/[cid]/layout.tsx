import { ReactNode } from "react";
import CourseNavigation from "./Navigation";

type LayoutProps = Readonly<{
  children: ReactNode;
  // NOTE: params is a Promise in this handout/Next version
  params: Promise<{ cid: string }>;
}>;

export default async function CoursesLayout({ children, params }: LayoutProps) {
  const { cid } = await params;

  return (
    <div id="wd-courses">
      <h2>Courses {cid}</h2>
      <hr />
      <table>
        <tbody>
          <tr>
            <td valign="top" width="200">
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
