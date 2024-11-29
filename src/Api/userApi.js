import userRoute from "../services/endpoints/endpoints";
import Api from "../services/axios/axios";
export const signup = async (formData)=>{
    try {
        const result = await Api.post(userRoute.signup,{formData})
        return result
    } catch (error) {
        return error
    }
}

export const login = async (formData)=>{
    try {
        const result = await Api.post(userRoute.login,{formData})
        return result
    } catch (error) {
        return error
    }
}

export const submitLeaveData = async (LeaveData)=>{
    try {
        const result = await Api.post(userRoute.leaveSubmission,{LeaveData})
        return result
    } catch (error) {
        return error
    }
}

export const getLeaveData = async ()=>{
    try {
        const result = await Api.get(userRoute.getLeaveData)
        return result
    } catch (error) {
        return error
    }
}

export const fetchRestricteddates = async ()=>{
    try {
        const result = await Api.get(userRoute.fecthrestricteddates)
        return result
    } catch (error) {
        return error
    }
}