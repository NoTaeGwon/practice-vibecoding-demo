#!/usr/bin/env node

/* 
 * Git pre-commit helper for frontend (apps/web)
 * - 실행 코드(주로 apps/web/src 아래) 변경 시에만 동작
 * - 순서대로 lint --fix, test, build를 실행
 */

const { execSync } = require("node:child_process");

function getStagedFiles() {
  const output = execSync("git diff --cached --name-only", {
    encoding: "utf8",
  });
  return output
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);
}

function hasWebSourceChanges(files) {
  return files.some((file) => {
    if (file.startsWith("apps/web/src/")) return true;
    if (file === "apps/web/vite.config.ts") return true;
    if (file === "apps/web/tsconfig.json") return true;
    if (file === "apps/web/index.html") return true;
    return false;
  });
}

function run(command) {
  console.log(`\n[pre-commit] 실행: ${command}`);
  execSync(command, { stdio: "inherit" });
}

function main() {
  const files = getStagedFiles();

  if (!hasWebSourceChanges(files)) {
    console.log(
      "[pre-commit] apps/web 실행 코드 변경이 없어 lint/test/build를 건너뜁니다."
    );
    return;
  }

  try {
    // lint --fix
    run("npm run lint:web");
    // test
    run("npm run test:web");
    // build
    run("npm run build:web");
  } catch (error) {
    console.error(
      "\n[pre-commit] lint/test/build 중 하나 이상이 실패했습니다. 커밋을 중단합니다."
    );
    process.exit(1);
  }
}

main();


