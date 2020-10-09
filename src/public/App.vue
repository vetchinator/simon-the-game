<template>
    <div class="container">
        <h1>Simon the game</h1>
        <div class="selectMode" v-show="!gameIsActive">
            <p>Select mode</p>
            <div>
                <input type="radio" id="easy" value='1500' v-model="modGame">
                <label for="easy">Easy</label>
            </div>
            <div>
                <input type="radio" id="normal" value='1000' v-model="modGame">
                <label for="normal">Normal</label>
            </div>
            <div>
                <input type="radio" id="hard" value='400' v-model="modGame">
                <label for="hard">Hard</label>
            </div>
        </div>
        <div class="board">
            <div class="groupBtns" :class="{ activeInput: activeInput }">
                <div class="btn btn-red" :class="{ active : activeButton == 1 }" @click="handleBtnClick(1)" ontouchstart=""></div>
                <div class="btn btn-yellow" :class="{ active : activeButton == 2 }" @click="handleBtnClick(2)" ontouchstart=""></div>
                <div class="btn btn-green" :class="{ active : activeButton == 3 }" @click="handleBtnClick(3)" ontouchstart=""></div>
                <div class="btn btn-blue" :class="{ active : activeButton == 4 }" @click="handleBtnClick(4)" ontouchstart=""></div>
                <div class="center">
                    <div class="btnStart" v-if="!gameIsActive" @click="startgame()">Start game</div>
                    <div v-else class="gameInfo">
                        <p>Your score: </p>
                        <div class="score">
                        <p>{{ this.activeCount - 1  }}</p>
                        </div>
                    </div>
                </div>    
            </div>
            <transition name="scale">
                <div class="message" :class="{ greenBackground : message === 'win' }" v-show="message" @click="message = null">
                    <div v-if="message==='lose'">
                        <p>You lose</p>
                        <p>Your score: {{ this.activeCount - 1 }}</p>
                    </div>
                    <div v-if="message==='win'">
                        <p>Congratulations! </p>
                        <p>You win!</p>   
                    </div>
                    <p class="closeParagraph">Tap to close it</p>
                </div> 
            </transition>   
        </div>
                
        
        <audio v-for="(sound, index) in sounds" :ref="'sound' + index" :key=index>
            <source :src="sound" type="audio/mpeg">
        </audio>
        <!--
        <div class="message" v-show="message" @click="message = null">
                <div v-show="message==='lose'">
                    <p >You lose</p>
                    <p>Your score: {{ this.activeCount - 1  }}</p>
                </div>
                <div v-show="message==='win'">
                    <p>Congratulations! </p>
                    
                    <p>You win!</p>
                </div>
                <p class="closeParagraph">Tap here to close it</p>
            </div> 
        
        <div class="message" v-show="message='win'">
                    <div>
                        <div v-show="message==='lose'">
                            <p >You lose</p>
                            <p>Your score: {{ this.activeCount - 1  }}</p>
                        </div>
                        <div v-show="message==='win'">
                            <p>Congratulations! </p>
                            
                            <p>You win!</p>
                        </div>
                        <a class="button" @click="message = null">
                            Continue
                        </a>
                    </div>
                </div>
        --> 

    </div>
</template>

<script>


export default {
    name: 'App', 
    data() {
       return {
           gameIsActive: null,
           message: '',
           inputSeries: [],
           series: [],
           winCount: 6,
           activeCount: 1,
           activeInput: false,
           activeButton: null,
           modGame: '1500',
           sounds: {
               1: './src/public/sounds/1.mp3',
               2: './src/public/sounds/2.mp3',
               3: './src/public/sounds/3.mp3',
               4: './src/public/sounds/4.mp3',
           }
       }
    },
 
    methods: {
        playSound(idx) {
            this.$refs['sound' + idx][0].play();
        },

        handleBtnClick(button) {
            if ( this.activeInput === true ) {
                this.playSound(button);
                let index = this.inputSeries.length;

                if ( button === this.series[index] ) {
                    this.inputSeries.push(button);
                } else {
                    this.message = 'lose';
                    this.activeInput = false;
                    this.gameIsActive = false;
                }

                if ( this.activeCount == this.inputSeries.length ) {
                    if ( this.activeCount === this.winCount ) {
                        console.log('you win');
                        this.message = 'win';
                        this.activeInput = false;
                        this.gameIsActive = false;
                    } else {
                        this.activeCount++;
                        this.displaySerie();
                    }
                }
            }
        },

        startgame() {
            this.message = '';
            this.activeCount = 1;
            setTimeout(() => {this.gameIsActive = true;}, 200);
            this.generateSerie();
            this.displaySerie();
        },
        
        generateSerie() {
            this.series = [];
            for (let i = 0; i < this.winCount; i++) {
                this.series.push(Math.floor((Math.random() * 4) + 1));   
            }
        },

        displaySerie() {
            this.activeInput = false;
            this.inputSeries = [];
            
            for (let i = 0; i < this.activeCount; i++) {
                let to = setTimeout(() => { 
                    this.activeButton = this.series[i];
                    this.playSound(this.activeButton); 

                    setTimeout(() => {
                        this.activeButton = null;
                        if (i === this.activeCount - 1) {
                           this.activeInput = true;
                        }    
                    }, +this.modGame / 2); 
                
                },
                1000 + (i * +this.modGame));     
            }    
        } 
    },

}
</script>
      
