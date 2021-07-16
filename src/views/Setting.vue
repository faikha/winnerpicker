<template>
  <div class="container text-white">
    <link :href="`https://fonts.googleapis.com/css?family=${family.css}`" rel="stylesheet"/>
    <div :style="{fontFamily: family.name}" class="pt-10 pb-10">
      <h1>Setting</h1>
      <div class="form-item">
        <label>Title of competition</label>
        <input
          id="title"
          type="text"
          v-model="title"
          placeholder="Name competition"
        />
        <div class="error" v-if="errors.title.length">{{ errors.title }}</div>
      </div>
      <div class="form-item">
        <label><input type="radio" v-model="hideTitleState" name="typeSource" value=false>Show</label>
        <label><input type="radio" v-model="hideTitleState" name="typeSource" value=true>Hide</label>
      </div>
      <div class="flex">
        <div class="form-item flex-1">
          <label>Title Font Size</label>
          <select v-model="titleFontSize" v-bind:value="fontSize.class" name="titleFontSize" id="titleFontSize" style="color:black">
            <option
              v-for="(font, index) of fontSize" 
              :key="index"
              :value="font"
              >          
            {{font.size}}</option>
          </select>
        </div>

        <div class="form-item flex-1">
          <label>Prizes Font Size</label>
          <select v-model="prizesFontSize" v-bind:value="fontSize.class" name="prizesFontSize" id="prizesFontSize" style="color:black">
            <option
              v-for="(font, index) of fontSize" 
              :key="index"
              :value="font"
              >          
            {{font.size}}</option>
          </select>
        </div>

        <div class="form-item flex-1">
          <label>Name Roller Font Size</label>
          <select v-model="rollerFontSize" v-bind:value="fontSize.class" name="rollerFontSize" id="rollerFontSize" style="color:black">
            <option
              v-for="(font, index) of fontSize" 
              :key="index"
              :value="font"
              >          
            {{font.size}}</option>
          </select>
        </div>

        <div class="form-item flex-1">
          <label>Winner List Font Size</label>
          <select v-model="winnersFontSize" v-bind:value="fontSize.class" name="winnersFontSize" id="winnersFontSize" style="color:black">
            <option
              v-for="(font, index) of fontSize" 
              :key="index"
              :value="font"
              >          
            {{font.size}}</option>
          </select>
        </div>
      </div>
      <div class="flex">
        <div class="form-item flex-1">
          <label>Font color</label>
          <input
            id="fontColor"
            type="color"
            v-model="fontColor"
            placeholder="Font Color"
          />
        </div>
        <div class="form-item flex-1">
          <label>Font Family</label>
          <select v-model="family" v-bind:value="family.name" name="fontFamily" id="fontFamily" style="color:black">
            <option
              v-for="(font, index) of families" 
              :key="index"
              :value="font"
              >          
            {{font.name}}</option>
          </select>
        </div>
      </div>
      <div class="flex">
        <div class="form-item flex-1"></div>
        <div class="form-item flex-1">
          <label>Title Positition Y</label>
          <input
            id="titleY"
            type="number"
            v-model="position.titleY"
            placeholder="Number"
          />
        </div>
        <div class="form-item flex-1"></div>
      </div>
      <div class="flex">
        <div class="form-item flex-1">
          <label>Prizes Positition X</label>
          <input
            id="prizesX"
            type="number"
            v-model="position.prizesX"
            placeholder="Number"
          />
          <label>Prizes Positition Y</label>
          <input
            id="prizesY"
            type="number"
            v-model="position.prizesY"
            placeholder="Number"
          />
        </div>
        <div class="form-item flex-1 pl-10">
          <label>roller Positition X</label>
          <input
            id="rollerX"
            type="number"
            v-model="position.rollerX"
            placeholder="Number"
          />
          <label>roller Positition Y</label>
          <input
            id="rollerY"
            type="number"
            v-model="position.rollerY"
            placeholder="Number"
          />
        </div>
        <div class="form-item flex-1 pl-10">
          <label>Winners Positition X</label>
          <input
            id="winnersX"
            type="number"
            v-model="position.winnersX"
            placeholder="Number"
          />
          <label>Winners Positition Y</label>
          <input
            id="winnersY"
            type="number"
            v-model="position.winnersY"
            placeholder="Number"
          />
        </div>
      </div>

      <div class="form-item">
        <label>Image Background</label>
        <img class="max-h-20" :src="backgroundImage" />
        <div v-if="!backgroundImage">
          <input type="file" round @change="onBgFileChange"/>
        </div>
        <div v-else>
          <!-- <button class="btn btn-primary" icon="insert" @click="replaceBgImage">Replace Background</button> -->
          <button class="btn btn-reset" icon="delete" @click="removeBgImage">Delete</button>
        </div><small>max allowed size is 1Mb with 1920x1080 resolution or bellow</small>
      </div>

      <div class="flex" 
        v-for="(input, index) in prizes"
        :key="`prize-${index}`">
        <div class="flex-1">
          <div class="form-item">
            <label>Prize Image</label>
            <img class="max-h-20" :src="prizes[index].prizeImage" />
            <div v-if="!prizes[index].prizeImage">
              <input type="file" @change="onFileChange($event,index)"/>
            </div>
            <div v-else>
              <button class="btn btn-reset" icon="delete" @click="removeImage">Delete</button>
            </div><small>max allowed size is 1Mb with transparent background</small>
          </div>
        </div>
        <div class="flex-1 pl-10">
          <div class="form-item">
            <div class="flex">
              <div class="flex-1">
                <label>prize amount</label>
                <input
                  id="prizeUnits"
                  type="number"
                  v-model="prizes[index].prizeUnits"
                  placeholder="Prize amount in number"
                />
              </div>
              <div class="flex-1 pl-5">
                <label>Unit</label>
                <input
                  id="prizeUnits"
                  type="text"
                  v-model="prizes[index].unitPrize"
                  placeholder="Unit"
                />
              </div>
            </div>
          
          </div>
          <div class="form-item">
            <label>Prize Description</label>
            <textarea class="text-black"
              id="prizeDescription"
              v-model="prizes[index].prizeDescription"
              placeholder="Your prize description"
            ></textarea>
          </div>
          <div class="svg-item">
            <!--          Add Svg Icon-->
            <svg
              @click="addField(input, prizes)"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class="ml-2 cursor-pointer"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="green"
                d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
              />
            </svg>
            <!--          Remove Svg Icon-->
            <svg
              @click="removeField(index, prizes)"
              v-show="prizes.length > 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class="ml-2 cursor-pointer  mb-5"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="#EC4899"
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="form-item mt-5">
        <div>
          <label>List of contestants</label>
          <textarea class="list text-black" v-model="contestants" rows="10"></textarea>
          <br /><small>Each record must be on a new line, write in this format: ( User, Company )</small>
        </div>
      </div>

      <div v-if="errors.source.length" class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3" role="alert">
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
        <p>{{ errors.source }}</p>
      </div>

      <div v-if="validate" class="flex items-center bg-green-600 text-white text-sm font-bold px-4 py-3" role="alert">
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
        <p>{{ submitMessage }}</p>
      </div>

      <br />

      <button class="btn btn-stop" @click="save">Save settings</button>
    </div>
  </div>
