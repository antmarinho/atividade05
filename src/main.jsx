import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import IpFinder from "./pages/IpFinder.jsx"
import Translator from "./pages/Translator.jsx"
import Login from "./pages/Login.jsx"
import MovieSearchEngine from "./pages/MovieSearchEngine.jsx"
import QuizApp from "./pages/QuizApp.jsx"
import TodoApp from "./pages/TodoApp.jsx"
import Home from "./pages/Home.jsx"
import { Toaster } from "sonner"
import Authentication from "./layout/Authentication.jsx"
import PageNotFound from "./pages/PageNotFound.jsx"
import QRCodeGenerator from "./pages/QRCodeGenarator.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "app",
        element: <Authentication />,
        children: [
          { index: true, element: <Home /> },
          { path: "ipFinder", element: <IpFinder /> },
          { path: "translator", element: <Translator /> },
          { path: "movieSearchEngine", element: <MovieSearchEngine /> },
          { path: "QRCodeGenerator", element: <QRCodeGenerator /> },
          { path: "quizApp", element: <QuizApp /> },
          { path: "todoApp", element: <TodoApp /> },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-right" richColors={true} />
  </React.StrictMode>
)
