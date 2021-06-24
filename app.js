const username = document.getElementById('username');
const userContainer = document.querySelector('.user-container');
let mainContainer = document.querySelector('.main-container');
const greeting = document.querySelector('#greeting');
const name = document.getElementById('name');
const btnStart = document.querySelector('.btnStart');
const select = document.querySelector('select');
const body = document.querySelector('body');



const question = document.querySelector('#question');
const answers = document.querySelector('#answers');
const ans1 = document.querySelector('.answer1');
const ans2 = document.querySelector('.answer2');
const ans3 = document.querySelector('.answer3');
const ans4 = document.querySelector('.answer4');
let truAns = document.querySelector('#true');
let btnAdd = document.querySelector('.addSeconds');



// Add seconds bonus
btnAdd.addEventListener('click', function () {
  if (btnAdd.className === 'addSeconds') {
    countDown = countDown + 5;
    btnAdd.className = 'addSecondsActive';
  }
})

// skip question bonus
let skip = document.querySelector('.skip');
skip.addEventListener('click', function () {
  if (skip.className === 'skip') {
    answers.innerHTML = '';
    skip.className = 'skipActive';
    getData(); 
  }
});

let btnSubmit = document.getElementById('btnSubmit');
btnSubmit.addEventListener('click', (event) => {
  let body = document.querySelector('body');
  userContainer.style.display = 'none';
  mainContainer.classList.remove('ka');
  body.style.background = 'none';
  body.style.backgroundColor = '#CBF3F0';
  name.textContent = `Hi ${username.value}! You have 10 Questions`;

})


let interval;
let countDown;
//////////////////////////////////////
const getData = async () => {

  try {
    const url = `https://opentdb.com/api.php?amount=50&&category=${select.selectedIndex+9}`;
    let response = await axios.get(url);
    console.log(response);
    let questionText = response.data.results[1].question;
    let correct_answer = response.data.results[1].correct_answer;
     incorrect_answer = response.data.results[1].incorrect_answers;
    let allAnswers = incorrect_answer.concat(correct_answer);
    
    // shuffle the array of answers to get random answer
    // get freom:  https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
    allAnswers = allAnswers.sort(function (a, b) { return 0.5 -Math.random() })

    // Question Builder
    question.textContent = questionText;
    question.style.marginLeft = '2%';
    question.style.marginRight = '2%';

    
    // Timer Coundown
    function clock() {
      let clock = document.getElementById('clock');
      clock.textContent='';
      clearInterval(interval);
       countDown = 15;
      function count() {
        clock.textContent = countDown;
        if (countDown === 0) {
          clearInterval(interval);
        }
        return countDown--;
      }
      interval = setInterval(count, 1000);
    }
    clock();


    // Create Answers
    function questionBuilder() {
      for (let i = 0; i < allAnswers.length;i++){
        if (allAnswers[i] === correct_answer) {
          let div = document.createElement('div');
          div.textContent = allAnswers[i];
          div.className = 'answer';
          div.setAttribute('type','true');
        answers.append(div);
        }
        else {
          let div = document.createElement('div');
          div.textContent = allAnswers[i];
          div.className = 'answer';
          div.setAttribute('type','false');
        answers.append(div);
        }
       
      }
    }
    questionBuilder();
    

    //Remove Bonus;
    let removeBonus = document.querySelector('.removeBonus');
    removeBonus.addEventListener('click', function () {
      if (removeBonus.className === 'removeBonus') {
        removeBonus.classList.add('removeBonusActive');
        let ff = document.querySelectorAll('[type="false"]');
        ff[0].style.display = 'none';
        ff[2].style.display = 'none';  
      }
     
    })
    
    // Create Event Listener for each answer. Green and Red.
    let answer = document.querySelectorAll('.answer');
    let trueAns = document.getElementById('true');
    let falseAns = document.getElementById('false');
    let trueNumber = parseInt(trueAns.innerHTML);
    let falseNumber = parseInt(falseAns.innerHTML);
    answer.forEach((item) => {
      item.addEventListener('click', function () {
        let clock = document.getElementById('clock');
        
       
        if (clock.textContent > 0) {

          if (item.getAttribute('type') === 'true') {
            trueNumber++;
           
            trueAns.innerHTML = trueNumber;
            item.style.backgroundColor = 'green';
            item.style.color = 'white';
            function remove() {
              answers.innerHTML = '';
            }
          }
          else {
            falseNumber++;
            falseAns.innerHTML = falseNumber;
          
            item.style.backgroundColor = 'red';
            item.style.color = 'white'
            let a = document.querySelector('[type="true"]');
            a.style.backgroundColor = 'green';
            a.style.color = 'white';
            function remove() {
              answers.innerHTML = '';
            }
           
          }

          setTimeout(remove, '1000');
          
          if (trueNumber+falseNumber !== 10) {
            
            setTimeout(getData, '1100');

          }
          else {
            clearInterval(interval);
            clock.innerHTML = '';
            question.innerHTML = trueNumber > falseNumber ? 'YOU WIN' : 'YOU LOSE';
            question.style.justifyContent = 'center';
            question.innerHTML = trueNumber === falseNumber ? 'TRY AGAIN' : question.innerHTML;

          }
        }
        else if (clock.textContent <= 0) {
          clock.textContent = 'YOU LOSE';
          clock.style.justifyContent = 'center';
          clock.style.color = 'red';
        }
       
      });
    });
  

  } catch (error) {
    console.log(error);
  }
}


btnStart.addEventListener('click', function () {
  if (btnStart.className === 'btnStart') {
    getData();
    btnStart.className = 'btnStartActive';
    setTimeout(btnRemove,2000);
  }
});

function btnRemove() {
  btnStart.remove();
}
