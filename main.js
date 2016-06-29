//Creating all the variables.
var stage;
var pic;
var g;
var strings = ["D1","A","E","C","G","D"];
var string_lst = [];
var fret_lst = [];
var string_pos = {D1: [98,174,113,659],
                A: [93,174,102,659],
                E: [87,174,92,659],
                C: [81,174,78,659],
                G: [75,174,65,659],
                D: [68,174,55,659]}; 
var frets = [0,1,2,3,4,5,6,7];
var fret_pos = {0: [63,174,101,174],
                1: [60,195,106,195],
                2: [59,216,107,216],
                3: [58,237,108,237],
                4: [57,258,109,258],
                5: [56,279,110,279],
                6: [56,300,111,300],
                7: [55,321,112,321]};
						 
var notes = [];
var note_names = ["A","Bb","B","C","C#","D","D#/Eb","E","F","F#","G","G#/Ab"];
var button1;
var button2;
var button3;
var button4;
var response;
var display_time;
		
//This loop puts all of the string and fret combinations in an array along with their note name.
for (string = 0; string < strings.length; string++) {
	switch(strings[string]) {
		case "A":
			start_note = 0;
			break;
		case "E":
			start_note = 7;
			break;
		case "C":
			start_note = 3;
			break;
		case "G":
			start_note = 10;
			break;
		default:
			start_note = 5;			
	}
	
	for (fret = 0; fret < frets.length; fret++) {
		notes[[strings[string],fret]] = note_names[start_note];
		if (start_note < 11) {
			start_note += 1;
		}
		else {
			start_note = 0;
		};
	}
}
		
var answer_set = [];

//This function randomly shuffles items in an array. This way the answer won't always be on the same button.
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;

	// And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
	}
}
		
//Button Object
(function() {

function Button(label, color) {
	this.Container_constructor();
		
	this.color = color;
	this.label = label;
			
	this.setup();
}
var p = createjs.extend(Button, createjs.Container);


p.setup = function() {
	this.txt = new createjs.Text(this.label, "20px Arial", "#000");
	this.txt.textBaseline = "top";
	this.txt.textAlign = "center";
	
	var width = 65;
	var height = this.txt.getMeasuredHeight()+20;
		
	this.txt.x = width/2;
	this.txt.y = 10;
			
	var background = new createjs.Shape();
	background.graphics.beginFill(this.color).drawRoundRect(0,0,width,height,10);
			
	this.addChild(background, this.txt); 
	this.on("click", this.handleClick);
	this.on("rollover", this.handleRollOver);
	this.on("rollout", this.handleRollOver);
	this.cursor = "pointer";

	this.mouseChildren = false;
			
	this.offset = Math.random()*10;
	this.count = 0;

};

p.handleClick = function (event) {
	display_time = createjs.Ticker.getTime(true) + 1500;
		
	if (this.txt.text === answer_set[2]) {
		response.text = "Correct";
		choose_answer();
	}
	else {
		button1.mouseEnabled = false;
		button2.mouseEnabled = false;
		button3.mouseEnabled = false;
		button4.mouseEnabled = false;
	    response.text = "The correct answer is " + answer_set[2] + ".";
		setTimeout(choose_answer,1500);
	
	}
};

p.handleRollOver = function(event) {       
	this.alpha = event.type == "rollover" ? 0.4 : 1;
};
		
		
window.Button = createjs.promote(Button, "Container");
}());
		
//Strang Object. Couldn't call in String, 'cause that was already a thing. 
(function() {

function Strang(startx,starty,endx,endy,str_name) {
	this.Container_constructor();
	this.startx = startx;
	this.starty = starty;
	this.endx = endx;
	this.endy = endy;
	this.str_name = str_name;
	this.color = "white";

			
	this.setup();
}
var p = createjs.extend(Strang, createjs.Container);


p.setup = function() {
	g = new createjs.Graphics();
	g.setStrokeStyle(1);
	g.beginStroke(this.color);
	g.moveTo(this.startx,this.starty);
	g.lineTo(this.endx,this.endy);
	var s  = new createjs.Shape(g);
	s.width = 437;
	s.height = 700;
	
			
	this.addChild(s); 
	this.on("click", this.handleClick);
	this.on("rollover", this.handleRollOver);
	this.on("rollout", this.handleRollOver);
	this.cursor = "pointer";

	this.mouseChildren = false;
			
	this.offset = Math.random()*10;
	this.count = 0;

};

p.handleClick = function (event) {
	none

};

p.handleRollOver = function(event) {       
	this.alpha = event.type == "rollover" ? 0.4 : 1;
};
		
		
window.Strang = createjs.promote(Strang, "Container");
}());
	
