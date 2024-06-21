/* eslint-disable linebreak-style */
import { instance as axiosInstance } from "./axios";

/**
 * @constructor
 * @param {*} options Object
 * 
 * url: is the only required parameter for the options object.
 * 
 * GET: the default value for the method property of the options object. 
 * 
 * pass any valid config options for request: https://axios-http.com/docs/req_config
 */
const _request = (options) => {
		return axiosInstance.request(options)
};

export default _request;