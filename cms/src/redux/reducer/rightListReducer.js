const rightListeReducer  = (prevState=[],action)=>{
  

    let {type,payload} = action
    switch (type) {
        case "hui-rightList":
            let newState = payload
            return newState
        default:
            return prevState 
    }
}
export default rightListeReducer
