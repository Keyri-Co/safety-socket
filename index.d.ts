declare module "safety-socket" {
    /**
     * Manages WebSocket connections and provides encryption, decryption, and other utilities.
     */
    class SocketManager {
      /**
       * Creates a new SocketManager instance.
       * @param clientApiKey - The client's API key.
       */
      constructor(clientApiKey: string);
  
      /**
       * Connects to the WebSocket server.
       * @returns Resolves to true if connected successfully.
       */
      connect(): Promise<boolean>;
  
      /**
       * Closes the WebSocket connection and resets the event listeners.
       * @returns Resolves when the socket is killed.
       */
      kill(): Promise<void>;
  
      /**
       * Adds an event listener for a custom event.
       * @param t - Event name.
       * @param e - Event handler.
       */
      on(t: string, e: (event: Event) => void): void;
  
      /**
       * Sends encrypted data to a peer.
       * @param peerId - The peer's ID.
       * @param dataString - The data to send.
       */
      send(peerId: string, dataString: string): Promise<void>;
  
      /**
       * Gets the ID of the current socket instance.
       * @returns The ID.
       */
      readonly id: string;
  
      /**
       * Sets or gets the manual secret.
       */
      manualSecret: string;
  
      /**
       * Checks if a secret exists for a given peer.
       * @param peerId - The peer's ID.
       * @returns Resolves to true if the secret exists.
       */
      getSecretStatus(peerId: string): Promise<boolean>;
  
      /**
       * Creates a new secret for a given peer.
       * @param peerId - The peer's ID.
       * @returns Resolves to the created secret.
       */
      makeSecret(peerId: string): Promise<string>;
  
      /**
       * Sets a secret for a peer.
       * @param peerSecret - The secret to set.
       * @returns Resolves when the secret is set.
       */
      setSecret(peerSecret: string): Promise<void>;

    }


    /**
     * Provides a safety layer over the SocketManager.
     */
    export class SafetySocket {
      /**
       * Instance of SocketManager.
       */
      manager: SocketManager;

      /**
       * Loads the SafetySocket and initializes the SocketManager.
       * @param clientApiKey - The client's API key.
       * @returns Resolves when the manager is loaded.
       */
      load(clientApiKey: string): Promise<void>;
    }
  }
  