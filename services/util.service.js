import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function readJsonFile(jsonPath) {
  const dataPath = path.join(__dirname, jsonPath);
  const dataJson = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(dataJson);
}

export function printTable(title, data) {
  console.log(`\n\n========================== ${title} ==========================\n`);
  if (data.length === 0) {
    console.log("No data available to display.");
    return;
  }

  const headers = Object.keys(data[0]);
  const rows = data.map((item) => headers.map((header) => item[header]));

  const colWidths = headers.map((header, i) => {
    return Math.max(header.length, ...rows.map((row) => String(row[i]).length));
  });

  const pad = (str, length) => str + " ".repeat(length - str.length);

  console.log(
    headers.map((header, i) => pad(header, colWidths[i])).join(" | ")
  );
  console.log(colWidths.map((width) => "-".repeat(width)).join("-|-"));

  rows.forEach((row) => {
    console.log(
      row.map((cell, i) => pad(String(cell), colWidths[i])).join(" | ")
    );
  });
}
