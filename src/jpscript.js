var id = 1;
var shownKey = -1;
var totalQ = 0;
var totalG = 0;
var percentGood = 0;
var learnedWords = 0;
var level = 0;
var counter = false;
var goodStrike = 0;
var toAdvanceList = [];
var additionalTime=20;
var flashLearned = []; var flashLearned2 = [];
var letterApp = false;
var dialogue = 0;

document.body.onload = function(){
	document.getElementById("load").style.display = "none";
	document.getElementById("main").style.display = "block";
	var main = document.getElementById("main");
	var left = document.getElementById("left");
	var right = document.getElementById("right");
	
	setTimeout(function(){
		left.style.opacity=1;
		left.style.marginTop="0px";
	});
	let checkExp = 0;
	Object.keys(localStorage).forEach(function(key){
		if(localStorage.getItem(key)[0]=="0"){
			if(key>103000||key==0) addWord(key,1); else addWord(key,2);
			document.getElementById("#"+key).style.marginTop="12px";
			document.getElementById("#"+key).style.transition="margin 2s";
			setTimeout(function(){
				if(document.getElementById("#"+key)){
					document.getElementById("#"+key).style.marginTop="0px";
				}
			}, additionalTime);
			additionalTime += 120;
			if(localStorage.getItem(key).substring(localStorage.getItem(key).indexOf("+"))!="0"){
				setTimeout(function(){
					if(document.getElementById("#"+key)){
						document.getElementById("##"+key).style.width = Number(localStorage.getItem(key).substring(localStorage.getItem(key).indexOf("+"))) + "%";
						if(checkExp==0&&Number(localStorage.getItem(key).substring(localStorage.getItem(key).indexOf("+")))==100) checkExp=1;
					}
				}, additionalTime);
			}
		}else if(localStorage.getItem(key)[0]=="1"){
			learnedWords++;
			if(checkExp==0) checkExp=1;
		}
		if(learnedWords==0&&checkExp==0){ dialogue=19; }
		else if(learnedWords<20&&checkExp==1){ dialogue=23; }
		else if(learnedWords>=20){ dialogue=29; }
	});
	
	if(id==1&&!localStorage.getItem(0)&&learnedWords==0&&dialogue==0){
		addWord(0,1);
		nextDialogue();
	}
	
	if(learnedWords>0) learnedList();
}

