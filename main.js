//Creating all the variables.
var stage;
var pic;
var g;
var strings = ["D1","A","E","C","G","D"];
var string_lst = [];
var fret_lst = [];
var string_pos = {D1: [503,468,1811,427],
                A: [503,480,1811,457],
                E: [503,496,1811,483],
                C: [503,514,1811,521],
                G: [503,530,1811,557],
                D: [503,548,1811,582]}; 
var frets = [0,1,2,3,4,5,6,7];
var fret_pos = {0: [504,454,504,568],
                1: [574,443,574,573],
                2: [644,439,644,576],
                3: [714,436,714,579],
                4: [784,433,784,581],
                5: [854,430,854,583],
                6: [924,427,924,586],
                7: [994,424,994,589]};
						 
var notes = [];
var note_names = ["A","Bb","B","C","C#","D","D#/Eb","E","F","F#","G","G#/Ab"];
var button1;
var button2;
var button3;
var button4;
var response;
var display_time;
var display_note;
var hotspots = [];
var combos = [];
var hotspot_pos = [[502,465],[570,462],[640,460],[710,458],[780,456],[850,454],[920,452],[990,450],
				[502,477],[570,476],[640,475],[710,473],[780,471],[850,470],[920,469],[990,467],
				[502,493],[570,492],[640,492],[710,491],[780,490],[850,489],[920,488],[990,488],
				[502,511],[570,510],[640,511],[710,511],[780,511],[850,514],[920,514],[990,514],
				[502,527],[570,528],[640,530],[710,530],[780,532],[850,533],[920,535],[990,537],
				[502,545],[570,546],[640,548],[710,550],[780,551],[850,553],[920,555],[990,557]];


		
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

//Hotspot Object
(function() {

function Hotspot(str,frt,x,y) {
	this.Container_constructor();
	this.title = "Hotspot";
	this.str = str;
	this.frt = frt;
	this.color = "red";
	this.x = x;
	this.y = y;
	this.note = notes[[this.str.str_name,this.frt.frt_name]];
			
	this.setup();
}
var p = createjs.extend(Hotspot, createjs.Container);


p.setup = function() {

	var width = 8;
	var height = 8;
	this.alpha = .04;
		
			
	var background = new createjs.Shape();
	background.graphics.beginFill(this.color).drawRect(0,0,width,height);
			
	this.addChild(background); 
	//this.on("click", this.handleClick);
	this.on("rollover", this.handleRollOver);
	this.on("rollout", this.handleRollOver);
	this.cursor = "pointer";

	this.mouseChildren = false;
			
	this.offset = Math.random()*10;
	this.count = 0;

};

/*p.handleClick = function (event) {
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
};*/

p.handleRollOver = function(event) {       
	this.str.alpha = event.type == "rollover" ? .4 : 1;
	this.frt.alpha = event.type == "rollover" ? .4 : 1;
	display_note.text = event.type == "rollover" ? this.note : "";
};
		
		
window.Hotspot = createjs.promote(Hotspot, "Container");
}());
		