//Fret Object
(function() {

function Fret(startx,starty,endx,endy,frt_name) {
	this.Container_constructor();
	this.startx = startx;
	this.starty = starty;
	this.endx = endx;
	this.endy = endy;
	this.frt_name = frt_name;
	this.color = "white";

			
	this.setup();
}
var p = createjs.extend(Fret, createjs.Container);


p.setup = function() {
	g = new createjs.Graphics();
	g.setStrokeStyle(1);
	g.beginStroke(this.color);
	g.moveTo(this.startx,this.starty);
	g.lineTo(this.endx,this.endy);
	var s  = new createjs.Shape(g);
	s.width = 437;
	s.height = 700;
			
			
	this.addChild(s); 
	this.on("click", this.handleClick);
	this.on("rollover", this.handleRollOver);
	this.on("rollout", this.handleRollOver);
	this.cursor = "pointer";

	this.mouseChildren = false;
		
	this.offset = Math.random()*10;
	this.count = 0;

};

p.handleClick = function (event) {
	none
};

p.handleRollOver = function(event) {       
	this.alpha = event.type == "rollover" ? 0.4 : 1;
};
		
		
window.Fret = createjs.promote(Fret, "Container");
}());
		
//This function generates and returns the answer set.
function pick_answer () {
	stringchoice = strings[Math.floor(Math.random()*strings.length)];
	fretchoice = frets[Math.floor(Math.random()*frets.length)];
	answer = notes[[stringchoice,fretchoice]];
	choices = [answer];
	i = 0;
	while (i < 3) {
		note = note_names[Math.floor(Math.random()*strings.length)];
		if (note != answer && choices.indexOf(note) === -1) {
			choices.push(note);
			i += 1;
		}
	}
	shuffle(choices);
	return [stringchoice, fretchoice, answer, choices];
};
		

function choose_answer() {
	button1.mouseEnabled = true;
	button2.mouseEnabled = true;
	button3.mouseEnabled = true;
	button4.mouseEnabled = true;
	answer_set = pick_answer();
}
		
function init() {
	stage = new createjs.Stage(document.getElementById("canvas"));
		
	answer_set = pick_answer();
			
			
	pic = new createjs.Bitmap("Violcropped.png");
	pic.regX = pic.image.width * 0.5;
	pic.regY = pic.image.height * 0.5;
	stage.addChild(pic);
			
	for (f = 0; f < 8; f++) {
		x = fret_pos[frets[f]];
		fret_lst[f] = new Fret(x[0],x[1],x[2],x[3],frets[f]);
		stage.addChild(fret_lst[f]);
	}

	for (s = 0; s < 6; s++) {
		x = string_pos[strings[s]];
		string_lst[s] = new Strang(x[0],x[1],x[2],x[3],strings[s]);
		stage.addChild(string_lst[s]);
	}

	button1 = new Button(choices[0],"#E9D3AE");
	button1.x = 300;
	button1.y = 200;
	stage.addChild(button1);
	button2 = new Button(choices[1],"#E9D3AE");
	button2.x = 300;
	button2.y = 250;
	stage.addChild(button2);
	
	button3 = new Button(choices[2],"#E9D3AE");
	button3.x = 300;
	button3.y = 300;
	stage.addChild(button3);
			
	button4 = new Button(choices[3],"#E9D3AE");
	button4.x = 300;
	button4.y = 350;
	stage.addChild(button4);			

	response = new createjs.Text("", "20px Arial", "#000");
	response.x = 335;
	response.y = 120;
	response.lineWidth = 150;
	response.textAlign = "center";
	stage.addChild(response);
		
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);
}
		

function tick() {
	for (i = 0; i < stage.children.length; i++) {
		if (stage.children[i].constructor.name === "Strang") {
			stage.children[i].children[0].graphics._stroke.style = "white";
			if (stage.children[i].str_name === answer_set[0]) {
				stage.children[i].children[0].graphics._stroke.style = "red";
			}
		}
		else if (stage.children[i].constructor.name === "Fret") {
			if (stage.children[i].frt_name === answer_set[1]) {
				stage.children[i].children[0].graphics._stroke.style = "red";
				if (stage.children[i].frt_name === 0) {
					stage.children[i].children[0].graphics._stroke.style = "black";
				}
			}
			else if (stage.children[i].frt_name === 0) {
				stage.children[i].children[0].graphics._stroke.style = "black";
			}
			else {
				stage.children[i].children[0].graphics._stroke.style = "white";
			}
		
		}
	}
			
	button1.txt.text = choices[0];
	button2.txt.text = choices[1];
	button3.txt.text = choices[2];
	button4.txt.text = choices[3];
			
	if (createjs.Ticker.getTime(true) >= display_time) {
		response.text = "";
		display_time = 0;
	}
			
	stage.update();
};