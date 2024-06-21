import axios from "axios";
export class _request {
    constructor(AuthService, environment, options = {}) {
        this.AuthService = new AuthService();
        this.environment = environment;
        this.options = options;
    }
    async axiosRequest(options) {
        const instance = axios.create({
            baseURL: this.environment.APIBASEURL,
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
            if (this.AuthService.isAuthenticated()) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${this.AuthService.GetToken()}`,
                };
            }
            config.validateStatus = function (status) {
                return status >= 200 && status < 300;
            };
            return config;
        };

        const errorInterceptor = async function (error) {
            if (error && error.response?.status === 401) {
                await this.AuthService.Logout();
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
        return await instance.request(options);
    }
}