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
run `npm install --save @bs/transport`

### How to use this utility

#### RESTful API
1. Axios example

```
auth.js
export class AuthService {
    /*
    *isAuthenticated: boolean
    */
    isAuthenticated() {
        return true;
    }
}
```