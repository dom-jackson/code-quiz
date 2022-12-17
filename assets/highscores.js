const initials = localStorage.getItem('initials');
const score = localStorage.getItem('score');


const button = document.querySelector(".play-again-btn");
button.addEventListener('click', () => {
    window.location.href = 'index.html';
});
if (initials && score) {
    const li = document.createElement('li');
    li.innerText = `${initials}: ${score}`;
    const highScoresList = document.querySelector('#high-scores-list');
    highScoresList.appendChild(li);
  }
const scores = JSON.parse(localStorage.getItem("scores"));
if(scores === null) {
    document.querySelector('#high-scores-list').style.display = 'none';
}
else if (scores) {
    for (let i = 0; i < scores.length; i++) {
        const li = document.createElement('li');
        li.innerText = scores[i];
        const highScoresList = document.querySelector('#high-scores-list');
        highScoresList.appendChild(li); 
    }
}