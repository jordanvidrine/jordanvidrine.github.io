var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// --  --  --  --  Clock Component  --  --  --  -- //
var Clock = function Clock(props) {
  var minutes = Math.floor(props.timer / 60);
  var seconds = props.timer - minutes * 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  let playButtonClass;

  if (props.status && !props.isWorking ) {
    playButtonClass = "stop-break"
  } else if (props.status && props.isWorking) {
    playButtonClass = "stop"
  } else if (!props.status && !props.isWorking) {
    playButtonClass = "play-break"
  } else {
    playButtonClass = "play"
  }

  var time = minutes + ':' + seconds;
  return React.createElement(
    'div',
    { id: 'clock' },
    React.createElement(
      'button',
      { onClick: props.onClick,
        className: playButtonClass,
      },
      props.status ? React.createElement('i', { className: 'fas fa-stop fa-3x' }) : React.createElement('i', { className: 'fas fa-play fa-3x' })
    ),
    React.createElement(
      'h1',
      { className: 'clock-display' },
      time
    )
  );
};

// --  --  --  --  Settings Component  --  --  --  -- //
var Settings = function Settings(props) {
  return React.createElement(
    'div',
    { className: 'settings' },
    React.createElement(
      'p',
      {
        style: props.isWorking && props.settingType === "Break-Length" ? {
          color: 'black'
        } : !props.isWorking && props.settingType === "Break-Length" ? {
          color: '#328cbc'
        } : props.isWorking && props.settingType === "Session-Length" ? {
          color: '#4fa565'
        } : {
          color: 'black'
        }
      },
      props.settingType
    ),
    React.createElement(
      'div',
      null,
      React.createElement(
        'button',
        {
          id: props.settingType,
          className: 'down',
          onClick: props.onClick },
        React.createElement('i', { className: 'fas fa-arrow-down fa-2x' })
      ),
      React.createElement(
        'h3',
        {
          id: props.settingType
        },
        props.default
      ),
      React.createElement(
        'button',
        {
          id: props.settingType,
          className: 'up',
          onClick: props.onClick },
        React.createElement('i', { className: 'fas fa-arrow-up fa-2x' })
      )
    )
  );
};

// --  --  --  --  Pomodoro Display Component  --  --  --  -- //
var PomodoroDisplay = function PomodoroDisplay(props) {
  var ulStyle = {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0 0 0',
    padding: 0
  };

  var complete = {
    margin: '0 10px 0 0',
    color: 'rgba(0,0,0,0.3)',
    backgroundColor: 'rgba(93,198,119,0.75)',
    width: 50,
    height: 50,
    borderRadius: '30px',
    display: 'flex',
    padding: '1px',
    justifyContent: 'center',
    alignItems: 'center'
  };

  var incomplete = {
    margin: '0 10px 0 0',
    color: '#f9fafc',
    backgroundColor: 'rgba(93,198,119,0.75)',
    width: 50,
    height: 50,
    borderRadius: '30px',
    display: 'flex',
    padding: '1px',
    justifyContent: 'center',
    alignItems: 'center'
  };

  var pomodoros = Array(props.sessionsComplete + props.sessionsLeft).fill().map(function (v, idx) {
    if (idx < props.sessionsComplete) {
      return React.createElement(
        'li',
        { style: complete,
        key: idx },
        React.createElement('i', { className: 'fas fa-check-circle fa-3x' })
      );
    } else {
      return React.createElement(
        'li',
        { style: incomplete,
        key: idx },
        React.createElement('i', { className: 'fas fa-circle fa-3x' })
      );
    }
  });
  return React.createElement(
    'div',
    { id: 'pomodoros' },
    React.createElement(
      'ul',
      { style: ulStyle },
      pomodoros
    )
  );
};

// --  --  --  --  Main Component (Timer)  --  --  --  -- //
var DEFAULTS = {
  timer: 1500,
  sessionLength: 25,
  breakLength: 5,
  sessionsLeft: 5,
  sessionsComplete: 0,
  isRunning: false,
  isWorking: true,
  intervalId: null
};

