
// 0 = no walls
// 1 = wall = temporary
// 1 = only north wall
// 2 = only west wall
// 3 = only south wall
// 4 = only east wall
//

const WIDTH = 8;
const HEIGHT = 8;
const TOTAL_STATES = 8;
const ANIM_DELAY = 25;
let MOVING = false;

const directions = [
	 "NORTH",
	 "WEST",
	 "EAST",
	"SOUTH"
    ]   



let placing_robot = null;
let selected_robot = null;

const boardA = [[5, 1, 1, 1, 8, 1, 1, 8],
                [3, 0, 7, 0, 0, 0, 0, 0],
                [6, 0, 0, 0, 0, 1, 8, 0],
                [3, 0, 0, 0, 0, 0, 0, 0],
                [3, 0, 0, 0, 0, 0, 6, 0],
                [3, 0, 7, 0, 0, 8, 0, 0],
                [3, 0, 0, 0, 0, 0, 0, 0],
                [3, 0, 0, 0, 0, 0, 0, 5],
                ];

const boardB = [[1, 1, 1, 1, 5, 1, 1, 8],
                [0, 0, 0, 0, 0, 0, 0, 2],
                [0, 0, 7, 0, 0, 6, 0, 2],
                [0, 0, 0, 0, 4, 0, 0, 2],
                [0, 5, 6, 0, 0, 0, 0, 7],
                [0, 8, 7, 0, 0, 0, 6, 2],
                [0, 0, 0, 0, 0, 0, 0, 2],
                [8, 0, 0, 0, 0, 0, 8, 7],
                ];

const boardC = [[3, 0, 0, 0, 0, 0, 0, 6],
                [6, 0, 0, 0, 0, 0, 0, 0],
                [3, 0, 0, 0, 0, 0, 0, 0],
                [3, 0, 0, 5, 0, 6, 0, 0],
                [6, 0, 0, 0, 0, 0, 0, 0],
                [3, 0, , 0, 0, 7, 0, 0],
                [3, 0, 0, 7, 0, 0, 0, 0],
                [6, 4, 6, 4, 7, 4, 4, 4],
                ];

const boardD = [[7, 0, 0, 0, 0, 0, 0, 2],
                [0, 0, 0, 0, 0, 0, 0, 2],
                [0, 0, 5, 0, 0, 0, 0, 2],
                [0, 0, 0, 0, 6, 0, 0, 2],
                [0, 0, 0, 0, 0, 0, 0, 7],
                [0, 0, 7, 0, 0, 0, 0, 2],
                [0, 0, 0, 0, 0, 7, 0, 2],
                [4, 6, 4, 4, 4, 4, 4, 7],
                ];

let robots = 
[
    {color: "blue", x:1, y:12, sx : 1, sy : 12},
    {color: "red", x:4, y:2, sx : 4, sy : 2},
    {color: "orange", x:15, y:2, sx : 15, sy : 2},
    {color: "green", x:14, y:14, sx : 14, sy : 14}
]

let currGoal = {x:12, y:14}

function displayBoard(){
    let html_boardA = document.getElementById("gameBoardA")
    let html_boardB = document.getElementById("gameBoardB")
    let html_boardC = document.getElementById("gameBoardC")
    let html_boardD = document.getElementById("gameBoardD")
    html_boardA.innerHTML = "";
    html_boardB.innerHTML = "";

    html_boardC.innerHTML = "";

    html_boardD.innerHTML = "";


    fillGrid(boardA, html_boardA, "A");
    fillGrid(boardB, html_boardB, "B");

    fillGrid(boardC, html_boardC, "C");
    fillGrid(boardD, html_boardD, "D");

}

function fillGrid(board, grid, name){
    for (let  i = 0; i < board.length; i++){
        let row = document.createElement("tr");
        row.id = "row" + name + i

        grid.appendChild(row);
        let rowW = document.getElementById("row" + name + i);

        for(let j = 0; j < board[i].length; j++){
            let cell = document.createElement("td");
            cell.id=("x"+i + "y"+j)
            switch(board[i][j]){
                case 1: cell.className = "North"; break;
                case 2: cell.className = "East"; break;
                case 3: cell.className = "West"; break;
                case 4: cell.className = "South"; break;
                case 5: cell.className += "North"; cell.className += " West"; break;
                case 6: cell.className += "South"; cell.className += " West"; break;
                case 7: cell.className += "South"; cell.className += " East"; break;
                case 8: cell.className += "North"; cell.className += " East"; break;
            }

            rowW.appendChild(cell);
        }


    }
}

