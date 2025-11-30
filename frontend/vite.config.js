import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { readFileSync } from "fs";

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

export default defineConfig({
  plugins: [react()],
  // base: import.meta.env.VITE_API_KEY || "SmartHire#",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Inject backend port as environment variable
    "import.meta.env.VITE_API_PORT": JSON.stringify(backendPort),
  },
});