function nextDialogue(choosing){
	if(letterApp!=false){
		clearInterval(letterApp);
		letterApp=false;
		let letters = document.getElementsByClassName("letter");
		if(letters&&letters.length>0){
			for(let i=0;i<letters.length;i++){
				if(letters.item(i).style.opacity==0){
					letters.item(i).style.opacity=1;
					letters.item(i).style.marginTop="0px";
				}
			}
		}
	}else if(dialogue==0){
		blackIn();
		hidePose("creepy");
		setTimeout(function(){ if(dialogue==1){ document.getElementById("pose").style.opacity=1; document.getElementById("pose").style.marginLeft="0px"; document.getElementById("pose").style.transition="opacity 1s, margin 1s"; } ; },1000); 
		addText("Hey there. Welcome to my little web application project! I'm Kosma and I'll be your guide tour around this place.");
		dialogue=1;
		setTimeout(function(){
			if(dialogue==1) addText("... (press anywhere to continue)","no");
		},9000);
	}else if(dialogue==1){
		hidePose("you");
		setTimeout(function(){ if(dialogue==2){  document.getElementById("pose").style.opacity=1; document.getElementById("pose").style.marginLeft="0px"; document.getElementById("pose").style.transition="opacity 1s, margin 1s";} ; },20); 
		addText("First of all, I need to ask you an important question. Have you ever learned japanese before? Are you completely familiar with hiragana and katakana?");
		document.getElementById("optionsDialogue").style.display = "block";
		document.getElementById("optionsDialogue").style.pointerEvents = "auto";
		document.getElementById("yesOption").value="Sure!";
		document.getElementById("noOption").value="Not really";
		setTimeout(function(){
			document.getElementById("optionsDialogue").style.opacity = 1;
			document.getElementById("optionsDialogue").style.marginTop = "65vh";
		},20);
		dialogue=2;
	}else if(dialogue==2&&choosing=="yes"){
		document.getElementById("optionsDialogue").style.pointerEvents = "none";
		document.getElementById("optionsDialogue").style.opacity = 0;
		document.getElementById("optionsDialogue").style.marginTop = "76vh";
		setTimeout(function(){
			document.getElementById("optionsDialogue").style.display = "none";
		},1500);
		hidePose("embarassing");
		setTimeout(function(){ if(dialogue==3){ document.getElementById("pose").style.opacity=1; document.getElementById("pose").style.marginLeft="0px"; document.getElementById("pose").style.transition="opacity 1s, margin 1s";} ; },20); 
		addText("Oh really? I'm really glad to hear that! That means we can jump right into the fun part of learning, kanji.");
		dialogue=3;
	}else if(dialogue==2&&choosing=="no"){
		document.getElementById("optionsDialogue").style.pointerEvents = "none";
		document.getElementById("optionsDialogue").style.opacity = 0;
		document.getElementById("optionsDialogue").style.marginTop = "76vh";
		setTimeout(function(){
			document.getElementById("yesOption").value="Hiragana";
			document.getElementById("noOption").value="Katakana";
			document.getElementById("optionsDialogue").style.opacity = 1;
			document.getElementById("optionsDialogue").style.marginTop = "65vh";
			document.getElementById("optionsDialogue").style.pointerEvents = "auto";
			dialogue=3;
		},1500);
		hidePose("sumup");
		setTimeout(function(){ if(dialogue==2&&choosing=="no"||dialogue==3){ document.getElementById("pose").style.opacity=1; document.getElementById("pose").style.marginLeft="0px"; document.getElementById("pose").style.transition="opacity 1s, margin 1s";} ; },20); 
		addText("You see, I'm concentrating on teaching kanji on here, but no worries! Try one or both of these websites to learn the basics, that's where I started actually. When you'll feel confident enough, please come by!");
	}else if(dialogue==3&&choosing=="yes"){ window.open("https://hiragana.training/");
	}else if(dialogue==3&&choosing=="no"){ window.open("https://kana.pro/");
	}else if(dialogue==3){
		if(document.getElementById("optionsDialogue").style.display != "none"){
			document.getElementById("optionsDialogue").style.pointerEvents = "none";
			document.getElementById("optionsDialogue").style.opacity = 0;
			document.getElementById("optionsDialogue").style.marginTop = "76vh";
			dialogue=4;
			setTimeout(function(){
				document.getElementById("optionsDialogue").style.display = "none";
			},1500);
		}else{ dialogue=4;}
		hidePose("here");
		setTimeout(function(){ if(dialogue==3||dialogue==4){ document.getElementById("pose").style.opacity=1; document.getElementById("pose").style.marginLeft="0px"; document.getElementById("pose").style.transition="opacity 1s, margin 1s";} ; },20); 
		addText("For starters, I'd like you to click on the [sentence translation] button and see what happens!");
	}else if(dialogue==4){
		leftPanelBreak("none");
		dialogue=5;
		blackOut();
	}else if(dialogue==6){
		blackIn();
		hidePose("sumup");
		setTimeout(function(){ if(dialogue==7){ document.getElementById("pose").style.opacity=1; document.getElementById("pose").style.marginLeft="0px"; document.getElementById("pose").style.transition="opacity 1s, margin 1s";} ; },1000); 
		addText("What you see here is a template for a word or sentence. It's just an example, so let's get crazy and try to learn an actual word! Try pressing the [random word] button.");
		dialogue=7;
	}else if(dialogue==7){
		document.getElementById("randomWord").style.pointerEvents = "auto";
		blackOut();
		dialogue=8;
	}else if(dialogue==9){
		blackIn();
		document.getElementById("randomWord").style.pointerEvents = "none";
		hidePose("here");
		setTimeout(function(){ if(dialogue==10){ document.getElementById("pose").style.opacity=1; document.getElementById("pose").style.marginLeft="0px"; document.getElementById("pose").style.transition="opacity 1s, margin 1s";} ; },20); 
		addText("There we go! Here's everything you need to know about this kanji. Just keep in mind that the pronunciation can vary depending on the context of the word usage, so the one in the brackets is not always the proper one. But that's something to start from!");
		dialogue=10;
	}else if(dialogue==10){
		hidePose("you");
		setTimeout(function(){ if(dialogue==11){ document.getElementById("pose").style.opacity=1; document.getElementById("pose").style.marginLeft="0px"; document.getElementById("pose").style.transition="opacity 1s, margin 1s";} ; },20); 
		addText("If you end up drawing an unappealing word that you wouldn't want to learn right away, you can just delete it and try to get a better one. Click on a word of your choosing and try deleting it!");
		dialogue=11;
	}else if(dialogue==11){
		document.getElementById("deleteWord").style.pointerEvents = "auto";
		blackOut();
		dialogue=12;
	}else if(dialogue==13){
		blackIn();
		hidePose("creepy");
		setTimeout(function(){ if(dialogue==14){ document.getElementById("pose").style.opacity=1; document.getElementById("pose").style.marginLeft="0px"; document.getElementById("pose").style.transition="opacity 1s, margin 1s";} ; },1000); 
		addText("Splendid. I'll let you free for a while, we'll get in touch as soon as you add 10 different words and/or sentences.");
		dialogue=14;
	}else if(dialogue==14){
		leftPanelBreak("auto");
		blackOut();
		dialogue=15;
	}else if(dialogue==16){
		blackIn();
		hidePose("embarassing");
		setTimeout(function(){ if(dialogue==17){ document.getElementById("pose").style.opacity=1; document.getElementById("pose").style.marginLeft="0px"; document.getElementById("pose").style.transition="opacity 1s, margin 1s";} ; },20); 
		addText("Oh, what's that? The [take a test] button turned green! Take your time, memorize all of the words and when you're ready, take the test!");
		dialogue=17;
	}else if(dialogue==17){
		hidePose("you");
		setTimeout(function(){ if(dialogue==18){ document.getElementById("pose").style.opacity=1; document.getElementById("pose").style.marginLeft="0px"; document.getElementById("pose").style.transition="opacity 1s, margin 1s";} ; },20); 
		addText("It consists of 3 levels. After beating each of those, your words and sentences will receive a certain amount of EXP. Good luck!");
		dialogue=18;
	}else if(dialogue==18){
		blackOut();
		dialogue=19;
	}else if(dialogue==20){
		blackIn();
		hidePose("yare");
		setTimeout(function(){ if(dialogue==21){ document.getElementById("pose").style.opacity=1; document.getElementById("pose").style.marginLeft="0px"; document.getElementById("pose").style.transition="opacity 1s, margin 1s";} ; },20); 
		addText("Yare yare daze... One of your words just got 100% of EXP. Not bad. After clicking on it you'll be able to press the [learned!] button, which adds the word/sentence to the [learned list]. Check it out!");
		dialogue=21;
	}else if(dialogue==21){
		hidePose("sumup");
		setTimeout(function(){ if(dialogue==22){ document.getElementById("pose").style.opacity=1; document.getElementById("pose").style.marginLeft="0px"; document.getElementById("pose").style.transition="opacity 1s, margin 1s";} ; },20); 
		addText("Learning 20 different words/sentences is next on the list. Can you do that? Of course you can, twinkle-toes. Don't you make me wait for too long!");
		dialogue=22;
	}else if(dialogue==22){
		blackOut();
		dialogue=23;
	}else if(dialogue==24){
		blackIn();
		hidePose("embarassing");
		setTimeout(function(){ if(dialogue==25){ document.getElementById("pose").style.opacity=1; document.getElementById("pose").style.marginLeft="0px"; document.getElementById("pose").style.transition="opacity 1s, margin 1s";} ; },20); 
		addText("Hey, you made it, 20 words/sentences! I'm so happy and excited you're making such progress so fast. I'm really proud of you!");
		dialogue=25;
	}else if(dialogue==25){
		hidePose("sumup");
		setTimeout(function(){ if(dialogue==26){ document.getElementById("pose").style.opacity=1; document.getElementById("pose").style.marginLeft="0px"; document.getElementById("pose").style.transition="opacity 1s, margin 1s";} ; },20); 
		addText("I know you might feel uncertain about some words you've learned already, that's why i got you a [memory check] button on your learned list.");
		dialogue=26;
	}else if(dialogue==26){
		hidePose("you");
		setTimeout(function(){ if(dialogue==27){ document.getElementById("pose").style.opacity=1; document.getElementById("pose").style.marginLeft="0px"; document.getElementById("pose").style.transition="opacity 1s, margin 1s";} ; },20); 
		addText("You really should check it out, I insist! It's an easy way to fast-check your memory with a nice and clear post result.");
		dialogue=27;
	}else if(dialogue==27){
		hidePose("here");
		setTimeout(function(){ if(dialogue==28){ document.getElementById("pose").style.opacity=1; document.getElementById("pose").style.marginLeft="0px"; document.getElementById("pose").style.transition="opacity 1s, margin 1s";} ; },20); 
		addText("So, I believe that's it for now. I hope you're having fun so far! Stay motivated and see you around!");
		dialogue=28;
	}else if(dialogue==28){
		blackOut();
		dialogue=29;
	}
}

function leftPanelBreak(choosing){
	document.getElementById("bTest").style.pointerEvents = choosing;
	document.getElementById("learnWord").style.pointerEvents = choosing;
	document.getElementById("deleteWord").style.pointerEvents = choosing;
	document.getElementById("randomWord").style.pointerEvents = choosing;
	document.getElementById("newSentence").style.pointerEvents = choosing;
	document.getElementById("learnedList").style.pointerEvents = choosing;
}

