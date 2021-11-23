<template>
  <div>    
    <div id="nav">
      <div class="container">
        <div class="subItems">
          <router-link to="/"><i class="fa fa-home"></i></router-link>
          <router-link to="/setting"><i class="fa fa-cog"></i></router-link>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  data: [],
  created() {
    // check if localStorage setting exist
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if(params){
      this.$router.push('/setting')
      // console.log(params)
    }
  }
}


</script>

<style>

body {
  /* font-family: 'Oswald' !important; */
  font-size: 14px !important;
  height: 100%;
  background-image: url('assets/bg-black.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 20px;
}

.container {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  text-transform: uppercase;
  font-size: 50px;
  margin-top:0;
}

ul {
  list-style: none;
}

input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  display: inline-block;
  color: #2c2c2c;
  padding: 8px;
  border: 0;
  font-size: 1em;
  border: 1px solid #ddd;
  resize: none;
  outline:none;
  border-radius: 4px;
}

textarea{
  color: #2c2c2c;
}

input[type="radio"],
input[type="checkbox"] {
  display: inline-block;
  margin-right: 5px;
}

textarea {
  padding: 10px;
  min-height: 50px;
  border: 1px solid #ddd;
}
.clearfix::after, .clearfix::before {
  content: "";
  display: table;
   clear: both;
}

.pull-left { float: left !important;}
.pull-right { float: right !important;}

.form-item {
  margin-bottom: 15px;
}
.form-item span {
  font-weight: 500;
  text-transform: uppercase;
  font-size: 20px;
}
.form-item label {
  margin-right: 10px;
}
.btn {
  outline: none;
  display: inline-block;
  background-color: #2093ff;
  border: 0;
  font-size: 12px;
  text-transform: uppercase;
  padding: 10px 20px;
  color: #fff;
  border-radius: 6px;
  margin: 0 10px 0 0;
}
.btn-start {
  background-color: #b60211;
}
.btn-stop {
  background-color: #087e00;
}
.btn-reset {
  background-color: #1e1e1e;
}

#nav .subItems {
  position: absolute;
  right: 10px;
  top: 20px;
  z-index: 9;
}
#nav a {
  margin-right: 10px;
}
#nav a .fa {
  font-size:1.4em;
  color: #a2a2a2
}
</style>
