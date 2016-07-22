//Creating all the variables.
var stage;
var pic;
var g;
var strings = ["D","G","C","E","A","D1"];
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
var note_lst = ["D","D#","Eb","E","F","F#","G","G#","Ab","A","Bb","B","C","C#"]
var button1;
var button2;
var button3;
var button4;
var response;
var display_time;
var display_note;
var hotspots = [];
var combos = [];
var hotspot_pos = [[504,548],[574,549],[644,551],[714,553],[784,556],[854,556],[924,558],[994,560],
				[504,530],[574,531],[644,533],[714,533],[784,535],[854,536],[924,538],[994,540],
				[504,514],[574,514],[644,514],[714,514],[784,514],[854,517],[924,517],[994,517],
				[504,496],[574,495],[644,495],[714,494],[784,496],[854,492],[924,491],[994,491],
				[504,481],[574,480],[644,478],[714,476],[784,477],[854,473],[924,472],[994,470],
				[504,466],[574,465],[644,463],[714,461],[784,459],[854,457],[924,455],[994,453]];

var double_note = [false,true,false,false,false,false,true,false,
					false,true,false,false,false,false,false,false,
					false,false,false,true,false,false,false,false,
					false,false,false,false,true,false,false,false,
					false,false,false,false,false,false,true,false,
					false,true,false,false,false,false,true,false,]

var skip = [0,0,1,1,1,1,1,2,
			-2,-2,-1,-1,-1,-1,-1,-1,
			-4,-4,-4,-4,-3,-3,-3,-3,
			-7,-7,-7,-7,-7,-6,-6,-6,
			-9,-9,-9,-9,-9,-9,-9,-8,
			-12,-12,-11,-11,-11,-11,-11,-10]

var staff_notes = [];
		
		
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

function Hotspot(str,frt,staff_note1,staff_note2, x,y) {
	this.Container_constructor();
	this.title = "Hotspot";
	this.str = str;
	this.frt = frt;
	this.color = "red";
	this.x = x;
	this.y= y;
	this.staff_note1 = staff_note1;
	this.staff_note2 = staff_note2;
	this.note = notes[[this.str.str_name,this.frt.frt_name]];
			
	this.setup();
}
var p = createjs.extend(Hotspot, createjs.Container);


p.setup = function() {

	var width = 12;
	var height = 12;
	this.alpha = .01;
		
			
	var background = new createjs.Shape();
	background.graphics.beginFill(this.color).drawRect(-width/2,-height/2,width,height);
			
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
	event.type == "rollover" ? this.staff_note1.children[2].graphics._fill.style = "red"  : this.staff_note1.children[2].graphics._fill.style = "black";
	event.type == "rollover" ? this.staff_note1.children[3].graphics._stroke.style = "red"  : this.staff_note1.children[3].graphics._stroke.style = "black";
	event.type == "rollover" ? this.staff_note1.children[4].graphics._stroke.style = "red"  : this.staff_note1.children[4].graphics._stroke.style = "black";
	event.type == "rollover" ? this.staff_note2.children[2].graphics._fill.style = "red"  : this.staff_note2.children[2].graphics._fill.style = "black";
	event.type == "rollover" ? this.staff_note2.children[3].graphics._stroke.style = "red"  : this.staff_note2.children[3].graphics._stroke.style = "black";
	event.type == "rollover" ? this.staff_note2.children[4].graphics._stroke.style = "red"  : this.staff_note2.children[4].graphics._stroke.style = "black";
	display_note.text = event.type == "rollover" ? this.note : "";
};
		
		
window.Hotspot = createjs.promote(Hotspot, "Container");
}());
		
