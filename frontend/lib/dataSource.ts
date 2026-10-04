import { getApps, initializeApp } from "firebase/app";
import {
  collection,
  connectFirestoreEmulator,
  getDocs,
  getFirestore,
} from "firebase/firestore";

export type HealthResponse = {
  status: string;
  items: string[];
};

let emulatorConectado = false;

function pegarBanco() {
  const apps = getApps();
  let app;
  if (apps.length > 0) {
    app = apps[0];
  } else {
    app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }

  const db = getFirestore(app);

  if (process.env.NEXT_PUBLIC_USE_EMULATOR === "true" && !emulatorConectado) {
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
    emulatorConectado = true;
  }

  return db;
}

export function buscarDados(apiUrl: string): Promise<HealthResponse> {
  if (process.env.NEXT_PUBLIC_DATA_SOURCE === "firestore") {
    const db = pegarBanco();
    return getDocs(collection(db, "items")).then((snap) => {
      const items: string[] = [];
      snap.forEach((doc) => {
        items.push(doc.data().name);
      });
      return { status: "ok", items: items };
    });
  }

  return fetch(`${apiUrl}/health/`).then((response) => response.json());
}