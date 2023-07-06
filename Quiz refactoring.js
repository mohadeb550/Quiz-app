
// Global Reference -------

let h2 = document.getElementById(`question`);
let btnParentDiv = document.getElementById(`answer-buttons`);
let nextBtn = document.getElementById(`next-btn`);

let currentSourceArrayIndex = 0;
let scoreIndex = 0;


// Source Data Array --------

const sourceDataArray = [
    {questionText: `Which is largest animal in the world?`,
    
    answers: [
        {text:`Shark`, correct:false},
        {text:`Blue whale`, correct:true},
        {text:`Elephant`,correct:false},
        {text:`Giraffe`, correct:false},
    ]
},
{questionText: `Which is largest desert in the world?`,
    
    answers: [
        {text:`Kalahari`, correct:false},
        {text:`Gobi`, correct:false},
        {text:`Sahara`,correct:false},
        {text:`Antartica`, correct:true},
    ]
},
{questionText:`Which is largest Rich Country in the world?`,
    answers:[
        {text:`China`, correct:false},
        {text:`India`, correct:false},
        {text:`USA`, correct: true},
        {text:`Russia`,correct: false}
    ]
},
{questionText:`Which is smallest country in the world?`,
answers:[
    {text:`Sri-Lanka`, correct:false},
    {text:`India`, correct:false},
    {text:`Bangladesh`, correct: false},
    {text:`I Don't know`,correct: true}
]
}
]

// Automatic Run Quiz function -------

runQuiz();

function runQuiz (){

    currentSourceArrayIndex = 0;
    scoreIndex = 0;
    setQuestion();
}

// remove default value function --------

function removeDefaultValue (){
    while(btnParentDiv.firstChild){
        btnParentDiv.firstChild.remove();
    }
}


// setup question & all things ---------

function setQuestion (){

    removeDefaultValue();
    nextBtn.style.display = `none`;
    
    let arrayFirstObj = sourceDataArray[currentSourceArrayIndex];

    let QNumber = currentSourceArrayIndex + 1;
    h2.innerText = `${QNumber}.${arrayFirstObj.questionText}`;

    createButton(arrayFirstObj.answers);
}


// create buttons & click event listener ------

function createButton (myArray){

    myArray.forEach(element => {
        
        let button = document.createElement(`button`);
        button.classList.add(`btn`);
        button.innerText = element.text;
        btnParentDiv.appendChild(button);
        if(element.correct){
            button.dataset.type = element.correct;
        }

        button.addEventListener(`click`, afterClickButton);
    });
}

// after click buttons callback function -------

function afterClickButton (e){

    if(e.target.dataset.type){
        e.target.classList.add(`correct`);
        scoreIndex++;
    }else{
        e.target.classList.add(`incorrect`);
    }

   let btnArray= Array.from(btnParentDiv.children);
   btnArray.forEach(element =>{
    if(element.dataset.type){
        element.classList.add(`correct`);
    } 
    else{
        element.classList.add(`incorrect`);
    }
    element.classList.add(`disabled`);
   })

   nextBtn.innerHTML = `Next`;
   nextBtn.style.display = `block`;
   nextBtn.addEventListener(`click`, afterClickNxtBtn);
}


// after click nextButton callback function ---------

function afterClickNxtBtn (){

    if(currentSourceArrayIndex < sourceDataArray.length){
        nextPageSetup();
    }else{
        runQuiz();
    }
}

// Next page setup function ---------

function nextPageSetup (){
    currentSourceArrayIndex++;

    if(currentSourceArrayIndex < sourceDataArray.length){
        setQuestion();
    }else{
        showScore();
    }
}

// showScore function setup --------

function showScore (){
    removeDefaultValue();

    h2.innerText = `You Scored ${scoreIndex} out of ${sourceDataArray.length}!`;
    nextBtn.innerText = `Play Again`;
    nextBtn.style.display = `block`;
}
