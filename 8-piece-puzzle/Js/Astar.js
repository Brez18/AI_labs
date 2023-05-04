export default class Astar{
    constructor(inital_state,goal_state)
    {
        this.goal_state=goal_state;
        this.path=[];
        this.openSet=[];
        this.closedSet=[];
        inital_state.push(-1);//previous null value index
        inital_state.push(0);//level
        inital_state.push(-1);//previous node index in closed index
        this.start(inital_state);
        
        return this.path;
    }


    start(state)
    {
        this.openSet.push(state);

        let i=0,node,goal;
        while(this.openSet.length!=0)
        {
            node=this.get_min_fitnessNode(this.openSet);
            goal=this.read_state(node);
            if(goal)
            {
                this.closedSet.push(goal);
                break;
            }
            i++;
        }
        let goto_index=this.closedSet.length-1;
        while(goto_index!=-1)
        {
            node=this.closedSet[goto_index];
            goto_index=node[11];
            node.splice(9,3)
            this.path.push(node);
        }
        this.path.reverse();

        return this.path;

    }

    get_min_fitnessNode(openSet)
    {
        let min_fNo=Infinity,node;
        openSet.forEach(element => {
            if(this.fitness_value(element)<min_fNo)
            {
                min_fNo=this.fitness_value(element);
                node=element;
            }
        });
        return node;
    }

    read_state(node)
    {
        let copy_node=JSON.parse(JSON.stringify(node));
        let possible_moves=this.find_possible_moves(copy_node);
        let index;
        let flag =false,goal_node;
        for(let element of possible_moves)
        {
            index=this.makeMove(element,copy_node);
            copy_node[10]+=1;
            copy_node[11]=this.closedSet.length;
            if(this.compare(copy_node))
            {
                flag=true;
                goal_node=JSON.parse(JSON.stringify(copy_node));
            }
            this.openSet.push(JSON.parse(JSON.stringify(copy_node)));
            copy_node=JSON.parse(JSON.stringify(node));//undo the move
        }
        this.closedSet.push(copy_node);
        this.openSet.splice(this.openSet.indexOf(node),1);

        if(flag)
        {
            goal_node[11]=this.closedSet.length-1;
            return goal_node;
        }
        else
        return null;

    }

    find_possible_moves(state)
    {
        let moves=new Array();
        let index=state.indexOf(null);

        if(index-3>=0 && index-3!=state[9])//top
            moves.push(index-3);

        if(index+3<=8 && index+3!=state[9])//botom
            moves.push(index+3);

        if((index-1)>=0 && (index-1)!=2 && (index-1)!=5 && (index-1)!=state[9])//left
            moves.push(index-1);

        if((index+1)<=8 && (index+1)!=3 && (index+1)!=6 && (index+1)!=state[9])//right
            moves.push(index+1);

        return moves;
    }

    fitness_value(state)
    {
        let g_val=0;
        for(let i=0;i<9;i++)
        {
            if(state[i]!=this.goal_state[i])
            {
                g_val++;
            }
        }
        let f_val=state[10]+g_val;
        return f_val;
    }

    compare(node)
    {
        for(let i=0;i<9;i++){
            if(node[i]!=this.goal_state[i])
                return false;
            i++;
        }
        return true;
    }

    makeMove(index1,state)
    {
        let index=state.indexOf(null);
        state[index]=state[index1];
        state[index1]=null;
        
        state[9]=index;
        return index;
    }

}