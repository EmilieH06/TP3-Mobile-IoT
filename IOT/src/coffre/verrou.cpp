#include "verrou.h"

#include <Arduino.h>
#include <ESP32Servo.h>
#include <time.h>

#include "../afficheur/afficheur.h"
#include "../matrice/matrice.h"
#include "../reseau/journal.h"

const int BROCHE_SERVO = 25;
static Servo servo;

void initialiserVerrou() {
  servo.attach(BROCHE_SERVO);
  servo.write(0);
}

void fermerVerrou() {
  time_t heure = time(nullptr);  // https://en.cppreference.com/w/c/chrono/time
  servo.write(180);
  afficherCouleur(255, 0, 0);
  viderAfficheur();
  Serial.println("Coffre FERME : appuie sur A ou B pour commencer la saisie.");
  journaliserEvenement("FERMETURE", heure);
}

void ouvrirVerrou() {
  time_t heure = time(nullptr);  // https://en.cppreference.com/w/c/chrono/time
  servo.write(0);
  afficherCouleur(0, 255, 0);
  journaliserEvenement("OUVERTURE", heure);
}
