#include "reseau/reseau.h"

#include <Arduino.h>
#include <WiFi.h>
#include <time.h>

#include "secrets.h"

void connecterWifiEtReglerHeure() {
  if (WIFI_SSID[0] == '\0') {
    Serial.println("Ajoutez le nom du Wi-Fi dans include/secrets.h.");
    return;
  }

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connexion au Wi-Fi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.println("Wi-Fi connecte.");

  // https://github.com/espressif/arduino-esp32/blob/master/libraries/ESP32/examples/Time/SimpleTime/SimpleTime.ino
  configTime(0, 0, "pool.ntp.org", "time.nist.gov");

  struct tm heure;
  while (!getLocalTime(&heure, 1000)) {
    Serial.println("Attente de la synchronisation de l'heure...");
    delay(500);
  }
  Serial.println("Heure synchronisee.");
}
