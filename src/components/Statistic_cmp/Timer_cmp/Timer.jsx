import React from "react";
import "./Timer.css";

const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};
const TIME_LIMIT = 30;
const FULL_DASH_ARRAY = 283;
let timePassed = 0;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.startTimer();
    this.state = {
      timeLeft: TIME_LIMIT,
      isEnd: false,
      isRestart: false,
    };
  }
  formatTimeLeft = (time) => {
    // Наибольшее целое число меньше или равно результату деления времени на 60.
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    // Если значение секунд меньше 10, тогда отображаем его с 0 впереди
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    // Вывод в формате MM:SS
    return `${minutes}:${seconds}`;
  };

  // Делим оставшееся время на определенный временной лимит
  calculateTimeFraction = () => {
    const rawTimeFraction = this.state.timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  };

  // Обновляем значение свойства dasharray, начиная с 283
  setCircleDasharray = () => {
    const circleDasharray = `${(
      this.calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  };

  setRemainingPathColor = (timeLeft) => {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    } else if (timeLeft > warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(alert.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(info.color);
    }
  };

  startTimer = () => {
    timerInterval = setInterval(() => {
      if (!this.state.isEnd) {
        // Количество времени, которое прошло, увеличивается на  1
        timePassed = timePassed >= TIME_LIMIT ? 0 : (timePassed += 1);
        this.setState({
          timeLeft: TIME_LIMIT - timePassed,
          isEnd: false,
        });
        // Обновляем метку оставшегося времени
        document.getElementById("base-timer-label").innerHTML =
          this.formatTimeLeft(this.state.timeLeft);
        if (this.state.timeLeft <= 0) {
          this.setState({
            timeLeft: 0,
            isEnd: true,
          });
          this.props.endGame();
        }
        this.setCircleDasharray();
        this.setRemainingPathColor(this.state.timeLeft);
      }
    }, 1000);
  };

  endGame = () => {
    this.props.endGame();
  };
  shouldComponentUpdate(nextProps, nextState){
    if(this.props.update !== nextProps.update) {
      this.restartTimer();
      return true;
    }
    return false;
  }
  restartTimer = () => {
    timePassed = 0;
    this.setState({
      timeLeft: TIME_LIMIT,
      isEnd: false,
    })
  }
  render() {
    let pathClass = `base-timer__path-remaining ${remainingPathColor}`;
    console.log("timer updated");
    return (
      <div className="base-timer">
        <svg
          className="base-timer__svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="base-timer__circle">
            <circle
              className="base-timer__path-elapsed"
              cx="50"
              cy="50"
              r="45"
            />
            <path
              id="base-timer-path-remaining"
              stroke-dasharray="283"
              className={pathClass}
              d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
            ></path>
          </g>
        </svg>
        <span id="base-timer-label" className="base-timer__label">
          {this.formatTimeLeft(this.state.timeLeft)}
        </span>
      </div>
    );
  }
}
