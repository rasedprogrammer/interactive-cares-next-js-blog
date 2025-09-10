import ThemeToggle from "@/components/theme/ThemeToggle";
import Link from "next/link";

export const TopNav = () => {
  return (
    <nav className="nav shadow justify-content-between mb-2">
      <div className="d-flex justify-content-start">
        <Link className="nav-link" href="/">
          🌀Next Js Blog
        </Link>
        <Link className="nav-link" href="/blog/create">
          Write a Blog
        </Link>
      </div>
      <div className="d-flex justify-content-start">
        <Link className="nav-link" href="/login">
          Login
        </Link>
        <Link className="nav-link" href="/register">
          Register
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};
