var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//NODE script to run while in dev
//npx babel --watch src --out-dir . --presets react-app/prod

//THINGS TO ADD
// ADDED: ability to select different 'groups' of sounds
// ADDED: on pad press, make sound play
// ADDED: screen to show current sound played, stays til next sound
// ADDED: scroll wheel volume change
// ADDED: Volume knob effects volume of all sound samples

var PAD_TOP = ["q", "w", "e", "r"];
var PAD_BOTTOM = ["a", "s", "d", "f"];

// --  --  --  --  Drum Pad Component  --  --  --  -- //
function DrumPad(props) {
  var soundbank = props.soundBank;
  window[props.id] = new Audio(soundbank.sounds[props.id]);
  window[props.id].type = "audio/wav";
  window[props.id].volume = props.volume * .01;
  window[props.id].loop = false;
  return React.createElement(
    "button",
    { id: props.id, className: props.className, onMouseDown: props.onClick, onMouseUp: props.handleMouseUp },
    React.createElement(
      "p",
      null,
      props.id
    )
  );
}
// --  --  --  --  Display Component  --  --  --  -- //

// --  --  --  --  Volume Knob Component  --  --  --  -- //

function VolumeKnob(props) {
  var _styles;

  var scale = function scale(unscaledNum, minAllowed, maxAllowed, min, max) {
    return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
  };
  var rotation = scale(props.volume, -150, 150, 0, 100);
  var styles = (_styles = {
    width: '65px',
    height: '65px',
    backgroundColor: '#f9fafc',
    border: 'none',
    borderRadius: '50%'
  }, _defineProperty(_styles, "border", '1px solid rgba(0,0,0,0.8)'), _defineProperty(_styles, "display", 'flex'), _defineProperty(_styles, "justifyContent", 'center'), _defineProperty(_styles, "transform", "rotate(" + rotation + "deg)"), _styles);

  return React.createElement(
    "div",
    { id: "volume-knob", onMouseDown: props.handleMouseDown, onMouseUp: props.handleMouseUp, style: styles, onWheel: props.handleWheel },
    React.createElement("div", { id: "volume-line" })
  );
}

