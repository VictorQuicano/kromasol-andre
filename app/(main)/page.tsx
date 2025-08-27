import { redirect } from "next/navigation";

export default function HomeRedirect() {
  redirect("/home"); // manda a /home, que será tu [code] = "home"
}
