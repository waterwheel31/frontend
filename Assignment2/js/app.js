

 // Timer related funcitons and variables 
let secondPassed = 0;
let score = 3;



function startTimer() {
    PassageID = setInterval('updateTimer()',1000);
 }

 function stopTimer() {
    clearInterval( PassageID );  
 }
function updateTimer() {
    secondPassed += 1; 
    let timer = document.querySelector('.time')
    timer.textContent = secondPassed;
}

// Score related functions and variables

let scoreTH = [20,10,5];

function resetStars(){
    let stars = document.querySelector('.stars');
    stars.getElementsByTagName('li')[0].getElementsByTagName('i')[0].className="fa fa-star";
    stars.getElementsByTagName('li')[1].getElementsByTagName('i')[0].className="fa fa-star";
    stars.getElementsByTagName('li')[2].getElementsByTagName('i')[0].className="fa fa-star";
}

//  Shuffle function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Main function 

function startGame(){
    let deck = document.querySelector('.deck');
    let move = document.querySelector('.moves') 
    let reset = document.querySelector('.restart');
    let cards = deck.getElementsByTagName('li');
    let stars = document.querySelector('.stars');


    let moves = 0;
    move.textContent = moves; 

    secondPassed = 0
    startTimer();
    resetStars();
     
    let open = 0;    // Number of opened cards 
    let trial  = 0;  // Number of opened cards that are not matched
    let symbol_prev = "";  // Symbol shown on opened previously 
    let open_id = 99;   // ID of opened card


    // Setting click event listner for reset button 
    reset.addEventListener('click', function () {
        console.log('reset clicked');
        startGame();    
    });


    // Shuffling the cards 
    let symbols = [];
    for (i in cards){
        if (i<=16){
            symbol = cards[i].getElementsByTagName('i')[0].className;
            symbols.push(symbol);
        }
        
    }

    symbols = shuffle(symbols);
    console.log(symbols);

    for (i in cards){
        if (i<=16){
            cards[i].getElementsByTagName('i')[0].className = symbols[i];
            
        }
    }

    // Setting Click Event Listner for each card 
    for (i in cards){
        if (i<=16){

        
            cards[i].className = 'card';   // Close all the cards 

            (function(i){
                cards[i].addEventListener('click', function () {

                    cards[i].className = "card open show";
                    open ++;      
                    trial ++;
                    let symbol = cards[i].getElementsByTagName('i')[0].className;
                    let open_id_p = open_id;

                    
                  
                    
                    if (trial == 2){

                        moves ++;
                        move.textContent = moves;

                        //if (moves > scoreTH[0]){ 
                        //    stars.getElementsByTagName('li')[0].getElementsByTagName('i')[0].className="fa fa-star-o";
                        //}
                        if (moves > scoreTH[1]){ 
                            stars.getElementsByTagName('li')[1].getElementsByTagName('i')[0].className="fa fa-star-o";
                            score = 2; 
                        }
                        if (moves > scoreTH[2]){ 
                            stars.getElementsByTagName('li')[2].getElementsByTagName('i')[0].className="fa fa-star-o";
                            score = 1;
                        }


                        if (symbol_prev != symbol){
                            
                            // Wait 1000ms before flipping if the cards do not match
                            setTimeout(() => {
                                open = open -2;  // close again
                                cards[open_id_p].className = 'card';
                            
                                cards[i].className = 'card';
                            }, 1000);
                            
                        }
                        
                        trial = 0;
                        
                    }
                    open_id = i;
                    symbol_prev = symbol;

                    if (open == 16){
                        //alert("You have completed!");
                        stopTimer();
                        let trial = open;
                        let time  = secondPassed; 
                        openModal(score, time, trial);
                    }

            });
            }(i));
        }

    
    }

    
   
 }
 
function openModal(score, time, trial) {
    let modal = document.querySelector('#endmodal');
    let modalBody = document.querySelector('#modal-body');
    console.log('modal Body: '+modalBody);
    modalBody.textContent = 'game complete! :' + 'time: '  + time + ' score: ' + score + ' trial: ' + trial; 
    modal.style.display = 'block';
}

function closeModal() {
    let modal = document.querySelector('#endmodal');
    modal.style.display = 'none';
}



window.onload = startGame();






/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