function blackIn(){
	main.style.pointerEvents="none";
	document.getElementById("blackBack").style.display="block";
	document.getElementById("dialogueBox").style.display="block";
	document.getElementById("poseBox").style.display="block";
	setTimeout(function(){
		document.getElementById("blackBack").style.opacity=1;
		document.getElementById("dialogueBox").style.opacity=1;
		document.getElementById("poseBox").style.opacity=1;
		document.getElementById("dialogueBox").style.marginTop="75vh";
	},20);
}

function blackOut(){
	setTimeout(function(){
		document.getElementById("blackBack").style.opacity=0;
		document.getElementById("dialogueBox").style.opacity=0;
		document.getElementById("poseBox").style.opacity=0;
		document.getElementById("dialogueBox").style.marginTop="100vh";
	},20);
	setTimeout(function(){
		main.style.pointerEvents="auto";
		document.getElementById("blackBack").style.display="none";
		document.getElementById("dialogueBox").style.display="none";
		document.getElementById("poseBox").style.display="none";
	}, 820);
	
}

function hidePose(pose){
	document.getElementById("pose").style.transition="none";
	document.getElementById("pose").style.marginLeft="20px";
	document.getElementById("pose").style.opacity=0;
	document.getElementById("pose").src = "poses/"+pose+".png";
}

function addText(addingText,clearing){
	if(document.getElementById("dialogueText")&&clearing!="no") document.getElementById("dialogueText").innerHTML="";
	document.getElementById("dialogueText").innerHTML += "<span class='word' style='position:relative;float:left;'></span>";
	for(let i=0;i<addingText.length;i++){
		let addingSpace = "";
		let allWords = document.getElementsByClassName("word");
		if(addingText[i]==" ") addingSpace = "width:7px;height:28px";
		if(document.getElementById("dialogueText")) allWords.item(allWords.length-1).innerHTML += "<span class='letter' style='position:relative;float:left;opacity:0;margin-top:-10px;"+addingSpace+";transition:opacity 0.3s, margin 0.3s;'>"+addingText[i]+"</span>";
		if(addingText[i]==" ") document.getElementById("dialogueText").innerHTML += "<span class='word' style='position:relative;float:left;'></span>";
	}
	if(letterApp==false) letterApp = setInterval(letterAppear, 20);
}

function letterAppear(){
	clearInterval(letterApp);
	letterApp=false;
	let letters = document.getElementsByClassName("letter");
	if(letters&&letters.length>0){
		for(let i=0;i<letters.length;i++){
			if(letters.item(i).style.opacity==0){
				letters.item(i).style.opacity=1;
				letters.item(i).style.marginTop="0px";
				i=letters.length;
				letterApp = setInterval(letterAppear, 20);
			}
		}
	}
}

function newWord(){
	left.style.pointerEvents = "none";
	let rand = 100000 + Math.floor(Math.random()*2953);
	let wordsAv = 0;
	while( ( dic2.indexOf("<ent_seq>"+rand+"</ent_seq>")==-1 || localStorage.getItem(rand) ) && wordsAv!=3){
		rand++;
		if(rand>102952){
			if(wordsAv==0){
				rand = 100000 + Math.floor(Math.random()*2952);
				wordsAv=1;
			}else if(wordsAv==1){
				rand = 100000;
				wordsAv=2;
			}else if(wordsAv==2){
				wordsAv=3;
				alert("No more words to learn. You're breathtaking!");
			}
		}
	}
	if(wordsAv!=3){
		addWord(rand,2);
		showWord(rand);
	}
	left.style.pointerEvents = "auto";
	if(dialogue==8){ dialogue=9; nextDialogue(); }
}

function newSentence(){
	left.style.pointerEvents = "none";
	let rand = 1000000 + Math.floor(Math.random()*1841310);
	let allowSentence = true;
	let wordsAv = 0;
	while( ( dic.indexOf("<ent_seq>"+rand+"</ent_seq>")==-1 || localStorage.getItem(rand) || allowSentence ) && wordsAv!=3 ){
		rand++;
		if(rand>2841309){
			if(wordsAv==0){
				rand = 1000000 + Math.floor(Math.random()*1841309);
				wordsAv = 1;
			}else if(wordsAv==1){
				rand = 1000000;
				wordsAv = 2;
			}else if(wordsAv==2){
				wordsAv=3;
				alert("No more sentences to learn. You're breathtaking!");
			}
		}
		if(wordsAv!=3){
			let ptS = dic.indexOf("<ent_seq>"+rand+"</ent_seq>");
			let ptE = dic.indexOf("</entry>", ptS);
			if(dic.substring(ptS, ptE).includes("<keb>")){
				if(dic.substring(ptS+dic.substring(ptS, ptE).indexOf("<keb>")+5, ptS+dic.substring(ptS, ptE).indexOf("</keb>")).length != 1){
					allowSentence = false;
				}
			}else{ allowSentence = false; }
		}
	}
	if(wordsAv!=3){
		addWord(rand,1);
		showWord(rand);
	}
	left.style.pointerEvents = "auto";
}

function addWord(rand,n){
	let entry = ""; let pointStart = ""; let pointEnd = "";
	if(n==1){
		pointStart = dic.indexOf("<ent_seq>"+rand+"</ent_seq>");
		pointEnd = dic.indexOf("</entry>", pointStart);
		entry = dic.substring(pointStart, pointEnd);
	}else if(n==2){
		pointStart = dic2.indexOf("<ent_seq>"+rand+"</ent_seq>");
		pointEnd = dic2.indexOf("</entry>", pointStart);
		entry = dic2.substring(pointStart, pointEnd);
	}
	let rText = entry.substring(entry.indexOf("<reb>")+5, entry.indexOf("</reb>"));
	let wText = []; let tText = [];
	pointEnd = 0;
	while(entry.indexOf("<keb>", pointEnd)!=-1){
		pointStart = entry.indexOf("<keb>", pointEnd)+5;
		pointEnd = entry.indexOf("</keb>", pointStart);
		wText.push(entry.substring(pointStart, pointEnd));
	}
	pointEnd = 0;
	while(entry.indexOf("<gloss>", pointEnd)!=-1){
		pointStart = entry.indexOf("<gloss>", pointEnd)+7;
		pointEnd = entry.indexOf("</gloss>", pointStart);
		tText.push(entry.substring(pointStart, pointEnd));
	}
	if(!localStorage.getItem(rand)){ localStorage.setItem(rand, "0"+rText+";"+wText.join(" | ")+"*"+tText.join("<br>")+"+0") };
	let posText = tText[0];
	if(posText.indexOf("(")!=-1){
		if(posText[0]=="("){ posText = posText.substring(posText.indexOf(")")+1, posText.length); }
		else{ posText = posText.substring(0, posText.indexOf("(")); }
	}
	if(posText.indexOf(",")!=-1) posText = posText.substring(0, posText.indexOf(",")) + " [...]";
	if(posText.indexOf(" ",posText.indexOf(" ")+1)!=-1) posText = posText.substring(0, posText.indexOf(" ",posText.indexOf(" ")+1)) + " [...]";
	left.innerHTML+="<p id='#"+rand+"' style='width:100%; overflow:hidden; font-size:14px; margin:0; margin-bottom: 3px;margin-left:0.5%; height: 18px; background-color:rgba(143, 162, 174, 0.5); border-radius:7px;position:relative;float:left;' onclick='showWord("+rand+")' ><span id='#"+rand+"' style='width:0%;height:100%;border-radius:7px;background-color:#4A8453;position:absolute;z-index:-1;transition: width 2s ease;'></span><span id='##"+rand+"' style='width:0%;height:100%;border-radius:7px;background-color:#4A8453;position:absolute;z-index:-1;transition: width 2s ease, background-color 0.4s ease-in;'></span><span style='width:97%;margin-left:3%;'>"+posText+"</span></p>";
	id++;
	if(id==11) setTimeout(function(){document.getElementById("bTest").style.backgroundColor = "#82B089";}, 20);
	if( dialogue==15 && ((id==11&&!localStorage.getItem(0)) || (id==12&&localStorage.getItem(0))) ){ dialogue=16; nextDialogue(); }
}

