// wait for the content of the window element 
// to load, then performs the operations. 
// This is considered best practice. 
window.addEventListener('load', ()=>{      
    resize(); // Resizes the canvas once the window loads 
    document.addEventListener('mousedown', startPainting); 
    document.addEventListener('mouseup', stopPainting); 
    document.addEventListener('mousemove', sketch); 
    window.addEventListener('resize', resize); 
    document.addEventListener('keyup', handleKeyboard);

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    document.getElementById('clear').addEventListener('click', function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }, false);
}); 

let currcolor = 0;    
let currwidth = 5; // Default starting thickness

const handleKeyboard = event => {
  // Color selection via number keys 0-6
  if (event.key === '0'){
     currcolor = 0;    
  } else if (event.key === '1'){
     currcolor = 1;    
  } else if (event.key === '2'){
     currcolor = 2;    
  } else if (event.key === '3'){
     currcolor = 3;    
  } else if (event.key === '4'){
     currcolor = 4;    
  } else if (event.key === '5'){
     currcolor = 5;    
  } else if (event.key === '6'){
     currcolor = 6;    
  } 

  // Absolute line thickness specification using < and > keys 
  if (event.key === '<' || event.key === ',') {
     currwidth = 3;  // Thin size (3px)
  } else if (event.key === '>' || event.key === '.') {
     currwidth = 15; // Thick size (15px)
  }
};
    
const canvas = document.querySelector('#canvas');    
// Context for the canvas for 2 dimensional operations 
const ctx = canvas.getContext('2d');    
    
// Resizes the canvas to the available size of the window. 
function resize(){ 
  ctx.canvas.width = 600; 
  ctx.canvas.height = 600; 
} 
    
// Stores the initial position of the cursor 
let coord = {x:0 , y:0};  
   
// This is the flag that we are going to use to  
// trigger drawing 
let paint = false;    
    
// Precision coordinate calculation factoring in CSS scaling & bounding box rects
function getPosition(event){ 
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  coord.x = (event.clientX - rect.left) * scaleX; 
  coord.y = (event.clientY - rect.top) * scaleY; 
} 
  
// The following functions toggle the flag to start 
// and stop drawing 
function startPainting(event){ 
  paint = true; 
  getPosition(event); 
} 
function stopPainting(){ 
  paint = false; 
} 
    
function sketch(event){ 
  if (!paint) return; 
  ctx.beginPath(); 
    
  // Use absolute thickness controlled by keyboard (< or >)
  ctx.lineWidth = currwidth; 
   
  // Sets the end of the lines drawn to a round shape. 
  ctx.lineCap = 'round';  

  // Color mapping based on currcolor
  if (currcolor == 0){ 
    ctx.strokeStyle = 'black';
  } else if (currcolor == 1){ 
    ctx.strokeStyle = 'red';
  } else if (currcolor == 2){ 
    ctx.strokeStyle = 'orange';
  } else if (currcolor == 3){ 
    ctx.strokeStyle = 'yellow';
  } else if (currcolor == 4){ 
    ctx.strokeStyle = 'green';
  } else if (currcolor == 5){ 
    ctx.strokeStyle = 'blue';
  } else if (currcolor == 6){ 
    ctx.strokeStyle = 'violet';
  }
      
  // The cursor to start drawing moves to this coordinate 
  ctx.moveTo(coord.x, coord.y); 
   
  // The position of the cursor gets updated as we move the mouse around. 
  getPosition(event); 
   
  // A line is traced from start coordinate to this coordinate 
  ctx.lineTo(coord.x , coord.y); 
    
  // Draws the line. 
  ctx.stroke(); 
}