//Note Object
(function() {

function Note(x,y,tail_up,tail_down,shrp,flt) {
	this.Container_constructor();
	this.title = "Note";
	this.x = x;
	this.y = y;
	this.tail_up = tail_up;
	this.tail_down = tail_down;
	this.shrp = shrp;
	this.flt = flt;
	this.setup(this.tail_up,this.tail_down,this.shrp,this.flt);
}
var p = createjs.extend(Note, createjs.Container);


p.setup = function(tu,td,sh,fl) {
	var head = new createjs.Shape();
	head.graphics.beginFill("black").drawEllipse(0,0,16,11);
	var tailup = new createjs.Shape();
	tailup.graphics.setStrokeStyle(2).beginStroke("black").moveTo(15,5.5).lineTo(15,-30);
	var taildown = new createjs.Shape();
	taildown.graphics.setStrokeStyle(2).beginStroke("black").moveTo(1,7).lineTo(1,35);
	if (tu === false) {
		tailup.alpha = .01;
	}
	
	if (td === false) {
		taildown.alpha = .01;
	}
	
	var sharp = new createjs.Bitmap("sharp.png");
	sharp.x = -15;
	sharp.y = -11;
	
	if (sh === false) {
		sharp.alpha = .01;
	}
	
	var flat = new createjs.Bitmap("flat.png");
	flat.x = -15;
	flat.y = -15;
	
	if (fl === false) {
		flat.alpha = .01;
	}
	
	
	this.addChild(sharp);
	this.addChild(flat);
	this.addChild(head);
	this.addChild(tailup);
	this.addChild(taildown);	
	//this.on("click", this.handleClick);
	this.on("rollover", this.handleRollOver);
	this.on("rollout", this.handleRollOver);
	this.cursor = "pointer";

	this.mouseChildren = false;
			
	//this.offset = Math.random()*10;
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
	this.alpha = event.type == "rollover" ? 0.4 : 1;
};
		
		
window.Note = createjs.promote(Note, "Container");
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
	staff = new createjs.Stage(document.getElementById("staff"));
	pic = new createjs.Bitmap("Violbigside.png");
	pic.regX = pic.image.width * 0.5;
	pic.regY = 200;
	
	bass_pic = new createjs.Bitmap("bassClef.png");
	bass_pic.x = 10;
	bass_pic.y = 20;
	
	alto_pic = new createjs.Bitmap("altoclef.png");
	alto_pic.x = 10;
	alto_pic.y = 150;
	
	stage.addChild(pic);
	staff.addChild(bass_pic);
	staff.addChild(alto_pic);

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
			combos.push([string_lst[string],fret_lst[fret],notes[[strings[string],frets[fret]]]]);
		}
	}
	
	drawline(20,0,1375);
	drawline(32,0,1375);
	drawline(44,0,1375);
	drawline(56,0,1375);
	drawline(68,0,1375);
	drawline(80,70,94);
	drawline(80,120,144);
	drawline(80,170,194);
	drawline(80,220,244);
	
	drawline(150,0,1375);
	drawline(162,0,1375);
	drawline(174,0,1375);
	drawline(186,0,1375);
	drawline(198,0,1375);
	
	for (n = 0; n < 12; n++) {
		x = n * 100 + 74;
		y = -n * 6 + 80;
		
		if (n*2 < 14) {
			note1 = note_lst[n*2];
			note2 = note_lst[n*2+1];
		}
		else {
			note1 = note_lst[n*2-14];
			note2 = note_lst[n*2-13];
		}
		
		if (y > 43) {
			tu = true;
			td = false;
		}
		else {
			tu = false;
			td = true;
		}
		
		if (note1.substring(1,2) === "#") {
			shrp1 = true;
			flt1 = false;
		}
		else if (note1.substring(1,2) === "b"){
			shrp1 = false;
			flt1 = true;
		}
		else {
			shrp1 = false;
			flt1 = false;
		}
		
		if (note2.substring(1,2) === "#") {
			shrp2 = true;
			flt2 = false;
		}	
		else if (note2.substring(1,2) === "b"){
			shrp2 = false;
			flt2 = true;
		}
		else {
			shrp2 = false;
			flt2 = false;
		}
		staff_notes.push(new Note(x,y,tu,td,shrp1,flt1));
		staff_notes.push(new Note(x + 50,y,tu,td,shrp2,flt2));
	}
	
	for (n = 0; n < 7; n++) {
		x = n * 100 + 74;
		y = -n * 6 + 174;
		
		if (n*2 < 4) {
			note1 = note_lst[n*2+10];
			note2 = note_lst[n*2+11];
		}
		else {
			note1 = note_lst[n*2-4];
			note2 = note_lst[n*2-3];
		}
		
		if (y > 173) {
			tu = true;
			td = false;
		}
		else {
			tu = false;
			td = true;
		}

		if (note1.substring(1,2) === "#") {
			shrp1 = true;
			flt1 = false;
		}
		else if (note1.substring(1,2) === "b"){
			shrp1 = false;
			flt1 = true;
		}
		else {
			shrp1 = false;
			flt1 = false;
		}
		
		if (note2.substring(1,2) === "#") {
			shrp2 = true;
			flt2 = false;
		}	
		else if (note2.substring(1,2) === "b"){
			shrp2 = false;
			flt2 = true;
		}
		else {
			shrp2 = false;
			flt2 = false;
		}
		staff_notes.push(new Note(x,y,tu,td,shrp1,flt1));
		staff_notes.push(new Note(x + 50,y,tu,td,shrp2,flt2));
	}
	

	
	for (n = 0; n < staff_notes.length; n++) {
		staff.addChild(staff_notes[n]);
	}
	

	
	
	
	
	

	for (h = 0; h < combos.length; h++) {
		if (double_note[h] === true){
			hotspots[h] = new Hotspot(combos[h][0],combos[h][1],staff_notes[h + skip[h]],staff_notes[h + skip[h]+1],hotspot_pos[h][0],hotspot_pos[h][1]);
		}
		else {
			hotspots[h] = new Hotspot(combos[h][0],combos[h][1],staff_notes[h + skip[h]],staff_notes[h + skip[h]],hotspot_pos[h][0],hotspot_pos[h][1]);
		}
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
		
function drawline (starty,startx,endx) {
	this.starty = starty;
	g = new createjs.Graphics();
	g.setStrokeStyle(2);
	g.beginStroke("black");
	g.moveTo(startx,this.starty);
	g.lineTo(endx,this.starty);
	var s  = new createjs.Shape(g);
	staff.addChild(s);
};
	
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
	staff.update();
};
