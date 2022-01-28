function clock() {
  const digitalElement = document.querySelector('.digital');
  const sElemenet = document.querySelector('.p_s');
  const mElemenet = document.querySelector('.p_m');
  const hElemenet = document.querySelector('.p_h');

  const fixZero = time => time < 10 ? `0${time}` : time;
 
  const updateClock = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`;

    setPointers(second, minute, hour);
  }

  const setPointers = (second, minute, hour) => {
    const sDeg = ((360 / 60) * second) - 90;
    const mDeg =  ((360 / 60) * minute) - 90;
    const hDeg =  ((360 / 12) * hour) - 90;

    sElemenet.style.transform = `rotate(${sDeg}deg)`;
    mElemenet.style.transform = `rotate(${mDeg}deg)`;
    hElemenet.style.transform = `rotate(${hDeg}deg)`;
  }

  setInterval(updateClock, 1000)
  updateClock();
}

clock();