import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "@/components/layout";

const Home = lazy(() => import("@/container/Home"));
const MyPokemon = lazy(() => import("@/container/MyPokemon"));
const Detail = lazy(() => import("@/container/Detail"));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={
    <div className="min-h-[50vh] flex flex-col items-center justify-center font-black text-black">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" className="w-12 h-12 animate-spin mb-4" alt="Loading" />
      Memuat...
    </div>
  }>
    {children}
  </Suspense>
);

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <SuspenseWrapper><Home /></SuspenseWrapper>,
      },
      {
        path: "/my-pokemon",
        element: <SuspenseWrapper><MyPokemon /></SuspenseWrapper>,
      },
      {
        path: "/pokemon/:id",
        element: <SuspenseWrapper><Detail /></SuspenseWrapper>,
      },
    ],
  },
]);
