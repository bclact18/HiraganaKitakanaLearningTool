const japanese = [
	["a", "あ"],["i", "い"],["u", "う"],["e", "え"],["o", "お"],
	["ka", "か"],["ki", "き"],["ku", "く"],["ke", "け"],["ko", "こ"],
	["ga", "が"],["gi", "ぎ"],["gu", "ぐ"],["ge", "げ"],["go", "ご"],
	["sa", "さ"],["shi", "し"],["su", "す"],["se", "せ"],["so", "そ"],
	["za", "ざ"],["zi", "じ"],["zu", "ず"],["ze", "ぜ"],["zo", "ぞ"],
	["ta", "た"],["chi", "ち"],["tsu", "つ"],["te", "て"],["to", "と"],
	["da", "だ"],["di", "ぢ"],["du", "づ"],["de", "で"],["do", "ど"],
	["na", "な"],["ni", "に"],["nu", "ぬ"],["ne", "ね"],["no", "の"],
	["ha", "は"],["hi", "ひ"],["fu", "ふ"],["he", "へ"],["ho", "ほ"],
	["ba", "ば"],["bi", "び"],["bu", "ぶ"],["be", "べ"],["bo", "ぼ"],
	["pa", "ぱ"],["pi", "ぴ"],["pu", "ぷ"],["pe", "ぺ"],["po", "ぽ"],
	["ma", "ま"],["mi", "み"],["mu", "む"],["me", "め"],["mo", "も"],
	["ya", "や"],["yu", "ゆ"],["yo", "よ"],
	["ra", "ら"],["ri", "り"],["ru", "る"],["re", "れ"],["ro", "ろ"],
	["wa", "わ"],["wo", "を"],["n", "ん"],
	["a", "ア"],["i", "イ"],["u", "ウ"],["e", "エ"],["o", "オ"],
	["ka", "カ"],["ki", "キ"],["ku", "ク"],["ke", "ケ"],["ko", "コ"],
	["ga", "ガ"],["gi", "ギ"],["gu", "グ"],["ge", "ゲ"],["go", "ゴ"],
	["sa", "サ"],["shi", "シ"],["su", "ス"],["se", "セ"],["so", "ソ"],
	["za", "ザ"],["zi", "ジ"],["zu", "ズ"],["ze", "ゼ"],["zo", "ゾ"],
	["ta", "タ"],["chi", "チ"],["tsu", "ツ"],["te", "テ"],["to", "ト"],
	["da", "ダ"],["di", "ヂ"],["du", "ヅ"],["de", "デ"],["do", "ド"],
	["na", "ナ"],["ni", "ニ"],["nu", "ヌ"],["ne", "ネ"],["no", "ノ"],
	["ha", "ハ"],["hi", "ヒ"],["fu", "フ"],["he", "ヘ"],["ho", "ホ"],
	["ba", "バ"],["bi", "ビ"],["bu", "ブ"],["be", "ベ"],["bo", "ボ"],
	["pa", "パ"],["pi", "ピ"],["pu", "プ"],["pe", "ペ"],["po", "ポ"],
	["ma", "マ"],["mi", "ミ"],["mu", "ム"],["me", "メ"],["mo", "モ"],
	["ya", "ヤ"],["yu", "ユ"],["yo", "ヨ"],
	["ra", "ラ"],["ri", "リ"],["ru", "ル"],["re", "レ"],["ro", "ロ"],
	["wa", "ワ"],["wo", "ヲ"],["n", "ン"],["vu", "ヴ"]
]
//Options to select
const bulletPoint = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 63, 68, 71, 76, 81, 86, 91, 96,
101, 106, 111, 116, 121, 126, 131, 134, 139, 143];
//Button listensers
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", checkAnswer);
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetPage);
const selectionButton = document.getElementById("selection");
selectionButton.addEventListener("click", settingMenu);
//Grade Display
const grade = document.getElementById("grade");
const questionStorage = {
	questions: [],
	getQuestion: function(){ return this.questions;},
	setQuestion: function(...args) {this.questions = args.slice();}
}
//Init page on first load
resetPage();

// Show correct answer and calculate score
function checkAnswer(){
	let answers = [];
	let questions = questionStorage.getQuestion()[0];
	let g = 0;
	for(let i = 0; i < 100; i++){
		answers.push(document.getElementById("ans" + i).value);
		//console.log("ans" + i + ": " + answers[i]);
		if(answers[i] != japanese[questions[i]][0]){
			//console.log("wrong");
			document.getElementById("hiragana"+i).style.background = "#ddaaaa";
			document.getElementById("hiragana"+i).innerHTML = japanese[questions[i]][1] + " (" + japanese[questions[i]][0] + ")";
		}
		else{
			//console.log("correct");
			document.getElementById("hiragana"+i).style.background = "#aaddaa";
			g++;
		}
	}
	grade.innerHTML = "Grade: " + g + "/100";
	grade.style.visibility = "visible";
}
// Reset highlight and generate new question
function resetPage(){
	let questions = []
	for(let i = 0; i < 100; i++){
		questions.push(Math.floor(Math.random()*143));
	}
	console.log("Questions Generated");
	const questionTable = document.getElementById("questionTable");
	questionTable.innerHTML = "";
	for(let i = 0; i < 10; i++){
		questionTable.innerHTML += `<tr id="${"row" + (i*2)}" class="questionTableCells"></tr>`;
		rowX = document.getElementById("row" + (i*2));
		for(let j = 0; j < 10; j++){
			rowX.innerHTML += `<td id="${"hiragana" + (i*10+j)}" class="questionTableCells">${japanese[questions[i*10+j]][1]}</td>`;
		}
		questionTable.innerHTML += `<tr id="${"row" + (i*2+1)}" class="questionTableCells"></tr>`;
		rowX = document.getElementById("row" + (i*2+1));
		for(let j = 0; j < 10; j++){
			rowX.innerHTML += `<td class="questionTableCells"><input type="text" class="answerBox" id="${"ans" + (i*10 + j)}" required minlength="1" maxlength="3" size="1" /></td>`;
		}
	}
	for(let i = 0; i < 100; i++){
		document.getElementById("hiragana"+i).style.background = "transparent";
	}
	questionStorage.setQuestion(questions);
	grade.innerHTML = "Grade";
	grade.style.visibility = "hidden";
}
// Pull setting from user
function settingMenu(){
	checkboxes = document.getElementsByClassName("checkbox");
	for(let i = 0; i < checkboxes.length; i++){
		if(checkboxes[i].checked){
			let re = Number(checkboxes[i].value);
			for(let j = bulletPoint[re]; j < bulletPoint[re+1]; j++){
				console.log(japanese[j][1]);
			}
		}
	}
}
// Option Table Setup
const optionTable = document.getElementById("optionTable");
for(let i = 0; i < (bulletPoint.length - 1) /2; i++){
	optionTable.innerHTML += `<tr><td>${japanese[bulletPoint[i]][1]}行</td><td><input type="checkbox" class="checkbox" value=${i} id="${"opt"+i}"></td><td>${japanese[bulletPoint[i+15]][1]}行</td><td><input type="checkbox" class="checkbox" value=${i+15} id="${"opt"+i+15}"></td></tr>`;
}