//from free code camp pomodoro exercise
// Accurate_Interval.js
// Thanks Squeege! For the elegant answer provided to this question:
// http://stackoverflow.com/questions/8173580/setinterval-timing-slowly-drifts-away-from-staying-accurate
// Github: https://gist.github.com/Squeegy/1d99b3cd81d610ac7351
// Slightly modified to accept 'normal' interval/timeout format (func, time).
function accurateInterval(fn, time) {
  var cancel, nextAt, timeout, _wrapper;
  nextAt = new Date().getTime() + time;
  timeout = null;
  _wrapper = function wrapper() {
    nextAt += time;
    timeout = setTimeout(_wrapper, nextAt - new Date().getTime());
    return fn();
  };
  cancel = function cancel() {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(_wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel
  };
};

var boundAccurateInterval = accurateInterval.bind(window);

var Timer = function (_Component) {
  _inherits(Timer, _Component);

  function Timer(props) {
    _classCallCheck(this, Timer);

    var _this = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this, props));

    _this.state = {
      timer: DEFAULTS.timer,
      sessionLength: DEFAULTS.sessionLength,
      breakLength: DEFAULTS.breakLength,
      sessionsLeft: DEFAULTS.sessionsLeft,
      sessionsComplete: DEFAULTS.sessionsComplete,
      isRunning: DEFAULTS.isRunning,
      isWorking: DEFAULTS.isWorking,
      intervalId: DEFAULTS.intervalId
    };
    _this.handleIncOrDec = _this.handleIncOrDec.bind(_this);
    _this.toggleClock = _this.toggleClock.bind(_this);
    _this.countDown = _this.countDown.bind(_this);
    _this.decrementTimer = _this.decrementTimer.bind(_this);
    _this.workingOrNot = _this.workingOrNot.bind(_this);
    _this.restart = _this.restart.bind(_this);
    _this.stopClock = _this.stopClock.bind(_this);
    _this.beeper = _this.beeper.bind(_this);
    return _this;
  }

  _createClass(Timer, [{
    key: 'handleIncOrDec',
    value: function handleIncOrDec(event) {
      var value = void 0;
      var breakLength = this.state.breakLength;
      var sessionLength = this.state.sessionLength;
      var sessionsLeft = this.state.sessionsLeft;

      event.currentTarget.className === "up" ? value = 1 : value = -1;

      event.currentTarget.id === "Break-Length" ? this.setState(Object.assign({}, this.state, {
        breakLength: breakLength + value >= 1 && breakLength + value <= 10 ? breakLength + value : breakLength
      })) : event.currentTarget.id === "Session-Length" ? this.setState(Object.assign({}, this.state, {
        timer: sessionLength + value >= 1 && sessionLength + value <= 25 ? (sessionLength + value) * 60 : sessionLength * 60,
        sessionLength: sessionLength + value >= 1 && sessionLength + value <= 25 ? sessionLength + value : sessionLength
      })) : this.setState(Object.assign({}, this.state, {
        sessionsLeft: sessionsLeft + value >= 1 && sessionsLeft + value <= 10 ? sessionsLeft + value : sessionsLeft
      }));
    }
  }, {
    key: 'toggleClock',
    value: function toggleClock(event) {

      if (this.state.isRunning === true) {
        //get the current interval id to pass to the stop clock function
        var intervalId = this.state.intervalId;
        this.setState({
          //set isRunning to false
          isRunning: false,
          //set intervalId to Null now that it will stop running
          intervalId: 'null'
          //callback function to stop the clock when this state is set
        }, this.stopClock(intervalId));
      } else {
        //if the clock ISNT running, then star the clock and timer
        this.setState(Object.assign({}, this.state, {
          isRunning: !this.state.isRunning,
          intervalId: this.countDown()
        }));
      }
    }
  }, {
    key: 'stopClock',
    value: function stopClock(intervalId) {
      //turns off the countdown function by using the setInterval ID
      intervalId.cancel(); // clearInterval(intervalId)
    }
  }, {
    key: 'countDown',
    value: function countDown() {
      return boundAccurateInterval(function () {
        this.decrementTimer();
        this.workingOrNot();
        this.beeper();
      }.bind(this), 1000);
    }
  }, {
    key: 'decrementTimer',
    value: function decrementTimer() {
      this.state.timer >= -1 && this.state.sessionsLeft !== 0 ? this.setState({
        timer: this.state.timer - 1
      }) : this.setState(Object.assign({}, this.state));
    }
  }, {
    key: 'workingOrNot',
    value: function workingOrNot() {
      //if user is currently working, the timer will set to the Break length
      //if the user is currently on break the timer will be reset to the session length
      var timer = this.state.isWorking ? this.state.breakLength * 60 : this.state.sessionLength * 60;
      //has the timer reached 0 yet?
      this.state.timer < 0 ?
      //if so, its time to reset the timer and the isWorking key
      this.setState({
        //if sessions left -1 does not = 0, then there are still sessions left
        //isWorking will be flipped if sessions are left, if no sessions are left, isWorking will be set to false
        isWorking: this.state.sessionsLeft - 1 > 0 ? !this.state.isWorking : false,
        timer: timer,
        //if the current session is a break, it will reduce sessions left by one, if not, it will keep sessions left the same (only after a break is a full session complete)
        sessionsLeft: !this.state.isWorking ? this.state.sessionsLeft - 1 : this.state.sessionsLeft,
        sessionsComplete: !this.state.isWorking ? this.state.sessionsComplete + 1 : this.state.sessionsComplete
      }) :
      //if the timer isnt 0 yet, keep the state as it is
      this.setState(Object.assign({}, this.state));
    }
  }, {
    key: 'beeper',
    value: function beeper() {
      this.state.timer === 0 ? this.audioBeep.play().catch(function (error) {
        console.log(error);
      }) : Array(); //pointless call - trying to get it to do NOTHING if timer isnt 0
    }
  }, {
    key: 'restart',
    value: function restart() {
      this.stopClock(this.state.intervalId);
      this.setState(Object.assign({}, DEFAULTS));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'timer-container' },
        this.state.sessionsLeft === 0 ? React.createElement(
          'div',
          { className: 'timer-container' },
          React.createElement(
            'h1',
            null,
            'You finished!'
          ),
          React.createElement(
            'button',
            { className: 'restart', onClick: this.restart },
            React.createElement('i', { 'class': 'fas fa-redo-alt fa-4x' })
          )
        ) : React.createElement(
          'div',
          { className: 'timer-container' },
          React.createElement(Clock, {
            timer: this.state.timer,
            onClick: this.toggleClock,
            status: this.state.isRunning,
            isWorking: this.state.isWorking
          }),
          React.createElement(
            'div',
            { id: 'custom-settings' },
            React.createElement(Settings, {
              id: 'break-settings',
              settingType: 'Break-Length',
              'default': this.state.breakLength,
              onClick: this.handleIncOrDec,
              isWorking: this.state.isWorking
            }),
            React.createElement(Settings, {
              id: 'session-settings',
              settingType: 'Session-Length',
              'default': this.state.sessionLength,
              onClick: this.handleIncOrDec,
              isWorking: this.state.isWorking
            }),
            React.createElement(Settings, {
              id: 'num-sessions',
              settingType: 'Session-Count',
              'default': this.state.sessionsLeft,
              onClick: this.handleIncOrDec
            })
          ),
          React.createElement(PomodoroDisplay, {
            sessionsComplete: this.state.sessionsComplete,
            sessionsLeft: this.state.sessionsLeft
          }),
          React.createElement('audio', {
            src: 'https://goo.gl/65cBl1#t=1.1',
            preload: 'auto',
            ref: function ref(audio) {
              return _this2.audioBeep = audio;
            }
          })
        )
      );
    }
  }]);

  return Timer;
}(React.Component);

ReactDOM.render(React.createElement(Timer, null), document.getElementById('root'));