function deleteWordClick(){
	if(shownKey!=-1) deleteWord(shownKey);
}

function deleteWord(rand){
	document.getElementById('#'+rand).remove();
	if(localStorage.getItem(rand)&&localStorage.getItem(rand)[0]=="0") localStorage.removeItem(rand);
	id--;
	if(shownKey!=-1){
			document.getElementById("learnWord").style.backgroundColor="#BFBFBF";
			document.getElementById("deleteWord").style.backgroundColor="#BFBFBF";
	}
	if(shownKey == rand){ right.style.opacity = 0; shownKey = -1; }
	if(id==10) setTimeout(function(){document.getElementById("bTest").style.backgroundColor = "#CD9797";});
	if(dialogue==12){ dialogue=13; nextDialogue(); }
}

function rightRefresh(){
	if(counter!=false){
		clearInterval(counter);
		counter = false;
	}
	right.style.transition="margin-top 0s, opacity 0s";
	right.style.opacity=0;
	right.style.marginTop="30px";
	setTimeout(function(){
		right.style.transition="margin-top 2s, opacity 2s";
		right.style.opacity=1;
		right.style.marginTop="0px";
	}, 20);
}

function showWord(key){
	if(localStorage.getItem(key)){
		let txt = localStorage.getItem(key);
		if(txt.indexOf("*")==txt.indexOf(";")+1){
			right.innerHTML = "<p style='font-size:70px;color:#F0EDFA;'>"+txt.substring(1,txt.indexOf(";"))+"</p>";
		}else{
			right.innerHTML = "<p style='font-size:20px;'>( "+txt.substring(1,txt.indexOf(";"))+" )</p>";
			if(txt.substring(1,txt.indexOf("*")).indexOf(" | ")==-1){ 
				right.innerHTML += "<p style='font-size:"+(120-txt.substring(txt.indexOf(";")+1,txt.indexOf("*")).length*5)+"px;color:#F0EDFA;'>"+txt.substring(txt.indexOf(";")+1,txt.indexOf("*"))+"</p>";
			}else{
				right.innerHTML += "<p style='font-size:"+(120-txt.substring(txt.indexOf(";")+1,txt.indexOf(" | ")).length*5)+"px;color:#F0EDFA;'>"+txt.substring(txt.indexOf(";")+1,txt.indexOf(" | "))+"</p>";
				right.innerHTML += "<p style='font-size:30px;color:#F0EDFA'>"+txt.substring(txt.indexOf(" | ")+3,txt.indexOf("*"))+"</p>";
			}
		}
		
		shownKey = key;
		if(txt.substring(txt.indexOf("+")+1)=="100"){
			document.getElementById("learnWord").style.backgroundColor="#82B089";
		}else{
			document.getElementById("learnWord").style.backgroundColor="#BFBFBF";
		}
		document.getElementById("deleteWord").style.backgroundColor="#CD9797";
		right.innerHTML += "<p style='font-size: 25px'>"+txt.substring(txt.indexOf("*")+1, txt.indexOf("+"))+"</p>";
		rightRefresh();
		if(dialogue==5){ dialogue=6; nextDialogue(); }
	}else{
		deleteWord(key);
	}
}

function takeTest(){
	if(localStorage.getItem(0)&&id>10){ deleteWord(0); }
	if(id<11){ alert(id-1+"/10 sentences, "+(10-id+1)+" missing.");
	}else{
		level = 1;
		left.style.pointerEvents="none";
		document.getElementById("learnWord").style.backgroundColor="#BFBFBF";
		document.getElementById("deleteWord").style.backgroundColor="#BFBFBF";
		shownKey = -1;
		left.style.opacity=0.2;
		toAdvanceList = []
		Object.keys(localStorage).forEach(function(key){
			toAdvanceList.push([key, 0, 0]);
		});
		nextLevel();
	}
}

