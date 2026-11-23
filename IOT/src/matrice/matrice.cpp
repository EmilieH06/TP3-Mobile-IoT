#include "matrice.h"

#include <Adafruit_NeoMatrix.h>

#define MATRIX_PIN 13
#define BRIGHTNESS 20

Adafruit_NeoMatrix matrix(
    8, 8, MATRIX_PIN,
    NEO_MATRIX_TOP + NEO_MATRIX_LEFT + NEO_MATRIX_ROWS + NEO_MATRIX_PROGRESSIVE,
    NEO_GRB + NEO_KHZ800);

uint16_t couleurClignotement;
unsigned long dernierChangement;
int demiCycles;
int nombreDemiCycles;

void initialiserMatrice() {
  matrix.begin();
  matrix.setTextWrap(false);
  matrix.setBrightness(BRIGHTNESS);
  afficherCouleur(0, 255, 0);
}

void afficherCouleur(int rouge, int vert, int bleu) {
  matrix.fillScreen(matrix.Color(rouge, vert, bleu));
  matrix.show();
}

void clignoterCouleur(int rouge, int vert, int bleu, int repetitions) {
  couleurClignotement = matrix.Color(rouge, vert, bleu);
  demiCycles = 0;
  nombreDemiCycles = repetitions * 2;
  dernierChangement = millis();
  afficherCouleur(rouge, vert, bleu);
}

bool actualiserClignotement() {
  if (millis() - dernierChangement < 300) {
    return false;
  }
  dernierChangement = millis();
  if (nombreDemiCycles == 0) {
    demiCycles = 1 - demiCycles;
  } else {
    ++demiCycles;
  }
  if (nombreDemiCycles != 0 && demiCycles >= nombreDemiCycles) {
    return true;
  }
  matrix.fillScreen(demiCycles % 2 == 0 ? couleurClignotement : 0);
  matrix.show();
  return false;
}