//Button Object
(function() {

function Button(label, color) {
	this.Container_constructor();
	this.title = "Button";
		
	this.color = color;
	this.label = label;
			
	this.setup();
}
var p = createjs.extend(Button, createjs.Container);


p.setup = function() {
	this.txt = new createjs.Text(this.label, "40px Arial", "#000");
	this.txt.textBaseline = "top";
	this.txt.textAlign = "center";
	
	var width = 140;
	var height = this.txt.getMeasuredHeight()+30;
		
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
	this.color = "#F6E5C3";
	this.title = "Strang";

			
	this.setup();
}
var p = createjs.extend(Strang, createjs.Container);


p.setup = function() {
	g = new createjs.Graphics();
	g.setStrokeStyle(2);
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
	display_note.text = event.type == "rollover" ? this.str_name.substring(0,1) + " string" : "";
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
	this.color = "#F6E5C3";
	this.title = "Fret";

			
	this.setup();
}
var p = createjs.extend(Fret, createjs.Container);


p.setup = function() {
	g = new createjs.Graphics();
	g.setStrokeStyle(4);
	g.beginStroke(this.color);
	g.moveTo(this.startx,this.starty);
	g.lineTo(this.endx,this.endy);
	var s  = new createjs.Shape(g);
	s.width = 437;
	s.height = 700;
			
			
	this.addChild(s); 
	this.on("click", this.handleClick);
	//this.on("rollover", this.handleRollOver);
	//this.on("rollout", this.handleRollOver);
	this.cursor = "pointer";

	this.mouseChildren = false;
		
	this.offset = Math.random()*10;
	this.count = 0;

};

p.handleClick = function (event) {
	none
};

/*p.handleRollOver = function(event) {       
	this.alpha = event.type == "rollover" ? 0.4 : 1;
	
};*/
		
		
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
	button1.alpha = 1;
	button2.mouseEnabled = true;
	button2.alpha = 1;
	button3.mouseEnabled = true;
	button3.alpha = 1;
	button4.mouseEnabled = true;
	button4.alpha = 1;
	answer_set = pick_answer();
}
		
function init() {
	stage = new createjs.Stage(document.getElementById("canvas"));
	stage.enableMouseOver();	
	answer_set = pick_answer();

		
	pic = new createjs.Bitmap("Violbigside.png");
	pic.regX = pic.image.width * 0.5;
	pic.regY = 200;
	
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

	for (string = 0; string < string_lst.length; string++) {
		for (fret = 0; fret < fret_lst.length; fret++) {
			combos.push([string_lst[string],fret_lst[fret]]);
		}
	}
	for (h = 0; h < combos.length; h++) {
		hotspots[h] = new Hotspot(combos[h][0],combos[h][1],hotspot_pos[h][0],hotspot_pos[h][1]);
		stage.addChild(hotspots[h]);
	}
	
	button1 = new Button(choices[0],"#E9D3AE");
	button1.x = 510;
	button1.y = 100;
	stage.addChild(button1);
	
	button2 = new Button(choices[1],"#E9D3AE");
	button2.x = 670;
	button2.y = 100;
	stage.addChild(button2);
	
	button3 = new Button(choices[2],"#E9D3AE");
	button3.x = 830;
	button3.y = 100;
	stage.addChild(button3);
			
	button4 = new Button(choices[3],"#E9D3AE");
	button4.x = 990;
	button4.y = 100;
	stage.addChild(button4);			

	response = new createjs.Text("", "40px Arial", "#000");
	response.x = 820;
	response.y = 280;
	response.lineWidth = 250;
	response.textAlign = "center";
	stage.addChild(response);
		
	display_note = new createjs.Text("", "40px Arial", "#000");
	display_note.x = 750;
	display_note.y = 350;
	stage.addChild(display_note);
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);
}
		

function tick() {

	if(document.getElementById('quiz').checked) {
		for (i = 0; i < stage.children.length; i++) {
			if (stage.children[i].title === "Strang") {
				stage.children[i].children[0].graphics._stroke.style = "#F6E5C3";
				if (stage.children[i].str_name === answer_set[0]) {
					stage.children[i].children[0].graphics._stroke.style = "blue";
				}
			}
			else if (stage.children[i].title === "Fret") {
				if (stage.children[i].frt_name === answer_set[1]) {
					stage.children[i].children[0].graphics._stroke.style = "blue";
					if (stage.children[i].frt_name === 0) {
						stage.children[i].children[0].graphics._stroke.style = "black";
					}
				}
				else if (stage.children[i].frt_name === 0) {
					stage.children[i].children[0].graphics._stroke.style = "black";
				}
				else {
					stage.children[i].children[0].graphics._stroke.style = "#F6E5C3";
				}
			
			}
		}
		for (i = 0; i < stage.children.length; i++) {
			if (stage.children[i].title === "Strang"||stage.children[i].title === "Fret" || stage.children[i].title === "Hotspot") {
				stage.children[i].children[0].mouseEnabled = false;
			}
		}
	}
	else if (document.getElementById('explore').checked) {
		button1.alpha = .01;
		button1.mouseEnabled = false;
		button2.alpha = .01;
		button2.mouseEnabled = false;
		button3.alpha = .01;
		button3.mouseEnabled = false;
		button4.alpha = .01;
		button4.mouseEnabled = false;
		for (i = 0; i < stage.children.length; i++) {
			if (stage.children[i].title === "Hotspot") {
				stage.children[i].children[0].mouseEnabled = true;
			}
		
			else if (stage.children[i].title === "Strang" || stage.children[i].title === "Fret")
				if (stage.children[i].frt_name === 0) {
					stage.children[i].children[0].graphics._stroke.style = "black";
					stage.children[i].children[0].mouseEnabled = true;
				}
				else {
					stage.children[i].children[0].graphics._stroke.style = "#F6E5C3";
					stage.children[i].children[0].mouseEnabled = true;
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