<style>

* {
    margin: 0;
    padding: 0;
    font-family: 'Verdana', 'Avenir', Helvetica, Arial, sans-serif;
}

body {
    background-color: #263238;
    color: antiquewhite;
    text-shadow: 0 -1px 2px rgba(0,0,0,.2); 
}

.container {
    margin-top: 6%;
}

p {
    font-size: 1.5em;
}

h1 {
    padding: 20px 0;
    text-align: center;
}

.selectMode {
    margin: 10px auto;
    text-align: center;
    display: flex;
    flex-direction: column;
}

.selectMode div {
    border: 1px solid black;
    padding: 5px; 
}

.btnStart {
    display: flex;
    align-items: center;
    margin: auto;
    width: 80%;
    height: 80%;
    font-size: 1.6em;
    font-weight: bold;
    color: rgba(255,255,255,.6);
    text-shadow: 1px 1px rgba(0,0,0,.3);
    border-radius: 50%;
     background: rgb(10,120,10);
    box-shadow:
    inset 0 0 3px 1px rgba(0,0,0,.8),
    inset rgba(0,0,0,.3) -5px -5px 8px 5px,
    inset rgba(255,255,255,.5) 5px 5px 8px 5px,
    1px 1px 1px rgba(255,255,255,.1),
    -2px -2px 5px rgba(0,0,0,.5);
    transition: .2s;
}

.btnStart:hover {
    color: rgba(255,255,255,.9);
    background: rgb(20,130,20);
}

.btnStart:active {
    background: rgb(0,110,0);
    box-shadow:
    inset 0 0 5px 3px rgba(0,0,0,.8),
    inset rgba(0,0,0,.3) -5px -5px 8px 5px,
    inset rgba(255,255,255,.5) 5px 5px 8px 5px,
    1px 1px 1px rgba(255,255,255,.2),
    -2px -2px 5px rgba(0,0,0,.5);
    outline: none;
}

.center {
    width: 50%;
    height: 50%;
    background-color: #263238;
    overflow: hidden;
    position: absolute;
    margin: 0 auto;
    top: 25%;
    bottom: 25%;
    left: 0;
    right: 0;
    border-radius: 50%;
    display: flex;
    text-align: center;
}

.gameInfo {
    margin: auto;   
}

.score {
    margin-top: 5px;
    padding: 5px 10px;
    background-color: #263238;
    box-shadow: inset 0 0 15px #000;
    letter-spacing: 3px;
    font-size: 22px;
    font-weight: bold;
    border-radius: 10px;
}

.board {
    max-width: 400px;
    height: 400px;
    border-radius: 50%;
    background-color: #263238;
    overflow: hidden;
    position: relative;
    margin: 0 auto;
    box-shadow: 0 0 10px black;
    padding: 20px;
}

.darkBackground {
    z-index: 6;
    background: rgba(0,0,0,0.6);
}

.groupBtns {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #263238;
    overflow: hidden;
    position: relative;
    margin: auto;
}

.btn {
    width: 48%;
    height: 48%;
    opacity: 0.4;
    transition: all .25s ease-out;
    overflow: hidden;
}

.groupBtns.activeInput .btn {
    cursor: pointer;
}

.groupBtns.activeInput .btn:hover {
    opacity: 0.6;
}

.groupBtns.activeInput .btn:active {
    opacity: 1;
    overflow: hidden;
}

.active {
    opacity: 1;
}

.btn-red {
    background-color: red;
    position: absolute;
    left: 0;
    top: 0;
}

.btn-red.active {
    background-color: #ff0004;
}

.btn-green {
    background-color: green;
    position: absolute;
    right: 0;
    top: 0;
}

.btn-green.active {
    background-color: #2bff00;
}

.btn-yellow {
    background-color: yellow;
    position: absolute;
    left: 0;
    bottom: 0;
}

.btn-yellow.active {
    background-color: #fff700;
}

.btn-blue {
    background-color: blue;
    position: absolute;
    right: 0;
    bottom: 0;
}

.btn-blue.active {
    background-color: #0026ff;
}

.message {
    z-index: 5;
    position: absolute; 
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(219, 22, 48, 0.9);
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: palegreen;
    border-radius: 50%;
}

.greenBackground {
    background-color:rgb(40, 167, 69, 0.9);
    color: gold;    
}

.closeParagraph {
    position: absolute;
    bottom: 40px;
}

.scale-enter-active, .scale-leave-active {
    transition: all .4s;
}
.scale-enter, .scale-leave-to {
    transform: scale(0);
}


@media screen and (max-width: 500px ) {
    html {
        font-size: 80%;
    }
    .board {
        width: 300px;
        height: 300px;
    }    
}

</style>
