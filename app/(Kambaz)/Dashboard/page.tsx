import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2>
      <hr />

      <div id="wd-dashboard-courses">
        {/* Course 1 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="" />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">Full Stack software developer</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 2 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5010" className="wd-dashboard-course-link">
            <Image src="/images/course2.jpg" width={200} height={150} alt="Intro to Software Engineering" />
            <div>
              <h5>Intro to Software Engineering</h5>
              <p className="wd-dashboard-course-title">Foundations of building software systems</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        {/* Course 3 */}
         <div className="wd-dashboard-course">
          <Link href="/Courses/6500" className="wd-dashboard-course-link">
            <Image src="/images/course3.jpg" width={200} height={150} alt="Algorithms" />
            <div>
              <h5>Algorithms</h5>
              <p className="wd-dashboard-course-title">Design and analyze algorithms</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        {/* Course 4 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/1400" className="wd-dashboard-course-link">
            <Image src="/images/course4.jpg" width={200} height={150} alt="East Asian History" />
            <div>
              <h5>East Asian History</h5>
              <p className="wd-dashboard-course-title">Historical survey of East Asia</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
         {/* Course 5 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/7480" className="wd-dashboard-course-link">
            <Image src="/images/course5.jpg" width={200} height={150} alt="Intro to Archery" />
            <div>
              <h5>Intro to Archery</h5>
              <p className="wd-dashboard-course-title">Basics of archery and safe practice</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

         {/* Course 6 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/6200" className="wd-dashboard-course-link">
            <Image src="/images/course6.jpg" width={200} height={150} alt="Calculus 2" />
            <div>
              <h5>Calculus 2</h5>
              <p className="wd-dashboard-course-title">Integration techniques and applications</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        
        {/* Course 7 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/2432" className="wd-dashboard-course-link">
            <Image src="/images/course7.jpg" width={200} height={150} alt="Communications" />
            <div>
              <h5>Communications</h5>
              <p className="wd-dashboard-course-title">Principles of effective communication</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        {/* Course 8 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/4500" className="wd-dashboard-course-link">
            <Image src="/images/course8.jpg" width={200} height={150} alt="Intro to Improv" />
            <div>
              <h5>Intro to Improv</h5>
              <p className="wd-dashboard-course-title">Learn the basics of improvisational performance</p>
              <button>Go</button>
            </div>
          </Link>
        </div>





      </div>
    </div>
  );
}
