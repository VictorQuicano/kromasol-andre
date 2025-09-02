import { nanoid } from "nanoid";

export function generateSlug(name: string) {
  const baseSlug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  return `${baseSlug}-${nanoid(6)}`;
}
