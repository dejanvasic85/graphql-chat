import { StrictMode } from "react";
import ReactDOM from "react-dom";

import GraphQLProvider from "./useGraphQL/GraphQLProvider";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <GraphQLProvider>
      <App />
    </GraphQLProvider>
  </StrictMode>,
  rootElement
);
