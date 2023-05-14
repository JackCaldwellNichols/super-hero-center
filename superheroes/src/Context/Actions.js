export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"
})

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS"
})

export const LoginFail = () => ({
    type: "LOGIN_FAILURE"
})

export const Logout = () => ({
    type: "LOGOUT"
})

export const UpdateStart = (userCredentials)=> ({
    type: "UPDATE_START"
})


export const UpdateSuccess = (user)=> ({
    type:"UPDATE_SUCCESS", payload: user
})

export const UpdateFail = () => ({
    type: "UPDATE_FAILURE"
})

export const Follow = (userId) => ({
    type: "ADD_FAV",
    payload: userId
})

export const unFav = (userId) => ({
    type: "REMOVE_FAV",
    payload: userId
})