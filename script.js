let player = {
	operatives: 0,
	critOp: 0,
	killOp: 0,
	tacOp: 0
};
let opponent = {
	operatives: 0,
	critOp: 0,
	killOp: 0,
	tacOp: 0
};

// Start the game and transition to the middle page
function startGame()
{
	player.operatives = document.getElementById("player-operatives").value;
	opponent.operatives = document.getElementById("opponent-operatives").value;
}
// End the game and show results on the end page
function endGame()
{

}

function resetGame()
{

}