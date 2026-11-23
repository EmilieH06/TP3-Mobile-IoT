#include "journal.h"

#include <Arduino.h>
#include <Firebase_ESP_Client.h>
#include <WiFi.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

#include "secrets.h"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
bool firebaseInitialise = false;

void initialiserFirebase() {
  if (!FIREBASE_API_KEY[0] || !FIREBASE_PROJECT_ID[0] || !COFFRE_ID[0]) {
    Serial.println("Configure Firestore dans include/secrets.h.");
    return;
  }
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Connexion Firebase impossible sans Wi-Fi.");
    return;
  }

  config.api_key = FIREBASE_API_KEY;
  config.token_status_callback = tokenStatusCallback;
  auth.user.email = "";
  auth.user.password = "";
  if (!Firebase.signUp(&config, &auth, "", "")) {
    Serial.printf("Erreur Firebase : %s\n", config.signer.signupError.message.c_str());
    return;
  }
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  firebaseInitialise = true;
  Serial.println("Connexion Firebase OK");
}

void journaliserEvenement(const char* type, time_t heure) {
  if (!firebaseInitialise || heure <= 0) {
    Serial.println("Evenement non envoye : Firebase ou heure NTP indisponible.");
    return;
  }

  // Firestore attend une date RFC 3339 en UTC, par exemple 2026-11-21T19:30:00Z.
  // https://firebase.google.com/docs/firestore/reference/rest/v1/Value
  char horodatage[21];
  struct tm heureUtc;
  if (!gmtime_r(&heure, &heureUtc) ||
      !strftime(horodatage, sizeof(horodatage), "%Y-%m-%dT%H:%M:%SZ", &heureUtc)) {
    Serial.println("Evenement non envoye : horodatage invalide.");
    return;
  }

  FirebaseJson document;
  document.set("fields/type/stringValue", type);
  document.set("fields/horodatage/timestampValue", horodatage);
  document.set("fields/coffre/stringValue", COFFRE_ID);

  String documentPath = String("evenements/") + COFFRE_ID + "-" + horodatage + "-" + type;
  if (Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "",
                                        documentPath, document.raw())) {
    Serial.printf("Evenement %s envoye.\n", type);
  } else {
    Serial.print("Ecriture Firestore impossible : ");
    Serial.println(fbdo.errorReason());
  }
}
