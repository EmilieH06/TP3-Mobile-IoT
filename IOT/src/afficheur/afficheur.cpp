#include "afficheur.h"

#include <TM1637Display.h>

#define CLK_PIN 18
#define DIO_PIN 19

TM1637Display afficheur(CLK_PIN, DIO_PIN);
const int NOMBRE_CHIFFRES = 4;
static uint8_t segments[NOMBRE_CHIFFRES];
static int position = 0;
static int chiffre = 0;
static int codeSaisi = 0;

void viderAfficheur() {
  for (int i = 0; i < NOMBRE_CHIFFRES; i++) {
    segments[i] = 0;
  }
  afficheur.setSegments(segments);
}

static void afficherChiffreCourant() {
  segments[position] = afficheur.encodeDigit(chiffre);
  afficheur.setSegments(segments);
}

void initialiserAfficheur() {
  afficheur.setBrightness(0x0f);
  viderAfficheur();
}

void commencerSaisie() {
  codeSaisi = 0;
  position = 0;
  chiffre = 0;
  viderAfficheur();
  afficherChiffreCourant();
}

static void incrementerChiffre() {
  chiffre = (chiffre + 1) % 10;
  afficherChiffreCourant();
}

static bool confirmerChiffre() {
  codeSaisi = codeSaisi * 10 + chiffre;
  position++;
  if (position == NOMBRE_CHIFFRES) {
    viderAfficheur();
    return true;
  }
  chiffre = 0;
  afficherChiffreCourant();
  return false;
}

int lireCodeSaisi() {
  return codeSaisi;
}

bool saisieTerminee(bool appuiA, bool appuiB) {
  if (appuiB) return confirmerChiffre();
  if (appuiA) incrementerChiffre();
  return false;
}
