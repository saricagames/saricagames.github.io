(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const i={ROCK:"rock",PAPER:"paper",SCISSORS:"scissors"},c={WIN:"win",LOSE:"lose",TIE:"tie"};class d{constructor(){this.totalRounds=0,this.currentRound=0,this.userScore=0,this.aiScore=0,this.roundHistory=[],this.gameState="setup"}initializeGame(e){this.totalRounds=parseInt(e),this.currentRound=0,this.userScore=0,this.aiScore=0,this.roundHistory=[],this.gameState="playing"}getAIChoice(){const e=Object.values(i),s=Math.floor(Math.random()*e.length);return e[s]}determineResult(e,s){return e===s?c.TIE:{[i.ROCK]:i.SCISSORS,[i.PAPER]:i.ROCK,[i.SCISSORS]:i.PAPER}[e]===s?c.WIN:c.LOSE}playRound(e){if(this.gameState!=="playing")throw new Error("Game is not in playing state");const s=this.getAIChoice(),n=this.determineResult(e,s);n===c.WIN?this.userScore++:n===c.LOSE&&this.aiScore++;const t={round:this.currentRound+1,userChoice:e,aiChoice:s,result:n,userScore:this.userScore,aiScore:this.aiScore};return this.roundHistory.push(t),this.currentRound++,this.currentRound>=this.totalRounds&&(this.gameState="finished"),t}getGameStats(){return{totalRounds:this.totalRounds,currentRound:this.currentRound,userScore:this.userScore,aiScore:this.aiScore,gameState:this.gameState,roundHistory:[...this.roundHistory]}}getFinalResult(){return this.gameState!=="finished"?null:this.userScore>this.aiScore?"You won the game! 🎉":this.aiScore>this.userScore?"AI won the game! 🤖":"It's a tie! 🤝"}reset(){this.totalRounds=0,this.currentRound=0,this.userScore=0,this.aiScore=0,this.roundHistory=[],this.gameState="setup"}}class h{constructor(e){this.onStartGame=e,this.element=null}render(){return this.element=document.createElement("div"),this.element.className="game-setup",this.element.innerHTML=`
      <div class="setup-container">
        <h1>🪨 📄 ✂️ Rock Paper Scissors</h1>
        <p>Welcome to Rock Paper Scissors! How many rounds would you like to play?</p>
        
        <div class="rounds-input">
          <label for="rounds">Number of rounds:</label>
          <input type="number" id="rounds" min="1" max="20" value="3" />
        </div>
        
        <button id="start-game" class="start-button">Start Game</button>
      </div>
    `,this.attachEventListeners(),this.element}attachEventListeners(){const e=this.element.querySelector("#start-game"),s=this.element.querySelector("#rounds");e.addEventListener("click",()=>{const n=parseInt(s.value);n>=1&&n<=20?this.onStartGame(n):alert("Please enter a number between 1 and 20")}),s.addEventListener("keypress",n=>{n.key==="Enter"&&e.click()})}destroy(){this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class m{constructor(e,s){this.onChoiceSelect=e,this.onNewGame=s,this.element=null}render(e){this.element=document.createElement("div"),this.element.className="game-board";const{totalRounds:s,currentRound:n,userScore:t,aiScore:o,gameState:r}=e;return this.element.innerHTML=`
      <div class="game-header">
        <h1>🪨 📄 ✂️ Rock Paper Scissors</h1>
        <div class="score-board">
          <div class="score">
            <span class="player">You</span>
            <span class="points">${t}</span>
          </div>
          <div class="vs">VS</div>
          <div class="score">
            <span class="player">AI</span>
            <span class="points">${o}</span>
          </div>
        </div>
        <div class="round-info">
          Round ${n+1} of ${s}
        </div>
      </div>

      <div class="game-area">
        <div class="choices-container">
          <h2>Choose your move:</h2>
          <div class="choices">
            <button class="choice-btn" data-choice="${i.ROCK}">
              🪨 Rock
            </button>
            <button class="choice-btn" data-choice="${i.PAPER}">
              📄 Paper
            </button>
            <button class="choice-btn" data-choice="${i.SCISSORS}">
              ✂️ Scissors
            </button>
          </div>
        </div>

        <div class="game-status">
          <div id="game-message" class="message"></div>
        </div>
      </div>

      <div class="game-actions">
        <button id="new-game" class="new-game-btn">New Game</button>
      </div>
    `,this.attachEventListeners(),this.element}attachEventListeners(){const e=this.element.querySelectorAll(".choice-btn"),s=this.element.querySelector("#new-game");e.forEach(n=>{n.addEventListener("click",t=>{const o=t.target.dataset.choice;this.onChoiceSelect(o)})}),s.addEventListener("click",()=>{this.onNewGame()})}updateGameStats(e){if(!this.element)return;const{currentRound:s,totalRounds:n,userScore:t,aiScore:o}=e,r=this.element.querySelector(".score .points"),l=this.element.querySelectorAll(".score .points")[1],u=this.element.querySelector(".round-info");r&&(r.textContent=t),l&&(l.textContent=o),u&&(u.textContent=`Round ${s+1} of ${n}`)}showRoundResult(e){if(!this.element)return;const s=this.element.querySelector("#game-message"),{userChoice:n,aiChoice:t,result:o}=e,r={[i.ROCK]:"🪨",[i.PAPER]:"📄",[i.SCISSORS]:"✂️"},l={win:"You win this round! 🎉",lose:"AI wins this round! 🤖",tie:"It's a tie! 🤝"};s.innerHTML=`
      <div class="round-result">
        <div class="choices-display">
          <div class="choice">
            <span class="emoji">${r[n]}</span>
            <span class="label">You chose ${n}</span>
          </div>
          <div class="vs">VS</div>
          <div class="choice">
            <span class="emoji">${r[t]}</span>
            <span class="label">AI chose ${t}</span>
          </div>
        </div>
        <div class="result-message">${l[o]}</div>
      </div>
    `}showGameOver(e){if(!this.element)return;const s=this.element.querySelector("#game-message");s.innerHTML=`
      <div class="game-over">
        <h2>Game Over!</h2>
        <div class="final-result">${e}</div>
        <p>Click "New Game" to play again!</p>
      </div>
    `,this.element.querySelectorAll(".choice-btn").forEach(t=>{t.disabled=!0,t.classList.add("disabled")})}destroy(){this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}class p{constructor(){this.game=new d,this.currentComponent=null,this.appElement=document.getElementById("app")}init(){this.showSetup()}showSetup(){this.destroyCurrentComponent(),this.currentComponent=new h(e=>{this.startGame(e)}),this.appElement.appendChild(this.currentComponent.render())}startGame(e){this.game.initializeGame(e),this.showGameBoard()}showGameBoard(){this.destroyCurrentComponent(),this.currentComponent=new m(e=>this.handleUserChoice(e),()=>this.showSetup()),this.appElement.appendChild(this.currentComponent.render(this.game.getGameStats()))}handleUserChoice(e){try{const s=this.game.playRound(e);this.currentComponent.updateGameStats(this.game.getGameStats()),this.currentComponent.showRoundResult(s),this.game.gameState==="finished"&&setTimeout(()=>{const n=this.game.getFinalResult();this.currentComponent.showGameOver(n)},1500)}catch(s){console.error("Error playing round:",s),alert("An error occurred while playing the round. Please try again.")}}destroyCurrentComponent(){this.currentComponent&&typeof this.currentComponent.destroy=="function"&&this.currentComponent.destroy(),this.currentComponent=null}destroy(){this.destroyCurrentComponent(),this.game.reset()}}document.addEventListener("DOMContentLoaded",()=>{new p().init()});
