import React, { Component } from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Login from '../views/Login/index'
import Dashboard from '../views/Dashboard/index'
import Error from '../views/Error/index'

export default class index extends Component {
    render() {

        return (
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                     {/* 路由拦截--三目 */}
                <Route path="/" render={()=>
                    localStorage.getItem("token")?<Dashboard/>:<Redirect to="/login"/>
                } />
                    <Route path="/dashboard" component={Dashboard}></Route>
                    <Route path="*" component={Error}></Route>
                </Switch>
            </HashRouter>
        )
    }
}
