import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

// Here you import Cognito to make the Authenticator
import { Authenticator } from '@aws-amplify/ui-react';

// Here you load the CSS of the prebuilt login screen asset
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // Here you cast Cognito to make the Authenticator
  <React.StrictMode>
    <Authenticator>
      <App />
    </Authenticator>
  </React.StrictMode>
  
);

