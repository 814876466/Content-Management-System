const collapseReducer = (prevState=false,action)=>{
 //因为这里的数据只有true or false是简单类型数据
 //所以不需要深复制
 let {type,payload} = action
 switch (type) {
     case "change_collapse":
         //处理折叠
         let newState = payload
         return newState
     default:
         return prevState //没有匹配到， 返回老状态
 }
}
export default collapseReducer
