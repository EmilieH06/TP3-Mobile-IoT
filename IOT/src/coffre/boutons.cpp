#include "boutons.h"

#include <Arduino.h>

#define BROCHE_BOUTON_A 32
#define BROCHE_BOUTON_B 33

static int etatStableA = HIGH;
static int etatStableB = HIGH;
static bool appuiLongPossible = false;
static unsigned long debutAppuiB = 0;

void initialiserBoutons() {
  pinMode(BROCHE_BOUTON_A, INPUT_PULLUP);
  pinMode(BROCHE_BOUTON_B, INPUT_PULLUP);
}

static bool nouvelAppui(int broche, int &etatStable) {
  int lecture = digitalRead(broche);
  if (lecture == etatStable) {
    return false;
  }
  unsigned long debutChangement = millis();
  delay(50);
  if (digitalRead(broche) != lecture) {
    return false;
  }
  etatStable = lecture;
  if (broche == BROCHE_BOUTON_B && lecture == LOW) {
    debutAppuiB = debutChangement;
  }
  return lecture == LOW;
}

bool nouvelAppuiA() {
  return nouvelAppui(BROCHE_BOUTON_A, etatStableA);
}

bool nouvelAppuiB() {
  bool appui = nouvelAppui(BROCHE_BOUTON_B, etatStableB);
  if (appui) {
    appuiLongPossible = true;
  }
  return appui;
}

bool appuiLongB(bool autorise) {
  if (!autorise || etatStableB == HIGH) {
    appuiLongPossible = false;
  }
  if (appuiLongPossible && digitalRead(BROCHE_BOUTON_B) == LOW && millis() - debutAppuiB >= 3000) {
    appuiLongPossible = false;
    return true;
  }
  return false;
}
