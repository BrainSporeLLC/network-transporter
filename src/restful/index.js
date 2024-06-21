import axios from 'axios';
export class Request {
    constructor(AuthService, APIBASEURL, options = {}) {
        this.AuthService = AuthService;
        this.apiBaseURL = APIBASEURL;
        this.options = options;
        this.axiosRequest = this.axiosRequest.bind(this);
    }
    axiosRequest(options) {
        const AuthService = this.AuthService;
        const instance = axios.create({
            baseURL: this.apiBaseURL,
            ...this.options,
        });
        const requestInterceptor = function (config) {
            config && !config.headers.Accept ||
                !config.headers['Content-Type'] ?
                (config.headers = {
                    ...config.headers,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }) : config;
            if (AuthService.isAuthenticated()) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${AuthService.getToken()}`,
                };
            }
            config.validateStatus = function (status) {
                return status >= 200 && status < 300;
            };
            return config;
        };

        const errorInterceptor = async function (error) {
            if (error && error.response?.status === 401) {
                await AuthService.logout();
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
            error.error = error.response?.data?.message ? 
            error.response?.data?.message ?
            error.request?.data?.message
            : error.message : "Unknown error";
            return Promise.reject(error);
        };
        const responseInterceptor = function(response) {
            return Promise.resolve(response?.data);
        }
        instance.interceptors.request.use(requestInterceptor, errorInterceptor);
        instance.interceptors.response.use(responseInterceptor, errorInterceptor);
        return instance.request(options);
    }
}