// =========================
// STATE
// =========================
const GOAL_STATE = [
    [1,2,3],
    [4,5,6],
    [7,8,0]
];

let startState = [
    [8,1,3],
    [4,0,2],
    [7,6,5]
];

let imageTiles = [];
let useImageMode = false;

// =========================
// HELPERS
// =========================
function stateToString(state){
    return state.flat().join(",");
}

function isGoal(state){
    return stateToString(state) === stateToString(GOAL_STATE);
}

function findBlank(state){
    for(let r=0;r<3;r++){
        for(let c=0;c<3;c++){
            if(state[r][c]===0) return [r,c];
        }
    }
}

function clone(state){
    return state.map(r=>[...r]);
}

// =========================
// NEIGHBORS
// =========================
function getNeighbors(state){
    const [r,c] = findBlank(state);
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    let res = [];

    for(let [dr,dc] of dirs){
        let nr=r+dr,nc=c+dc;

        if(nr>=0&&nr<3&&nc>=0&&nc<3){
            let newState = clone(state);

            [newState[r][c],newState[nr][nc]] =
            [newState[nr][nc],newState[r][c]];

            res.push(newState);
        }
    }

    return res;
}

// =========================
// RENDER
// =========================
function renderPuzzle(state){

    let html = "<table>";

    for(let r=0;r<3;r++){
        html += "<tr>";

        for(let c=0;c<3;c++){

            let val = state[r][c];

            html += `<td onclick="moveTile(${r},${c})">`;

            if(val === 0){
                html += "";
            }
            else if(useImageMode){

                let imgIndex = val - 1;

                html += `
                    <div style="
                        width:100%;
                        height:100%;
                        background-image:url(${imageTiles[imgIndex]});
                        background-size:100% 100%;
                        background-repeat:no-repeat;
                    "></div>
                `;
            }
            else {
                html += val;
            }

            html += `</td>`;
        }

        html += "</tr>";
    }

    html += "</table>";

    document.getElementById("puzzle").innerHTML = html;
}

// =========================
// MOVE TILE
// =========================
function moveTile(r,c){
    let [br,bc] = findBlank(startState);

    if(Math.abs(r-br)+Math.abs(c-bc)!==1) return;

    [startState[r][c],startState[br][bc]] =
    [startState[br][bc],startState[r][c]];

    renderPuzzle(startState);

    if(isGoal(startState)){
        alert("Solved!");
    }
}

// =========================
// SHUFFLE
// =========================
function shufflePuzzle(){

    let state = [
        [1,2,3],
        [4,5,6],
        [7,8,0]
    ];

    for(let i=0;i<50;i++){
        let n = getNeighbors(state);
        state = n[Math.floor(Math.random()*n.length)];
    }

    startState = state;

    // KEEP IMAGE MODE ON
    // DO NOT reset useImageMode here

    renderPuzzle(startState);
}

// =========================
// IMAGE GENERATOR
// =========================
function generateImagePuzzle(){

    let file = document.getElementById("imageUpload").files[0];
    if(!file){
        alert("Upload image first");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(e){

        let img = new Image();
        img.src = e.target.result;

        img.onload = function(){

            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");

            // FIX: use full image size first (not forced stretch)
            let size = Math.min(img.width, img.height);
            canvas.width = size;
            canvas.height = size;

            // crop center square (prevents face distortion)
            let offsetX = (img.width - size) / 2;
            let offsetY = (img.height - size) / 2;

            ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);

            imageTiles = [];

            let tileSize = size / 3;

            for(let r=0;r<3;r++){
                for(let c=0;c<3;c++){

                    let temp = document.createElement("canvas");
                    temp.width = tileSize;
                    temp.height = tileSize;

                    let tctx = temp.getContext("2d");

                    tctx.drawImage(
                        canvas,
                        c * tileSize,
                        r * tileSize,
                        tileSize,
                        tileSize,
                        0,
                        0,
                        tileSize,
                        tileSize
                    );

                    imageTiles.push(temp.toDataURL());
                }
            }

            useImageMode = true;
            renderPuzzle(startState);

            alert("Image puzzle ready!");
        };
    };

    reader.readAsDataURL(file);
}

