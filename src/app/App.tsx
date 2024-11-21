import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import RecipeList from "../pages/recipe-list";
import ErrorPage from "../pages/error-page";
import './App.css'
import ShowRecipe from "../pages/show-recipe";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RecipeList/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/recipe/:recipeId",
        element: <ShowRecipe/>
    }
]);

function App() {

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
