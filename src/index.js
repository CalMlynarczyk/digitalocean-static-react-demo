import { Auth0Provider } from "@auth0/auth0-react";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

Sentry.init({
  dsn: "https://192b88f2030a44e095358b0ec6cf560c@o1046123.ingest.sentry.io/6022002",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-z4f2cou4.us.auth0.com"
      clientId="LEqOMAdEXDkfik9GQdMDPjk7lk4o5pAG"
      redirectUri={window.location.origin}
      audience="http://localhost:5000"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
