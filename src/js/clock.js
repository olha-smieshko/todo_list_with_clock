const timerEl = document.querySelector('.js-timer-items');
const btnsEl = document.querySelector('.js-buttons__wrapper');

const timeZone = -new Date().getTimezoneOffset() / 60;


let intervalId = null;

btnsEl.addEventListener('click', onBtnClick);

function onBtnClick(event) {
    const showBtn = event.target.matches('button.js-show');
    const hideBtn = event.target.matches('button.js-hide');
    
    
    if (showBtn) {
        startClock(timerEl);
        setTimeout(() => {            
            document.querySelector('.timer').classList.remove('is-hidden');
            document.querySelector('.js-show').classList.add('is-hidden');
            document.querySelector('.js-hide').classList.remove('is-hidden');
            document.querySelector('.js-change').classList.remove('is-hidden');
        }, 1000);       
        return;
    } 
    if (hideBtn) {
        clearInterval(intervalId);
        setTimeout(() => {
            document.querySelector('.timer').classList.add('is-hidden');
            document.querySelector('.js-show').classList.remove('is-hidden');
            document.querySelector('.js-hide').classList.add('is-hidden');
            document.querySelector('.js-change').classList.add('is-hidden');
        }, 1000)     
        return;
    }
    const textChangeTextBtn = document.querySelector('.js-change').textContent.trim();
   
    setTimeout(() => {
        timerEl.querySelector('.js-timer__timezone').classList.toggle('is-hidden');
        
        if (textChangeTextBtn === 'Прибрати PM/AM') {
          document.querySelector('.js-change').textContent = 'Показати PM/AM';
        } else {
            document.querySelector('.js-change').textContent = 'Прибрати PM/AM';
        }
          
     }, 1000)
   
}

function getTimeComponents(time) {
  const hours = (Math.floor(time / 1000 / 60 / 60) % 24) + timeZone;
  const minutes = Math.floor(time / 1000 / 60) % 60;
  const seconds = Math.floor(time / 1000) % 60;

  return {
    hours,
    minutes,
    seconds,
  };
}

function addPad(value) {
  return String(value).padStart(2, 0);
}

function declensionNum(num, words) {
  return words[
    num % 100 > 4 && num % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
  ];
}

function startClock(rootSelector) {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    
      const { hours, minutes, seconds } = getTimeComponents(currentTime);
      const timeZoneName = hours >= 12 ? 'PM' : 'AM'
    
    rootSelector.querySelector('.js-timer__hours').textContent = addPad(hours);
      rootSelector.querySelector('.js-timer__minutes').textContent = addPad(minutes);
      rootSelector.querySelector('.js-timer__seconds').textContent = addPad(seconds);
      rootSelector.querySelector('.js-timer__timezone').textContent =
        timeZoneName;

    rootSelector.querySelector('.js-timer__hours').dataset.title = declensionNum(hours, ['година', 'години', 'годин']);
    rootSelector.querySelector('.js-timer__minutes').dataset.title = declensionNum(minutes, ['хвилина', 'хвилини', 'хвилин']);
    rootSelector.querySelector('.js-timer__seconds').dataset.title = declensionNum(seconds, ['секунда', 'секунди', 'секунд']);
  }, 1000);
}

