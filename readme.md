# safety-socket Library

The safety-socket library provides a ~~paranoid~~ __robust__ solution for managing simple WebSocket communication. It offers encrypted communication and signature verification to ensure you know who you're talking to, and only they can read it.

## Installation

```
npm install safety-socket
```

## Usage

### Importing the Library

```javascript
import { SocketManager } from "safety-socket";
```

### SocketManager

The SocketManager class is the primary interface for managing WebSocket connections.

#### Constructor

```javascript
const manager = new SocketManager(clientApiKey);
```

- clientApiKey: The client's API key.

#### Methods

- **connect()**: Connects to the WebSocket server.
  ```javascript
  await manager.connect();

  ```

- **kill()**: Closes the WebSocket connection and resets the event listeners.
  ```javascript
  await manager.kill();
  ```

- **on(event, handler)**: Adds an event listener for events.
  ```javascript
  manager.on("message", (event) => {
    console.log("message:", event);
  });
  ```

- **send(peerId, dataString)**: Encrypts data, then sends to peer.
  ```javascript
  await manager.send("peer123", "Hello, peer!");
  ```

- **getSecretStatus(peerId)**: Checks if a secret exists for a given peer.
  ```javascript
  let secretStatus = await manager.getSecretStatus("peer123");

  if(secretStatus){
    console.log("Secret is Set");
  } else {
    console.log("Secret is NOT Set");
  }
  ```

- **makeSecret(peerId)**: Creates a new secret for a given peer.
  ```javascript
  manager.makeSecret("peer123").then(secret => {
    console.log("New secret:", secret);
  });
  ```

- **setSecret(peerSecret)**: Sets a secret for a peer.
  ```javascript
  manager.setSecret("mySecret123").then(() => {
    console.log("Secret set.");
  });
  ```

#### Properties

- **id**: Gets the ID of the current socket instance.
  ```javascript
  console.log("Socket ID:", manager.id);
  ```

- **manualSecret**: Sets or gets the manual secret.
  ```javascript
  manager.manualSecret = "myManualSecret";
  console.log("Manual Secret:", manager.manualSecret);
  ```

## Contributing

If you'd like to contribute to the development of safety-socket, please fork the repository and submit pull requests. We appreciate any feedback and contributions!

## License

This library is licensed under the MIT License. See the LICENSE file for more details.