// --  --  --  --  Main App Component  --  --  --  -- //

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      keyPressed: '',
      mouseDown: null,
      volume: 50,
      soundBank: [{
        title: 'Hip-Hop Kit',
        sounds: {
          q: 'http://jordanvidrine.com/assets/soundbanks/lofi-hiphop/kick.wav',
          w: 'http://jordanvidrine.com/assets/soundbanks/lofi-hiphop/snare.wav',
          e: 'http://jordanvidrine.com/assets/soundbanks/lofi-hiphop/closed-hh.wav',
          r: 'http://jordanvidrine.com/assets/soundbanks/lofi-hiphop/open-hh.wav',
          a: 'http://jordanvidrine.com/assets/soundbanks/lofi-hiphop/clap.wav',
          s: 'http://jordanvidrine.com/assets/soundbanks/lofi-hiphop/perc.wav',
          d: 'http://jordanvidrine.com/assets/soundbanks/lofi-hiphop/tom-1.wav',
          f: 'http://jordanvidrine.com/assets/soundbanks/lofi-hiphop/tom-2.wav'
        }
      }, {
        title: 'House Kit',
        sounds: {
          q: 'http://jordanvidrine.com/assets/soundbanks/house/kick.wav',
          w: 'http://jordanvidrine.com/assets/soundbanks/house/snare.wav',
          e: 'http://jordanvidrine.com/assets/soundbanks/house/closed-hh.wav',
          r: 'http://jordanvidrine.com/assets/soundbanks/house/open-hh.wav',
          a: 'http://jordanvidrine.com/assets/soundbanks/house/clap.wav',
          s: 'http://jordanvidrine.com/assets/soundbanks/house/perc.wav',
          d: 'http://jordanvidrine.com/assets/soundbanks/house/tom.wav',
          f: 'http://jordanvidrine.com/assets/soundbanks/house/tom-2.wav'
        }
      }, {
        title: 'Rock Kit',
        sounds: {
          q: 'http://jordanvidrine.com/assets/soundbanks/rock/kick.wav',
          w: 'http://jordanvidrine.com/assets/soundbanks/rock/snare.wav',
          e: 'http://jordanvidrine.com/assets/soundbanks/rock/closed-hh.wav',
          r: 'http://jordanvidrine.com/assets/soundbanks/rock/open-hh.wav',
          a: 'http://jordanvidrine.com/assets/soundbanks/rock/clap.wav',
          s: 'http://jordanvidrine.com/assets/soundbanks/rock/cowbell.wav',
          d: 'http://jordanvidrine.com/assets/soundbanks/rock/tom.wav',
          f: 'http://jordanvidrine.com/assets/soundbanks/rock/tom-2.wav'
        }
      }],
      soundBankSelected: 'Hip-Hop Kit',
      sound: null
    };
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.handleKeyUp = _this.handleKeyUp.bind(_this);
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handleWheel = _this.handleWheel.bind(_this);
    _this.handleGroupChange = _this.handleGroupChange.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: "handleGroupChange",
    value: function handleGroupChange(e) {
      var currentlySelectedBank = this.state.soundBankSelected;
      var currentlySelectedBankId = this.state.soundBank.findIndex(function (e) {
        return e.title === currentlySelectedBank;
      });
      var newBank = void 0;

      if (currentlySelectedBankId + 1 >= this.state.soundBank.length) {
        newBank = this.state.soundBank[0].title;
      } else {
        newBank = this.state.soundBank[currentlySelectedBankId + 1].title;
      }

      this.setState(Object.assign({}, this.state, {
        soundBankSelected: newBank
      }));
    }
  }, {
    key: "handleWheel",
    value: function handleWheel(e) {
      e.preventDefault;
      var volume = this.state.volume;
      if (e.deltaY == -3 || e.deltaY == -125) {
        volume = volume + 3;
      } else {
        volume = volume - 3;
      }

      if (volume >= 100) {
        volume = 100;
      } else if (volume <= 0) {
        volume = 0;
      }
      console.log(e.deltaY);

      this.setState(Object.assign({}, this.state, {
        volume: volume
      }));
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      var _this2 = this;

      var id = void 0;
      if (e.target.id == "") {
        id = e.target.innerHTML;
      } else {
        id = e.target.id;
      }

      window[id].play();

      //find pad sound
      var soundbank = this.state.soundBank.filter(function (bank) {
        return bank.title === _this2.state.soundBankSelected;
      })[0];
      var sound = soundbank.sounds[id];

      sound = sound.split("/")[sound.split("/").length - 1].split(".")[0].charAt(0).toUpperCase() + sound.split("/")[sound.split("/").length - 1].split(".")[0].split('').splice(1).join('');

      this.setState(Object.assign({}, this.state, {
        keyPressed: id,
        sound: sound
      }));
    }
  }, {
    key: "handleKeyPress",
    value: function handleKeyPress(e) {
      var _this3 = this;

      e.preventDefault();
      //stops audio from looping if key is held (not sure why it loops but this stops it)
      if (this.state.keyPressed == e.key || [].concat(PAD_TOP, PAD_BOTTOM).indexOf(e.key) == -1) {
        return false;
      }
      window[e.key].play();

      //find pad sound
      var soundbank = this.state.soundBank.filter(function (bank) {
        return bank.title === _this3.state.soundBankSelected;
      })[0];
      var sound = soundbank.sounds[e.key];

      //convert last bit of filename to Uppercase word
      sound = sound.split("/")[sound.split("/").length - 1].split(".")[0].charAt(0).toUpperCase() + sound.split("/")[sound.split("/").length - 1].split(".")[0].split('').splice(1).join('');

      this.setState(Object.assign({}, this.state, {
        keyPressed: e.key,
        sound: sound
      }));
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(e) {
      e.preventDefault();
      this.setState(Object.assign({}, this.state, {
        keyPressed: ''
      }));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('keydown', this.handleKeyPress);
      document.addEventListener('keyup', this.handleKeyUp);
      document.addEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(e) {
      e.preventDefault();
      document.addEventListener('mousemove', this.handleMouseMove);
      this.setState(Object.assign({}, this.state, {
        //this sets the original click position, used by mousemove as a base to increase or
        //decrease volume by
        mouseDown: e.clientY
      }));
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(e) {
      document.removeEventListener('mousemove', this.handleMouseMove);
      this.setState(Object.assign({}, this.state, {
        keyPressed: ''
      }));
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(e) {
      var volume = this.state.volume;
      //sets the increment or decrement of the volume to be a lot smaller with a / by 15
      volume = volume + (this.state.mouseDown - e.clientY) / 15;
      var updatedVolume = void 0;

      //set the min and max of volume
      if (volume >= 0 && volume <= 100) {
        updatedVolume = volume;
      } else if (volume <= 0) {
        updatedVolume = 0;
      } else {
        updatedVolume = 100;
      }

      updatedVolume = Number(updatedVolume.toFixed(1).split(".")[0]);
      this.setState(Object.assign({}, this.state, {
        volume: updatedVolume
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var selectedSoundBank = this.state.soundBank.filter(function (bank) {
        return bank.title === _this4.state.soundBankSelected;
      })[0];

      var padsTop = PAD_TOP.map(function (e) {
        var className = _this4.state.keyPressed == e ? "drum-pad-top active" : "drum-pad-top";
        return React.createElement(DrumPad, { id: e, key: e, className: className, soundBank: selectedSoundBank, volume: _this4.state.volume, onClick: _this4.handleClick, onMouseUp: _this4.handleMouseUp });
      });

      var padsBottom = PAD_BOTTOM.map(function (e) {
        var className = _this4.state.keyPressed == e ? "drum-pad-bottom active" : "drum-pad-bottom";
        return React.createElement(DrumPad, { id: e, key: e, className: className, soundBank: selectedSoundBank, volume: _this4.state.volume, onClick: _this4.handleClick, onMouseUp: _this4.handleMouseUp });
      });

      var soundbankTitle = selectedSoundBank.title;
      var groupChoiceClassName = soundbankTitle === "Hip-Hop Kit" ? 'hip-hop' : soundbankTitle === "House Kit" ? 'house' : 'rock';

      return React.createElement(
        "div",
        { id: "drum-machine" },
        React.createElement(
          "div",
          { id: "drum-pads" },
          React.createElement(
            "div",
            { id: "drum-pads-top" },
            padsTop
          ),
          React.createElement(
            "div",
            { id: "drum-pads-bottom" },
            padsBottom
          )
        ),
        React.createElement(
          "div",
          { id: "display-area" },
          React.createElement(
            "div",
            { id: "screen" },
            React.createElement(
              "p",
              null,
              React.createElement(
                "span",
                null,
                "Volume:"
              ),
              " ",
              this.state.volume
            ),
            React.createElement(
              "p",
              null,
              React.createElement(
                "span",
                null,
                "Group:"
              ),
              " ",
              this.state.soundBankSelected
            ),
            React.createElement(
              "p",
              null,
              React.createElement(
                "span",
                null,
                "Sound:"
              ),
              " ",
              this.state.sound
            )
          ),
          React.createElement(
            "div",
            { id: "groups", onClick: this.handleGroupChange },
            React.createElement("div", { id: "group-choice", className: groupChoiceClassName })
          ),
          React.createElement(
            "div",
            { id: "volume" },
            React.createElement(VolumeKnob, { handleMouseDown: this.handleMouseDown,
              handleMouseUp: this.handleMouseUp,
              volume: this.state.volume,
              handleWheel: this.handleWheel
            })
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

var domContainer = document.getElementById("app");
ReactDOM.render(React.createElement(App, null), domContainer);
