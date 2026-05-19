let player = {
	operatives: 0,
	critOp: 0,
	tacOp: 0,
	primaryOp: 0,
	primaryOpType: 'crit',
	enemiesKilled: 0,
	killGrade: 0,
	killOp: 0
};

let opponent = {
	operatives: 0,
	critOp: 0,
	tacOp: 0,
	primaryOp: 0,
	primaryOpType: 'crit',
	enemiesKilled: 0,
	killGrade: 0,
	killOp: 0
};

// Kill Grade thresholds based on starting operatives
const killGradeThresholds = {
	5: [1, 2, 3, 4, 5],
	6: [1, 2, 4, 5, 6],
	7: [1, 3, 4, 6, 7],
	8: [2, 3, 5, 6, 8],
	9: [2, 4, 5, 7, 9],
	10: [2, 4, 6, 8, 10],
	11: [2, 4, 7, 9, 11],
	12: [2, 5, 7, 10, 12],
	13: [3, 5, 8, 10, 13],
	14: [3, 6, 8, 11, 14]
};

// Placeholder function for operative selection change
function updateOperatives(team)
{
	// This is called when operative count changes, but doesn't need to do anything
	// The actual values are read when startGame() is called
}

// Toggle help information panel
function toggleHelpInfo()
{
	const helpPanel = document.getElementById("help-info");
	if (helpPanel.style.display === "none")
	{
		helpPanel.style.display = "block";
	}
	else
	{
		helpPanel.style.display = "none";
	}
}

// Start the game and transition to the middle page
function startGame()
{
	player.operatives = document.getElementById("player-operatives").value;
	opponent.operatives = document.getElementById("opponent-operatives").value;
	
	// Reset all points
	player.critOp = 0;
	player.tacOp = 0;
	player.primaryOp = 0;
	player.primaryOpType = 'crit';
	player.enemiesKilled = 0;
	player.killGrade = 0;
	
	opponent.critOp = 0;
	opponent.tacOp = 0;
	opponent.primaryOp = 0;
	opponent.primaryOpType = 'crit';
	opponent.enemiesKilled = 0;
	opponent.killGrade = 0;
	
	// Update UI
	updateGameUI();
	
	// Show middle page and hide start page
	document.getElementById("start-page").style.display = "none";
	document.getElementById("middle-page").style.display = "block";
	document.getElementById("end-page").style.display = "none";
}

// Calculate kill grade based on enemies killed and starting operatives
function calculateKillGrade(enemiesKilled, startingOperatives)
{
	const thresholds = killGradeThresholds[startingOperatives];
	let grade = 0;
	
	for (let i = 0; i < thresholds.length; i++)
	{
		if (enemiesKilled >= thresholds[i])
		{
			grade = i + 1;
		}
		else
		{
			break;
		}
	}
	
	return grade;
}

// Adjust enemies killed counter
function adjustEnemiesKilled(team, delta)
{
	if (team === 'player')
	{
		player.enemiesKilled = Math.max(0, Math.min(opponent.operatives, player.enemiesKilled + delta));
		player.killGrade = calculateKillGrade(player.enemiesKilled, opponent.operatives);
	}
	else if (team === 'opponent')
	{
		opponent.enemiesKilled = Math.max(0, Math.min(player.operatives, opponent.enemiesKilled + delta));
		opponent.killGrade = calculateKillGrade(opponent.enemiesKilled, player.operatives);
	}
	updateGameUI();
}

// Adjust points for a player (enforces 0-6 constraint)
function adjustPoints(team, opType, delta)
{
	if (opType === 'primaryOp')
	{
		return;
	}
	
	if (team === 'player')
	{
		player[opType] = Math.max(0, Math.min(6, player[opType] + delta));
	}
	else if (team === 'opponent')
	{
		opponent[opType] = Math.max(0, Math.min(6, opponent[opType] + delta));
	}
	updateGameUI();
}

// Update Primary Op selection
function updatePrimaryOp(team)
{
	const selectElement = document.getElementById(team + "-primary-select");
	const primaryType = selectElement.value;
	
	if (team === 'player')
	{
		player.primaryOpType = primaryType;
	}
	else if (team === 'opponent')
	{
		opponent.primaryOpType = primaryType;
	}
	
	updateGameUI();
}