</template>

<script>
let fonts = [
	{
		name: 'Lato',
		css: 'Lato:100,100i,300,300i,400,400i,700,700i,900,900i',
		weights: ['100','300','400','700','900']
	},
	{
		name: 'Montserrat',
		css: 'Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i',
		weights: ['100','200','300','400','500','600','700','800','900']
	},
	{
		name: 'Lora',
		css: 'Lora:400,400i,700,700i',
		weights: ['400', '700']
	},
	{
		name: 'Oswald',
		css: 'Oswald:200,300,400,500,600,700',
		weights: ['200','300','400','500','600','700']
	},
	{
		name: 'Dela Gothic One',
		css: 'Dela+Gothic+One:400',
		weights: ['400']
	},
	{
		name: 'Staatliches',
		css: 'Staatliches:400',
		weights: ['400']
	},
	{
		name: 'Bebas Neue',
		css: 'Bebas+Neue:400',
		weights: ['400']
	},
	{
		name: 'Cinzel',
		css: 'Cinzel:400',
		weights: ['400']
	},
	{
		name: 'Lobster',
		css: 'Lobster:400',
		weights: ['400']
	},
	{
		name: 'Playfair Display',
		css: 'Playfair+Display:400,400i,700,700i,900,900i',
		weights: ['400','700','900']
	},
	{
		name: 'Fira Mono',
		css: 'Fira+Mono:400,500,700',
		weights: ['400','500','700']
	},
	{
		name: 'Pacifico',
		css: 'Pacifico',
		weights: ['400']
	},
	{
		name: 'Source Sans Pro',
		css: 'Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i',
		weights: ['200','300','400','600','700','900']
	}
]; 

let fontSize = [
  { size: 1, class: 'text-xl' },
  { size: 2, class: 'text-2xl' },
  { size: 3, class: 'text-3xl' },
  { size: 4, class: 'text-4xl' },
  { size: 5, class: 'text-5xl' },
  { size: 6, class: 'text-6xl' },
  { size: 7, class: 'text-7xl' },
  { size: 8, class: 'text-8xl' },
  { size: 9, class: 'text-9xl' }
];

