const collapseReducer = (prevState=false,action)=>{

 let {type,payload} = action
 switch (type) {
     case "change_collapse":
         let newState = payload
         return newState
     default:
         return prevState 
 }
}
export default collapseReducer
