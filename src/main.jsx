import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SupabaseProvider } from './integrations/supabase/index.js';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#22543d",
    800: "#276749",
    700: "#2f855a",
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <SupabaseProvider>
        <App />
      </SupabaseProvider>
    </ChakraProvider>
  </React.StrictMode>
);
