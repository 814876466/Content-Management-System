const roleListeReducer  = (prevState=[],action)=>{
   
    let {type,payload} = action
    switch (type) {
        case "ksave_rolelist":
            let newState = payload
            return newState
        default:
            return prevState 
    }
}
export default roleListeReducer
