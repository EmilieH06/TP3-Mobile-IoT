import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { auth, db } from "../../firebaseConfig";
import { AppUser, AppUserAvatar } from "../types/appUser";
import { AuthContextType } from "../types/auth";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);
  const [appUser, setUser] = useState<AppUser | undefined>();
  const [appUserAvatar, setUserAvatar] = useState<AppUserAvatar | null>(null);

  //https://firebase.google.com/docs/auth/web/password-auth?hl=fr#web
  async function register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) {
    if (password !== passwordConfirmation) {
      Alert.alert("Vos mots de passe doivent être identiques.");
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        if (firstName !== "" && lastName !== "") {
          //https://firebase.google.com/docs/firestore/manage-data/add-data?hl=fr
          await setDoc(doc(db, "appUser", userCredential.user.uid), {
            firstName: firstName,
            lastName: lastName,
          });

          if (appUserAvatar?.avatar) {
            const avatar: AppUserAvatar = {
              userId: userCredential.user.uid,
              avatar: appUserAvatar.avatar,
            };

            setUserAvatar(avatar);

            //https://github.com/react-native-async-storage/async-storage
            //https://loveandroid.medium.com/asyncstorage-in-react-native-607b8afb5b96
            await AsyncStorage.setItem(
              `avatar_${userCredential.user.uid}`,
              JSON.stringify(avatar),
            );
          }

          router.replace("/(auth)/(tabs)");
        } else {
          Alert.alert("Votre prénom ou votre nom est manquant.");
        }
      })
      .catch((error) => {
        //https://firebase.google.com/docs/auth/admin/errors?hl=fr
        const errorCode = error.code;

        if (errorCode === "auth/invalid-email") {
          Alert.alert("Cette adresse courriel n'est pas valide.");
        } else if (errorCode === "auth/email-already-in-use") {
          Alert.alert("Cette adresse courriel est déjà utilisée.");
        } else {
          Alert.alert("Une erreur inattendue est survenue lors de l'inscription.");
        }
      });
  }

  async function login(email: string, password: string) {
    //https://firebase.google.com/docs/auth/web/password-auth?hl=fr
    signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        try {
          router.replace("/(auth)/(tabs)");
        } catch (error) {
          console.error("Une erreur est survenue lors du chargement de l'avatar.");
        }
      })
      .catch((error) => {
        const errorCode = error.code;

        //https://firebase.google.com/docs/auth/admin/errors?hl=fr
        if (errorCode === "auth/invalid-email") {
          Alert.alert("Cette adresse courriel n'est pas valide.");
        } else if (errorCode === "auth/invalid-password") {
          Alert.alert("Ce mot de passe n'est pas valide.");
        } else {
          Alert.alert("Une erreur inattendue est survenue lors de la connexion.");
        }
      });
  }

  async function logout() {
    //https://firebase.google.com/docs/auth/web/password-auth?hl=fr
    await signOut(auth)
      .then(async () => {
        setUserAvatar(null);
        setUser(undefined);

        router.replace("/home");
      })
      .catch(() => {
        Alert.alert("Une erreur inattendue est survenue lors de la déconnexion.");
      });
  }

  async function changeAvatar() {
    //https://docs.expo.dev/versions/latest/sdk/imagepicker/
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("La permission d'accéder à la galerie de photos a été refusée !");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const avatar: AppUserAvatar = {
        userId: auth.currentUser?.uid ?? "",
        avatar: result.assets[0].uri,
      };

      setUserAvatar(avatar);

      if (auth.currentUser) {
        //https://github.com/react-native-async-storage/async-storage
        //https://loveandroid.medium.com/asyncstorage-in-react-native-607b8afb5b96
        await AsyncStorage.setItem(
          `avatar_${auth.currentUser.uid}`,
          JSON.stringify(avatar),
        );
      }
    }
  }

  async function loadAvatar(userId: string) {
    try {
      //https://github.com/react-native-async-storage/async-storage
      //https://loveandroid.medium.com/asyncstorage-in-react-native-607b8afb5b96
      const storedAvatar = await AsyncStorage.getItem(`avatar_${userId}`);

      if (!storedAvatar) {
        setUserAvatar(null);
        return;
      }

      const avatar: AppUserAvatar = JSON.parse(storedAvatar);

      if (avatar.userId === userId) {
        setUserAvatar(avatar);
      } else {
        setUserAvatar(null);
      }
    } catch (error) {
      console.error("Une erreur est survenue lors du chargement de l'avatar.");
      setUserAvatar(null);
    }
  }

  async function updateUserPassword(
    oldPassword: string,
    newPassword: string,
    newPasswordConfirmation: string,
  ) {
    if (newPassword !== newPasswordConfirmation) {
      Alert.alert("Vos mots de passe doivent être identiques.");
      return;
    }

    let isValidPassword = false;
    //https://stackoverflow.com/questions/37811684/how-to-create-credential-object-needed-by-firebase-web-user-reauthenticatewith
    const credential = EmailAuthProvider.credential(
      auth.currentUser!.email!,
      oldPassword,
    );

    //https://firebase.google.com/docs/auth/web/manage-users?hl=fr
    await reauthenticateWithCredential(auth.currentUser!, credential)
      .then(() => {
        isValidPassword = true;
      })
      .catch((error) => {
        console.error(error);
      });

    if (isValidPassword) {
      //https://firebase.google.com/docs/auth/web/manage-users?hl=fr
      await updatePassword(auth.currentUser!, newPassword)
        .then(() => {
          Alert.alert("Votre mot de passe a été modifié avec succès !");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const unsub = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const docRef = doc(db, "appUser", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              setUser({
                firstName: docSnap.data().firstName,
                lastName: docSnap.data().lastName,
                id: user.uid,
              });
            } else {
              console.error("Aucun document trouvé.");
            }

            await loadAvatar(user.uid);

            setIsAuthenticated(true);
          } else {
            setUser(undefined);
            setIsAuthenticated(false);
          }
        });
        return unsub;
      } catch (error) {
        console.error("Une erreur est survenue lors du chargement.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        register,
        logout,
        login,
        changeAvatar,
        appUser,
        appUserAvatar,
        updateUserPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