function randomQuestion(type, howMany){
	if(totalQ == 0) percentGood = ""; else percentGood = Math.floor(totalG/totalQ*100) + "%";
	right.innerHTML = "<p id='score' style='width:100%; position:absolute; text-align:right; font-size:16px; opacity:0.3; margin-top:10px' >score<br>"+totalG+" / "+totalQ+"<br>"+percentGood+"</p>";
	let correct = Math.floor(Math.random()*(Number(howMany)+1));
	let zKeys = [];
	Object.keys(localStorage).forEach(function(key){
		if(localStorage.getItem(key)[0]==type) zKeys.push(key);
	});
	let number = zKeys[Math.floor(Math.random()*zKeys.length)];
	let txt = localStorage.getItem(number);
	let sentence = "";
	let qType = Math.floor(Math.random()*2);
	if((level!=3 && type==0) || (type==1 && qType==0)){
		if(txt.indexOf("*")==txt.indexOf(";")+1){ sentence = txt.substring(1,txt.indexOf(";")); }
		else if(txt.substring(1,txt.indexOf("*")).indexOf(" | ")==-1){ sentence = txt.substring(txt.indexOf(";")+1,txt.indexOf("*")); }
		else{ sentence = txt.substring(txt.indexOf(";")+1,txt.indexOf(" | ")); }
	}else{
		if(txt.indexOf("<br>")==-1){ sentence = txt.substring(txt.indexOf("*")+1,txt.indexOf("+")); }
		else{ sentence = txt.substring(txt.indexOf("*")+1,txt.indexOf("<br>")); }
	}
	if((level!=3 && type==0) || (type==1 && qType==0)){ right.innerHTML += "<p style='font-size:70px'>"+sentence+"</p>";
	}else{ right.innerHTML += "<p style='font-size:30px;margin-top:10px;'>"+sentence+"</p>"; }
	
	if(level==1 && type==0){
		right.innerHTML += "<p id='translation' style='margin-top:-15px; font-size:20px; opacity:0; transition: opacity 3s'></p><p id='question' style='font-size:25px'>Which pronunciation is correct?</p><div id='testDiv' style='width:90%;height:110px;margin-left:5%;margin-bottom:5px;margin-top:12px;'></div>";
		for(let i=0;i<2;i++){
			for(let j=0;j<2;j++){
			let entry = ""; let pointStart = "";
				if(i*2+j==correct){
					document.getElementById("testDiv").innerHTML += "<input id='goodAnsw' type='submit' onclick='goodAnswer("+number+",0)' value='"+ txt.substring(1,txt.indexOf(";")) +"' style='width:50%;height:50px;outline:none;color:white;text-align:center;font-size:35px;background-color:#8FA2AE;border-radius:10px;position:relative;float:left;opacity:0.8; transition:background-color 2s'>";
					if(txt.indexOf("<br>")==-1){ document.getElementById("translation").innerHTML = "( " + txt.substring(txt.indexOf("*")+1,txt.indexOf("+")) + " )"; }
					else{ document.getElementById("translation").innerHTML = "( " + txt.substring(txt.indexOf("*")+1,txt.indexOf("<br>")) + " )"; }
				}else{
					if(number>103000){
						let rand = 1000000 + Math.floor(Math.random()*1841309);
						while(dic.indexOf("<ent_seq>"+rand+"</ent_seq>")==-1||rand==number){
							rand++;
							if(rand>2841309) rand = 1000000 + Math.floor(Math.random()*1841309);
						}
						pointStart = dic.indexOf("<ent_seq>"+rand+"</ent_seq>");
						entry = dic.substring(pointStart,dic.indexOf("</entry>", pointStart));
					}else{
						let rand = 100000 + Math.floor(Math.random()*2953);
						while(dic2.indexOf("<ent_seq>"+rand+"</ent_seq>")==-1||rand==number){
							rand++;
							if(rand>102952) rand = 100000 + Math.floor(Math.random()*2953);
						}
						pointStart = dic2.indexOf("<ent_seq>"+rand+"</ent_seq>");
						entry = dic2.substring(pointStart,dic2.indexOf("</entry>", pointStart));
					}
					if(entry.indexOf("<reb>")==-1 || entry.substring(entry.indexOf("<reb>")+5, entry.indexOf("</reb>"))==txt.substring(1,txt.indexOf(";"))){ j--; }
					else{ document.getElementById("testDiv").innerHTML += "<input class='badAnsw' type='submit' onclick='badAnswer("+number+",0)' value='"+ entry.substring(entry.indexOf("<reb>")+5, entry.indexOf("</reb>")) +"' style='width:50%;height:50px;outline:none;color:white;text-align:center;font-size:35px;background-color:#8FA2AE;border-radius:10px;position:relative;float:left;opacity:0.8; transition:background-color 2s'>"; }
				}
			}
		}
	}else if( ( (level==2||level==3)&&type==0 ) || type==1 ){
		right.innerHTML += "<p id='question' style='font-size:25px'>Which translation is correct?</p><div id='testDiv' style='width:90%;height:110px;margin-left:5%;margin-bottom:5px;margin-top:12px;'></div>";
		let wrongAnswers = [];
		let numbers = [number];
		let traPos = "";
		for(let i=0;i<Number(howMany);i++){
			let tempNumber = zKeys[Math.floor(Math.random()*zKeys.length)];
			while(numbers.includes(tempNumber)){
				tempNumber = zKeys[Math.floor(Math.random()*zKeys.length)];
			}
			numbers.push(tempNumber);
			let tempTxt = localStorage.getItem(tempNumber);
			
			if((level==2 && type==0) || (type==1 && qType==0)){
				if(tempTxt.indexOf("<br>")==-1) traPos = tempTxt.indexOf("+"); else traPos = tempTxt.indexOf("<br>");
				wrongAnswers.push(tempTxt.substring(tempTxt.indexOf("*")+1, traPos));
			}else if((level==3 && type==0) || (type==1 && qType==1)){
				if(tempTxt.indexOf(";")+1==tempTxt.indexOf("*")){ wrongAnswers.push(tempTxt.substring(1,tempTxt.indexOf(";")));
				}else if(tempTxt.indexOf(" | ")!=-1){ wrongAnswers.push(tempTxt.substring(tempTxt.indexOf(";")+1, tempTxt.indexOf(" | ")));
				}else{ wrongAnswers.push(tempTxt.substring(tempTxt.indexOf(";")+1, tempTxt.indexOf("*"))); }
			}
			
		}
		
		for(let i=0;i<(2+Number(type)*2);i++){
			for(let j=0;j<2;j++){
				if(i*2+j==correct){
					if(((level==2 && type==0) || (type==1 && qType==0)) && txt.indexOf("<br>")==-1) traPos = txt.indexOf("+"); else traPos = txt.indexOf("<br>");
					if((level==2 && type==0) || (type==1 && qType==0)){
						document.getElementById("testDiv").innerHTML += "<input id='goodAnsw' type='submit' onclick='goodAnswer("+number+","+type+")' value=\""+ txt.substring(txt.indexOf("*")+1, traPos) +"\" style='width:50%;height:50px;outline:none;color:white;text-align:center;font-size:18px;background-color:#8FA2AE;border-radius:10px;position:relative;float:left;opacity:0.8; transition:background-color 2s'>";
					}else if((level==3 && type==0) || (type==1 && qType==1)){
						if(txt.indexOf(";")+1==txt.indexOf("*")){ traPos = txt.substring(1,txt.indexOf(";"));
						}else if(txt.indexOf(" | ")!=-1){ traPos = txt.substring(txt.indexOf(";")+1, txt.indexOf(" | "));
						}else{ traPos = txt.substring(txt.indexOf(";")+1, txt.indexOf("*")); }
						document.getElementById("testDiv").innerHTML += "<input id='goodAnsw' type='submit' onclick='goodAnswer("+number+","+type+")' value=\""+ traPos +"\" style='width:50%;height:50px;outline:none;color:white;text-align:center;font-size:35px;background-color:#8FA2AE;border-radius:10px;position:relative;float:left;opacity:0.8; transition:background-color 2s'>";
					}
				}else{
					if((level==2 && type==0) || (type==1 && qType==0)){ document.getElementById("testDiv").innerHTML += "<input class='badAnsw' type='submit' onclick='badAnswer("+number+","+type+")' value=\""+ wrongAnswers.pop() +"\" style='width:50%;height:50px;outline:none;color:white;text-align:center;font-size:18px;background-color:#8FA2AE;border-radius:10px;position:relative;float:left;opacity:0.8; transition:background-color 2s'>"; }
					else if((level==3 && type==0) || (type==1 && qType==1)){ document.getElementById("testDiv").innerHTML += "<input class='badAnsw' type='submit' onclick='badAnswer("+number+","+type+")' value=\""+ wrongAnswers.pop() +"\" style='width:50%;height:50px;outline:none;color:white;text-align:center;font-size:35px;background-color:#8FA2AE;border-radius:10px;position:relative;float:left;opacity:0.8; transition:background-color 2s'>"; }
				}
			}
		}
	}
	if(type==0){
		let plusExp = goodStrike*5;
		if(level == 1 ) plusExp *= 2;
		if(level == 2 ) plusExp = Math.ceil(plusExp*(1+(1/3)));
		right.innerHTML += "<div style='width:82%; height:30px; margin-left:9%; border-radius:15px; background-color:#8FA2AE; overflow:hidden'><div id='progress' style='width:"+plusExp+"%; height:100%; border-radius:15px; background-color:#4A8453; transition: width 1s ease;'></div></div>";
	}
	rightRefresh();
}

