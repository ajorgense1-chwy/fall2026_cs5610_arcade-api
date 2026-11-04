import db from '../db.js'

import { ObjectId } from 'mongodb';

const collection = db.collection('tictactoe');

//users
//gamestart time
//whose turn it is
function createBoard() {
    return [
        Array(3).fill(null),
        Array(3).fill(null),
        Array(3).fill(null)
    ]

}

export async function createNewTicTacToeGame() {
  const result = await collection.insertOne({
    status: 'done',
    board: createBoard(),
    turn: 'X',
    createdAt: new Date(),
  });
  return result.insertedId;
}

export async function retrieveTicTacToeGameById(id) {
  return await collection.findOne(
    {
      _id: new ObjectId(id)
    }
  )

}

export async function getGamesByStatus(status) {
  return await collection.find({
    status: status
  }).toArray();
}

export async function updateGameStatus(id, status){ 
  await collection.updateOne(
  { _id: new ObjectId(id) },
  {
    $set: { status: status },
  }
);

}