function getBoard(robot){
    let currBoard = boardA;
    let currName = "A"

    let x = robot.x % WIDTH;
    let y = robot.y % HEIGHT;

    if (robot.x > WIDTH-1 && robot.y > HEIGHT-1){
        currBoard = boardD;
        currName = "D"
    }else if(robot.x > WIDTH-1){
        currBoard = boardB;
        currName = "B"
    }else if(robot.y > HEIGHT-1){
        currBoard = boardC;
        currName = "C"
    }
    return [currBoard, currName];
    
}

function displayRobots(){
    for (let i = 0; i  < robots.length; i++){
        let robot = robots[i];
        let cbn = getBoard(robot);
        let currBoard = cbn[0];
        let currName = cbn[1];
        
        /*
        let x = robot.x % WIDTH;
        let y = robot.y % HEIGHT;

        if (robot.x > WIDTH-1 && robot.y > HEIGHT-1){
            currBoard = boardD;
            currName = "D"
        }else if(robot.x > WIDTH-1){
            currBoard = boardB;
            currName = "B"
        }else if(robot.y > HEIGHT-1){
            currBoard = boardC;
            currName = "C"
        }
        */
        
        let currCell = document.getElementById("row" + currName + robot.y % HEIGHT).cells[robot.x % HEIGHT]
        let rspan = document.createElement("span")
        rspan.id = robot.color+"Robot"
        rspan.className = "robot"
        currCell.appendChild(rspan)


        
    }
}

function displayCurrGoal(){
    let currBoard = boardA;
    let currName = "A"

    let x = currGoal.x % WIDTH;
    let y = currGoal.y % HEIGHT;
    if (currGoal.x > WIDTH-1 && currGoal.y > HEIGHT-1){
        currBoard = boardD;
        currName = "D"
    }else if(currGoal.x > WIDTH-1){
        currBoard = boardB;
        currName = "B"
    }else if(currGoal.y > HEIGHT-1){
        currBoard = boardC;
        currName = "C"
    }

    let currCell = document.getElementById("row" + currName + y).cells[x]
    currCell.className += " goal"

}

function setSquare(x, y, grid, new_val){
    return 0
}

function increaseSquare(x, y, grid){
    let board;
    switch(grid){
        case "A": board = boardA; break;
        case "B": board = boardB; break;
        case "C": board = boardC; break;
        case "D": board = boardD; break;
        default: console.log("EROR"); break;
    }

    let cval = board[x][y];

    board[x][y]= (cval+1)%(TOTAL_STATES+1)
    refresh();
    return 0
}

function changeGrid(target){

    let grid = target.parentElement.id[3]
    let s = target.id.split("y")
    let x = s[0].split("x")[1]
    let y = s[1]

    increaseSquare(x, y, grid)
}

function placeRobot(target, robot){
    if (target === robot){
        if (!placing_robot){
            console.log("You must select a square with a robot init")
            return 0

        }
        let grid = target.parentElement.id[3]
        let s = target.id.split("y")
    
    
        let x = parseInt(s[0].split("x")[1])
        let y = parseInt(s[1])
        switch(grid){
            case "B": y+=8; break;
            case "C": x+=8; break;
            case "D": x+=8; y+=8; break;
        }
        
        placing_robot.x = y
        placing_robot.y = x
        robots.push(placing_robot)
        placing_robot = null;
        
        refresh()
        return 0
        
    }
    if(placing_robot === null){
        selectRobotWithColor(robot)
    
    }
}

function moveGoal(target){
    let grid = target.parentElement.id[3]
    let s = target.id.split("y")


    let x = parseInt(s[0].split("x")[1])
    let y = parseInt(s[1])
    switch(grid){
        case "B": y+=8; break;
        case "C": x+=8; break;
        case "D": x+=8; y+=8; break;
    }
    currGoal.y = x;
    currGoal.x = y;

    refresh();
}

