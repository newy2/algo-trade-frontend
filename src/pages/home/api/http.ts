function getEnvBackendApiUrl() {
  return import.meta.env.VITE_BACKEND_API_URL;
}

export async function GET(path: string) {
  const response = await fetch(getEnvBackendApiUrl() + path);
  return await response.text();
}
