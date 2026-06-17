"use server";

import { cookies } from "next/headers";

// Verify admin credentials and set session cookie
export async function loginAction(prevState, formData) {
  const username = formData.get("username");
  const password = formData.get("password");

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return { success: true };
  }

  return { error: "Username atau password salah!" };
}
