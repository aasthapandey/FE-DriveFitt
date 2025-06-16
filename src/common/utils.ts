import { readFileSync } from "fs";
import { join } from "path";

export function getPageData(slug: string) {
    const filePath = join(process.cwd(), "src/data", `${slug}.json`);
    const file = readFileSync(filePath, "utf-8");
    return JSON.parse(file);
  }