import {sleep} from "./utils.js"

const actions = ["ROCK", "PAPER", "SCISSORS"]

// A bunch of changeable configs for the game
const enums = {
    // Points awarded for each outcome of a round
    ROUND_TO_PLAYER: 1,
    ROUND_TO_COMPUTER: -1,
    DRAW: 0,

    // The points required for each side to win
    WIN_COMPUTER: -3,
    WIN_PLAYER: 3,

    // The amount of failed inputs the player has before failure
    FAILURE_TOLERANCE: 3
}


// Choice-maker for the AI
async function computerPlay () {
    console.log("The AI takes action...")
    await sleep(1000)
    let choice = actions[~~(Math.random() * actions.length)]
    console.log(`The AI chooses ${choice}`)
    return choice
}


// Plays one round, returning an integer representing the value of the win
function playRound (player_selection, computer_selection) {
    const player_index   = actions.indexOf(player_selection.toUpperCase())
    const computer_index = actions.indexOf(computer_selection.toUpperCase())

    if (computer_index == player_index)
        return enums.DRAW
    else if ((player_index + 1) % actions.length == computer_index)
        return enums.ROUND_TO_COMPUTER
    else
        return enums.ROUND_TO_PLAYER
}


async function game () {
    let win_count = 0
    
    for (let round = 0; round++ < 5;) {
        // Get player input

        console.log("The player takes action...")
        let player_input = prompt(`Decide your Fate: ${actions.join("|")}`).toUpperCase()
        let failure_count = enums.FAILURE_TOLERANCE
    
        while (!actions.includes(player_input)) {
            if (!--failure_count)
                return console.log("The patience of the observer has reached its end... PLAYER LOSES.")
            
            player_input = prompt(`Invalid decision. Our Tolerance drops to ${failure_count}.\nDecide your Fate: ${actions.join("|")}`).toUpperCase()
        }
        console.log(`The player chooses ${player_input}`)

        // Perform game logic

        let round_state = playRound(player_input, await computerPlay())
        win_count += round_state
        await sleep(1000)

        switch (round_state) {
            case enums.ROUND_TO_PLAYER:
                console.log(`The Player wins round ${round}. Points awarded: ${Math.abs(enums.ROUND_TO_PLAYER)}`)
                break
            case enums.ROUND_TO_COMPUTER:
                console.log(`The AI wins round ${round}. Points awarded: ${Math.abs(enums.ROUND_TO_COMPUTER)}`)
                break
            case enums.DRAW:
                console.log(`Round tied: ${enums.DRAW} points awarded.`)
                break
            default:
                throw "Unknown round state"
        }

        await sleep(650)
        if (round_state)
            if (win_count)  console.log(`New score: ${Math.abs(win_count)} for ${0 < round_state ? "Player" : "AI"}`)
            else            console.log(`New Score: 0 to either party.`)
        else if (win_count) console.log(`The score remains at ${Math.abs(win_count)} for ${0 < round_state ? "Player" : "AI"}`)
        else                console.log("The score remains at 0.")

        await sleep(650)
        if (win_count == enums.WIN_COMPUTER)
            return console.log("The Robots take control: AI WINS!")
        else if (win_count == enums.WIN_PLAYER)
            return console.log("Mankind prevails: PLAYER WINS!")
    }

    console.log("Neither party reaches the threshold for victory, and thus the storm rages on... DRAW.")
}

onload = () => {
    game()
}