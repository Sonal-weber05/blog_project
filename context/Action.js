export const LoginStart = (useCredentials)=>({
    type:"LOGIN_START"
})
export const LoginSuccess=(user)=>({
    type:"LOGIN_SUCCESS",
    payload:user,
})

export const LoginFailure=()=>({
    type:"LOGIN_FALURE"
})

export const Logout=()=>({
    type:"LOGOUT"
})


export const UpdateStart = (useCredentials)=>({
    type:"UPDATE_START"
})
export const UpdateSuccess=(user)=>({
    type:"UPDATE_SUCCESS",
    payload:user,
})

export const UpdateFailure=()=>({
    type:"UPDATE_FALURE"
})