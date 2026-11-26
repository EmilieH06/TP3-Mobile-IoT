#include "coffre/coffre.h"

#include <Arduino.h>
#include <time.h>

#include "afficheur/afficheur.h"
#include "matrice/matrice.h"
#include "reseau/journal.h"
#include "coffre/boutons.h"
#include "coffre/verrou.h"

enum EtatCoffre { 
  NON_PROGRAMME, 
  PROG_SAISIE, 
  PROG_CONFIRMATION, 
  PROG_REUSSIE,
  PROG_REFUSEE, 
  OUVERT, 
  FERME, 
  SAISIE_OUVERTURE, 
  OUVERTURE_REFUSEE 
};

static EtatCoffre etat = NON_PROGRAMME;
static int premierCode = 0;
static int codeEnregistre = 0;
static time_t heureChangement = 0;

void initialiserCoffre() {
  initialiserVerrou();
  initialiserBoutons();
}

static void commencerProgrammation() {
  etat = PROG_SAISIE;
  clignoterCouleur(255, 80, 0);
  commencerSaisie();
}

void gererCoffre() {
  bool a = nouvelAppuiA();
  bool b = nouvelAppuiB();
  bool bLong = appuiLongB(etat == NON_PROGRAMME || etat == OUVERT);

  switch (etat) {
    case NON_PROGRAMME:
    case OUVERT:
      if (a && etat == OUVERT) {
        etat = FERME;
        fermerVerrou();
      } else if (bLong) {
        commencerProgrammation();
      } else if (a) {
        Serial.println("A detecte : aucun code programme depuis le demarrage.");
      }
      break;

    case PROG_SAISIE:
      actualiserClignotement();
      if (saisieTerminee(a, b)) {
        premierCode = lireCodeSaisi();
        etat = PROG_CONFIRMATION;
        commencerSaisie();
      }
      break;

    case PROG_CONFIRMATION:
      actualiserClignotement();
      if (saisieTerminee(a, b)) {
        if (lireCodeSaisi() == premierCode) {
          codeEnregistre = premierCode;
          heureChangement = time(nullptr);  // https://en.cppreference.com/w/c/chrono/time
          etat = PROG_REUSSIE;
          clignoterCouleur(0, 255, 0, 3);
        } else {
          etat = PROG_REFUSEE;
          clignoterCouleur(255, 0, 0, 3);
        }
      }
      break;

    case PROG_REUSSIE:
      if (actualiserClignotement()) {
        etat = OUVERT;
        afficherCouleur(0, 255, 0);
        journaliserEvenement("CHANGEMENT_CODE", heureChangement);
        Serial.println("Coffre OUVERT : pret pour le bouton A.");
      }
      break;

    case PROG_REFUSEE:
      if (actualiserClignotement()) 
        commencerProgrammation();
      break;

    case FERME:
      if (a || b) {
        etat = SAISIE_OUVERTURE;
        commencerSaisie();
      }
      break;

    case SAISIE_OUVERTURE:
      if (saisieTerminee(a, b)) {
        if (lireCodeSaisi() == codeEnregistre) {
          etat = OUVERT;
          ouvrirVerrou();
        } else {
          etat = OUVERTURE_REFUSEE;
          clignoterCouleur(255, 0, 0, 3);
        }
      }
      break;

    case OUVERTURE_REFUSEE:
      if (actualiserClignotement()) {
        etat = FERME;
        afficherCouleur(255, 0, 0);
      }
      break;
  }
}