export default {
  name: "Setting",
  data: function () {
    return {
      family: { 
        name: 'Lato',
        css: 'Lato:100,100i,300,300i,400,400i,700,700i,900,900i',
        weights: ['100','300','400','700','900']},
      families: fonts,
      url: "",
      title: "",
      position: {
        titleX   : 0,
        titleY   : 0,
        prizesX  : 0,
        prizesY  : 0,
        rollerX  : 0,
        rollerY  : 0,
        winnersX : 0,
        winnersY : 0,
      },
      fontSize: fontSize,
      titleFontSize: {size: 6, class: 'text-6xl'},
      prizesFontSize: {size: 3, class: 'text-3xl'},
      rollerFontSize: {size: 5, class: 'text-5xl'},
      winnersFontSize: {size: 1, class: 'text-xl'},
      fontColor: "#ffffff",
      prizes: [{
        prizeImage: "",
        prizeUnits:"",
        unitPrize:"",
        prizeDescription: "",
      }],
      contestants: "",
      source: null,
      validate: false,
      submitMessage: "",
      hideTitleState: null,
      typeShowContestant: "show",
      backgroundImage:"",
      errors: {
        title: "",
        source: "",
      },
    };
  },
  methods: {
    validation() {
      //reset form errors
      this.resetFormErrors();

      if (!this.title) {
        this.errors.title = "Title is required!";
      }

      if (this.typeSource == "list" && !this.contestants) {
        this.errors.source = "List of contestants is required!";
      }

      if (this.typeSource == "external" && !this.url) {
        this.errors.source = "External source of contestants is required!";
      }

      if (!this.errors.title && !this.errors.source) {
        this.validate = true;
        return true;
      }
      return false;
    },
    //add field
    addField(value, fieldType) {
      fieldType.push({value : ""});
    },
    // remove field
    removeField(index, fieldType) {
      fieldType.splice(index, 1);
    },

    //save data to localStorage
    save() {
      if (this.validation()) {
        //if contestant list is fill
        if (this.contestants) {
          // split data
          let source = this.contestants.split("\n");
          // get only is fill
          this.source = source.filter((item) => item != " " && item != "");
        }

        //after validate data save to localStorage
        localStorage.setItem(
          "setting",
          JSON.stringify({
            url: this.url,
            title: this.title,
            fontColor: this.fontColor,
            position: this.position,
            family: this.family,
            contestants: this.source,
            typeSource: this.typeSource,
            typeShowContestant: this.typeShowContestant,
            prizes:this.prizes,
            backgroundImage: this.backgroundImage, 
            hideTitleState: this.hideTitleState,
            titleFontSize: this.titleFontSize,
            prizesFontSize: this.prizesFontSize,
            rollerFontSize: this.rollerFontSize,
            winnersFontSize: this.winnersFontSize,
          })
        );
        if(this.backgroundImage != ""){
          document.body.style.backgroundImage = `url(${this.backgroundImage})`;
        }
        console.log(localStorage.setting);
        
        // get submit message
        this.submitMessage = "Your settings was succesfully saved!";
      }
    },
    // reset form errors
    resetFormErrors() {
      this.errors = {
        title: "",
        source: "",
      };
    },
    onFileChange(e,index) {
      let files = e.target.files || e.dataTransfer.files;
      if(files[0].size < 1500000){
        this.createImageFile(files[0],index); 
      } else {
        alert('file too big > 1Mb')
      } 
      console.log(this.prizes);
    },
    createImageFile(file,index) {
      let reader = new FileReader();
      let vm = this;
      console.log(vm);

      reader.onload = (e) => {
        vm.prizes[index].prizeImage = e.target.result;
      };
      // console.log(vm.prizes[0]);
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.prizeImage = "";
    },
    onBgFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      if(files[0].size < 1500000){
        this.createBgImageFile(files[0]); 
      } else {
        alert('file too big > 1Mb')
      }
    },
    createBgImageFile(file) {
      let reader = new FileReader();
      let vm = this;

      reader.onload = (e) => {
        vm.backgroundImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeBgImage: function (e) {
      this.backgroundImage = "";
    },
    replaceBgImage: function(e) {
      document.body.style.backgroundImage = `url(${this.backgroundImage})`;
    },
  },
  //after create
  created() {
    // check if localStorage setting exist
    if (localStorage.getItem("setting") !== null) {
      let setting = JSON.parse(localStorage.getItem("setting"));
      this.url = setting.url;
      this.fontColor = setting.fontColor;
      this.position = setting.position;
      this.family = setting.family;
      this.title = setting.title;
      this.hideTitleState = setting.hideTitleState;
      this.prizes = setting.prizes;
      this.backgroundImage = setting.backgroundImage;
      this.typeShowContestant = setting.typeShowContestant;
      this.prizeDescription = setting.prizeDescription;
      this.prizeUnits = setting.prizeUnits;
      this.contestants = setting.contestants.join("\n");
      this.titleFontSize = setting.titleFontSize;
      this.prizesFontSize = setting.prizesFontSize;
      this.rollerFontSize = setting.rollerFontSize;
      this.winnersFontSize = setting.winnersFontSize;
      this.hideTitleState = setting.hideTitleState;
    }
  },
};
</script>

<style scoped>
.error {
  color: orangered;
}

.success {
  color: seagreen;
}

.svg-item {
  display: flex;
}
</style>
