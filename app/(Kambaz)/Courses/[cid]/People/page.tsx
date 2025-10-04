"use client";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function People() {
  return (
    <div id="wd-people-table" className="mt-2">
      <Table striped hover responsive className="align-middle">
        <thead className="bg-light">
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-4 text-secondary" />
              <span className="wd-first-name">Tony</span>{" "}
              <span className="wd-last-name">Stark</span>
            </td>
            <td className="wd-login-id">001234561S</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2020-10-01T00:00:00.000Z</td>
            <td className="wd-total-activity">10:21:32</td>
          </tr>
          <tr>
            <td className="text-nowrap">
              <FaUserCircle className="me-2 fs-4 text-secondary" />
              Bruce Wayne
            </td>
            <td>001234562S</td>
            <td>S101</td>
            <td>STUDENT</td>
            <td>2020-11-02T00:00:00.000Z</td>
            <td>15:32:43</td>
          </tr>


          <tr>
            <td className="text-nowrap">
              <FaUserCircle className="me-2 fs-4 text-secondary" />
              Steve Rogers
            </td>
            <td>001234563S</td>
            <td>S101</td>
            <td>STUDENT</td>
            <td>2020-10-02T00:00:00.000Z</td>
            <td>23:32:43</td>
          </tr>


          <tr>
            <td className="text-nowrap">
              <FaUserCircle className="me-2 fs-4 text-secondary" />
              Natasha Romanoff
            </td>
            <td>001234564S</td>
            <td>S101</td>
            <td>TA</td>
            <td>2020-11-05T00:00:00.000Z</td>
            <td>13:23:34</td>
          </tr>


          <tr>
            <td className="text-nowrap">
              <FaUserCircle className="me-2 fs-4 text-secondary" />
              Thor Odinson
            </td>
            <td>001234565S</td>
            <td>S101</td>
            <td>STUDENT</td>
            <td>2020-12-01T00:00:00.000Z</td>
            <td>11:22:33</td>
          </tr>


          <tr>
            <td className="text-nowrap">
              <FaUserCircle className="me-2 fs-4 text-secondary" />
              Bruce Banner
            </td>
            <td>001234566S</td>
            <td>S101</td>
            <td>STUDENT</td>
            <td>2020-12-01T00:00:00.000Z</td>
            <td>22:33:44</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
