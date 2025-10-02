"use client";

import { Button, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

/** Matches the screenshots: Collapse All | View Progress | Publish All ▼ | + Module */
export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      <Dropdown className="float-end me-2">
        <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-publish-all"> <GreenCheckmark /> Publish All</DropdownItem>
          <DropdownItem id="wd-publish-all-modules-and-items"> <GreenCheckmark /> Publish all modules and items</DropdownItem>
          <DropdownItem id="wd-publish-modules-only"> <GreenCheckmark /> Publish modules only</DropdownItem>
          {/* Add the two "Unpublish ..." menu items later if needed */}
        </DropdownMenu>
      </Dropdown>

      {/* Stubs for the other two buttons (add IDs so TAs can find them) */}
      <Button id="wd-view-progress" className="me-2" variant="outline-secondary">View Progress</Button>
      <Button id="wd-collapse-all" className="me-2" variant="outline-secondary">Collapse All</Button>
    </div>
  );
}