function anyAnswer(type){
	let plusExp = goodStrike*5;
	if(type==0){
		if(level == 1 ) plusExp *= 2;
		if(level == 2 ) plusExp = Math.ceil(plusExp*(1+(1/3)));
		setTimeout(function(){ document.getElementById("progress").style.width = plusExp + "%"; }, 20);
	}else{
		document.getElementById("reply").style.marginTop = "5px";
	}
	setTimeout(function(){ document.getElementById("goodAnsw").style.backgroundColor = "#82B089"; }, 20);
	totalQ++;
	document.getElementById("score").innerHTML = "score<br>"+totalG+" / "+totalQ+"<br>"+Math.floor(totalG/totalQ*100)+"%";
	for(let i=0;i<(type*4+3);i++){
		setTimeout(function(){ document.getElementsByClassName("badAnsw")[i].style.backgroundColor = "#CD9797"; }, 100);
	};
	setTimeout(function(){ document.getElementById("reply").style.opacity = 0.7; }, 200);
	document.getElementById("testDiv").style.pointerEvents = "none";
	if(document.getElementById("question").innerHTML.includes("pronunciation")) setTimeout(function(){ document.getElementById("translation").style.opacity=1; }, 100);
	if(type == 1){
		document.getElementById("testDiv2").innerHTML += "<input  type='submit' value='next question' onclick='randomQuestion(1,7)' style='width:31%; margin-left:29.75%; outline:none; color:white; text-align:center; font-size: 20px; background-color:#8FA2AE; border-radius:15px 0px 0px 15px;position:relative;float:left;'>";
		document.getElementById("testDiv2").innerHTML += "<input  type='submit' value='end' onclick='memoryRecap()' style='width:9%; margin-left:0.5%; outline:none; color:white; text-align:center; font-size: 20px; background-color:#82B089; border-radius:0px 15px 15px 0px;position:relative;float:left;opacity:0.5'>";
	}else if( (goodStrike==15&&level==2) || (goodStrike==10&&level==1) ){
		goodStrike=0;
		level++;
		document.getElementById("testDiv2").innerHTML += "<input  type='submit' value='next level' onclick='nextLevel()' style='width:40%; margin-left:30%; outline:none; color:white; text-align:center; font-size: 20px; background-color:#8FA2AE; border-radius:15px;position:relative;float:left;'>";
	}else if(goodStrike==20&&level==3){
		goodStrike=0;
		level=0;
		document.getElementById("testDiv2").innerHTML += "<input  type='submit' value='end test' onclick='endTest(1)' style='width:40%; margin-left:30%; outline:none; color:white; text-align:center; font-size: 20px; background-color:#82B089; border-radius:15px;position:relative;float:left;'>";
	}else{
		document.getElementById("testDiv2").innerHTML += "<input  type='submit' value='next question' onclick='randomQuestion(0,3)' style='width:31%; margin-left:29.75%; outline:none; color:white; text-align:center; font-size: 20px; background-color:#8FA2AE; border-radius:15px 0px 0px 15px;position:relative;float:left;'>";
		document.getElementById("testDiv2").innerHTML += "<input  type='submit' value='end' onclick='endTest(0)' style='width:9%; margin-left:0.5%; outline:none; color:white; text-align:center; font-size: 20px; background-color:#8FA2AE; border-radius:0px 15px 15px 0px;position:relative;float:left;opacity:0.5'>";
	}
	setTimeout(function(){ document.getElementById("testDiv2").style.opacity = 0.8; }, 200);
}

function goodAnswer(key, type){
	goodStrike++;
	for(let i=0;i<toAdvanceList.length;i++){
		if(toAdvanceList[i][0]==key) toAdvanceList[i][1]++;
	}
	let reply = ["Correct", "Very good", "Not bad", "Excellent", "Great", "Doing good", "Nice", "Amazing", "Astonishing"];
	right.innerHTML += "<p id='reply' style='padding:3px; color:white; width:80%; margin-left:10%; margin-bottom:10px; border-radius:15px; font-size:25px; font-weight:bold; background-color:#82B089; position:relative;float:left; opacity:0;transition:opacity 2s'>"+reply[Math.floor(reply.length*Math.random())]+"</p>"
	right.style.marginTop="-10px";
	right.innerHTML += "<div id='testDiv2' style='width:100%; opacity:0; transition: opacity 2s;'></div>";
	totalG++;
	anyAnswer(type);
}

function badAnswer(key,type){
	if(goodStrike>0) goodStrike--;
	for(let i=0;i<toAdvanceList.length;i++){
		if(toAdvanceList[i][0]==key) toAdvanceList[i][2]++;
	}
	let reply = ["Oops", "Almost", "Try again", "You can do it", "I believe in you", "Mistakes are the path for knowledge", "Next time for sure", "Aww man"];
	let marginReply = "";
	right.innerHTML += "<p id='reply' style='padding:3px; color:white; width:80%; margin-left:10%; margin-bottom:10px; border-radius:15px; font-size:25px; font-weight:bold; background-color:#CD9797; position:relative;float:left; opacity:0;transition:opacity 2s'>"+reply[Math.floor(reply.length*Math.random())]+"</p>"
	right.style.marginTop="15px";
	right.innerHTML += "<div id='testDiv2' style='width:100%; opacity:0; transition: opacity 2s;'></div>";
	anyAnswer(type); 
}

function endTest(how){
	if(how=="1"){
		for(let i=0;i<toAdvanceList.length;i++){
			let newExp = Math.floor(toAdvanceList[i][1]/totalG * 250);
			let oldExp = Number(localStorage.getItem(toAdvanceList[i][0]).substring(localStorage.getItem(toAdvanceList[i][0]).indexOf("+")+1));
			if(newExp > 0 && oldExp !=100){
				if(oldExp + newExp >=100) newExp = 100; else newExp = newExp + oldExp;
				localStorage.setItem(toAdvanceList[i][0], localStorage.getItem(toAdvanceList[i][0]).substring(0,localStorage.getItem(toAdvanceList[i][0]).indexOf("+")+1)+newExp);
				document.getElementById("##"+toAdvanceList[i][0]).style.width = newExp + "%";
				if(newExp==100){
					flashLearned.push(toAdvanceList[i][0]);
					flashLearned2.push(toAdvanceList[i][0]);
					if(dialogue==19){ dialogue=20; nextDialogue(); }
				}
			}
		}
		setTimeout(function(){
			while(flashLearned.length>0){
				let flashKey = flashLearned.pop();
				if(document.getElementById("##"+flashKey)){
					document.getElementById("##"+flashKey).style.backgroundColor = "white";
				}
			}
		}, 1200);
		setTimeout(function(){
			while(flashLearned2.length>0){
				let flashKey2 = flashLearned2.pop();
				if(document.getElementById("##"+flashKey2)){
					document.getElementById("##"+flashKey2).style.backgroundColor = "#4A8453";
				}
			}
		}, 1600);
		
	}
	if(how=="2" || how=="1" || (how=="0" && confirm('Are you sure? Your progress will not be saved.'))){
		level = 0;
		goodStrike=0;
		right.style.opacity = 0;
		left.style.opacity = 1;
		left.style.pointerEvents = "auto";
		totalQ = 0; totalG = 0;
		if(document.getElementById("testDiv2")) document.getElementById("testDiv2").style.pointerEvents = "none";
		toAdvanceList = [];
	}
	if(how=="2"){
		document.getElementById("endMemoryCheck").style.pointerEvents="none";
		setTimeout(function(){if(right.style.opacity==0)learnedList();}, 1600);
	}
}

