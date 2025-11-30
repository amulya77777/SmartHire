// import path from "path";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";
// import { readFileSync } from "fs";

// // Read backend .env file to get the port
// function getBackendPort() {
//   try {
//     const backendEnvPath = path.resolve(__dirname, "../backend/.env");
//     const envContent = readFileSync(backendEnvPath, "utf-8");
//     const portMatch = envContent.match(/PORT\s*=\s*(\d+)/);
//     return portMatch ? portMatch[1] : "3000";
//   } catch (error) {
//     // If backend .env doesn't exist, use default port
//     return "3000";
//   }
// }

// const backendPort = getBackendPort();

// export default defineConfig({
//   plugins: [react()],
//   base: import.meta.env.VITE_API_KEY || "SmartHire#",
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   define: {
//     // Inject backend port as environment variable
//     "import.meta.env.VITE_API_PORT": JSON.stringify(backendPort),
//   },
// });

import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import process from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Read backend .env file to get the port
function getBackendPort() {
  try {
    const backendEnvPath = path.resolve(__dirname, "../backend/.env");
    const envContent = readFileSync(backendEnvPath, "utf-8");
    const portMatch = envContent.match(/PORT\s*=\s*(\d+)/);
    return portMatch ? portMatch[1] : "3000";
  } catch (error) {
    // If backend .env doesn't exist, use default port
    return "3000";
  }
}

const backendPort = getBackendPort();

// Change config to a function to access 'mode'
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The third parameter '' ensures we load all variables, not just those with VITE_
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    // Use 'env.VITE_API_KEY' instead of 'import.meta.env.VITE_API_KEY'
    base: env.VITE_API_KEY || "/SmartHire/", // Changed fallback to valid path syntax
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Inject backend port as environment variable
      "import.meta.env.VITE_API_PORT": JSON.stringify(backendPort),
    },
  };
});
