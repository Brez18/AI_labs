export default class GameView{
    constructor(root)
    {
        this.root=root;
    }

    setInitialState(arr)
    {
        for(let i=0;i<9;i++)
        {
            if(arr[i]==null)
                this.root.querySelector(`.boardTile[data-index="${i}"]`).style.opacity=0.0;
            this.root.querySelector(`.boardTile[data-index="${i}"]`).textContent=arr[i];
        }
    }

    selectNextMove(arr)
    {
        let tile=arr.indexOf(null);
        this.root.querySelector(`.boardTile[data-index="${tile}"]`).style.backgroundColor="#00ff80";
        return tile;
    }

    moveTiles(tile1,tile2,flag)
    {
        let childA=this.root.querySelector(`.boardTile[data-index="${tile1}"]`);
        let childB=this.root.querySelector(`.boardTile[data-index="${tile2}"]`);
        
        const finalChildAStyle = {
            x: null,
            y: null,
          };
        const finalChildBStyle = {
            x: null,
            y: null,
        };
        let i=1;
        if(flag)
        {
            i=-1;
        }
        
        childA.classList.add('transition');
        childB.classList.add('transition');
        finalChildAStyle.x = (i)*(childA.getBoundingClientRect().left - childB.getBoundingClientRect().left);
        finalChildAStyle.y = (childB.getBoundingClientRect().top - childA.getBoundingClientRect().top);
        finalChildBStyle.x = (i)*(childB.getBoundingClientRect().left - childA.getBoundingClientRect().left);
        finalChildBStyle.y = (childA.getBoundingClientRect().top - childB.getBoundingClientRect().top);

        childA.style.transform = `translate(${finalChildAStyle.x}px, ${finalChildAStyle.y}px)`;
        childB.style.transform = `translate(${finalChildBStyle.x}px, ${finalChildBStyle.y}px)`;

        let string;
        setTimeout(() => {
            childA.classList.remove('transition');
            childB.classList.remove('transition');
            childA.removeAttribute('style');
            childB.removeAttribute('style');
            string=childA.textContent;
            childA.textContent=childB.textContent;
            childB.textContent=string;
            if(string=null)
                childB.style.opacity=0.0;
            else
                childA.style.opacity=0.0;
        }, 400);
    }

    setStatus(a,b)
    {
        if(b+1==a)
            document.getElementById("moveDisplay").innerHTML="Moving Left";
        else if(a+1==b)
            document.getElementById("moveDisplay").innerHTML="Moving Right";
        else if(a==b+3)
            document.getElementById("moveDisplay").innerHTML="Moving Top";
        else if(b==a+3)
            document.getElementById("moveDisplay").innerHTML="Moving Bottom";
    }   
}