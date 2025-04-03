let points = { crit: 0, kill: 0, tac: 0 };
let myPoints = { crit: 0, kill: 0, tac: 0 };

function addPoints(type) {
	if (points[type] < 6)
	    points[type] += 1;
    updateUI();
}

function removePoints(type) {
	if (points[type] > 0)
		points[type] -= 1;
	updateUI();
}

function primaryPoints(points) {

}
function updateUI() {
    document.getElementById('crit-box').innerText = `Crit Op: ${points.crit}`;
    document.getElementById('kill-box').innerText = `Kill Op: ${points.kill}`;
    document.getElementById('tac-box').innerText = `Tac Op: ${points.tac}`;
    
    let primaryOps = {
        crit: Math.ceil(points.crit / 2),
        kill: Math.ceil(points.kill / 2),
        tac: Math.ceil(points.tac / 2)
    };
    
    document.getElementById('crit-primary-box').innerText = `Crit Op (Primary): ${primaryOps.crit}`;
    document.getElementById('kill-primary-box').innerText = `Kill Op (Primary): ${primaryOps.kill}`;
    document.getElementById('tac-primary-box').innerText = `Tac Op (Primary): ${primaryOps.tac}`;
    
    let highestPrimary = Math.max(primaryOps.crit, primaryOps.kill, primaryOps.tac);
    let total = points.crit + points.kill + points.tac + highestPrimary;
    document.getElementById('enemy-total').innerText = `Opponent Max Total: ${total}`;
    updateMyTotal();
}

function updateMyTotal() {
    myPoints.crit = document.getElementById('crit-primary-check').checked ? Math.ceil(points.crit * 1.5) : points.crit;
    myPoints.kill = document.getElementById('kill-primary-check').checked ? Math.ceil(points.kill * 1.5) : points.kill;
    myPoints.tac = document.getElementById('tac-primary-check').checked ? Math.ceil(points.tac * 1.5) : points.tac;
    
    let myTotal = (myPoints.crit + myPoints.kill + myPoints.tac) * 2;
    document.getElementById('my-total').innerText = `Your Total: ${myTotal}`;
}
