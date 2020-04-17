import React from 'react';
import {Route, Switch} from "react-router-dom";
import AdminLogin from "./containers/AdminLogin/AdminLogin";
import MainPage from "./containers/MainPage/MainPage";
import UsersCocktails from "./containers/UsersCocktails/UsersCocktails";
import CreateCocktail from "./containers/CreateCocktail/CreateCocktail";

const Routes = () => {
    return (
        <Switch>
            <Route path="/adminLogin" exact component={AdminLogin}/>
            <Route path="/myCocktails" exact component={UsersCocktails}/>
            <Route path="/newCocktail" exact component={CreateCocktail}/>
            <Route parh="/" exact component={MainPage}/>
        </Switch>
    );
};

export default Routes;