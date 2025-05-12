// Kill thresholds for each starting size from 5 to 14 enemy operatives
const killGradeThresholds = {
	5:  [1, 2, 3, 4, 5],
	6:  [1, 2, 4, 5, 6],
	7:  [1, 3, 4, 6, 7],
	8:  [2, 3, 5, 6, 8],
	9:  [2, 4, 5, 7, 9],
	10: [2, 4, 6, 8, 10],
	11: [2, 4, 7, 9, 11],
	12: [2, 5, 7, 10, 12],
	13: [3, 5, 8, 10, 13],
	14: [3, 6, 8, 11, 14],
};


function VPs_KillOp(kills, maxEnemyOperatives)
{
	if (kills < 0 || kills > 14 || maxEnemyOperatives < 5 || maxEnemyOperatives > 14)
		return -1; // Invalid input

	const thresholds = killGradeThresholds[maxEnemyOperatives];
	let grade = 0;

	for (let i = 0; i < thresholds.length; i++) {
		if (kills >= thresholds[i]) {
			grade++;
		} else {
			break;
		}
	}

	return grade;
}
