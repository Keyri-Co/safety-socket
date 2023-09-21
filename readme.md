# safety-socket Library

The safety-socket library offers a simple solution for managing WebSocket communications, ensuring encrypted and verified interactions between peers.

## Installation

```sh
npm install safety-socket
```

## Usage

### Importing the Library

```javascript
import { SafetySocket } from "safety-socket";
```

### SafetySocket

The `SafetySocket` class exposes an attribute called `manager`, which is will be how you'll interact with WebSocket communicaiton.

Here's how to initialize it:

```javascript
const safetySocket = new SafetySocket(clientApiKey);
await safetySocket.load();
const manager = safetySocket.manager;
```

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
  manager.on("communication", (event) => {
    console.log("message:", event);
  });
  ```

The main event types are `communication`, `close`, `disconnect`, and `error`.

Put handlers on these (or at least `communication`).

- **send(peerId, dataString)**: Encrypts and sends data to a peer.
  ```javascript
  await manager.send("peer123", "Hello, peer!");
  ```

- **getSecretStatus(peerId)**: Checks if a secret exists for a given peer.
  ```javascript
  let secretStatus = await manager.getSecretStatus("peer123");
  console.log(secretStatus ? "Secret is Set" : "Secret is NOT Set");
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

- **manualSecret**: Sets a secret manually, and uses this for encryption/decryption between clients. Not recommended unless you know what you're doing.
  ```javascript
  manager.manualSecret = "myManualSecret";
  console.log("Manual Secret:", manager.manualSecret);
  ```

## Example

Here's a simple example that will run in the browser's console, and shows how two browser can communicate:

```javascript


        import {SafetySocket} from "./index.mjs";

        // Simple ASYNC Wait Function
        async function wait (time) {
            return new Promise((s,j) => {
                setTimeout(() => {
                    s(true);
                },time)
            })
        }


        async function main() {

            // Tell everyone that the program is running
            console.log("I AM RUNNING!");

            // Instantiate client 1, load it
            let client1 = new SafetySocket();
            await client1.load();

            // Connect it.
            let manager1 = client1.manager;
            await manager1.connect();

            // SET UP WHAT TO DO WHEN WE GET A MESSAGE
            manager1.on("communication", (evt) => {console.log(`1 > MY PEER SAYS: ${evt.detail.communication}`);});

            // CLIENT 1 SHARES THEIR ID WITH A QR CODE
            // ...
            // CLIENT 2 SCANS IT

            // Instantiate client 2, load it.
            let client2 = new SafetySocket();
            await client2.load();

            // Connect it.
            let manager2 = client2.manager;
            await manager2.connect();
            
            // SET UP WHAT TO DO WHEN WE GET A MESSAGE
            manager2.on("communication", (evt) => {console.log(`2 > MY PEER SAYS: ${evt.detail.communication}`);});
            
            
            // CLIENT 2 WILL CHECK TO SEE IF IT KNOWS CLIENT 1
            let sharedSecret;

            if(! await manager2.getSecretStatus(manager1.id)){

                console.log("SETTING SECRET!!!---------------");

                // Since it does not, lets create a shared secret
                sharedSecret = await manager2.makeSecret(manager1.id);

                // Email Shared Secret to Client 1
                // ...code...

                // Client 1 sets secret. Once done, we no longer need
                // to share secrets since we'll store them in our
                // browser databases, and verify via ECDSA signatures

                await manager1.setSecret(sharedSecret);
            } else {
              console.log("...I know this client");
            }


            // Have a conversation between 1 and 2.
            manager1.send(manager2.id, "HELLO!");
            await wait(300);
            manager2.send(manager1.id, "HOLA!");
            await wait(300);
            manager1.send(manager2.id, "So...Do you like hot dogs?");
            await wait(300);
            manager2.send(manager1.id, "Ya...I DO!!!");
            await wait(300);
            manager1.send(manager2.id, "NEAT!");
            await wait(300);
            manager2.send(manager1.id, "Do you like them plain, or these new-fangled ones?");
            await wait(300);
            manager1.send(manager2.id, "There's a place here called Dog Haus...has one called the Thai-Fighter...TO DIE FOR!");
            await wait(300);
            manager2.send(manager1.id, "Give me a ballpark frank, spicy mustard, and a cold budweiser");
            await wait(1300);
            manager1.send(manager2.id, "...SO, do you like data?");
            await wait(300);
            manager2.send(manager1.id, "I love it.");
        }


        main();


```

## License

This library is licensed under the MIT License. See the LICENSE file for more details.
