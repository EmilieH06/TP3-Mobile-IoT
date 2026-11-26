# Coffre-fort connecté

Ce prototype utilise un ESP32 et deux boutons pour programmer un code à quatre chiffres, fermer le coffre et le rouvrir. Les changements de code, les fermetures et les ouvertures sont horodatés dans Firestore.

## Broches utilisées

| Composant | Broche de l'ESP32 |
| --- | --- |
| Bouton A | GPIO 32 |
| Bouton B | GPIO 33 |
| Afficheur TM1637 | GPIO 18 (CLK), GPIO 19 (DIO) |
| Matrice 8×8 | GPIO 13 (DIN) |
| Servomoteur | GPIO 25 (signal) |
| DEL 1 (Ouvert) | GPIO 23 |
| DEL 2 (Fermé / Alerte) | GPIO 26 |
| DEL 3 (Jumelé) | GPIO 27 |
| Détecteur de mouvement (PIR) | GPIO 34 (OUT) |
| Capteur de température | GPIO 4 (DATA / signal) |
| Lecteur NFC PN532 (I2C) | GPIO 21 (SDA), GPIO 22 (SCL) |

## Bibliothèques nécessaires

- TM1637 (smougenot)
- Adafruit NeoMatrix
- ESP32Servo
- Firebase Arduino Client Library for ESP8266 and ESP32 (mobizt)
- Adafruit PN532
- DHT sensor library