export const slug = (str = "") =>
  str.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
