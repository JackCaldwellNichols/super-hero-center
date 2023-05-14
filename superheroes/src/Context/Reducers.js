const Reducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START": 
            return {
                user: null,
                isFetching:true,
                error:false
            }
        case "LOGIN_SUCCESS":
            return{
                user: action.payload,
                isFetching: false,
                error:false
            }
        case "LOGIN_FAILURE": 
            return{
                user:null,
                isFetching: false,
                error: true
            }
        case "LOGOUT":
            return{
                user:null,
                isFetching: false,
                error: false
            }

        case "UPDATE_START":
            return{
                ...state,
                isFetching:true
            }

        case "UPDATE_SUCCESS":
            return{
                user: action.payload,
                isFetching:false,
                error:false
            }
        case "UPDATE_FAILURE":
            return{
                user: state.user,
                isFetching:false,
                error:true
            }
        case "ADD_FAV":
            return{
                ...state, 
                user: {
                    ...state.user,
                    favourites: [...state.user.favourites, action.payload]
                }
            };
        case "REMOVE_FAV":
            return{
                ...state, 
                user: {
                    ...state.user,
                    following: state.user.favourites.filter((favourite) => favourite !== action.payload)
                }
            };

        
        default: 
            return state

    }
}


export default Reducer