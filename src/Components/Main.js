import React from 'react';
import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Orders from "./Orders/Orders";
import Checkout from "./Orders/Checkout/Checkout";
import {Route,  Switch} from "react-router-dom";
const Main = () => {
    return (
        <div>
            <Header />
            <div className="container">
                <Switch>
                    <Route path="/orders" component={Orders} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/" exact component={BurgerBuilder} />
                </Switch>

            </div>
            
        </div>
    );
};

export default Main;