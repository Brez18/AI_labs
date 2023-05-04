import Astar from "./Astar.js";
import GameView from "./GameView.js";

let view=new GameView(document.getElementById("mainContainer"));

let intial_state=new Array(9).fill(null);
let goal_state=new Array(9).fill(null);


// intial_state[0]=1; intial_state[1]=3; intial_state[2]=4;
// intial_state[3]=8; intial_state[4]=null; intial_state[5]=5;
// intial_state[6]=7; intial_state[7]=2; intial_state[8]=6;


// goal_state[0]=1; goal_state[1]=2; goal_state[2]=3;
// goal_state[3]=8; goal_state[4]=null; goal_state[5]=4;
// goal_state[6]=7; goal_state[7]=6; goal_state[8]=5;


intial_state[0]=1; intial_state[1]=3; intial_state[2]=4;
intial_state[3]=8; intial_state[4]=6; intial_state[5]=2;
intial_state[6]=null; intial_state[7]=7; intial_state[8]=5;

goal_state[0]=1; goal_state[1]=2; goal_state[2]=3;
goal_state[3]=8; goal_state[4]=null; goal_state[5]=4;
goal_state[6]=7; goal_state[7]=6; goal_state[8]=5;


// intial_state[0]=3; intial_state[1]=6; intial_state[2]=4;
// intial_state[3]=null; intial_state[4]=1; intial_state[5]=2;
// intial_state[6]=8; intial_state[7]=7; intial_state[8]=5;

// goal_state[0]=1; goal_state[1]=2; goal_state[2]=3;
// goal_state[3]=8; goal_state[4]=null; goal_state[5]=4;
// goal_state[6]=7; goal_state[7]=6; goal_state[8]=5;


let path=new Astar(intial_state,goal_state);
let i=0,index,indexOFNull;
document.getElementById("moveDisplay").innerHTML="Initial state ";
view.setInitialState(path[i]);
loop(path);

function loop(path)
{
    let index,indexOFNull;
    if(i<path.length-1)
    {
        setTimeout(function(){
            index=view.selectNextMove(path[i+1]);
            indexOFNull=path[i].indexOf(null);
            view.setStatus(index,indexOFNull);
            if(index+1==indexOFNull || index==indexOFNull+1)
            view.moveTiles(index,indexOFNull,true);
            else
            view.moveTiles(index,indexOFNull);
            i++;
            loop(path);
        },2500);
    }
    if(i==path.length-1)
    {
        setTimeout(function(){
        document.getElementById("moveDisplay").innerHTML="Goal state reached";
        },1000);
    }

}








