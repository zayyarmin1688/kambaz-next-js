import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons() {
  return (
    <div className="d-flex align-items-center gap-3">
      <GreenCheckmark />
      <BsPlusLg className="fs-6" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
