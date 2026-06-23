import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "./hooks/useTheme";
import { PokemonProvider } from "./hooks/usePokemon";
import { routes } from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <PokemonProvider>
        <RouterProvider router={routes} />
      </PokemonProvider>
    </ThemeProvider>
  </StrictMode>
);
