import * as api  from '../../api/index'

export const authSignin = (formdata , history) => {
    return async (dispatch) => {
        try {
            const {data} = await api.signIn(formdata)
            console.log(data);
            dispatch({type:'AUTH',data:data})
            history.push('/')
        } catch (error) {
            console.log(error);   
        }
    }
}

export const authSignUp = (formdata , history) => {
    return async (dispatch) => {
        try {
            const {data} = await api.signUp(formdata)
            dispatch({type:'AUTH',data:data})
            history.push('/')
            console.log(data);
        } catch (error) {
            console.log(error);   
        }
    }
}
