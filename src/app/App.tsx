import { useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router";

import RecipeList from "../pages/recipe-list";
import ErrorPage from "../pages/error-page";

import ShowRecipe from "../pages/show-recipe";

import '../shared/ui/variables.css';
import './App.css'

import PageHeader from "../shared/ui/page-header";
import Nav from "../widgets/nav";
import Categories from "../pages/categories";
import {ROUTE_CATEGORIES, ROUTE_RECIPE} from "../shared/router";

function App() {
    const [showMenu, setShowMenu] = useState(false);
    let switchMenu = () => {
        setShowMenu(!showMenu);
    }
    return (
        <BrowserRouter>
            <main className='layout'>
                <section className='header'>
                    <PageHeader onHamburgerClick={ switchMenu } />
                </section>
                <section className='navigation'>
                    <Nav isShow={showMenu} />
                </section>
                <section className='content'>
                    <Routes>
                        <Route index element={<RecipeList/>} errorElement={<ErrorPage/>}/>
                        <Route path={ROUTE_RECIPE} element={<ShowRecipe/>} />
                        <Route path={ROUTE_CATEGORIES} element={<Categories/>} />
                    </Routes>
                </section>
            </main>
        </BrowserRouter>
    )
}

export default App
