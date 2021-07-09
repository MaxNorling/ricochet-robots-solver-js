
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

const boardA = [[5, 1, 1, 1, 1, 5, 1, 1],
                [3, 0, 0, 0, 0, 0, 0, 0],
                [3, 5, 0, 0, 0, 0, 7, 0],
                [3, 0, 0, 0, 0, 0, 0, 0],
                [3, 0, 0, 0, 0, 0, 0, 0],
                [3, 0, 0, 0, 0, 0, 8, 0],
                [5, 0, 0, 6, 0, 0, 0, 0],
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
                [3, 0, 0, 0, 0, 7, 0, 0],
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

let boards = [boardA, boardB, boardC, boardD]

let base_layout = "51F30F30F30F30F30F30F30E51F80F20F20F20F20F20F280E230E630F30F30F30F30F30F64F70E20F20F20F20F20F20F24F7"

let robots = 
[
    {color: "blue", x:1, y:12, sx : 1, sy : 12},
    {color: "red", x:4, y:2, sx : 4, sy : 2},
    {color: "orange", x:15, y:2, sx : 15, sy : 2},
    {color: "green", x:14, y:14, sx : 14, sy : 14}
]

let char_to_int = {
    0:"", 1:"A", 2:"B", 3:"C", 4:"D", 5:"E", 6:"F", 7:"G", 8:"H", 9:"I", 10:"J", 11:"K", 12:"L", 13:"M", 14:"N", 15:"O", 16:"P", 17:"Q",
    18:"R", 19:"S", 20:"T", 21:"U", 22:"V", 23:"W", 24:"X", 25:"Y", 26:"Z", 27:"a", 28:"b", 29:"c", 30:"d", 31:"e", 32:"f", 33:"g", 34:"h", 35:"i",
    36:"j", 37:"k", 38:"l", 39:"m", 40:"n", 41:"o", 42:"p", 43:"q", 44:"r", 45:"s", 46:"t", 47:"u", 48:"v", 49:"w", 50:"x", 51:"y", 52:"z", 53:".",
    54:"-",55:"!",56:"#",57:"%",58:"(",59:")",60:"{", 61:"}",62:"[",63:"*"
}

let int_to_char = {
    "A": 1,"B": 2,"C": 3,"D": 4,"E": 5,"F": 6,"G": 7,"H": 8,"I": 9,"J": 10,"K": 11,"L": 12,"M": 13,"N": 14,"O": 15,"P": 16,
    "Q": 17,"R": 18,"S": 19,"T": 20,"U": 21,"V": 22,"W": 23,"X": 24,"Y": 25,"Z": 26,"a": 27,"b": 28,"c": 29,"d": 30,"e": 31,
    "f": 32,"g": 33,"h": 34,"i": 35,"j": 36,"k": 37,"l": 38,"m": 39,"n": 40,"o": 41,"p": 42,"q": 43,"r": 44,"s": 45,"t": 46,
    "u": 47,"v": 48,"w": 49,"x": 50,"y": 51,"z": 52,".": 53,"-": 54, "!":55,"#":56, "%":57,"(":58, ")":59, "{":60, "}":61,"[":62,"*":63
}

let currGoal = {x:12, y:14}

function save_board(){
    let out = ""
    
    let curr_board;
    let count = 0
    let curr_char = "."
    
    for (let z = 0; z < boards.length; z++){
        curr_board = boards[z]

        for (let i = 0; i < curr_board.length; i++){
            for(let j = 0; j < curr_board[i].length; j++){
                if(curr_board[i][j] == curr_char && count != 63){
                    count+=1

                }else{
                    out += char_to_int[count] + curr_board[i][j];
                    count = 0
                    curr_char = curr_board[i][j]
                }
                
            }    
        }
    }
    if(count > 0){
        out += char_to_int[count] + curr_char;
        count = 0
    }
    document.getElementById("cBoard").value = out;
    return out
}


function load_board(){
    let in_board = document.getElementById("cBoard").value;
    //"51B81A83070D60C18030F30D603070A80A30F30E51C51A80F20A70A6020C40A20560C70870B620F280D8730E6A0F30F30A5060A60F30C70A30A70C646474B70E20F20A50C20C60A20F70A70C20D702464D7"
    let curr_board = boardA
    let count = 1
    let c_char = ""
    let uncompressed = ""

    for (let i = 0; i < in_board.length; i++) {
        c_char = in_board[i]
        if(i+1 < in_board.length){
            if(in_board[i+1].search(/[^A-Za-z._!#%\(\)\[\]\{\}\\*s]/) == -1){
                count += int_to_char[in_board[i+1]]
                i=i+1    
            }
        }

        uncompressed+=c_char.repeat(count)
        count = 1
        
    }
    let cCol = 0, cRow = 0;
    for(let i = 0; i < uncompressed.length; i++){
        curr_board = boards[Math.floor(i / 64)]
        if(cCol == 7){
            cRow = (cRow + 1)%8
            
        }
        cCol = i%8;
        curr_board[cRow][cCol] = parseInt(uncompressed[i]);
        
        
        
    }

    

    refresh()
    return 0
}

function revert_to_base(){
    document.getElementById("cBoard").value = base_layout;
    load_board()
    document.getElementById("cBoard").value = "";

    
}


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

        placing_robot.sx = y
        placing_robot.sy = x
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

    $(document).on('contextmenu', function (e) {
        if (e.target.matches('#gameboard *')) {
            let gb = e.target.parentElement.parentElement.id
            if(e.target.className == "robot"){
                gb = e.target.parentElement.parentElement.parentElement.id
            }
            changeBoard(gb)
        return false

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
    return False

}

function hueristic(rx, ry){
    //return Math.abs(rx - currGoal.x) + Math.abs(ry - currGoal.y)
    let h = 0
    if(rx != currGoal.x){
        h+=1
    }
    if(ry != currGoal.y){
        h+=1
    }
    return h

}

function aStar(robot, grd){

    let o = 0;
    // Treat all gamestates as nodes, aka all unique positions of the robots.
    let curr_robots  = robots;
    let gamestate = createGameState()
    let open_list  =  new PriorityQueue((a, b) => a[1] > b[1]);
    let closed_list = new PriorityQueue((a, b) => a[1] > b[1]);
    let explored = new Map();
    let curr_robot, base_robot;
    selected_robot = robot;
    let robot__to_goal_x = selected_robot.x;
    let robot__to_goal_y = selected_robot.y;

    let state_str = ""
    for (let i = 0; i < robots.length; i++){
        state_str+=robots[i].color + ":" + robots[i].x + ":" + robots[i].y + "-"
    }

    open_list.push([[state_str, ""],hueristic(robot__to_goal_x, robot__to_goal_y) + 0]);
    explored.set(state_str, gamestate);
    console.log(queue)

    while(open_list.size() > 0 ){

        

        let curr_state = open_list.pop()
        closed_list.push(curr_state)
        curr_state = curr_state[0]
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
                        open_list.push([[state_str, curr_moves + curr_robot.color + "-" +  curr_dir + ":"], curr_moves.length + hueristic(robot__to_goal_x, robot__to_goal_x)]);                
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
        //after_pos = aStar(null, grd)
        
    }else{
        for(let i = 0; i < robots.length; i++){
            if(robots[i].color === selectedRobot){
                after_pos = bfs(robots[i], grd)
                //after_pos = aStar(robots[i], grd)
                break
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

// JSON fil med "standard boards" 4 plattor 2 sidor per platta så 8 olika bord per 


function changeBoard(boardname){
    let z =  [[5, 1, 1, 1, 1, 5, 1, 1],
    [3, 0, 0, 0, 0, 0, 0, 0],
    [3, 5, 0, 0, 0, 0, 7, 0],
    [3, 0, 0, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 8, 0],
    [5, 0, 0, 6, 0, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 5],
    ];
    let currBoard = ""
    let normalWallNS, normalWallWE, wallWallWE,wallWallNS, RIGHTSIDE, TOPSIDE;
    switch(boardname[boardname.length-1]){
        case "A": currBoard = boardA; normalWallNS = 1; normalWallWE = 3; wallWallWE = 6; wallWallNS = 5; RIGHTSIDE = false; TOPSIDE = true; break;
        case "B": currBoard = boardB; normalWallNS = 1; normalWallWE = 2; wallWallWE = 6; wallWallNS = 8; RIGHTSIDE = true; TOPSIDE = true; break;
        case "C": currBoard = boardC; normalWallNS = 4; normalWallWE = 3; wallWallWE = 7; wallWallNS = 6; RIGHTSIDE = false; TOPSIDE = false; break;
        case "D": currBoard = boardD; normalWallNS = 4; normalWallWE = 2; wallWallWE = 7; wallWallNS = 7; RIGHTSIDE = true; TOPSIDE = false; break;
        default: console.log("ERROR", boardname); return ;
    }

    for (let i = 0; i < WIDTH; i++){
        for (let j = 0 ; j < HEIGHT; j++){
            switch(z[i][j]){
                case 1: currBoard[i][j] = normalWallNS; break;
                case 3: currBoard[i][j] = normalWallWE; break;
                case 5: currBoard[i][j] = wallWallNS; break;
                case 6: currBoard[i][j] = wallWallWE; break;
                default:currBoard[i][j] = z[i][j]; break;

            }
            
        }    
    }
    
    if(RIGHTSIDE){
        for(let k = 0; k < HEIGHT; k++){
            //[currBoard[k][0], currBoard[k][currBoard[k].length - 1]] = [currBoard[k][currBoard[k].length - 1], currBoard[k][0]];
            currBoard[k].reverse()

        }
        
    }

    if(!TOPSIDE){
 
        currBoard.reverse()

    
}

console.log(currBoard)
    refresh()
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
const ztop = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;


class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this._heap[ztop];
  }
  push(...values) {
    values.forEach(value => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > ztop) {
      this._swap(ztop, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[ztop] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > ztop && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  _siftDown() {
    let node = ztop;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}