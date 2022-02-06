function hashGame() {
  const square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
  };
  
  let playerTurn = '';
  let warning = '';
  let playing = false;
  
  reset();
  
  document.querySelector('.reset').addEventListener('click', reset);
  document.querySelectorAll('.item').forEach(item => item.addEventListener('click', itemClick));
  
  function itemClick(e) {
    const item = e.target.getAttribute('data-item');
    if (playing && square[item] === '') {
      square[item] = playerTurn;
      renderSquare();
      togglePlayer();
    }
  }
  
  function reset() {
    warning = '';
  
    const random = Math.floor(Math.random() * 2);
    playerTurn = (random === 0) ? 'x' : 'o';
  
    for(let i in square) {
      square[i] = '';
    }
  
    playing = true;
  
    renderSquare();
    renderInfo();
  }
  
  function renderSquare() {
    for(let i in square) {
      const item = document.querySelector(`div[data-item=${i}]`);
      item.innerHTML = square[i];
    }
  
    checkGame();
  }
  
  function renderInfo() {
    document.querySelector('.vez').innerHTML = playerTurn;
    document.querySelector('.resultado').innerHTML = warning;
  }
  
  function togglePlayer() {
    playerTurn = (playerTurn === 'x') ? 'o' : 'x';
    renderInfo();
  }
  
  function checkGame() {
    if (checkWinnerFor('x')) {
      warning = '0 "x" venceu';
      playing = false;
  
    } else if (checkWinnerFor('o')) {
      warning = '0 "o" venceu';
      playing = false;
  
    } else if (isFull()) {
      warning = 'Deu empate!';
      playing = false;
    }
  }
  
  function checkWinnerFor(player) {
    const pos = [
      'a1,a2,a3',
      'b1,b2,b3',
      'c1,c2,c3',
  
      'a1,b1,c1',
      'a2,b2,c2',
      'a3,b3,c3',
  
      'a1,b2,c3',
      'a3,b2,c1',
    ];
  
    for (let w in pos) {
      const pArray = pos[w].split(','); 
      const hasWon = pArray.every(option => square[option] === player);
      if (hasWon) {
        return true;
      }
    }
  
    return false;
  }
  
  function isFull() {
    for(let i in square) {
      if (square[i] === '') {
        return false;
      }
    }
    
    return true;
  }
}
hashGame();