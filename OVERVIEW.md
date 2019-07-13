# overview

## client
the player app built in Electron
- modes
  - simple mode - play music on this computer
  - network mode - play music from other computers
  - server mode - allow other clients on the network to play music from this computer

## server
built into the client
- 3 services: mdns broadcast, restful library api, streaming
  - mdns broadcast
    - on if app is in server mode
    - if no mdns group set up, create one (name & password)
    - to join mdns group, choose name and enter password
    - password stored hashed on all clients with unique salt, any client can verify password correctness
  - library api
    - for browsing the music library
    - provides url for streaming
  - streaming service
    - streams music to client(s)
    
