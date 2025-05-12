// Game state variables
let playerOperatives = 0;
let opponentOperatives = 0;
let critOpPlayer = 0;
let killOpPlayer = 0;
let tacOpPlayer = 0;
let critOpOpponent = 0;
let killOpOpponent = 0;
let tacOpOpponent = 0;

// Start the game and transition to the middle page
function startGame() {
    playerOperatives = document.getElementById("player-operatives").value;
    opponentOperatives = document.getElementById("opponent-operatives").value;

    if (playerOperatives >= 5 && playerOperatives <= 14 && opponentOperatives >= 5 && opponentOperatives <= 14) {
        document.getElementById("start-page").style.display = "none";
        document.getElementById("middle-page").style.display = "block";
    } else {
        alert("Please enter valid operatives between 5 and 14.");
    }
}

// End the game and show results on the end page
function endGame() {
    document.getElementById("middle-page").style.display = "none";
    document.getElementById("end-page").style.display = "block";
    
    // Calculate the total points and apply the primary op multiplier
    let totalPointsPlayer = critOpPlayer + killOpPlayer + tacOpPlayer;
    let totalPointsOpponent = critOpOpponent + killOpOpponent + tacOpOpponent;

    let finalPointsPlayer = totalPointsPlayer;
    let finalPointsOpponent = totalPointsOpponent;

    if (document.getElementById("crit-primary-check").checked) {
        finalPointsPlayer *= 1.5;
    }
    if (document.getElementById("kill-primary-check").checked) {
        finalPointsPlayer *= 1.5;
    }
    if (document.getElementById("tac-primary-check").checked) {
        finalPointsPlayer *= 1.5;
    }

    // Display the final result
    document.getElementById("final-feedback").innerText = `Player Total: ${finalPointsPlayer} | Opponent Total: ${finalPointsOpponent}`;
    document.getElementById("score-breakdown").innerHTML = `
        <p>Crit Op Player: ${critOpPlayer}</p>
        <p>Kill Op Player: ${killOpPlayer}</p>
        <p>Tac Op Player: ${tacOpPlayer}</p>
        <p>Crit Op Opponent: ${critOpOpponent}</p>
        <p>Kill Op Opponent: ${killOpOpponent}</p>
        <p>Tac Op Opponent: ${tacOpOpponent}</p>
    `;
}

// Restart the game (reset everything)
function restartGame() {
    document.getElementById("end-page").style.display = "none";
    document.getElementById("start-page").style.display = "block";
    document.getElementById("player-operatives").value = "";
    document.getElementById("opponent-operatives").value = "";
}

// Update UI (checkboxes for primary ops)
function updateUI() {
    // You can add any additional UI updates here
}

// Functions to add/remove points
function addPoints(opType) {
    if (opType === 'crit_player') critOpPlayer++;
    if (opType === 'kill_player') killOpPlayer++;
    if (opType === 'tac_player') tacOpPlayer++;

    updateUI();
}

function removePoints(opType) {
    if (opType === 'crit_player' && critOpPlayer > 0) critOpPlayer--;
    if (opType === 'kill_player' && killOpPlayer > 0) killOpPlayer--;
    if (opType === 'tac_player' && tacOpPlayer > 0) tacOpPlayer--;

    updateUI();
}

function updateUI() {
    document.getElementById("crit-box-player").innerText = `Crit Op: ${critOpPlayer}`;
    document.getElementById("kill-box-player").innerText = `Kill Op: ${killOpPlayer}`;
    document.getElementById("tac-box-player").innerText = `Tac Op: ${tacOpPlayer}`;
}
