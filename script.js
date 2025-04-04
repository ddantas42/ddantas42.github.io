let points = {
	crit_player: 0, kill_player: 0, tac_player: 0,
	crit_opponent: 0, kill_opponent: 0, tac_opponent: 0
};

let myPoints = {
	crit_player: 0, kill_player: 0, tac_player: 0,
	crit_opponent: 0, kill_opponent: 0, tac_opponent: 0
};

function addPoints(type)
{
	limit = 6;
	if (type == 'kill_opponent' || type == 'kill_player')
		limit = 5

	if (points[type] < limit)
	    points[type] += 1;

    updateUI();
}

function removePoints(type)
{
	if (points[type] > 0)
		points[type] -= 1;
	updateUI();
}

function updateUI()
{
    document.getElementById('crit-box-opponent').innerText = `Crit Op: ${points.crit_opponent}`;
    document.getElementById('kill-box-opponent').innerText = `Kill Op: ${points.kill_opponent}`;
    document.getElementById('tac-box-opponent').innerText = `Tac Op: ${points.tac_opponent}`;
    
	document.getElementById('crit-box-player').innerText = `Crit Op: ${points.crit_player}`;
    document.getElementById('kill-box-player').innerText = `Kill Op: ${points.kill_player}`;
    document.getElementById('tac-box-player').innerText = `Tac Op: ${points.tac_player}`;
    
    let primaryOps = {
        crit_opponent: Math.ceil(points.crit_opponent / 2),
        kill_opponent: Math.ceil(points.kill_opponent / 2),
        tac_opponent: Math.ceil(points.tac_opponent / 2),
		crit_player: Math.ceil(points.crit_player/ 2),
		kill_player: Math.ceil(points.kill_player / 2),
		tac_player: Math.ceil(points.tac_player / 2)

    };
    
    document.getElementById('crit-primary-box-opponent').innerText = `Crit Op (Primary): ${primaryOps.crit_opponent}`;
    document.getElementById('kill-primary-box-opponent').innerText = `Kill Op (Primary): ${primaryOps.kill_opponent}`;
    document.getElementById('tac-primary-box-opponent').innerText = `Tac Op (Primary): ${primaryOps.tac_opponent}`;
    
	document.getElementById('crit-primary-box-player').innerText = `Crit Op (Primary): ${primaryOps.crit_player}`;
    document.getElementById('kill-primary-box-player').innerText = `Kill Op (Primary): ${primaryOps.kill_player}`;
    document.getElementById('tac-primary-box-player').innerText = `Tac Op (Primary): ${primaryOps.tac_player}`;
    
	opponnent_total = opponent_total_update('opponent-total', points.crit_opponent, points.kill_opponent, points.tac_opponent);
    document.getElementById('opponent-total').innerText = `Total: ${opponnent_total}`;

	player_total = player_total_update('player-total', points.crit_player, points.kill_player, points.tac_player);
	document.getElementById('player-total').innerText = `Total: ${player_total}`;

	updateBackgrounds(player_total, opponnent_total);
}

function updateBackgrounds(playerTotal, opponentTotal) {
	const maxPoints = 21;

	// Get progress % (clamped between 0 and 1)
	const playerProgress = Math.min(playerTotal / maxPoints, 1);
	const opponentProgress = Math.min(opponentTotal / maxPoints, 1);

	// Determine who's ahead
	const playerAhead = playerTotal > opponentTotal;
	const opponentAhead = opponentTotal > playerTotal;

	// Calculate color intensity based on closeness to 21
	const red = (intensity) => `rgb(${Math.floor(255 * intensity)}, 0, 0)`;
	const blue = (intensity) => `rgb(0, 0, ${Math.floor(255 * intensity)})`;

	const playerColor = playerAhead ? red(playerProgress) : blue(playerProgress);
	const opponentColor = opponentAhead ? red(opponentProgress) : blue(opponentProgress);

	// Tie color
	const tieColor = 'black';

	document.getElementById('player-total').style.backgroundColor =
		playerTotal === opponentTotal ? tieColor : playerColor;

	document.getElementById('opponent-total').style.backgroundColor =
		playerTotal === opponentTotal ? tieColor : opponentColor;
}


function player_total_update(elem, crit, kill, tac)
{
    let highestPrimary = Math.max(crit, kill, tac);
	highestPrimary = Math.ceil(highestPrimary / 2);

	if (document.getElementById('crit-primary-check').checked)
		highestPrimary = Math.ceil(crit / 2);
	else if (document.getElementById('kill-primary-check').checked)
		highestPrimary = Math.ceil(kill / 2);
	else if (document.getElementById('tac-primary-check').checked)
		highestPrimary = Math.ceil(tac / 2);
	else
		highestPrimary = 0;

	let total = crit + kill + tac + highestPrimary;

	if (kill > points['kill_opponent'])
		total += 1;

	return total
}

function opponent_total_update(elem, crit, kill, tac)
{
	let highestPrimary = Math.max(crit, kill, tac);
	highestPrimary = Math.ceil(highestPrimary / 2);

	let total = crit + kill + tac + highestPrimary;
	if (kill > points['kill_player'])
		total += 1;
	return total
}