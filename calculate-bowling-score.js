(function() {
	function calculateBowlingScore (input = '') {
		// Insert given pins knocked down per bowl into array, bowlArr
		var bowlArr = input.split(',').map(Number);
		var scoreArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		var sumOfCurrentFrame = 0;
		var frameNo = 1;

		function addScore (bowlPos, is1stFrame = false) {
			var returnObj = {
				continueCalculation: false,
				nextPos:             bowlPos
			};
			sumOfCurrentFrame += bowlArr[bowlPos];

			if (bowlArr[bowlPos] === 10) {
				if ((typeof bowlArr[bowlPos+1] !== 'undefined') && (sumOfCurrentFrame !== 30)) {
					if (bowlArr[bowlPos+1] === 10) {
						returnObj.nextPos = bowlPos + 1;
						returnObj.continueCalculation = true;
					} else {
						sumOfCurrentFrame += bowlArr[bowlPos+1];
						if ((typeof bowlArr[bowlPos+2] !== 'undefined') && (is1stFrame)) {
							sumOfCurrentFrame += bowlArr[bowlPos+2];
						}
					}
				}
			} else if ((bowlArr[bowlPos] >= 0) && (bowlArr[bowlPos] <= 9)) {
				if (typeof bowlArr[bowlPos+1] !== 'undefined') {
					sumOfCurrentFrame += bowlArr[bowlPos+1];
					
					if (bowlArr[bowlPos] + bowlArr[bowlPos+1] === 10) {
						if (typeof bowlArr[bowlPos+2] !== 'undefined') {
							sumOfCurrentFrame += bowlArr[bowlPos+2];
						}
					}
				}
			}
			return returnObj;
		}

		function calculateSingleFrameScore (frameNo) {
			var noOfBowlInCurrentFrame = typeof bowlArr[1] !== 'undefined' ? bowlArr[0] < 10 ? 2 : 1 : 1;
			sumOfCurrentFrame = 0;

			var tempArr = addScore(0, true);
			if (tempArr.continueCalculation) {
				var tempArr2 = addScore(tempArr.nextPos);
				if (tempArr2.continueCalculation) {
					var tempArr3 = addScore(tempArr2.nextPos);
				}
			}
			// Remove score(s) for current frame from bowlArr
			bowlArr.splice(0, noOfBowlInCurrentFrame);
			scoreArr[frameNo-1] = sumOfCurrentFrame;

			return bowlArr;
		}

		function calculateTotalScore(scoreArr) {
		    return scoreArr.reduce((a,b) => a+b);
		}

		while ((frameNo <= 10) && (bowlArr.length > 0)) {
			bowlArr = calculateSingleFrameScore(frameNo);
			frameNo++;
		}

		return calculateTotalScore(scoreArr);
	}

	// score = calculateBowlingScore('10,10,10,9,1,4,6,10,9,1,3,7'); // 30 + 29 + 20 + 14 + 20 + 19 + 13 + 10 = 156

	// score = calculateBowlingScore('10,10,10,10,10,10,10,10,10,10,10,10'); // 300

	// score = calculateBowlingScore('1,9,2,8,3,7,4,6,5,5,10,10,10,4,2,10,10,4'); // 12 + 13 + 14 + 15 + 20 + 30 + 24 + 16 + 6 + 24 = 174

	// score = calculateBowlingScore('10,0,0,9,1,0,0,8,2,0,0,7,3,0,0,6,4,0,0'); // 50

	// score = calculateBowlingScore('0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0'); // 0

	score = calculateBowlingScore('0');

	console.log('score:');
	console.log(score);
})();
