import React from 'react';
import { render } from 'react-dom';
import App from '../client/App';
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";



render(
	  <Auth0Provider
    domain={process.env.AUTH0_DOMAIN}
    clientId={process.env.AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
  >
	<BrowserRouter>
		<App />
	</BrowserRouter>
	</Auth0Provider>,
	document.getElementById("root")
);
