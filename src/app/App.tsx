import {BrowserRouter, Routes, Route} from "react-router";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

import RecipeList from "../pages/recipe-list";
import ErrorPage from "../pages/error-page";
import ShowRecipe from "../pages/show-recipe";
import Categories from "../pages/categories";
import UIPage from "../pages/ui-page";
import {ROUTE_CATEGORIES, ROUTE_RECIPE, ROUTE_UI} from "../shared/router";

import '../shared/ui/variables.css';

function App() {

    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route index element={<RecipeList/>} errorElement={<ErrorPage/>}/>
                    <Route path={ROUTE_RECIPE} element={<ShowRecipe/>}/>
                    <Route path={ROUTE_CATEGORIES} element={<Categories/>}/>
                    <Route path={ROUTE_UI} element={<UIPage/>}/>
                </Routes>
            </QueryClientProvider>

        </BrowserRouter>
    )
}

export default App
