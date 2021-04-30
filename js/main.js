
const question = document.querySelector('.question');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const submit = document.querySelector('#submit');

const answers = document.querySelectorAll('.answer');

const showScore = document.querySelector('#show');



var quizCount=0;
var score=0;

fetch('https://opentdb.com/api.php?amount=10').then((apidata) => {
    return apidata.json();
}).then((quizDB) =>{
    quizDB=quizDB.results;
    var loadContent =() => {
            question.innerText= quizDB[quizCount].question;

            options=quizDB[quizCount].incorrect_answers;

            Correct_answer=quizDB[quizCount].correct_answer;

            options.push(Correct_answer);
            // Adding values to options
            var item = options[Math.floor(Math.random() * options.length)];
            option1.innerText=item;
            options = options.filter(i => i !== item)

            var item = options[Math.floor(Math.random() * options.length)];
            option2.innerText=item;
            options = options.filter(i => i !== item)

            var item = options[Math.floor(Math.random() * options.length)];
            option3.innerText=item;
            options = options.filter(i => i !== item)

            var item = options[Math.floor(Math.random() * options.length)];
            option4.innerText=item;
            options = options.filter(i => i !== item)

            // Set right id for right answer
            if(option1.innerText==Correct_answer){
                ansid="ans1";
            }
            if(option2.innerText==Correct_answer){
                ansid="ans2";
            }
            if(option3.innerText==Correct_answer){
                ansid="ans3";
            }
            if(option4.innerText==Correct_answer){
                ansid="ans4";
            }
    }
    loadContent();


    
    

    // Checking the right answer
    // Submit button click function
    const getCheckAnswer = () =>{
        let answer;

        answers.forEach((answers) => {
            if (answers.checked) {
                answer = answers.id;
            }
        });
        return answer;
    };

    submit.addEventListener('click', ()=>{
        const checkAnswer= getCheckAnswer();
        console.log('my seleccted answer= '+checkAnswer);
        console.log('correct answer = '+Correct_answer);
        console.log('ansid= '+ansid)
        if (checkAnswer==ansid) {
            score++;
        }
        if (quizCount < quizDB.length-1) {
            quizCount++;
            loadContent();
        }
        else{
            showScore.innerHTML= `
                <h3>You scored ${score}/${quizDB.length} </h3>
                <button class="btn" onclick="location.reload()">Play Again</button>
            `;
            submit.classList.add('hide');
            showScore.classList.remove('score');
        }
        
    })
})
.catch(err =>{
    console.error(err);
})

