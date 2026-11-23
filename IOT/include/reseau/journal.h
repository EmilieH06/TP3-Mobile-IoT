#pragma once

#include <time.h>

void initialiserFirebase();
void journaliserEvenement(const char* type, time_t heure);
