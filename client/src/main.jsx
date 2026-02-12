import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="154204755511-cqdvehgk8b5fmavrvua3u6lma10jkdre.apps.googleusercontent.com">
  <App />
</GoogleOAuthProvider>
  </StrictMode>
);
