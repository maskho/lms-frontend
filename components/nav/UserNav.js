import { useEffect, useState } from "react";

const { default: Link } = require("next/link");

const UserNav = () => {
  const [current, setCurrent] = useState("");
  let isServer = !(typeof window === "undefined");

  useEffect(() => {
    isServer && setCurrent(window.location.pathname);
  }, [isServer && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills">
      <Link
        href="/user"
        className={`nav-link ${current === "/user" && "active"}`}
      >
        Dashboard
      </Link>
    </div>
  );
};

export default UserNav;
