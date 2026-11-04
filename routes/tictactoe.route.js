import { Hono } from "hono";

import { createNewTicTacToeGame, retrieveTicTacToeGameById, getGamesByStatus, updateGameStatus } from "../db/model/tictactoe.model.js";


const app = new Hono();

function randomNumberGenerator () {
    return Math.ceil(Math.random() * 10000);
}

const inMemoryDatabase = [
    randomNumberGenerator(),
    randomNumberGenerator(),
    randomNumberGenerator()
]

//. /api/user/hunter12/games/123/move/456

//localhost:3000/api/tictactoe?filter=even/oddd
// -> { filter: odd}
app.get('/', async function (context) {
    let filter = context.req.query('filter')



    if(filter !== 'waiting' && filter !== 'done') {
        return context.text('Add valid repsonse later :/')
    }

    const dbResponse = await getGamesByStatus(filter);

    return context.json(dbResponse)
    // let filter = context.req.query('filter');

    // if (filter !== 'odd' && filter !== 'even') {
    //   return context.json(inMemoryDatabase);
    // }

    // const filterFunction = filter === 'even' ?
    //     function(value) {
    //         return value % 2 === 0
    //     } :
    //     function(value) {
    //         return value % 2 !== 0
    //     }

    // const filteredData = inMemoryDatabase.filter(function(value) {
    //     return filterFunction(value)
    // })


    // return context.json(filteredData)
    

});

app.patch('/:id', async function(c) {
    const id = c.req.param('id');
    // { status: waiting/done}
    const body = await c.req.json()
    const status = body.status
    // validate the input

    const response = await updateGameStatus(id, status);

    c.status(204)
    return c.text("Updated " + id + " successfully")


})

app.get('/:id', async function(c) {
    const id = c.req.param('id');

    // console.log(Number(index) === NaN)

    // if(!Number.isInteger(index)) {
    //     c.status(401)
    //     return c.text('Invalid index type')
    // }

    // const response = inMemoryDatabase[index]

    // console.log(response)

    const response = await retrieveTicTacToeGameById(id)

    if(response === undefined) {
        c.status(404)
        return c.text("Not entry value for index " + index)
    }

    return c.json(response);

})

app.post('/', async function(c) {

    
    // const body = await c.req.json()

    // console.log(typeof body, body);
    // const newNumber = body.newNumber;

    // inMemoryDatabase.push(newNumber)

    const newGameId = await createNewTicTacToeGame()

    c.status(201);

    return c.text(newGameId)
})

app.delete('/:index', async function(c) {
    const indexToDelete = c.req.param('index');
    throw new Error();

    inMemoryDatabase.splice(indexToDelete, 1);

    return c.text("Completed")
})


export default app;