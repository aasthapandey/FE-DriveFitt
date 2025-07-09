import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { DataFileType, DataFileMap } from "@/types/dataFiles";
import { initializeGit } from "@/utils/gitConfig";

// Helper function to get the data directory path
const getDataDirPath = () => {
  return path.join(process.cwd(), "src", "data");
};

// GET handler
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fileType = parseInt(searchParams.get("fileType") || "0");

    if (!fileType || !Object.values(DataFileType).includes(fileType)) {
      return NextResponse.json(
        { error: "Invalid fileType parameter" },
        { status: 400 }
      );
    }

    const fileName = DataFileMap[fileType as DataFileType];
    const filePath = path.join(getDataDirPath(), `${fileName}.ts`);

    // Read the file content
    const fileContent = await fs.readFile(filePath, "utf-8");

    // Extract the JSON data from the TypeScript file
    const match = fileContent.match(/export const [^=]+=\s*({[\s\S]*});?\s*$/);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid file format" },
        { status: 400 }
      );
    }

    // Parse the extracted JSON
    const jsonData = eval("(" + match[1] + ")");

    return NextResponse.json(jsonData);
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error reading file" },
      { status: 500 }
    );
  }
}

// POST handler
export async function POST(request: NextRequest) {
  let git;
  try {
    const searchParams = request.nextUrl.searchParams;
    const fileType = parseInt(searchParams.get("fileType") || "0");
    const data = await request.json();

    if (!fileType || !Object.values(DataFileType).includes(fileType)) {
      return NextResponse.json(
        { error: "Invalid fileType parameter" },
        { status: 400 }
      );
    }

    if (!data) {
      return NextResponse.json({ error: "Data is required" }, { status: 400 });
    }

    const fileName = DataFileMap[fileType as DataFileType];
    const filePath = path.join(getDataDirPath(), `${fileName}.ts`);

    // Initialize git with authentication before any operations
    try {
      git = await initializeGit();
    } catch (gitError) {
      console.error("Git initialization failed:", gitError);
      return NextResponse.json(
        {
          error:
            gitError instanceof Error
              ? gitError.message
              : "Git initialization failed",
        },
        { status: 500 }
      );
    }

    // Convert the data to a TypeScript export
    const fileContent = `import { StaticPageData } from "@/types/staticPages";\n\nexport const ${fileName}Data: StaticPageData = ${JSON.stringify(
      data,
      null,
      2
    )};\n`;

    // Write the file
    await fs.writeFile(filePath, fileContent, "utf-8");

    try {
      // Git operations
      await git.add(filePath);
      await git.commit(`Update ${fileName} data`);
      await git.push("origin", "main");
    } catch (gitError) {
      console.error("Git operation failed:", gitError);
      // Try to clean up
      try {
        // Restore the file if commit failed
        await git.checkout(["--", filePath]);
      } catch (cleanupError) {
        console.error("Cleanup failed:", cleanupError);
      }
      return NextResponse.json(
        {
          error:
            gitError instanceof Error
              ? gitError.message
              : "Git operation failed",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating file:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error updating file" },
      { status: 500 }
    );
  }
}
