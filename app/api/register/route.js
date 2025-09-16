import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcryptjs";
import user from "@/models/user";

export async function POST(req) {
  await dbConnect();

  const { name, email, password } = await req.json();

  try {
    await new user({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    }).save();
    return NextResponse.json(
      { success: "User registered successfully. Please login." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Something went wrong User Register" },
      { status: 422 }
    );
  }
}
