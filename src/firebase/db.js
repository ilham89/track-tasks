import { db } from "./firebase";
import { getUser } from "./user";

const boardsRef = db.ref("boards");
const listsRef = db.ref("lists");
const cardsRef = db.ref("cards");

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () => db.ref("users").once("value");

export const doCreateBoard = async (board) => {
  const uid = getUser().uid;
  const id = boardsRef.push().key;
  await boardsRef.child(uid).child(id).set(board);
  board.key = id;
  return board;
};

export const doDeleteBoard = async (boardKey) => {
  const uid = getUser().uid;
  await boardsRef.child(uid).child(boardKey).remove();
};

export const doUpdateBoard = async (boardKey, title) => {
  const uid = getUser().uid;
  await boardsRef
    .child(uid)
    .child(boardKey)
    .update({
      ...title,
    });
};

export const onceGetBoards = () => {
  const uid = getUser().uid;
  return boardsRef.child(uid).once("value");
};

export const doEditBoard = async (boardKey, board) => {
  const uid = getUser().uid;

  await boardsRef
    .child(uid)
    .child(boardKey)
    .update({
      ...board,
    });
  return board;
};

export const onceGetBoard = (boardKey) => {
  const uid = getUser().uid;

  return boardsRef.child(uid).child(`${boardKey}`).once("value");
};

export const onListMove = async (params) => {
  const { boardKey, lists } = params;
  var updates = {};
  lists.forEach((list, index) => {
    const newList = { ...list, index };
    updates[list.key] = newList;
  });

  listsRef.child(boardKey).update(updates);
};

export const onceGetLists = (key) => listsRef.child(key).once("value");

export const doCreateList = async (boardKey, list) => {
  let listIndex;
  listsRef
    .child(boardKey)
    .once("value")
    .then((snapshot) => {
      const listsObject = snapshot.val();
      listIndex = Object.keys(listsObject).length;
    });

  const id = listsRef.push().key;
  await listsRef.child(boardKey).child(id).set(list);
  list.key = id;
  list.index = listIndex - 1;
  return list;
};

export const doDeleteList = (boardKey, listKey) =>
  db
    .ref(`lists/${boardKey}`)
    .child(`${listKey}`)
    .remove()
    .then(() => db.ref("cards/").child(`${listKey}`).remove());

export const doUpdateList = async (boardKey, listKey, list) => {
  await listsRef
    .child(boardKey)
    .child(listKey)
    .update({
      ...list,
    });
  return list;
};

export const doAddCard = async (listKey, cardTitle) => {
  let cardIndex;
  await db
    .ref(`cards/${listKey}`)
    .once("value")
    .then((snapshot) => {
      const cardsObject = snapshot.val();
      if (cardsObject !== undefined && cardsObject !== null) {
        cardIndex = Object.keys(cardsObject).length;
      } else cardIndex = 0;
    });
  db.ref(`cards/${listKey}`).push({
    title: cardTitle,
    index: cardIndex,
  });
};

export const onceGetCard = (listKey) =>
  db.ref(`cards/${listKey}`).once("value");

export const doEditCard = async (listKey, cardKey, card) => {
  await cardsRef
    .child(listKey)
    .child(cardKey)
    .update({
      ...card,
    });
  card.key = cardKey;
  return card;
};

export const doMoveCard = async (params) => {
  const { oldListKey, newListKey, cardKey, cards } = params;
  // eslint-disable-next-line
  let card;
  await db
    .ref(`cards/${oldListKey}`)
    .child(`${cardKey}`)
    .once("value")
    .then((snapshot) => {
      card = snapshot.val();
    });

  var updates = {};

  cards.forEach((card, index) => {
    const newCard = { ...card, index };
    updates[card.key] = newCard;
  });

  db.ref(`cards/${oldListKey}`)
    .child(`${cardKey}`)
    .remove()
    .then(() => {
      db.ref(`cards/${newListKey}`).update(updates);
    });

  return onceGetCard(newListKey);
};

export const doDeleteCard = (listKey, cardKey) =>
  db.ref(`cards/${listKey}/`).child(`${cardKey}`).remove();
