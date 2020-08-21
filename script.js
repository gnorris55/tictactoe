let gameController = (function() {

    players = [];
    let turn = 0;
    function startGame(){
        gameBoard.startingTemplate();
    }

    function createPlayer(name, symbol){

        if (players.length > 1){
            alert("too many players");
        }
        else{
            let newPlayer = player(name, symbol);
            players.push(newPlayer);
            addPlayer(name,symbol);
        }
        
    }
    function addPlayer(name, symbol){

        let playerTable = document.getElementById("players");
        let addedPlayer = document.createElement("h3");
        addedPlayer.innerHTML = `name: ${name}, symbol: ${symbol}`;
        playerTable.appendChild(addedPlayer);
    }
    
    function playerMove(value){

        if (turn % 2 == 0){
            players[1].makeMove(value);
        }
        else{
            players[0].makeMove(value);
        }
        turn++;
    }

    return{
        startGame: startGame,
        createPlayer: createPlayer,
        playerMove: playerMove
    };

}) ();



let gameBoard = (function(){

    let grid = [];
    function render() {
        let template = document.getElementById("template").innerHTML;
        let rendered = Mustache.render(template, {grid});
        document.getElementById('contents').innerHTML = rendered;
    }
    
    function startingTemplate() {
        grid.length = 9;
        for (let i = 0; i < grid.length;i++){
            grid[i] = i
        }
        render();
    }

    function mark(type, position) {
        grid[position] = type;
        render()
    }

    return{
        startingTemplate: startingTemplate,
        mark: mark
    };

}) ();

const player = (name, mark, gender) => {

    const getName = () => {
        return name
    }
    const makeMove = (value) => {
        gameBoard.mark(mark, value);
    }

    return{
        getName: getName,
        makeMove: makeMove
    };
};