<template>
    <div>
    <v-container>
      <v-row no-gutters>
        <v-col
          cols="7"
          sm="4"
        >
          <form @submit.prevent="generarArchivo">
            <v-text-field
              label="Contexto"
              outlined
              v-model="intent"
            >
            </v-text-field>
            <br><br><br>
          </form> 
        </v-col>

        <!-- Examples -->
        <v-col 
          cols="8"
          style="padding-left: 50px;"
          >
          <v-chip
                class="ma-2"
                color="red"
                text-color="white"
                v-for="item in examples"
                :key = "item"
              >
                {{ item }}
            </v-chip> 
            <hr>
            <br><br>
            <v-textarea
              filled
              name="examples"
              label="Ejemplos"
              v-model="example"
              @keyup.enter="appendItem"
  
            >
            </v-textarea>
  
            <v-btn
              depressed
              color="success"
              @click="appendItem"
            >
              Agregar
            </v-btn>
            <br><br>
            <v-textarea
              filled
              name="respuestas"
              label="Respuesta"
              v-model="respuesta"
  
            >
            </v-textarea>
            <v-textarea
              filled
              name="urlImage"
              label="UrlImage"
              v-model="urlImage" 
            >
            </v-textarea>
        </v-col>
        </v-row>
        <v-row no-gutters>
        <!-- opciones -->
        <v-col cols="12"> 
            <h1>Opciones</h1>
            <br><br><br>
            <v-chip
                class="ma-2"
                color="red"
                text-color="white"
                v-for="item in options_buttons"
                :key = "item"
              >
                {{ item }}
            </v-chip> 
            <hr>
            <br><br>
            <v-textarea
              filled
              name="Title Button"
              label="title(buttons)"
              v-model="title_option"
            >
            </v-textarea>
            <v-textarea
              filled
              name="Link"
              label="Payload(buttons)"
              v-model="payload_option"
            >
            </v-textarea>
            <v-btn
              depressed
              color="success"
              @click="appendButton"
            >
              Agregar Opciones
            </v-btn>
  
            <v-btn
              depressed
              color="error"
              @click="crearItent"
            >
              Crear
            </v-btn>

        </v-col>
      </v-row>
    </v-container>
    </div>
    </template>
    
    <script>
    export default {
      data() {
        return {
            intent:null,
            examples:[],
            options_buttons:[],
            title_option: null,
            payload_option: null,
            option: null,
            example: null,
            respuesta: null,
            urlImage: null,
          }
      },
      methods: {
        appendItem(){
          this.examples.push(this.example);
          this.example=null;
        },
        appendButton(){
          const optionsAction = {
            title_option: this.title_option,
            payload_option: this.payload_option,
          }
          this.options_buttons.push(optionsAction);
        },
        crearItent(){
          const objItem = {
            intent: this.intent,
            examples: this.examples,
            responses: this.respuesta,
            options_button: this.options_buttons,
            url_Image: this.urlImage,
          }
          console.log(this.options_button);
          this.$store.commit('saveIntents', objItem);
          this.intent = null;
          this.respuesta = null;
          this.example = null;
          this.examples = [];
        }
      }
  
    };
    </script>
    <style>
    .card-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 80%;
      margin: auto;
    }
  
    </style>
    