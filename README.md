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

## Bibliothèques nécessaires

- TM1637 (smougenot)
- Adafruit NeoMatrix
- ESP32Servo
- Firebase Arduino Client Library for ESP8266 and ESP32 (mobizt)

## Liens de remise

- Dépôt Git : [AlexandreNtam/tp2-IOT](https://github.com/AlexandreNtam/tp2-IOT).
- Vidéo de démonstration : [Lien de la vidéo](https://youtu.be/GkTnitBHgo4?si=qdGSkO5CKUUeVkI3)