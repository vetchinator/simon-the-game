<template>
    <div class="container">
        <h1>Simon the game</h1>
        
        <div class="board">
            <div class="groupBtns" :class="{ activeInput: activeInput }">
                <div class="btn btn-red" :class="{ active : activeButton == 1 }" @click="handleBtnClick(1)" ontouchstart=""></div>
                <div class="btn btn-yellow" :class="{ active : activeButton == 2 }" @click="handleBtnClick(2)" ontouchstart=""></div>
                <div class="btn btn-green" :class="{ active : activeButton == 3 }" @click="handleBtnClick(3)" ontouchstart=""></div>
                <div class="btn btn-blue" :class="{ active : activeButton == 4 }" @click="handleBtnClick(4)" ontouchstart=""></div>
                <div class="center">
                    <button v-if="!gameIsActive" @click="startgame()">Start game</button>
                    <div v-else class="gameInfo">
                        <p>Your score: </p>
                        <div class="score">
                        <p>{{ this.activeCount - 1  }}</p>
                        </div>
                    </div>
                </div>    
            </div>
            <div class="message" :class="{ greenBackground : message === 'win' }" v-show="message" @click="message = null">
                <div v-if="message==='lose'">
                    <p>You lose</p>
                    <p>Your score: {{ this.activeCount - 1  }}</p>
                </div>
                <div v-if="message==='win'">
                    <p>Congratulations! </p>
                    <p>You win!</p>
                </div>
                <p class="closeParagraph">Tap to close it</p>
            </div>    
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
                    this.activeCount = 1;
                    this.activeInput = false;
                    this.gameIsActive = false;
                }

                if ( this.activeCount == this.inputSeries.length ) {
                    if ( this.activeCount === this.winCount ) {
                        console.log('you win');
                        this.message = 'win';
                        this.activeInput = false;
                    } else {
                        this.activeCount++;
                        this.displaySerie();
                    }
                }
            }
        },

        startgame() {
            this.message = '';
            this.gameIsActive = true;
            this.generateSerie();
            this.displaySerie();
        },
        generateSerie() {
            this.series = [];
            for (let i = 0; i < this.winCount; i++) {
                this.series.push(Math.floor((Math.random() * 4) + 1));   
            }
            console.log(this.series);
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
                    }, 700); 
                
                },
                1000 + (i * 1000));     
            }    
        } 
    },

}
</script>
      
<style>

* {
    margin: 0;
    padding: 0;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    max-width: 1920px;
    margin: 0 auto;
}

body {
    background-color: #263238;
    height: 100%;
    color: antiquewhite;
    text-shadow: 0 -1px 2px rgba(0,0,0,.2);
}

p {
 font-size: 1.5em;
}

h1 {
    padding: 20px 0;
    text-align: center;

}

button {
    margin: auto;
    padding: 5px 10px;
    border-radius: 15px;
    outline: none;
    box-shadow: inset 0 0 15px #000;
    font-size: 1.5rem;
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

.btn:onto

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
    background-color: rgba(219, 22, 48);
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: palegreen;
}

.greenBackground {
    background-color:#28a745;
    color: gold;    
}

.closeParagraph {
    position: absolute;
    bottom: 40px;
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
