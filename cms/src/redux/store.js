import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import reduxPromise from 'redux-promise'
import reduxThunk from 'redux-thunk'
import roleListReducer from './reducer/roleListReducer'
import rightListReducer from './reducer/rightListReducer'
import collapseReducer from './reducer/collapseReducer'
const reducer = combineReducers({
    isCollapsed:collapseReducer,
    roleList:roleListReducer,
    rightList:rightListReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //配置devTools
const store=createStore(reducer,{
    isCollapsed:false,
    roleList:[],
    rightList:[]
},composeEnhancers(applyMiddleware(reduxPromise,reduxThunk)))
export default store
