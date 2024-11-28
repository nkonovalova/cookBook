import { useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router";

import RecipeList from "../pages/recipe-list";
import ErrorPage from "../pages/error-page";
import ShowRecipe from "../pages/show-recipe";
import Categories from "../pages/categories";
import UIPage from "../pages/ui-page";
import PageHeader from "../shared/ui/page-header";
import Nav from "../widgets/nav";
import {ROUTE_CATEGORIES, ROUTE_RECIPE, ROUTE_UI} from "../shared/router";

import '../shared/ui/variables.css';
import styles from './App.module.css'

function App() {
    const [showMenu, setShowMenu] = useState(false);
    let switchMenu = () => {
        setShowMenu(!showMenu);
    }
    return (
        <BrowserRouter>
            <main className={styles.layout}>
                <section className={styles.header}>
                    <PageHeader onHamburgerClick={ switchMenu } />
                </section>
                <section className={styles.navigation}>
                    <Nav isShow={showMenu} />
                </section>
                <section className={styles.content}>
                    <Routes>
                        <Route index element={<RecipeList/>} errorElement={<ErrorPage/>}/>
                        <Route path={ROUTE_RECIPE} element={<ShowRecipe/>} />
                        <Route path={ROUTE_CATEGORIES} element={<Categories/>} />
                        <Route path={ROUTE_UI} element={<UIPage/>} />
                    </Routes>
                </section>
            </main>
        </BrowserRouter>
    )
}

export default App