function clicked(){
    var selectedVal = "";

    var selected = $("input[type='radio'][name='mouse_action']:checked").val();

    let z = event.target
    let par = z;
    if(z.className === "robot"){
        z = z.parentElement
    }
    console.log(z, par)
    switch(selected){
        case "change grid": changeGrid(z); break;
        case "place robots": placeRobot(z, par); break;
        case "move goal": moveGoal(z); break;
        case "move robots": selectRobot(z, par); break;
        default: break;
    }

}

function selectRobot(target, robot){
    if(target === robot){
        return 0
    }
    selected_robot = getRobotFromColor(robot)

}


function refresh(){
    displayBoard()
    displayRobots()
    displayCurrGoal()
}

function start(){
    refresh();


    var tableA = $("#gameBoardA");
    var tableB = $("#gameBoardB");

    var tableC = $("#gameBoardC");
    var tableD = $("#gameBoardD");


    tableA.on("click", "td", clicked); 
    tableB.on("click", "td", clicked); 
    tableC.on("click", "td", clicked); 
    tableD.on("click", "td", clicked); 


    $("html").keydown(function(event){ 
        if(!MOVING){
        
        switch(event.which){
            case 38: moveRobot(selected_robot, "NORTH", true); break;
            case 40: moveRobot(selected_robot, "SOUTH", true); break;
            case 37: moveRobot(selected_robot, "WEST", true); break;
            case 39: moveRobot(selected_robot, "EAST", true); break;

        }
    }


    });
}

function solve(){
    return 0;
}

function selectRobotWithColor(robot){

    clr = robot.id.split("Robot")[0]
        
        for(let i = robots.length - 1; i >= 0; i--){
            if (robots[i].color === clr){
                placing_robot = robots[i]
                robots.splice(i,1)

                return placing_robot;
            }
        }

}


function getRobotFromColor(robot){

    clr = robot.id.split("Robot")[0]
        
        for(let i = robots.length - 1; i >= 0; i--){
            if (robots[i].color === clr){
                return robots[i];
            }
        }

}

function collision(robot, direction, rbts){
    
    for(let i = 0; i < rbts.length; i++){
        if(rbts[i].color != robot.color){
            if(rbts[i].x == robot.x && rbts[i].y == robot.y){
                return true
            }
        }
    }
    
    let currX = robot.x%WIDTH
    let currY = robot.y%HEIGHT

    let currBoardName = getBoard(robot)[1];
    
    
    let currCell = document.getElementById("row" + currBoardName + currY).cells[currX]
    let walls = currCell.className.toUpperCase();
    if (walls.includes(direction)){
        return true

    }
    return false    
}




async function moveRobot(robot, direction, animate){
    
    
    if(!selected_robot)
        return 0
    if(collision(robot, direction, robots)){
        console.log("COLLISION")
        MOVING = false;
        refresh()
        return 0
    }
    let out = 0;
    MOVING = false;
    switch(direction){
        
        case "NORTH": robot.y-=1;
            if(collision(robot, "SOUTH", robots)){
                console.log("COLLISION")
                robot.y+=1;
                break;
                
            }
         out = 1;
         break;

        case "SOUTH": robot.y+=1;
            if(collision(robot, "NORTH", robots)){
                console.log("COLLISION")
                robot.y-=1;
                break;
            }
            out = 1;

        break;  

        case "EAST": robot.x+=1;  
        if(collision(robot, "WEST", robots)){
            console.log("COLLISION")
            robot.x-=1;
            break;
        }
        out = 1;

        break;
        case "WEST": robot.x-=1;  
        if(collision(robot, "EAST", robots)){
            console.log("COLLISION")
            robot.x+=1;
            break;
        }
        out = 1;

        break;
    }


        if(animate && out === 1){
            MOVING = true;
    
            setTimeout(function() {
                moveRobot(robot, direction, animate);
                refresh();

            }, ANIM_DELAY);

        }
        else if(out === 1){
            moveRobot(robot, direction, animate);

        }
        if(out === 0){

            refresh();
            return 0
        }
        
    

}

