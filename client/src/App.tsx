import { RouterProvider } from "react-router-dom";
import { router } from "./router/AppRouter";
import AuthInitializer from "./components/auth/AuthInitializer";

function App() {
  return (
    <>
      <AuthInitializer />
      <RouterProvider router={router} />
    </>
  );
}

export default App
