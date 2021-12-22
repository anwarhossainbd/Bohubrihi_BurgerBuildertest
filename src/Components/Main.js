import React, {Component} from 'react';
import Header from "./Header/Header";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Orders from "./Orders/Orders";
import Checkout from "./Orders/Checkout/Checkout";
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {authCheck} from "../Redux/AuthActionCreators";
import Auth from "./Auth/Auth";


const mapStateToProps=state=>{

    return{
        token:state.token
    }

}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}

class Main extends Component{

    componentDidMount() {
        this.props.authCheck();
    }

    render() {

        let routes=null;
        if (this.props.token===null){
            routes=<div>
                <Switch>
                    <Route path="/login" component={Auth} />
                    <Redirect to="/login" />
                </Switch>
            </div>
        }
        else {
            routes=<div>
                <Switch>
                    <Route path="/orders" component={Orders} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            </div>
        }
        return (
            <div>
                <Header />
                <div className="container">
                    {routes}

                </div>

            </div>
        );
    }
}



export default connect(mapStateToProps,mapDispatchToProps) (Main);