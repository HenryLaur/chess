let socket: WebSocket | null = null;

export const connectWebsocket = (uuid: string) => {
  if (socket) {
    socket.close();
  }
  console.log(
    `CREATING NEW WS TO ws://${document.location.hostname}:8080/ws/${uuid}`
  );
  socket = new WebSocket(`ws://${document.location.hostname}:8080/ws/${uuid}`);
  return socket;
};

export const getSocket = (uuid: string | null | undefined) => {
  if (!uuid) {
    return null;
  }
  if (socket && socketChannelUuid() === uuid) {
    console.log("SAME SOCKET")
    return socket;
  } else {
    return connectWebsocket(uuid);
  }
};

export const sendWebsocketMessage = (message: any) => {
  if (socket && socket.readyState === socket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.log(socket);
  }
};

const socketChannelUuid = () => {
  if (socket) {
    return socket.url.split("/").slice(-1)[0];
  }
};
