const WebSocketClient = require("websocket").client;
const client = new WebSocketClient();

client.on("connectFailed", function (error) {
  console.log("Connect Error: " + error.toString());
});

const openGate = () => {
  return new Promise((resolve) => {
    client.on("connect", async function (connection) {
      connection.on("error", function (error) {
        console.log("Connection Error: " + error.toString());
      });
      connection.on("close", function () {
        console.log("NODEMCU close connection, bye!");
      });

      const sendOpenGate = async () => {
        return new Promise((resolve, reject) => {
          try {
            connection.sendUTF("OPEN");
            connection.on("message", function (data) {
              resolve(data);
            });
          } catch (e) {
            reject(e);
          }
        });
      };
      resolve(sendOpenGate());
    });
  });
};

client.connect("ws://192.168.0.118:81/", ["arduino"])

module.exports = openGate()
