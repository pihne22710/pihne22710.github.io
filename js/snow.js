

var no=15,speed=30,slider=30,fallmax=8,wind=0,fallwhat="*",fallsize=20,fallfont="Tahoma";
var colours=new Array("#000000","#1B1B1B","#383838","#555555","#717171","#8D8D8D","#AAAAAA","#C6C6C6","#E3E3E3","#FFFFFF");

var o=new Array(), tog=1, dofallt=new Array();
var ns4=(document.layers)?1:0;
var ie4=(document.all)?1:0;
var ns6=(document.getElementById&&!document.all)?1:0;
if(ie4)	falllayer="document.all['gf'+i].style";
if(ns4) falllayer="document.layers['gf'+i]";
if(ns6) falllayer="document.getElementById('gf'+i).style";
function winWid(){ return (ns4||ns6)?window.innerWidth:document.body.clientWidth; }
function winHei(){ return (ns4||ns6)?window.innerHeight:document.body.clientHeight; }
function winOfy(){ return (ns4||ns6)?window.pageYOffset:document.body.scrollTop; }
function togFall(){ for(i=0;i<no;i++){ if(tog==1){ with(eval(falllayer)){ left=-500; } clearTimeout(dofallt[i]); }else{ fallt(i); } } tog*=-1 }
function newobj(q,t){
	spin = parseInt(Math.random()*slider);
	spin = (Math.random()>0.5) ? spin : -spin;
	o[q] = new Array(parseInt(Math.random()*(winWid()-slider)),-30,spin,0.02+Math.random()/10,parseInt(1+Math.random()*fallmax),0);
	if(t==1){
		if(ns4){ document.write('<layer name="gf'+q+'" left="0" top="0" visibility="show">'+fallwhat+'</layer>'); }
		if(ie4||ns6){ document.write('<span id="gf'+q+'" style="POSITION: absolute; Z-INDEX: -'+q+'; VISIBILITY: visible; TOP: 0px; LEFT: 0px; font-size: '+fallsize+'px; font-family: '+fallfont+';">'+fallwhat+'</span>'); }
	}
}
function fallt(i){
	if((o[i][1]>winHei()-(fallsize*1.5))||(o[i][0]>winWid()-slider-(fallsize*fallwhat.length))){ newobj(i,0); }
	o[i][1] += o[i][4];
	o[i][0]+=wind;
	o[i][5] += o[i][3];
	sizexy=Math.sin(o[i][5]);
	lay=(ie4)?sizexy:parseInt(sizexy+1);
	sizexy=(sizexy>0)?sizexy:0-sizexy;
	with(eval(falllayer)){
		top = o[i][1]+winOfy();
		left = o[i][0]+o[i][2]*Math.cos(o[i][5]);
		if(!ns4){
			zIndex=lay;
			color=colours[parseInt(sizexy*(colours.length-1))]
		}
	}
	dofallt[i] = setTimeout("fallt("+i+")", speed);
}
for (i = 0; i < no; i++){ newobj(i,1); fallt(i); }

