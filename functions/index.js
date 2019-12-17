const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.newOrder = functions.firestore.document('orders/{orderId}').onCreate((snap, context) => {
  const orderId = context.params.orderId;
  return admin.firestore().collection('orders').doc(orderId).get().then(snap => {
    return admin.firestore().collection('messages').doc(orderId).set({
      log: `Nuevo pedido realizado con ID ${orderId}, coste total: $${snap.data().totalCost}`
    });
  });
});
