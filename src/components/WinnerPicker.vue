<template>
  <div>
    <link :href="`https://fonts.googleapis.com/css?family=${family.css}`" rel="stylesheet"/>
    <div class="pt-5" v-bind:style="{color: fontColor,fontFamily: family.name}">
      <div class="grid h-40 text-center">
        <!-- Title  -->
        <div class="transform " :style="'--tw-translate-y:'+ position.titleY +'rem'" :class="titleFontSize.class" v-show="!hideTitleState" >{{ title }}</div>
      </div>

      <div class="flex">
        <div class="flex-1 text-center">
          <div class="transform" :style="'--tw-translate-y:'+ position.prizesY +'rem; '+'--tw-translate-x:'+ position.prizesX +'rem; '">
            <img class="max-h-64 m-auto mb-8" :src="prizeImage" />
            <div v-if="prizeDescription" class="">
              <div class="text-xl">{{ prizeUnits }} {{unitPrize}}</div>
              <!-- <div class="" v-bind:class="[prizesFontSize.class]">{{ prizeDescription }}</div> -->
            </div>
          </div>
        </div>
        <!-- roller  -->
        <div class="flex-1 pt-28 text-center" v-bind:style="{color: fontColor}">
          <div class="transform" :style="'--tw-translate-y:'+ position.rollerY +'rem; '+'--tw-translate-x:'+ position.rollerX +'rem; '">
            <div v-if="name">
              <div class="text-5xl">{{ splitedStr[0] }}</div>
              <div class="text-2xl">{{ splitedStr[1] }}</div>
            </div>
            <div class="text-4xl" v-if="!name">...</div>
          </div>
        </div>
        <div class="flex-1">
          <div class="transform scrolthis" :style="'--tw-translate-y:'+ position.winnersY +'rem; '+'--tw-translate-x:'+ position.winnersX +'rem; '">
            <div class="ml-24" >LIST PEMENANG :</div>
            <!-- List of pick winners -->
            <div
              class="ml-24"
              v-bind:class="[winnersFontSize.class]"
              v-show="winners.length"
              v-for="(prize, index) of winnerlist"
              :key="index"
            >
                <span class="text-xl">{{prizes[index].prizeDescription}}</span>
              <div
                v-for="(winner, index) of winnerlist[index].winners"
                :key="index"
              >
                {{index + 1}}. {{winner}}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section button action  -->
      <div id="action">
        <button v-show="!hideStartState" class="btn btn-start start" @click="start">
          <span v-show="!startState">Start</span>
          <span v-show="startState">Again</span>
        </button>
        <button v-show="!hidePickerState" class="btn btn-stop stop" @click="stop">
          Pick winner</button>
        <button v-show="!hideNextPrize" class="btn next" @click="nextPrize">
          Next Prize</button>
        <button v-show="!hideDownloadState" class="btn btn-start" @click="download">
          Download</button>
        <button v-show="!hidePickAllWinner" class="btn" @click="pickAllWinner">PickAllWinner</button>
        <button class="btn btn-reset" @click="reset">Reset</button>
        <div id="message" v-show="message">{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
Array.prototype.sum = function (prop) {
  var total = 0
  for ( var i = 0, _len = this.length; i < _len; i++ ) {
      total += parseInt(this[i][prop])
  }
  return total
};

export default {
  name: "WinnerPicker",
  components:{
  },
  data: function () {
    return {
      url: "",
      title: "",
      fontColor: "",
      titleFontSize: {},
      position: null,
      prizesFontSize: {},
      winnersFontSize: {},
      family: {},
      allPrizes: [],
      prizes: [],
      prizeImage: "",
      prizeUnits: "",
      unitPrize: "",
      prizeDescription: "",
      typeShowContestant: "",
      contestants: [],
      contestantList: [],
      remainingContestants: [], 
      listIndex: [],
      prizeIndex: [],
      message: null,
      name: null,
      nameIndex: 0,
      interval: null,
      startState: false,
      stopState: false,
      hideStartState: false,
      hidePickerState: true,
      hideDownloadState: true,
      hideNextPrize: true,
      hidePickAllWinner: false,
      hideTitleState: false,
      useConfetti: true,
      useStopSound: true,
      winners: [],
      winnerlist: [{winners:[]}],
      allWinners: [],
      count: 0,
      textClass:"text-white",
      spinningSound: {file: new Audio('/spinning.mp3'), isPlaying:false},
      winningSound: {file: new Audio('/winning.mp3'), isPlaying:false},
    };
  },
  created() {
    this.getSetting();
    
  },

  
  methods: {
    
    playSound(audio){
      audio.isPlaying = true;
      audio.file.play();
    },
    stopSound(audio){
      audio.isPlaying = true;
      audio.file.pause();
    }, 
    //start roller
    start: function () {
      // run only by limitting the winners
      // console.log(this.prizes.length);

      // console.log(this.prizes.sum("prizeUnits"));

      //always hide start button after click and show picker button
      this.hideStartState = true;
      this.hidePickerState = false;
      this.hidePickAllWinner = true;

      if (this.winners.length < this.prizes.sum("prizeUnits")) {
        //run only is all OK and startState is false
        if (!this._isFilled() || this.startState) {
          return;
        }
        
        let c = parseInt(this.prizes[this.count].prizeUnits);
        
        if(this.winnerlist[this.count].winners.length == c ) {
          c += parseInt(this.winners.length);
          this.winnerlist.push({winners : []}); 
        }
        
        if (this.winners.length == this.prizes.sum("prizeUnits") - 1) {
          this.hideStartState = true;
        }
        this.startState = true;
        this.stopState = false;
        
        let i = 0;
        i = this.getRandomInt(0,this.contestantList.length-1);
        //play the sound
        this.playSound(this.spinningSound);

        //start roller cycle
        this.interval = setInterval(() => {
          this.name = this.contestantList[i];
          this.splitedStr = this.name.split(",");
          this.nameIndex = i;
          if (this.contestantList.length - 1 == i) {
            i = 0;
          } else {
            i++;
          }
        }, this.getRandomInt(5, 10) * 10);
      }
    },
    //get the win                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ner of cycle
    stop: function () {
      if (!this._isFilled()) {
        return;
      }

      // show start button and hide picker button
      this.hidePickerState = true;
      this.hideStartState = false;

      if (this.winners.length == this.prizes.sum("prizeUnits") - 1) {
        this.hideNextPrize = true;
        this.hideStartState = true;
        this.hideDownloadState = false;
      }
      
      this.interval = clearInterval(this.interval);
      // STOP SOUND
      if(this.useStopSound){
        this.stopSound(this.spinningSound);
        this.playSound(this.winningSound);
      }
      // if only start roller
      if (this.startState) {
        // push to winner list
        this.winners.push(this.name);
        this.winnerlist[this.count].winners.push(this.name);
        // remove from contestant list
        this.contestantList.splice(this.nameIndex, 1);
      }

      let c = parseInt(this.prizes[this.count].prizeUnits);
        
      if(this.winnerlist[this.count].winners.length == c ) {
        this.hideStartState = true;
        this.hideNextPrize = false;
        c += parseInt(this.winners.length);
      }

      if (this.winners.length - 1 == this.prizes.sum("prizeUnits") - 1) {
        this.hideNextPrize = true;
      }
      if(this.useConfetti){
        this.$confetti.start();
        setTimeout(() => {
          this.$confetti.stop();
        }, 3000)
      }

      console.log(this.winnerlist);
      this.startState = false;
      this.stopState = true;
    },
    nextPrize: function () {
      // hide next prize button
      this.hideNextPrize = true;
      // show start button bbbbbbbbb
      this.hideStartState = false;
      // set roller contestant name to empty
      this.name = null;
      // update prize data
      this.count++;
      this.prizeImage = this.prizes[this.count].prizeImage;
      this.prizeUnits = this.prizes[this.count].prizeUnits;
      if(this.prizes[this.count].unitPrize !== ""){
        this.unitPrize = this.prizes[this.count].unitPrize;
      } else {
        this.unitPrize = 'Unit';
      }
      this.prizeDescription = this.prizes[this.count].prizeDescription;

      this.winnerlist.push({winners : []}); 
    },
    // reset all data
    reset: function () {
      this.name = null;
      this.message = null;
      this.winners = [];
      this.winnerlist = [{winners:[]}],
      this.startState = false;
      this.stopState = false;
      this.hideStartState = false;
      this.hidePickerState = true;
      this.hideNextPrize = true;
      this.hideDownloadState = true;
      this.hidePickAllWinner = false;
      this.getSetting();
      this.interval = clearInterval(this.interval);
    },
    // get setting data from localstorage
    getSetting() {
      if (localStorage.getItem("setting") !== null) {
        let setting = JSON.parse(localStorage.getItem("setting"));
        this.title = setting.title;
        this.position = setting.position;
        this.fontColor = setting.fontColor;
        this.family = setting.family;
        this.prizes = setting.rollPrizes;
        this.allPrizes = setting.prizes;
        this.url = setting.url;
        this.backgroundImage = setting.backgroundImage;
        this.prizeImage = this.prizes[0].prizeImage;
        this.prizeUnits = this.prizes[0].prizeUnits;
        this.unitPrize = this.prizes[0].unitPrize;
        this.prizeDescription = setting.prizes[0].prizeDescription;
        this.titleFontSize = setting.titleFontSize;
        this.prizesFontSize = setting.prizesFontSize;
        this.winnersFontSize = setting.winnersFontSize;
        this.prizeIndex = setting.prizeIndex;

        if(setting.hideTitleState == 'true'){
          this.hideTitleState = true;
        } else {
          this.hideTitleState = false;
        }

        console.log(this.hideTitleState);
        if (this.backgroundImage) {
          document.body.style.backgroundImage = `url(${this.backgroundImage})`;
        }

        //if external data get it from URL
        if (setting.typeSource === "external") {
          this.getSourceJson();
        } else {
          this.contestantList = setting.contestantList;
          this.contestants = setting.contestants;
          this.listIndex = setting.listIndex;
        }
        // if there is no data in settings
      } else {
        this.$router.push("setting");
      }
    },

    removeWinner: function() {  
      var allWinners = [];
      for(let i = 0; i < this.winnerlist.length;i++){
        var data = this.winnerlist[i].winners;
        for(let i = 0 ; i < data.length; i++) {
          allWinners = [...allWinners, data[i]];

        }
        
      }

      this.allWinners = allWinners;

      for(let i = 0; i < this.contestants.length; i++){
        const arrayContestants = this.contestants[i].list.split('\n');
        this.remainingContestants[i] = arrayContestants.filter(function(val){
          return allWinners.indexOf(val) === -1;
        })

        this.remainingContestants[i] = this.remainingContestants[i].join('\n');
      }

      for(let i = 0; i < this.remainingContestants.length;i++){
        this.contestants[i].list = this.remainingContestants[i];
      }

      console.log(this.remainingContestants);
    },

    resetStorageItem: function (){
      this.removeWinner();

      localStorage.setItem(
        "setting",
        JSON.stringify({
          url: this.url, 
          title: this.title,
          position: this.position,
          fontColor: this.fontColor,
          family: this.family,
          contestantList: this.contestantList,
          contestants: this.contestants,
          listIndex: this.listIndex,
          typeShowContestant: this.typeShowContestant,
          prizes:this.allPrizes,
          prizeIndex: this.prizeIndex,
          backgroundImage: this.backgroundImage, 
          hideTitleState: this.hideTitleState,
          titleFontSize: this.titleFontSize,
          prizesFontSize: this.prizesFontSize,
          rollerFontSize: this.rollerFontSize,
          winnersFontSize: this.winnersFontSize,
        })
      );
    },

     sleep: function (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },



    // get all winner
    pickAllWinner: async function() {
      const startDOM = document.querySelector(".start");
      const stopDOM = document.querySelector(".stop");
      const nextDOM = document.querySelector(".next");

      this.useConfetti = false;
      this.useStopSound = false;

      for(let i = 0; i < this.prizes.length; i++) {
        // console.log(i)
        
        if( i != 0 && i < this.prizes.length){
          await this.sleep(5000)
          nextDOM.click();
          console.log('next')
        }

        for(let j = 0; j< this.prizes[i].prizeUnits;j++){
          // start
          startDOM.click();
          await this.sleep(500)
          console.log('start click');
          // startDOM.click();
          // stop
          if(j == this.prizes[i].prizeUnits - 1){
            this.useStopSound = true;
            this.useConfetti = true;
          } else {
            this.useStopSound = false;
            this.useConfetti = false;
          }

          stopDOM.click();
          // await this.sleep(500)
          console.log('stop click');
          // stopDOM.click();
        }
        

      }

    },
    // download file
    download: function() {
      // write the content
      let content = "";

      content += "The Winner of " + this.titleCase(this.title) + "\n";
      for (let i = 0; i < this.winnerlist.length; i++){
        content += this.prizes[i].prizeUnits + " Units " + this.prizes[i].prizeDescription
        content += "\n";
  
        for (let r = 0; r < this.winnerlist[i].winners.length; r++) { 
          content += r + 1 + ". " +this.winnerlist[i].winners[r];
          content += "\n";
        }
        content += "\n";
      }
      content += "\n"
      content += "This file is generated at " + Date();
      console.log(content);
      // console.log(this.contestants)
      // build data uri
      let blob = new Blob([content], {type: "text/plain;charset=utf-8"});
      // use saveAs from fileSaver.js to save data as txt
      saveAs(blob, 'data.txt');

      this.resetStorageItem();
    },

    titleCase: function(str) {
      return str.toLowerCase().split(' ').map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
      }).join(' ');
    },
    // get randomint
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    // get external data
    async getSourceJson() {
      await fetch(this.url)
        .then((response) => {
          return response.json();
        })
        .then((data) => (this.contestantList = data.map((item) => item.name)))
        .catch((error) => (this.message = error));
    },
    // check contestants list
    _isFilled: function () {
      if (!this.contestantList.length) {
        this.message = "List of contestantList is empty!";
        return false;
      }
      if (this.contestantList.length == 1) {
        this.message = "Contestants must be more then one!";
        return false;
      }
      this.message = null;
      return true;
    },
  },
};
</script>

<style scoped>
textarea.list {
  min-width: 200px;
  max-width: 550px;
  height: 250px;
  line-height: 1.6;
  resize: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
}

#action {
  position: fixed;
  bottom: 30px;
  right: 50px;
}
</style>


