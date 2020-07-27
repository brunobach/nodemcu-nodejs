const venom = require("venom-bot");
venom.create().then((client) => start(client));

const openGate = require("./websocket");

function start(client) {
  client.onMessage((message) => {
    
    if (message.body === 'Oi') {
      console.log(message.sender.pushname);
      client.sendText(
        message.from,
        "Bem-vindo a Amplo System 😃 \n 1: Abrir Portao Todo \n 2: Abrir Metade"
      );
    }
    if (message.body === "1" || message.body === 'Abrir') {
        console.log('Aqui')
       
        client.sendText(message.from, "Portao Abrindo ...")
        openGate.then(console.log)
    }
    if (message.body === "2") {
      client.sendText(message.from, "Portao Abrindo ...");
    }
  });
}
