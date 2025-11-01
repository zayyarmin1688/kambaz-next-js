"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          href={`/Account/${link}`}
          className={`list-group-item border-0 ${
            pathname.includes(link) ? "active" : "text-danger"
          }`}
          id={`wd-account-${link.toLowerCase()}-link`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
