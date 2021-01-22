import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Rights from './Rights'
import Roles from './Roles'
import  './index.module.css'
export default class RightManage extends Component {
    render() {
        return (
            <div id="bgpink">
                RightManage

                <div>
                <div>公共的选项卡</div>
                <Switch>
                    <Route path="/right-manage/roles" component= {Roles}/>
                    <Route path="/right-manage/rights" component= {Rights}/>
                    <Redirect from="/right-manage" to="/right-manage/roles"/>
                </Switch>
            </div>
            </div>
        )
    }
}