// =========================
// ANIMATION
// =========================
function animate(path){

    let i = 0;

    let interval = setInterval(() => {
        if(i >= path.length){
            clearInterval(interval);
            return;
        }

        startState = path[i].map(r=>[...r]);
        renderPuzzle(startState);
        i++;
    }, 400);
}

// =========================
// BFS
// =========================
function bfs(start){

    let queue = [{state:start,path:[start]}];
    let visited = new Set([stateToString(start)]);
    let nodes = 0;

    while(queue.length){
        let {state,path} = queue.shift();
        nodes++;

        if(isGoal(state)){
            return {path,nodesExpanded:nodes,cost:path.length-1};
        }

        for(let n of getNeighbors(state)){
            let k = stateToString(n);
            if(!visited.has(k)){
                visited.add(k);
                queue.push({state:n,path:[...path,n]});
            }
        }
    }
}

// =========================
// DIJKSTRA
// =========================
function dijkstra(start){

    let pq = [{state:start,path:[start],cost:0}];
    let visited = new Set();
    let nodes = 0;

    while(pq.length){

        pq.sort((a,b)=>a.cost-b.cost);

        let {state,path,cost} = pq.shift();
        nodes++;

        let key = stateToString(state);
        if(visited.has(key)) continue;
        visited.add(key);

        if(isGoal(state)){
            return {path,nodesExpanded:nodes,cost};
        }

        for(let n of getNeighbors(state)){
            let k = stateToString(n);
            if(!visited.has(k)){
                pq.push({state:n,path:[...path,n],cost:cost+1});
            }
        }
    }
}

// =========================
// ASTAR
// =========================
function manhattan(state){
    let d = 0;

    for(let r=0;r<3;r++){
        for(let c=0;c<3;c++){
            let v = state[r][c];
            if(v===0) continue;

            let gr = Math.floor((v-1)/3);
            let gc = (v-1)%3;

            d += Math.abs(r-gr)+Math.abs(c-gc);
        }
    }

    return d;
}

function astar(start){

    let open = [{state:start,path:[start],g:0}];
    let visited = new Set();
    let nodes = 0;

    while(open.length){

        open.sort((a,b)=>
            (a.g+manhattan(a.state))-(b.g+manhattan(b.state))
        );

        let {state,path,g} = open.shift();
        nodes++;

        let key = stateToString(state);
        if(visited.has(key)) continue;
        visited.add(key);

        if(isGoal(state)){
            return {path,nodesExpanded:nodes,cost:g};
        }

        for(let n of getNeighbors(state)){
            let k = stateToString(n);
            if(!visited.has(k)){
                open.push({state:n,path:[...path,n],g:g+1});
            }
        }
    }
}

// =========================
// RUN FUNCTIONS
// =========================
function runBFS(){
    let res = bfs(startState);
    if(!res) return alert("No solution");
    updateDashboard("BFS",res,res.cost);
    animate(res.path);
}

function runDijkstra(){
    let res = dijkstra(startState);
    if(!res) return alert("No solution");
    updateDashboard("Dijkstra",res,res.cost);
    animate(res.path);
}

function runAStar(){
    let res = astar(startState);
    if(!res) return alert("No solution");
    updateDashboard("A*",res,res.cost);
    animate(res.path);
}

// =========================
// DASHBOARD
// =========================
function updateDashboard(name,res,time){

    document.getElementById("algorithm").textContent = name;
    document.getElementById("nodes").textContent = res.nodesExpanded;
    document.getElementById("length").textContent = res.cost;
    document.getElementById("time").textContent = time;
}

// =========================
// INIT
// =========================
renderPuzzle(startState);