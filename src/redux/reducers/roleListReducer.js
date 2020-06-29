//只管理 roleList 是 []
import {fromJS} from 'immutable'
const roleListReducer  = (prevState=[],action)=>{
    // console.log(action)
    //payload自动传来要修改成什么值？
    // prevState.isCollapsed = payload

    //深复制prevState,返回修改后的新状态

    let {type,payload} = action
    switch (type) {
        case "kerwin_save_rolelist":
            //处理 roleList
            // console.log(payload)
            // let newState = [...prevState,...payload]

            let oldState = fromJS(prevState)

            let newState = oldState.concat(payload)

            return newState.toJS()

        case "kerwin_remove_rolelist":
            //   payload id  
            
            //深复制老状态， 删除id
            let oldStateImmutable =fromJS(prevState) 
            // console.log(oldStateImmutable.filter)
            // oldStateImmutable.splice(此di对应的索引值,1)

            let newStateImmutable = oldStateImmutable.filter(item=>{
                return item.get("id")!==payload
            })

            return newStateImmutable.toJS()

        case "kerwin_update_rolelist":

            let oldStateImmutable2 = fromJS(prevState)

            let newStateImmutable2 = oldStateImmutable2.updateIn([1,"roleRight",0,"list"],list=>list.splice(0,1))

            return newStateImmutable2.toJS()
        
        default:
            return prevState //没有匹配到， 返回老状态
    }
}

export default roleListReducer