import { createCookie } from "@remix-run/node";

export let langCookie = createCookie("lang", {
  maxAge: 60 * 60 * 24 * 30, // 30 days
});