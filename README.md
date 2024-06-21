# Network-transporter

A lightweight network communication utility library

- From Web services communication to real time communication to remote procedure calls, we got your back.

This utility library brings you a plug and play implementation to all known communication services inluding;

`RESTful Clients` <a href="https://en.wikipedia.org/wiki/REST">RESTful APIs</a>

`WebSockets` <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API">WebSockets API</a>

`WebRTC` <a href="https://webrtc.org/">Read about WebRTC</a>

`SOAP` <a href="https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_quickstart_intro.htm">SOAP API Developer Guide</a>

`Message Ques` <a href="https://aws.amazon.com/message-queue/#:~:text=Message%20Queues&text=A%20message%20queue%20is%20a,once%2C%20by%20a%20single%20consumer.">Message Ques</a>

`SignalIR` <a href="https://dotnet.microsoft.com/en-us/apps/aspnet/signalr">SignalIR</a>

`graphQL` <a href="https://graphql.org/learn/">GraphQl</a>

`gRPC` <a href="https://grpc.io/docs/">gRPC</a>

`RPC` <a href="https://solana.com/docs/rpc">RPC</a>

### Installation
To install this utility
run

```bash 
npm i @brainspore/transport
```

### How to use this utility

#### RESTful API
1. Axios example

```js
// auth.js
export class AuthService {
    #token;
    #user;
    /*
    *isAuthenticated: boolean
    */

   //If you don't call this method isAuthenticated, you must give it this alias how you
    //prefer
    isAuthenticated() {
        return true;
    }
    //If you don't call this method getToken, you must give it this alias how you
    //prefer
    getToken() {  
        return this.#token;
    }
    //If you don't call this method logout, you must give it this alias how you
    //prefer
    async logout() {
        session.clear();
    }
}
// Util Index file for API service calls
// index.js
 import { Request } from "@bs/transport";
 import {apiBaseUrl} from "@environment" //update this path to point to your environment file
 import {AuthService} from "auth.js";

 export _request = new Request(new AuthService(), apiBaseUrl);

//OR

export _request = new Request(new AuthService(), apiBaseUrl, { timeout: 5000 });

// You can now import _request to any of your file.

// Using _request in your file
// customer.js
const postCustomer = (payload) => {
    // start loader for UX
    // This method is async. Supports both async and async and Promise 
    _request.axiosRequest({
        url: 'customer',
        method: 'POST',
        data: payload,
    })
    .then((response) =>{
        console.log(response);
    })
    .catch((err) =>{});
}

// Example of How environment file can look like:
// environment/index.js
export {
apiBaseUrl
} = process.env

```