function learnWord(){
	if(shownKey==0){ alert("Can't learn an example sentence, silly!"); }
	else if(shownKey!=-1 && localStorage.getItem(shownKey).substring(localStorage.getItem(shownKey).indexOf("+")+1) == "100"){
		learnedWords++;
		localStorage.setItem(shownKey, "1"+ localStorage.getItem(shownKey).substring(1));
		deleteWord(shownKey);
		if(dialogue==23&&learnedWords>=20){ dialogue=24; nextDialogue(); }
	}
}

function learnedList(){
	shownKey = -1;
	document.getElementById("learnWord").style.backgroundColor="#BFBFBF";
	document.getElementById("deleteWord").style.backgroundColor="#BFBFBF";
	let happy = "";
	let maybeButton = "";
	if(learnedWords!=0) happy = "!";
	if(learnedWords>=20) maybeButton = "<input onclick='memoryCheck()' id='memoryCheck' type='submit' value='memory check' style='position:relative;float:left;width:20%;margin-left:40%;font-size:18px;text-align:center;background-color:#8FA2AE;outline:none;color:white;border-radius:15px;margin-top:15px;opacity:0;transition: opacity 2s, margin-top 2s'>";
	right.innerHTML = "<div id='learnedElements' style='pointer-events:none; width:100%;position:relative;float:left;margin:0;'><p id='counter' style='text-align:center; font-size:70px;margin:0;'>0</p><p id='learnedInfo' style='font-size:25px;margin:0;margin-top:20px;margin-bottom:5px;opacity:0;transition: opacity 2s, margin-top 1s;'>sentences/words learned so far"+happy+"</p>"+maybeButton+"</div>";
	right.innerHTML += "<div id='learnedOnes' style='pointer-events:none;width:90%;margin-left:5%;text-align:center; position:relative; float:left;opacity:0;margin-top:30px;transition:opacity 3s, margin-top 2s;'></div>";
	right.innerHTML += "<div style='position:absolute;width:90%;margin-left:5%;hight:auto'><img onclick='about()' id='about' src='img/about.png'></div>";
	Object.keys(localStorage).forEach(function(key){
		if(localStorage.getItem(key)[0]=="1"){
			let tempTxt = localStorage.getItem(key);
			let word = "";
			let translation = "";
			if(tempTxt.includes(" | ")){ word = tempTxt.substring(tempTxt.indexOf(";")+1, tempTxt.indexOf(" | "));
			}else if(tempTxt.indexOf(";")+1==tempTxt.indexOf("*")){ word = tempTxt.substring(1, tempTxt.indexOf(";"));
			}else{ word = tempTxt.substring(tempTxt.indexOf(";")+1,tempTxt.indexOf("*")); }
			if(tempTxt.includes("<br>")){ translation = tempTxt.substring(tempTxt.indexOf("*")+1,tempTxt.indexOf("<br>"));
			}else{ translation = tempTxt.substring(tempTxt.indexOf("*")+1,tempTxt.indexOf("+")); }
			document.getElementById("learnedOnes").innerHTML += "<div style='width:100%; height:28px; font-size:20px; margin-bottom:3px; border-radius:8px;background-color:#8FA2AE'><div style='text-align:center;width:90%;height:100%;position:relative;float:left;overflow:hidden;'>"+word+" | "+translation+"</div><input value='re-learn' onclick='relearn("+key+")' type='submit' style='border-radius:8px;width:10%;height:100%;text-align:center;color:white;background-color:#82B089;position:relative;float:left' ></div>";
		}
	});
	rightRefresh();
	counter = setInterval(countUp, 400/learnedWords);
}

function countUp(){
	clearInterval(counter);
	counter = false;
	if(document.getElementById("counter") && parseInt(document.getElementById("counter").innerHTML)<learnedWords){
		document.getElementById("counter").innerHTML = parseInt(document.getElementById("counter").innerHTML)+1;
		counter = setInterval(countUp, 400/(learnedWords-(parseInt(document.getElementById("counter").innerHTML))));
	}else if(document.getElementById("learnedElements")){
		document.getElementById("learnedElements").style.pointerEvents="auto";
		document.getElementById("learnedOnes").style.pointerEvents="auto";
		document.getElementById("learnedInfo").style.opacity=1;
		document.getElementById("learnedInfo").style.marginTop="0px";
		document.getElementById("learnedOnes").style.opacity=1;
		document.getElementById("learnedOnes").style.marginTop="5px";
		if(document.getElementById("memoryCheck")){
			document.getElementById("memoryCheck").style.marginTop="0px";
			document.getElementById("memoryCheck").style.opacity=1;
		}
		if(learnedWords==0) document.getElementById("learnedOnes").innerHTML = "<p style='font-size:25px;margin:0'>about time to learn some!</p>"
	}
}

function relearn(key){
	if(localStorage.getItem(key)){
		localStorage.setItem(key, 0+localStorage.getItem(key).substring(1));
		if(key>103000) addWord(key,1); else addWord(key,2);
		setTimeout(function(){document.getElementById("##"+key).style.width = Number(localStorage.getItem(key).substring(localStorage.getItem(key).indexOf("+"))) + "%";},20);
		learnedWords--;
		learnedList();
	}
}

function nextLevel(){
	rightRefresh();
	right.innerHTML="<p id='levelStage' style='font-size:60px;margin-top:60px;transition:opacity 1s, margin 1s'>Level "+level+"</p>";
	setTimeout(function(){
		document.getElementById("levelStage").style.opacity=0;
		document.getElementById("levelStage").style.marginTop="20px";
	},1000);
	setTimeout(function(){
		randomQuestion(0,3);
	},2000);
}

function memoryCheck(){
	if(learnedWords>=20){
		level = 0;
		left.style.pointerEvents="none";
		document.getElementById("learnWord").style.backgroundColor="#BFBFBF";
		document.getElementById("deleteWord").style.backgroundColor="#BFBFBF";
		shownKey = -1;
		left.style.opacity=0.2;
		toAdvanceList = []
		Object.keys(localStorage).forEach(function(key){
			toAdvanceList.push([key, 0, 0]);
		});
		randomQuestion(1,7);
	}
}

