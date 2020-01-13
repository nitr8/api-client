<template>
  <div id="wrapper">
      <img id="logo" src="~@/assets/logo2.png" alt="electron-vue">
      <main>
        <div class="left-side">
            <span class="title">Information</span>
            
        </div>
        <div class="right-side">
            <div class="doc">
                <div class="title">ToDo</div>
                <p>
                    Welcome to the ToDo Page!
                </p>
                <router-link to="/" tag="button">Home</router-link>
                <button @click="fetchTodos()" class="btn btn-primary">Fetch Todos</button>
                <ul>
                    <li v-for="todo in todos" :key="todo.id"></li>
                </ul>
             </div>
        </div>
      </main>
  </div>
</template>

<script>
  const axios = require('axios')
  export default {
    name: 'ToDos',
    data: () => {
      return {
        todos: []
      }
    },
    methods: {
      async fetchTodos () {
        axios
          .get('http://localhost:3001/')
          .then(response => {
            this.todos = response.data
          })
          .catch(error => {
            if (error) throw new Error(error)
          })
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
