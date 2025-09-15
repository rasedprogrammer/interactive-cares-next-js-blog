import ThemeToggle from "@/components/theme/ThemeToggle";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export const TopNav = () => {
  const { data, status } = useSession();
  console.log({ data });

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
      <div className="d-flex align-items-center">
        {status === "authenticated" ? (
          <>
            <Link className="nav-link" href="/dashboard/user">
              {data?.user?.name}
            </Link>
            <a
              className="nav-link pointer"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Logout
            </a>
          </>
        ) : (
          <div className="d-flex justify-content-start">
            <Link className="nav-link" href="/login">
              Login
            </Link>
            <Link className="nav-link" href="/register">
              Register
            </Link>
          </div>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
};
