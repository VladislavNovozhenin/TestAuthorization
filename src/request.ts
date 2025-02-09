import axios from "axios";
import { authLoginSuccess, authRegisterSuccess, authStart, failed, profileStart, profileSuccess, User } from "./store/authSlice";
import { AppDispatch } from "./store/store";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";
const URL = 'https://backend-ashen-seven-22.vercel.app';
//Тайпгард проверки типа actionCreator
function isActionWithPayload<T>(
    action: ActionCreatorWithPayload<T> | ActionCreatorWithoutPayload<string>
): action is ActionCreatorWithPayload<T> {
    return (action as ActionCreatorWithPayload<T>).type !== undefined;
}
export const apiRequest = async <T>(method: "get" | "post",
    endpoint: string,
    dispatch: AppDispatch,
    startAction: ActionCreatorWithoutPayload<string>,
    successAction: ActionCreatorWithPayload<T>  | ActionCreatorWithoutPayload<string>,
    data?: object,
    token?: string) => {
    try {
        const config = token ? { headers: { Authorization: token } } : {};
        dispatch(startAction())
        const response = await axios[method](`${URL}${endpoint}`, data, config);
        if (isActionWithPayload(successAction)) { //Проверяем если экшн с пэйлоад
            dispatch(successAction(token ? response.data : response.data.token));
        } else {
            dispatch(successAction());
        }
        return null;
    } catch (error) {
        let errorMessage = "Unknown error";

        if (axios.isAxiosError(error)) {
            if (error.response) {
                errorMessage = error.response.data.message || "Server error";
            } else {
                errorMessage = "Network error. Check your internet connection.";
            }
        }

        dispatch(failed(errorMessage));
        return errorMessage;
    }
}

export const fetchRegister = (email: string, password: string) => async (dispatch: AppDispatch) =>
    apiRequest('post', '/register', dispatch, authStart, authRegisterSuccess, { email, password })

export const fetchLogin = (email: string, password: string) => async (dispatch: AppDispatch) =>
    apiRequest<string>('post', '/login', dispatch, authStart, authLoginSuccess, { email, password })

export const fetchProfile = (token: string) => async (dispatch: AppDispatch) =>
    apiRequest<User>('get', '/profile', dispatch, profileStart, profileSuccess, undefined, token)
