import axios from "axios";
import { APIBASEURL } from "@/environments";
import { AuthService } from "@/packages/Auth";

export const instance = axios.create({
	baseURL: APIBASEURL,
	// timeout: 10000,
});


export const requestInterceptor = (config) => {
	if (AuthService.Check()) {
		config.headers.Authorization = `Bearer ${AuthService.Token()}`;
		!config.headers.Accept || !config.headers['Content-Type']  ? config.headers['Content-Type'] = "Application/json" : "";
	}
	config.validateStatus = function (status) {
		return status >= 200 && status < 300;
	  };
	return config;
};

export const errorInterceptor = (error) => {
	if (error && error.response?.status === 401) {
		AuthService.Logout();
        return Promise.reject(error);
	}
	if (
		error 
		&& 
		error.response?.data?.message?.includes('CorrelationId')
	) {
		const regX = /CorrelationId/;
		error.response.data.message = error.response?.data?.message?.substring(
			0, error.response?.data?.message.search(regX)
		).trim();
	}
	return Promise.reject(error);
};

instance.interceptors.request.use(requestInterceptor, errorInterceptor);

export const reponseInterceptor = (response) => {
	return Promise.resolve(response?.data);
};


instance.interceptors.response.use(reponseInterceptor, errorInterceptor);