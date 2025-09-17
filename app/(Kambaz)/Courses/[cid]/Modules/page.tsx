export default function Modules() {
  return (
    <div>
      
      <div id="wd-modules-controls">
        <button id="wd-modules-collapse-all">Collapse All</button>
        <button id="wd-modules-view-progress">View Progress</button>
        <select id="wd-modules-publish-all" defaultValue="Publish All">
          <option value="Publish All">Publish All</option>
        </select>
        <button id="wd-modules-add">+ Module</button>
      </div>
      <br />

      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Developer - Chapter 1</li>
                <li className="wd-content-item">Full Stack Developer - Chapter 2</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Intro to HTML and DOM</li>
                <li className="wd-content-item">Formatting Web Content</li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learn CSS for styling</li>
                <li className="wd-content-item">Box model and positioning</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">CSS Selectors</li>
                <li className="wd-content-item">Flexbox and Grid Layout</li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="wd-module">
          <div className="wd-title">Week 4</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Finalizing Github</li>
                <li className="wd-content-item">React Native</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">React Tutorial</li>
                <li className="wd-content-item">Language Choice</li>
              </ul>
            </li>
          </ul>
        </li>






      </ul>
    </div>
  );
}