function combine_grid(){
    let new_grid_AB = []
    let new_grid_CD = []
    for (let i = 0; i < HEIGHT; i++){
        new_grid_AB[i] = boardA[i].concat(boardB[i])
        new_grid_CD[i] = boardC[i].concat(boardD[i])
    }

    return new_grid_AB.concat(new_grid_CD)
}
function createGameState(){
    //for (let i = 0; i < robots.length; i++){
    //    out+=robots[i].color + ":" + robots[i].x + ":" + robots[i].y
    //}
    const out = Object.assign({}, robots);

    return out
}

 function bfs(robot, grd){
    let o = 0;
    // Treat all gamestates as nodes, aka all unique positions of the robots.
    let curr_robots  = robots;
    let gamestate = createGameState()
    let queue = [];
    let explored = new Map();
    let curr_robot, base_robot;
    selected_robot = robot;

    let state_str = ""
    for (let i = 0; i < robots.length; i++){
        state_str+=robots[i].color + ":" + robots[i].x + ":" + robots[i].y + "-"
    }

    queue.push([state_str,""]);

    explored.set(state_str, gamestate);
    
    while(queue.length > 0 ){

        
        let curr_state = queue.shift()
        let curr_moves = curr_state[1]
        curr_state = curr_state[0]
        let curr_robots = getRobotsFromState(curr_state)
        
        //console.log("curr state:",curr_state)


        if(selected_robot == null){
            if(curr_robot != null){
                for(let s = 0; s < curr_robots.length; s++){
                    if(curr_robots[s].x == currGoal.x && curr_robots[s].y == currGoal.y){
                        console.log("GOAL FOUND")
                        return [curr_state, curr_moves]
                    }
                }
            }



        }else{
            for(let s = 0; s < curr_robots.length; s++){

                if(curr_robots[s].color == robot.color){
                    curr_robot = curr_robots[s]
                }
            }

            if(curr_robot.x == currGoal.x && curr_robot.y == currGoal.y && curr_robot.color == selected_robot.color){
                console.log("GOAL FOUND")
                return [curr_state, curr_moves]
            }
        }
 

        if(curr_moves.length < 300){
        

        for (let u = 0; u < curr_robots.length; u++){

            base_robot = $.extend({}, curr_robots[u]);

            for(let i = 0; i < directions.length; i++){
                curr_robot = $.extend({}, base_robot);
                let curr_dir = directions[i]
                let opp = "";
                let col = false;
                switch(curr_dir){
                    case "NORTH": opp = "SOUTH"; break;
                    case "SOUTH": opp = "NORTH"; break;
                    case "WEST": opp = "EAST"; break;
                    case "EAST": opp = "WEST"; break;
    
                }

               while (!col){
                    if(collision(curr_robot, curr_dir, curr_robots)){
                        col = true;
            
                    }
                    if(!col)
                        curr_robot = autoMoveRobot(curr_robot, curr_dir);
    
                    if(collision(curr_robot, opp, curr_robots)){
                        col = true;
                        switch(curr_dir){
                            case "NORTH": curr_robot.y +=1;  break;
                            case "SOUTH": curr_robot.y -=1;  break;
                            case "WEST":  curr_robot.x +=1;  break;
                            case "EAST":  curr_robot.x -=1;  break;
            
                        }                }
               }
                

                    let state_str = ""
                    for (let i = 0; i < curr_robots.length; i++){
                        if(curr_robots[i].color == curr_robot.color){
                            state_str+=curr_robot.color + ":" + curr_robot.x + ":" + curr_robot.y + "-"
    
                        }else{
                            state_str+=curr_robots[i].color + ":" + curr_robots[i].x + ":" + curr_robots[i].y + "-"
                        }
                        
                    }
        
                    if(!explored.get(state_str)){
                        explored.set(state_str, true)
                        queue.push([state_str, curr_moves + curr_robot.color + "-" +  curr_dir + ":"]);                
                    }
                    /*
                    if(queue.length > 10000){
                        console.log("QUEUE TOO LARGE")
                        return
                    }
                    */
        
    
           
            }
        }
    }
        

        //console.log("quueue:",queue)
    }
    console.log("GOAL NOT FOUND")
    refresh()

}

