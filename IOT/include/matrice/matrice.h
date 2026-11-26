#pragma once

#include <stdint.h>

void initialiserMatrice();
void afficherCouleur(int rouge, int vert, int bleu);
void clignoterCouleur(int rouge, int vert, int bleu, int repetitions = 0);
bool actualiserClignotement();
