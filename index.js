var apiWord;
let correctLetters = "";
let wrongLetters ="";


// grab the length of the word desired to call the correct api
document.getElementById('regenerate').addEventListener('click', () =>{
    const wordLength = document.getElementById('length').value;
    let apiURL; 

    if (wordLength === '--'){
        apiURL = 'https://random-word-api.herokuapp.com/word';
    }
    else{
        apiURL = `https://random-word-api.herokuapp.com/word?length=${wordLength}`;
    }


    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            document.getElementById('guess').innerText = data[0];
            apiWord = data[0];
        })
        .catch(error => console.error('Error fetching random word:', error));
});


// grab the matched word typed and compare to the api random word
let guessedWord = document.getElementById("typed").value;

for (let i = 0; i < guessedWord.length; i++){
    let foundMatch = false;

    for (let j = 0; j < apiWord.length; j++){
        if (guessedWord[i] === apiWord[j]){
            correctLetters += guessedWord[i];
            foundMatch = true;
            break;
        }
    }

    if (!foundMatch){
        wrongLetters += guessedWord[i];  //need to add the correct & wrong letters to their respective table
    }
} 

// display the previous guessed words (entire word)
let prevGuesses = [];
document.getElementById("submit").addEventListener("click", () => {
    guessedWord = document.getElementById("typed").value;

     if (guessedWord){
        prevGuesses.push(guessedWord)
        document.getElementById("prevGuesses").innerText - prevGuesses.join(", ");
        document.getElementById("typed").value = "";
     }
});