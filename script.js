let gameController = (function() {

    players = [];
    let turn = 0;
    function startGame(){

        if (players.length > 1){
            gameBoard.startingTemplate();
            printTurnInfo(players[0].getName())
        }
        else {
            alert("need to add players before playing")
        }
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
            if (value == players[0].getSymbol() || value == players[1].getSymbol()) {
                alert("this spot is already taken");
            }
            else{
                
                players[1].makeMove(value);
                printTurnInfo(players[0].getName());
                turn++;
            }

        }
        else{

            if (value == players[0].getSymbol() || value == players[1].getSymbol()) {
                alert("this spot is already taken");
            }
            else{

                players[0].makeMove(value);
                printTurnInfo(players[1].getName());
                turn++;
            }
        }
    }

    function printTurnInfo(name){
        let playerText = document.getElementById("game-info");
        playerText.innerHTML = `its your turn ${name}`;
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
    const getSymbol = () => {
        return mark;
    }
    const makeMove = (value) => {
        gameBoard.mark(mark, value);
    }

    return{
        getName: getName,
        getSymbol: getSymbol,
        makeMove: makeMove
    };
};