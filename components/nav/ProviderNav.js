import Link from "next/link";
import { useEffect, useState } from "react";

const ProviderNav = () => {
  const [current, setCurrent] = useState("");
  let isServer = !(typeof window === "undefined");

  useEffect(() => {
    isServer && setCurrent(window.location.pathname);
  }, [isServer && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills">
      <Link
        href="/provider"
        className={`nav-link ${current === "/provider" && "active"}`}
      >
        Dashboard
      </Link>
      <Link
        href="/provider/course/create"
        className={`nav-link ${
          current === "/provider/course/create" && "active"
        }`}
      >
        Course Create
      </Link>
    </div>
  );
};

export default ProviderNav;