function getRobotsFromState(curr_state){
    let z = curr_state.split("-");
    state_robots = []
    for (let i = 0; i < z.length - 1; i++){

        let k = z[i].split(":")
        state_robots.push({color: k[0], x: parseInt(k[1]), y:parseInt(k[2]), sx : 0, sy : 0})

    }

    
    return state_robots
}

function autoMoveRobot(cr, direction){
    switch(direction){

        case "NORTH": cr.y -=1; break;
        case "SOUTH": cr.y +=1; break;

        case "WEST": cr.x -=1; break;
        case "EAST": cr.x +=1; break;
    }

    return cr;
}

function solve(){
 

    if (document.contains(document.getElementById("agb"))) {
        document.getElementById("agb").remove();
    }

    if (document.contains(document.getElementById("rst"))) {
    document.getElementById("rst").remove();
    }

    var selectedRobot = $(solver).children("option:selected").val();
    let grd = combine_grid();
    let after_pos;
    let insta_display = false
    if(selectedRobot === "any"){
        after_pos = bfs(null, grd)
        
    }else{
        for(let i = 0; i < robots.length; i++){
            if(robots[i].color === selectedRobot){
                after_pos = bfs(robots[i], grd)
            }
        }
    }
    if(after_pos){
        let moves = after_pos[1].split(":")
        moves.pop()
        if(insta_display){

        let rbts = after_pos[0].split("-")
        rbts.pop()

        for (let i = 0; i < rbts.length; i++){
            let z = rbts[i].split(":")

            robots[i] = {color: z[0], x: z[1], y: z[2], sx:robots[i].x , sy:robots[i].y}
        }
        refresh()
        }else{
            
            let reset_btn = document.createElement("button")
            reset_btn.innerHTML = "reset board"
            reset_btn.id = "rst"
            reset_btn.onclick = function () {
                if (document.contains(document.getElementById("agb"))) {
                    document.getElementById("agb").remove();
        }
                after_game_button(moves.slice())
                for(let i = 0; i < robots.length; i++){
                    robots[i].x = robots[i].sx
                    robots[i].y = robots[i].sy
                }
                refresh()


            }

            document.body.appendChild(reset_btn)
            after_game_button(moves.slice())




 
        }
        

    }
    

}

function after_game_button(moves){
    let btn = document.createElement("button")
    btn.id = "agb"
    btn.innerHTML = "next move (" + moves.length + ")"

    btn.onclick = function () {

        if(moves.length > 0){
            let z = moves.shift()
            z=z.split("-")
            btn.innerHTML = "next move (" + moves.length + ")"
            console.log(z)

            for(let i = 0; i < robots.length; i++){
                if(robots[i].color == z[0]){
                    selected_robot = robots[i]
                    moveRobot(selected_robot, z[1], true)
                    break
                }
            }
            
        }
        if(moves.length == 0){
            btn.remove()
        }
        
      };

    document.body.appendChild(btn)


}

//TODO
// Saveable maps, typ hasha griden på något fint sätt.'



/*

	private Node breadthFirstSearch(Boolean returnHome) {

		Node currentPos = new Node(state.agent_x_position, state.agent_y_position);
		ArrayList<Node> discovered = new ArrayList<Node>();
		
		Queue<Node> tempQueue = new LinkedList<Node>();
				
		tempQueue.add(currentPos);
		
		discovered.add(currentPos);

		while(tempQueue.size() > 0) {
			
			Node currentNode = tempQueue.poll();
			
			if(returnHome && (currentNode.x == 1 && currentNode.y == 1) ) {
				return currentNode;
			}
			if(!returnHome && state.world[currentNode.x][currentNode.y] == state.UNKNOWN) {
				 return currentNode;
			}
			
			ArrayList<Node> adjEdges = new ArrayList<Node>();
			
			
			getPossibleMoves(currentNode, adjEdges);
		
			for(Node node : adjEdges) {
				
				boolean seen = false;
				for(Node disc : discovered) {
					if(disc.equals(node)) {
						seen = true;
					}
				}
				if(!seen) {
					node.parentNode = currentNode;

					discovered.add(node);
					tempQueue.add(node);		
				}

				}

			
			
		}
		return null;
	}
*/