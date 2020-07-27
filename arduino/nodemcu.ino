#include <WebSocketsServer.h>
#include <ESP8266WiFi.h>

// Definiçao do relé de acionamento do portao
#define relayPin D1

WebSocketsServer webSocket = WebSocketsServer(81);

// Definiçao da REDE Wifi utilizada
const char* ssid = "";
const char* password = "";

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t lenght) {

  switch (type) {
    case WStype_DISCONNECTED:
      break;

    case WStype_CONNECTED:
      { IPAddress ip = webSocket.remoteIP(num); 
        Serial.println(ip); 
      }
      break;

    case WStype_TEXT:
      { String text = String((char *) &payload[0]);
        Serial.println(text);
        Serial.println(num);
        Serial.println(type);

        if (text == "OPEN") {
          webSocket.sendTXT(0, "Abrindo Portao");
          digitalWrite(relayPin, HIGH);
          delay(300); // Tempo de pulso 1 (HIGH) na entrada da placa do Portao
          digitalWrite(relayPin, LOW);
        }
      }
      break;

  }

}

void setup() {
  Serial.begin(9600);
  pinMode(relayPin, OUTPUT);
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(". ");
    delay(100);
  }
  Serial.println(WiFi.localIP());
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);
}

void loop() {
 webSocket.loop();
}
