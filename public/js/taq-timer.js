var TaqTimer = function(timer, wrapper, display){

  // Vars and helper functions
  var initialMinutes = 10,
  maximumMinutes = 59,
  minimumMinutes = 0,
  initialSeconds = 0,
  maximumSeconds = 59,
  minimumSeconds = 0,
  secondsEllapsed = 0,
  minutesSelected = true,
  checkKey = function(e) {
    var eventObj = window.event ? event : e;

    // Space starts timer
    if (eventObj.keyCode == 32) {
      timer.isRunning() ? pauseTimer() : startTimer();
    }

    if (!timer.isRunning()) {
      // Key arrow right or up increase one minute the timer
      switch(eventObj.keyCode) {
        // Left arrow
        case 37:
          if(!minutesSelected) {
            setMinutesActive();
          }
          stopTimer();
          break;
        // Up arrow
        case 38:
          if(minutesSelected) {
            if (initialMinutes < maximumMinutes) {
              initialMinutes += 1;
            }
          } else {
            if (initialSeconds < maximumSeconds) {
              initialSeconds += 1;
            } else {
              if (initialMinutes < maximumMinutes) {
                initialMinutes += 1;
                initialSeconds = minimumSeconds;
              }
            }
          }

          stopTimer();
          setInitialTime();
          break;
        // Right Arrow
        case 39:
          if(minutesSelected) {
            setSecondsActive();
          }
          stopTimer();
          break;
        // Down Arrow
        case 40:
          if(minutesSelected) {
            if (initialMinutes > minimumMinutes) {
              initialMinutes -= 1;
            }
          } else {
            if (initialSeconds > minimumSeconds) {
              initialSeconds -= 1;
            } else {
              if (initialMinutes > minimumMinutes) {
                initialMinutes -= 1;
                initialSeconds = maximumSeconds;
              }
            }
          }

          stopTimer();
          setInitialTime();
          break;
        case 82:
          resetTimer();
          break;

      }
    }
  },
  setInitialTime = function() {
    setWrapperInactive();
    display.classList.remove('active');

    minutes.innerText = ('0' + initialMinutes).slice(-2);
    seconds.innerText = ('0' + initialSeconds).slice(-2);
  }
  updateTime = function(min, sec){
    // transform into two digit numbers
    min = ("0" + min).slice(-2);
    sec = ("0" + sec).slice(-2);

    // Update the display
    minutes.innerText = min.toString();
    seconds.innerText = sec.toString();

    // Percentage
    var completionPercentage = 100 - (secondsEllapsed / ((initialMinutes * 60) + initialSeconds)) * 100 ;
    changeCompletion(completionPercentage);
  },
  startTimer = function () {
    setTimerActive();
    timer.start({countdown: true, startValues: {minutes: initialMinutes, seconds: initialSeconds}});

    updateTime(timer.getTimeValues().minutes, timer.getTimeValues().seconds);
  },
  pauseTimer = function () {
    timer.pause();
  },
  stopTimer = function(){
    secondsEllapsed = 0;
    timer.stop();
    setWrapperActive();
  },
  changeCompletion = function(percentage) {
    wrapper.style.height = (percentage > 100 ? 100 : percentage) + '%';
  },
  setWrapperInactive = function() {
    wrapper.style.height = '0%';
  },
  setWrapperActive = function(){
    // wrapper.style.height = '100%';
    // DO something cool
  },
  setMinutesActive = function(){
    minutesSelected = true;
    minutes.classList.add('active');
    seconds.classList.remove('active');
  },
  setSecondsActive = function(){
    minutesSelected = false;
    seconds.classList.add('active');
    minutes.classList.remove('active');
  },
  setTimerActive = function(){
    display.classList.add('active');
    instructions.classList.add('active');
    footer.classList.add('active');
  },
  resetTimer = function() {
    instructions.classList.remove('active');
    footer.classList.remove('active');
    stopTimer();
    setMinutesActive();
    setInitialTime();
  };

  // Event binding
  document.onkeydown = checkKey;

  timer.addEventListener('secondsUpdated', function (e) {
    secondsEllapsed++;
    updateTime(timer.getTimeValues().minutes, timer.getTimeValues().seconds);
  });
  timer.addEventListener('targetAchieved', function (e) {
    stopTimer()
  });
};