// Calculate Primary Op points (selected op / 2, rounded up)
function calculatePrimaryOp(team)
{
	let selectedOp;
	
	if (team === 'player')
	{
		const opType = player.primaryOpType;
		selectedOp = player[opType + 'Op'];
	}
	else
	{
		const opType = opponent.primaryOpType;
		selectedOp = opponent[opType + 'Op'];
	}
	
	return Math.ceil(selectedOp / 2);
}

// Update the game UI with current points
function updateGameUI()
{
	// Calculate Primary Op for both teams
	player.primaryOp = calculatePrimaryOp('player');
	opponent.primaryOp = calculatePrimaryOp('opponent');
	
	// Calculate Kill Op with bonus: +1 if kill grade is higher than opponent's
	player.killOp = player.killGrade + (player.killGrade > opponent.killGrade ? 1 : 0);
	opponent.killOp = opponent.killGrade + (opponent.killGrade > player.killGrade ? 1 : 0);
	
	// Update player display
	document.getElementById("player-op-count").textContent = player.operatives;
	document.getElementById("player-critOp").textContent = player.critOp;
	document.getElementById("player-tacOp").textContent = player.tacOp;
	document.getElementById("player-enemies-killed").textContent = player.enemiesKilled;
	document.getElementById("player-kill-grade").textContent = "Grade: " + player.killGrade;
	document.getElementById("player-kill-op-display").textContent = player.killOp;
	document.getElementById("player-primaryOp").textContent = player.primaryOp;
	
	const playerTotal = player.critOp + player.tacOp + player.killOp + player.primaryOp;
	document.getElementById("player-total").textContent = playerTotal;
	
	// Update opponent display
	document.getElementById("opponent-op-count").textContent = opponent.operatives;
	document.getElementById("opponent-critOp").textContent = opponent.critOp;
	document.getElementById("opponent-tacOp").textContent = opponent.tacOp;
	document.getElementById("opponent-enemies-killed").textContent = opponent.enemiesKilled;
	document.getElementById("opponent-kill-grade").textContent = "Grade: " + opponent.killGrade;
	document.getElementById("opponent-kill-op-display").textContent = opponent.killOp;
	document.getElementById("opponent-primaryOp").textContent = opponent.primaryOp;
	
	const opponentTotal = opponent.critOp + opponent.tacOp + opponent.killOp + opponent.primaryOp;
	document.getElementById("opponent-total").textContent = opponentTotal;
}

// End the game and show results on the end page
function endGame()
{
	const playerTotal = player.critOp + player.tacOp + player.killOp + player.primaryOp;
	const opponentTotal = opponent.critOp + opponent.tacOp + opponent.killOp + opponent.primaryOp;
	
	// Update final scores
	document.getElementById("final-player-critOp").textContent = player.critOp;
	document.getElementById("final-player-tacOp").textContent = player.tacOp;
	document.getElementById("final-player-killOp").textContent = player.killOp;
	document.getElementById("final-player-primaryOp").textContent = player.primaryOp;
	document.getElementById("final-player-total").textContent = playerTotal;
	
	document.getElementById("final-opponent-critOp").textContent = opponent.critOp;
	document.getElementById("final-opponent-tacOp").textContent = opponent.tacOp;
	document.getElementById("final-opponent-killOp").textContent = opponent.killOp;
	document.getElementById("final-opponent-primaryOp").textContent = opponent.primaryOp;
	document.getElementById("final-opponent-total").textContent = opponentTotal;
	
	// Determine winner
	let winnerMessage = "";
	if (playerTotal > opponentTotal)
	{
		winnerMessage = "⚔️ YOUR KILL TEAM CLAIMS VICTORY ⚔️";
	}
	else if (opponentTotal > playerTotal)
	{
		winnerMessage = "⚔️ ENEMY KILL TEAM CLAIMS VICTORY ⚔️";
	}
	else
	{
		winnerMessage = "⚖️ STALEMATE - HONOR TO BOTH ⚖️";
	}
	
	document.getElementById("winner-announcement").textContent = winnerMessage;
	
	// Show end page and hide middle page
	document.getElementById("start-page").style.display = "none";
	document.getElementById("middle-page").style.display = "none";
	document.getElementById("end-page").style.display = "block";
}

// Reset the game
function resetGame()
{
	// Show start page and hide others
	document.getElementById("start-page").style.display = "block";
	document.getElementById("middle-page").style.display = "none";
	document.getElementById("end-page").style.display = "none";
}