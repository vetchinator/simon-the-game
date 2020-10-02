<template>
    <div class="container">
        <h1>Simon the game</h1>
        <div class="board">
            <div class="groupBtns">
                <div class="btn btn-red"></div>
                <div class="btn btn-yellow"></div>
                <div class="btn btn-green"> </div>
                <div class="btn btn-blue"></div>
                <div class="center"></div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'App', 
    data() {
       return {}
    },
 
    methods: {
        
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
}

h1 {
    padding: 20px 0;
    text-align: center;
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
    opacity: 0.6;
}

.btn:hover {
    opacity: 0.75;
}

.btn-red {
    background-color: red;
    position: absolute;
    left: 0;
    top: 0;
}

.btn-green {
    background-color: green;
    position: absolute;
    right: 0;
    top: 0;
}

.btn-yellow {
    background-color: yellow;
    position: absolute;
    left: 0;
    bottom: 0;
}

.btn-blue {
    background-color: blue;
    position: absolute;
    right: 0;
    bottom: 0;
}
</style>