function memoryRecap(){
	right.innerHTML = "<div style='position:relative;float:left;width:90%;height:30px;margin-left:5%;'><div id='goodBar' style='position:relative;float:left;width:0%;height:100%;background-color:#82B089;transition:width 2s;border-radius:25px 5px 5px 25px'></div><div id='badBar' style='position:relative;float:right;width:0%;height:100%;background-color:#CD9797;transition:width 2s;border-radius: 5px 25px 25px 5px'></div></div>";
	setTimeout(function(){
		if(document.getElementById("goodBar")){
			document.getElementById("goodBar").style.width = (100 - Math.floor((totalQ-totalG)/totalQ*100))+"%";
			document.getElementById("badBar").style.width = Math.floor((totalQ-totalG)/totalQ*100)+"%";
		}
	},600);
	let sEnding = "s";
	if(totalQ==1) sEnding = "";
	right.innerHTML += "<div style='width:100%;position:relative;float:left'><div style='margin-top:3px;position:relative;float:left;width:88%;color:white;font-size:20px;margin-left:6%'><span id='goodBarPerc' style='width:15%;position:relative;float:left;text-align:left;color:#D9FFCA'>"+Math.floor(totalG/totalQ*100)+"%</span><span style='width:70%;position:relative;float:left;text-align:center;'>"+totalQ+" question"+sEnding+" in total</span><span id='badBarPerc' style='width:15%;position:relative;float:left;text-align:right;color:#FFE4E4'>"+Math.floor((totalQ-totalG)/totalQ*100)+"%</span></div></div>";
	if(totalG==0){ document.getElementById("goodBarPerc").style.opacity = 0;
	}else if(totalQ==totalG){ document.getElementById("badBarPerc").style.opacity = 0; }
	right.innerHTML += "<div style='width:100%;position:relative;float:left;margin-top:5px'><input id='endMemoryCheck' onclick='endTest(2)' value='end memory check' type='submit' style='border-radius:15px;width:34%;margin-left:33%;outline:none;text-align:center;font-size:16px;color:white;background-color:#8FA2AE;position:relative;float:left;opacity:0.9'></div>";
	right.innerHTML += "<div id='memoriedOnes' style='width:90%;margin-left:5%;text-align:center; position:relative; float:left;margin-top:10px;'></div>";
	while(toAdvanceList.length>0){
		let biggestKey = [toAdvanceList[0][0],toAdvanceList[0][1], toAdvanceList[0][2], 0];
		for(let i=0;i<toAdvanceList.length;i++){
			if(Math.floor(toAdvanceList[i][1]/(toAdvanceList[i][1]+toAdvanceList[i][2])*100)>Math.floor(biggestKey[1]/(biggestKey[1]+biggestKey[2])*100)){
				biggestKey = [toAdvanceList[i][0],toAdvanceList[i][1], toAdvanceList[i][2], i];
			}else if(Math.floor(toAdvanceList[i][1]/(toAdvanceList[i][1]+toAdvanceList[i][2])*100)==Math.floor(biggestKey[1]/(biggestKey[1]+biggestKey[2])*100)&&toAdvanceList[i][1]+toAdvanceList[i][2]>biggestKey[1]+biggestKey[2]){
				biggestKey = [toAdvanceList[i][0],toAdvanceList[i][1], toAdvanceList[i][2], i];
			}
		}
		toAdvanceList.splice(biggestKey[3],1);
		if(localStorage.getItem(biggestKey[0])[0]=="1"&&biggestKey[1]+biggestKey[2]>0){
			let tempTxt = localStorage.getItem(biggestKey[0]);
			let word = "";
			let translation = "";
			if(tempTxt.includes(" | ")){ word = tempTxt.substring(tempTxt.indexOf(";")+1, tempTxt.indexOf(" | "));
			}else if(tempTxt.indexOf(";")+1==tempTxt.indexOf("*")){ word = tempTxt.substring(1, tempTxt.indexOf(";"));
			}else{ word = tempTxt.substring(tempTxt.indexOf(";")+1,tempTxt.indexOf("*")); }
			if(tempTxt.includes("<br>")){ translation = tempTxt.substring(tempTxt.indexOf("*")+1,tempTxt.indexOf("<br>"));
			}else{ translation = tempTxt.substring(tempTxt.indexOf("*")+1,tempTxt.indexOf("+")); }
			let goodNumb = biggestKey[1];
			let badNumb = biggestKey[2];
			let percentNumb = Math.floor(goodNumb/(goodNumb+badNumb)*100);
			let memoriedColor = "rgb(143,162,174)";
			if(percentNumb>50) memoriedColor = "rgb(143,"+(137+Math.floor(percentNumb/2))+",174)"; else memoriedColor = "rgb("+(168-Math.floor(percentNumb/2))+",162,174)";
			document.getElementById("memoriedOnes").innerHTML += "<div style='width:90%;margin-left:5%;height:30px;font-size:21px; margin-bottom:3px; border-radius:15px;background-color:"+memoriedColor+"'><span style='width:100%;text-align:center;position:relative;float:left;'>"+word+" | "+translation+" - "+goodNumb+"/"+(badNumb+goodNumb)+" ("+percentNumb+"%)</span></div>";
		}
	}
	rightRefresh();
}

function about(){
	right.innerHTML = "<p style='font-size:28px;width:90%;margin-left:5%;position:relative;float:left;margin-top:20px'>Hope you're having fun so far!</p>";
	right.innerHTML += "<p style='font-size:22px;width:90%;margin-left:5%;position:relative;float:left;margin-top:10px'>This little project here started out as my personal tool for learning kanji in an interesting and interactive way. I've been upgrading it and adding new features in my spare time.</p>";
	right.innerHTML += "<p style='font-size:22px;width:90%;margin-left:5%;position:relative;float:left;margin-top:5px'>Contact: <i>dejmieniv@gmail.com</i></p>";
	right.innerHTML += "<p style='font-size:22px;width:90%;margin-left:5%;position:relative;float:left;margin-top:10px'>The Japanese/English dictionary data source comes from <a href='http://www.edrdg.org/jmdict/edict_doc.html' target='_blank'>here</a>.</p>";
	right.innerHTML += "<p style='font-size:22px;width:90%;margin-left:5%;position:relative;float:left;margin-top:10px;margin-bottom:10px;'>If you're struggling with hiragana or/and katakana, I recommend to you these websites here</p>";
	right.innerHTML += "<input type='submit' value='hiragana.training' onclick='window.open(\"https://hiragana.training\")' style='width:24%; margin-left: 29.5%; outline:none; color:white; text-align:center; font-size: 20px; background-color:#8FA2AE; border-radius:10px;position:relative;float:left;opacity:0.8'>";
	right.innerHTML += "<input type='submit' value='kana.pro' onclick='window.open(\"https://kana.pro\")' style='width:16%; margin-left: 1%; outline:none; color:white; text-align:center; font-size: 20px; background-color:#8FA2AE; border-radius:10px;position:relative;float:left;opacity:0.8'>";
	rightRefresh();
}