"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import { FaRegCircleUser, FaInbox } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { FaFlask, FaBook } from "react-icons/fa";

type NavEntry = {
  id: string;
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const NAV: NavEntry[] = [
  { id: "account",   href: "/Account",   label: "Account",   Icon: FaRegCircleUser },
  { id: "dashboard", href: "/Dashboard", label: "Dashboard", Icon: AiOutlineDashboard },
  { id: "courses",   href: "/Dashboard", label: "Courses",   Icon: FaBook },
  { id: "calendar",  href: "/Calendar",  label: "Calendar",  Icon: IoCalendarOutline },
  { id: "inbox",     href: "/Inbox",     label: "Inbox",     Icon: FaInbox },
  { id: "labs",      href: "/Labs",      label: "Labs",      Icon: FaFlask },
];

export default function KambazNavigation() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2 text-center"
    >
      <ListGroupItem className="border-0 bg-black">
        <a
          id="wd-neu-link"
          target="_blank"
          href="https://www.northeastern.edu/"
          className="d-block text-white text-decoration-none"
        >
          <img src="/images/NEU.png" alt="Northeastern University" width={75} />
        </a>
      </ListGroupItem>

      {NAV.map(({ id, href, label, Icon }) => {
        const active = isActive(href);
        const tileBg = active ? "bg-white" : "bg-black";

        const baseColor =
          !active
            ? (id === "account" ? "text-white" : "text-danger")
            : "text-danger";

        return (
          <ListGroupItem key={id} className={`border-0 ${tileBg}`}>
            <Link
              id={`wd-${id}-link`}
              href={href}
              className={`d-block ${baseColor} text-decoration-none`}
            >
              <Icon className={`fs-1 ${baseColor}`} />
              <br />
              {label}
            </Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
