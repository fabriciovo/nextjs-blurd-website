import * as functions from "firebase-functions";
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();



export const userDocument = functions.auth.user().onCreate(async (user) => {
    const { uid } = user;
      const userRef = admin.firestore().collection('users').doc(uid);
      const userSnapshot = await userRef.get();

      if (!userSnapshot.exists) {
        const GMdata = {
            beta_tester: false,
            first_login: false,
            coins: 0,
            total_coins: 0,
            coins_per_second: 0,
            coins_out_game: 0,
            collectables: "{}",
            craft_items: "{}",
            quests: "{}",
            secret_items: "{}",
            shop_items: "{}",
            upgrades: "{}",
            game_signin: admin.firestore.FieldValue.serverTimestamp(),
            game_logout: null
        };
        db.collection('Users').doc(`${user?.uid}`).set(GMdata);
        console.log('Dados do usuário criados no Firestore');
      } else {
        console.log('Os dados do usuário já existem no Firestore');
      }


    return null;
})


export const onUserSignOut = functions.auth.user().onDelete((user) => {
    const { uid } = user;

    const userRef = db.collection('users').doc(uid);

    return userRef.update({ game_signin: admin.firestore.FieldValue.serverTimestamp() })
        .then(() => {
            console.log('Campo "game_signin" atualizado para usuário:', uid);
            return null;
        })
        .catch((error: Error) => {
            console.error('Erro ao atualizar campo "game_signin" para usuário:', uid, error);
            throw error;
        });
});