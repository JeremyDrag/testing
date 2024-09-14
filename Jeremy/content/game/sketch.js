
w = 600;
h = 600;
function setup() {
  createCanvas(w, h);
}
//start
let start =false;
let lose =false;
let d = [[0,20],[20,0],[0,-20],[-20,0]];
//////// down    right  up     left
let snake =[[w/2,h/2,0,-20],[w/2,h/2+20,0,-20],[w/2,h/2+40,0,-20],[w/2,h/2+60,0,-20]];
let movea = 0;
let moveb = 0;
// make apple positons
let choicex = [];
let caught= true;
let ax=0;
let ay=0;


for(let k = 0; k<=w-20;k+=20){
  choicex.push(k);
  
}
function draw() {
  frameRate(8);
  background(46,45,48);
  if(start&& !lose){
  //===============================================
  // draw/move snake
  for(let i=0; i< snake.length; i++){
    fill(37,89,0)

    snake[i][0]+= snake[i][2];
    snake[i][1]+= snake[i][3];
    if(i==1){
      movea = snake[i][2];
      moveb =snake[i][3];
      snake[i][2] = snake[i-1][2];
      snake[i][3] = snake[i-1][3];
    }
    else if(i>1){
       let tempa = snake[i][2];
       let tempb = snake[i][3];
      snake[i][2]=movea;
      snake[i][3]=moveb;
      movea = tempa;
      moveb =tempb;
    }
    rect(snake[i][0], snake[i][1],20,20);
  }
  //=========================================
  //apple
  if (caught){
    ax=choicex[round(random(choicex.length-1))];
    ay = choicex[round(random(choicex.length-1))];
 
  }
    caught =false;
    fill(255,0,0);
     rect(ax,ay,20,20);
  if(snake[0][0]==ax && snake[0][1]==ay){
    
    if(snake[snake.length-1][2]==0 &&snake[snake.length-1][3]==-20){
    snake.push([snake[snake.length-1][0],snake[snake.length-1][1]+20,movea, moveb]);
    }
    else if(snake[snake.length-1][2]==0 &&snake[snake.length-1][3]==20){
    snake.push([snake[snake.length-1][0],snake[snake.length-1][1]-20,movea, moveb]);
    }
    else if(snake[snake.length-1][2]==20 &&snake[snake.length-1][3]==0){
    snake.push([snake[snake.length-1][0]-20,snake[snake.length-1][1],movea, moveb]);
    }
    else if(snake[snake.length-1][2]==-20 &&snake[snake.length-1][3]==0){
    snake.push([snake[snake.length-1][0]+20,snake[snake.length-1][1],movea, moveb]);
    }
    caught=true;
    }
  //=============================================
    for(let h= 2; h< snake.length;h++ ){
      if(snake[0][0]==snake[h][0] && snake[0][1]==snake[h][1]){
        lose = true;
      }
     
    }
     if(snake[0][0] <0 ||snake[0][0]>=w){
        lose=true;
      }
      else if(snake[0][1]<0 || snake[0][1]>=h){
        lose =true;
      }
    
    
   // glitch catch
    if(((snake[snake.length-1][0]==snake[snake.length-2][0] &&snake[snake.length-1][1]==snake[snake.length-2][1]-20) &&(snake[snake.length-1][0]+20 ==snake[snake.length-2][0]+20 &&snake[snake.length-1][1]==snake[snake.length-2][1]-20)) || ((snake[snake.length-1][0]==snake[snake.length-2][0] &&snake[snake.length-1][1]-20==snake[snake.length-2][1]) &&(snake[snake.length-1][0]+20 ==snake[snake.length-2][0]+20 &&snake[snake.length-1][1]-20==snake[snake.length-2][1])) ||((snake[snake.length-1][0]==snake[snake.length-2][0]+20 &&snake[snake.length-1][1]==snake[snake.length-2][1]) &&(snake[snake.length-1][0] ==snake[snake.length-2][0]+20 &&snake[snake.length-1][1]-20==snake[snake.length-2][1]-20)) ||((snake[snake.length-1][0]+20==snake[snake.length-2][0] &&snake[snake.length-1][1]==snake[snake.length-2][1]) &&(snake[snake.length-1][0]+20 ==snake[snake.length-2][0] &&snake[snake.length-1][1]-20==snake[snake.length-2][1]-20)) ){
      
      
    }
    else{
      if(snake[snake.length-1][2]==0 && snake[snake.length-1][3]==20){
        snake[snake.length-1][0]= snake[snake.length-2][0];
        snake[snake.length-1][1]= snake[snake.length-2][1]-20
      }
      else if(snake[snake.length-1][2]==0 && snake[snake.length-1][3]==-20){
        snake[snake.length-1][0]= snake[snake.length-2][0];
        snake[snake.length-1][1]= snake[snake.length-2][1]+20
      }
       else if(snake[snake.length-1][2]==20 && snake[snake.length-1][3]==0){
        snake[snake.length-1][0]= snake[snake.length-2][0]-20;
        snake[snake.length-1][1]= snake[snake.length-2][1]
      }
      else if(snake[snake.length-1][2]==-20 && snake[snake.length-1][3]==0){
        snake[snake.length-1][0]= snake[snake.length-2][0]+20;
        snake[snake.length-1][1]= snake[snake.length-2][1]
      }
      
      
    }
           
  }
  //outside of game
  //========================================
  // draw grid
  for( let j = 20;j < w; j+=20){
    stroke(0);
    line(0,j,w,j);
    line(j,0,j,h);
  }
  //====================================
  if(!start){
    textSize(50);
    stroke(255,0,0);
    fill(255,0,0);
    text("Press enter to play",w/6,h/2);
  }
  //lose
  if(lose){
    fill(37,89,0);
    stroke(0);
    for(let g =0;g<snake.length;g++){
      rect(snake[g][0],snake[g][1],20,20);
    }
    textSize(50);
    stroke(255,0,0);
    fill(255,0,0);
    text("GAME OVER",w/4.5,h/2);
    text('score:'+(snake.length-4 ),w/3,h/1.7)
    
    
  }
  
  
  
}
function keyPressed() {
  frameRate(60)
  if(keyCode == 68){
    if(snake[0][2]!=-20 && snake[0][3]!= 0 ){
      snake[0][2] = d[1][0];
      snake[0][3] = d[1][1];
    }
   
  }
  if(keyCode == 65){
    if(snake[0][2]!=20 && snake[0][3]!= 0){
       snake[0][2] = d[3][0];
      snake[0][3] = d[3][1];
    }
  }
  if ( keyCode == 83){
    if(snake[0][2]!=0 && snake[0][3]!= -20){
      snake[0][2] = d[0][0];
      snake[0][3] = d[0][1];
    }
  }
  if ( keyCode == 87){
    if(snake[0][2]!=0 && snake[0][3]!= 20){
      snake[0][2] = d[2][0];
      snake[0][3] = d[2][1];
    }
  }
  if(keyCode ==13){
    start=true;
  }
  
    
}

