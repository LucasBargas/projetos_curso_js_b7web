function drums() {
  const events = ['click', 'touchstart'];

  events.forEach(userEvent => {
    document.querySelectorAll('.keys [data-key]').forEach(key => {
      key.addEventListener(userEvent, e => {
        e.preventDefault();
  
        const key = e.target.getAttribute('data-key');
        playSound(key)
      })
    })
  });
  
  document.body.addEventListener('keyup', e => {
    playSound(e.code.toLowerCase());
  });
  
  events.forEach(userEvent => {
    document.querySelector('.composer button').addEventListener(userEvent, e => {
      e.preventDefault();
      const song = document.querySelector('#input').value;
      
      if (song !== '') {
        const songArray = song.split('');
        playComposition(songArray);
      } 
    })  
  });
  
  function playSound(sound) {
    const audioElement = document.querySelector(`#s_${sound}`);
    const keyElement = document.querySelector(`div[data-key="${sound}"]`);
  
    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.play();
    }
  
    if (keyElement) {
      keyElement.classList.add('active');
  
      setTimeout(() => {
        keyElement.classList.remove('active');
      }, 300);
    }
  }
  
  function playComposition(songArray) {
    let wait = 0;
  
    songArray.forEach(item => {
      setTimeout(() => {
        playSound(`key${item}`); 
      }, wait);
  
      wait += 250;
    });
  }
}

drums();