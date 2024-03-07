
const btnStart=document.querySelector('.start');
const btnStop=document.querySelector('.stop');
const btnReset=document.querySelector('.reset');

let hrs=min=sec=ms=0,startTimer;

let currtime=prevtime=0;
 
let timerrunning =0; 
let charcount = 0;


const handleKeyboard = event => {
  //if (event.key === '/') console.log('The ’/’ key was pressed');
if (!timerrunning){
 startrun();
}

if (charcount ==0){
	prevtime=currtime;
} 
charcount++;

//document.getElementById("stb").value+=str(charcount)+"\t"+event.key+"\t"+str(currtime-prevtime)+"\n";
document.getElementById("stb").value+=charcount+"\t"+event.key+"\t"+(currtime-prevtime)+"\n";
prevtime=currtime;

}



function startrun(){

  timerrunning = 1;

  btnStart.classList.add('start-active');
  btnStop.classList.remove('stop-active');

  startTimer=setInterval(()=>{
    currtime++;

    ms++;//ms=ms+1;
    if(ms==100){
      sec++;
      ms=0;
    }
    if(sec==60){
      min++;
      sec=0;
    }
    if(min==60){
      hrs++;
      min=0;
    }
    updateDisplay();
  },10);


} 

document.addEventListener('keyup', handleKeyboard);


btnStart.addEventListener('click',()=>{

startrun();
});

btnStop.addEventListener('click',()=>{
  clearInterval(startTimer);
  btnStart.classList.remove('start-active');
  btnStop.classList.add('stop-active');
  timerrunning = 0;
});

btnReset.addEventListener('click',()=>{
  hrs=min=sec=ms=0;
  clearInterval(startTimer);
  updateDisplay();
  btnStart.classList.remove('start-active');
  btnStop.classList.remove('stop-active');

  timerrunning = 0;
  document.getElementById("tb").value="";
  document.getElementById("stb").value="";
  charcount = 0;
  currtime=prevtime=0;

});


function updateDisplay(){
  //Formated Display
  phrs=hrs<10?'0'+hrs:hrs;
  pmin=min<10?'0'+min:min;
  psec=sec<10?'0'+sec:sec;
  pms=ms<10?'0'+ms:ms;
  //Output
  document.querySelector('.hrs').innerText=phrs;
  document.querySelector('.min').innerText=pmin;
  document.querySelector('.sec').innerText=psec;
  document.querySelector('.ms').innerText=pms;
}
