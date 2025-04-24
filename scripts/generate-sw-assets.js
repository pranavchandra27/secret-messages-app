// scripts/generate-sw-assets.js
import fs from "fs/promises";
import path from "path";

async function main() {
  const manifest = JSON.parse(
    await fs.readFile("build/client/.vite/manifest.json", "utf-8")
  );
  const assets = ["/", "/manifest.json"];
  for (let info of Object.values(manifest)) {
    if (info.file) assets.push("/build/client/assets/" + info.file);
    if (info.css)
      info.css.forEach((cssFile) =>
        assets.push("/build/client/assets/" + cssFile)
      );
  }
  // Add any extra static files:
  assets.push("/data/messages.json");
  // Write to your sw.js or a JSON partial:
  const swFile = path.resolve("public/sw-assets.json");
  await fs.writeFile(swFile, JSON.stringify(assets, null, 2));
  console.log("Wrote", assets.length, "assets to", swFile);
}

main();
