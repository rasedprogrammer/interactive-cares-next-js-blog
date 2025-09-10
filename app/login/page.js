"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Logged in successfully");
      router.push("/");
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center vh-90">
        <div className="col-lg-5 p-4 shadow">
          <h2 className="fw-bold lead mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control p-3 mb-4"
              placeholder="Enter Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control p-3 mb-4"
              placeholder="Enter Password"
              required
            />
            <button
              disabled={loading}
              className="btn btn-lg w-100 mb-2 btn-primary"
            >
              {loading ? "Please wait.." : "Submit"}
            </button>
          </form>
          <Link href="/forgot-password" className="nav-link text-center">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
}
