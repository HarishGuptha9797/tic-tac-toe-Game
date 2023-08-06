let turn='X';
let temp=true;//for draw
let checkGameOver=true;//to stop game after winner declared
console.log(checkGameOver);
const cell_1 = document.querySelector('.cell1');
const cell_2 = document.querySelector('.cell2');
const cell_3 = document.querySelector('.cell3');
const cell_4 = document.querySelector('.cell4');
const cell_5 = document.querySelector('.cell5');
const cell_6 = document.querySelector('.cell6');
const cell_7 = document.querySelector('.cell7');
const cell_8 = document.querySelector('.cell8');
const cell_9 = document.querySelector('.cell9');
const strike=document.querySelector('.strike');
const resultArea = document.querySelector('.result-area');
const title = [cell_1,cell_2,cell_3,cell_4,cell_5,cell_6,cell_7,cell_8,cell_9];
//adding event listeners
/* 
    can  create event listeners for all cell clases using
    document.queryselectorAll('.cell').addEventListener('click',playgame);
    but not useful here.
*/
title.forEach((value)=>{
    value.addEventListener('click',()=>{playGame(value);});
});
//implement hovering
function hover() {
    title.forEach((value)=>{
        value.classList.remove('X_hover');
        value.classList.remove('O_hover');
    });
    const hoverClass = `${turn}_hover`;
    title.forEach((value)=>{ 
        if(value.innerHTML===''&& checkGameOver) {
            value.classList.add(hoverClass);
        }
    });
}
hover(); //hovering at starting of game
//main part of game
function playGame(param)
{
    if(param.innerHTML==='' && checkGameOver) {
        if(turn==='X') {
            param.innerHTML='X'; 
            turn='O';
        }
        else if(checkGameOver) {
            param.innerHTML='O';
            turn='X';
        }
        checkWinner();
        hover();
        document.querySelector('.player-turn').innerHTML=`Turn: ${turn}`;
    }
}
//checking winner
function checkWinner() {
    winningCombinations.forEach((value)=>{
        const {combo,strikeClass}=value;
        const checkValue1=combo[0].innerHTML;
        const checkValue2=combo[1].innerHTML;
        const checkValue3=combo[2].innerHTML;
        if(
            checkValue1!='' && 
            checkValue1===checkValue2 && 
            checkValue1===checkValue3
            ) {
            strike.classList.add(strikeClass);
            gameOver(checkValue1);
            return;
        } 
    });
    let checkAllValues;
    for(let i=0;i<title.length;i++) {
        if(title[i].innerHTML!=='') {
            checkAllValues=true;
        }
        else {
            checkAllValues=false;
            break;
        }
    }
    if(checkAllValues && temp) {
        gameOver(null);
    }
}
//creating strikes and winning combos
const winningCombinations=[
    //rows
    {combo:[cell_1,cell_2,cell_3], strikeClass:'strike-row-1'},
    {combo:[cell_4,cell_5,cell_6], strikeClass:'strike-row-2'},
    {combo:[cell_7,cell_8,cell_9], strikeClass:'strike-row-3'},
    //columns
    {combo:[cell_1,cell_4,cell_7], strikeClass:'strike-column-1'},
    {combo:[cell_2,cell_5,cell_8], strikeClass:'strike-column-2'},
    {combo:[cell_3,cell_6,cell_9], strikeClass:'strike-column-3'},
    //diagonals
    {combo:[cell_1,cell_5,cell_9], strikeClass:'strike-diagonal-1'},
    {combo:[cell_3,cell_5,cell_7], strikeClass:'strike-diagonal-2'}
];
let playAgain;
//printing result
function gameOver(winnerText) {
    let text='Draw';
    if(winnerText!=null) {
        const resultArea = document.querySelector('.result-area');
        resultArea.classList.add('duplicate-result-area');
        resultArea.innerHTML=`
        <h2 class="result"> Winner is ${winnerText} </h2>
        <button class="play-again">Play Again</button>`;
        temp=false;//for not showing draw if we are win by filling all boxes.
    }
    else {
        resultArea.classList.add('duplicate-result-area');
        resultArea.innerHTML=`
        <h2 class="result"> Draw </h2>
        <button class="play-again">Play Again</button> `
    }
    title.forEach((value)=>{
        if(value.innerHTML==='') {
            temp=false;  
        }
    });
    checkGameOver=false;//to not execute boxes after winner declared
    playAgain = document.querySelector('.play-again');
    playAgain.addEventListener('click',startNewGame);
}
//start game again
function startNewGame() {
    strike.className='strike'; //****
    resultArea.innerHTML='';
    resultArea.classList.remove('duplicate-result-area');
    title.forEach((value)=>value.innerHTML='');
    turn='X';
    temp=true;
    checkGameOver=true;
    hover();
    document.querySelector('.player-turn').innerHTML='Turn: X';
}