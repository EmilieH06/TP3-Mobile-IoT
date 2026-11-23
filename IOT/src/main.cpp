#include <Arduino.h>

#include "afficheur/afficheur.h"
#include "coffre/coffre.h"
#include "matrice/matrice.h"
#include "reseau/journal.h"
#include "reseau/reseau.h"

void setup() {
  Serial.begin(115200);

  initialiserCoffre();
  initialiserAfficheur();
  initialiserMatrice();
  connecterWifiEtReglerHeure();
  initialiserFirebase();
}

void loop() {
  gererCoffre();
}
