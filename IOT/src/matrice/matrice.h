#pragma once

#include <stdint.h>

void initialiserMatrice();
void afficherCouleur(uint8_t rouge, uint8_t vert, uint8_t bleu);
void clignoterCouleur(uint8_t rouge, uint8_t vert, uint8_t bleu, int repetitions = 0);
bool actualiserClignotement();
