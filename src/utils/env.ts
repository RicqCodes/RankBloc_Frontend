export const env = (variable: string) => {
  switch (variable) {
    case "appUrl":
      return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/";
    case "backendUrl":
      return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/";
    case "apiUrl":
      return (
        process.env.NEXT_PUBLIC_BACKEND_API_URL ||
        "http://localhost:8000/api/v1/"
      );
    case "appOrigin":
      return process.env.NEXT_PUBLIC_APP_ORIGIN || "127.0.0.1";
    default:
      break;
  }
};
