<template>
    <div>
    <v-container>
      <v-row no-gutters>
        <v-col 
          cols="8"
          style="padding-left: 50px;"
          >
        <br><br><br>

        <h2>Crear Ruta</h2>
        <v-text-field
              label="Title Storie"
              outlined
              v-model="title_storie"
            >
            </v-text-field>
            <br><br>
            <hr>
            <br>
            <v-chip
                class="ma-2"
                color="red"
                text-color="white"
                v-for="item in steps_storie_prev"
                :key = "item"
              >
                {{ item }}
            </v-chip>
            <br><br>
        <v-select
            :items="stories"
            label="Stories (ruta)"
            dense
            v-model="item_storie_select"
          ></v-select>
          <v-row>
            <v-col cols="6">
                <v-btn
                depressed
                color="blue"
                @click="append_select_item"
                style="margin-left: 100px;"
                >
                  Agregar item Storie
              </v-btn>
            </v-col>
            <v-col cols="6">
                <v-btn
                depressed
                color="#F7DC6F"
                @click="save_storie"
                style="margin-left: 100px;"
                >
                  Save storie
              </v-btn>
            </v-col>
            <br><br><br><br>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-text-field
              label="Agregar Accion"
              outlined
              v-model="action_storie"
            >
            </v-text-field>
            <v-btn
                depressed
                color="purple"
                @click="append_action"
                >
                  Agregar Acción
              </v-btn>

        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-card
          elevation="2"
          color="green"
          class="card-text mt-4"
          v-for="(item,i) in storie_steps"
          :key="i"
        >
            <v-card-title>{{ item.title_storie }}</v-card-title>
            <v-card-text>
              <ul v-for=" (steps,index) in item.steps_storie" :key="index">
                <li>{{ steps }}</li>
              </ul>
            </v-card-text>
            <v-card-text>
              <v-btn
                depressed
                color="red"
                @click="deleteCardStorie(item.title_storie)"
                >
                  Eliminar
              </v-btn>
            </v-card-text>
        </v-card>
        </v-col>

      </v-row>
    </v-container>
    </div>
    </template>
    
    <script>
    export default {
      data() {
        return {
          steps_storie_prev: [],
          storie_steps: [],
          title_storie: null,
          item_storie_select: null,
          action_storie: null,
          stories: []
        };
      },
      methods: {
        append_select_item(){
          this.steps_storie_prev.push(this.item_storie_select);
        },
        append_action(){
          this.stories.push(this.action_storie);
          const actions_storie = this.action_storie;
          this.$store.commit('appendAction', actions_storie);
        },
        save_storie(){
          const step_storie ={
            title_storie: this.title_storie,
            steps_storie: this.steps_storie_prev
          }
          this.storie_steps.push(step_storie); //to show the the list-cards
          this.title_storie = null;
          this.steps_storie_prev = [];
          this.item_storie_select = null;
          this.$store.commit('saveStories',step_storie);
        },
        deleteCardStorie(title_storie){
          this.$store.commit('deleteStories',title_storie)
          const newStories = this.getStories;
          this.storie_steps = newStories;
        }
        
      },
      created(){
        const intent_storie = this.$store.getters.getStories;
        const utter_res = this.$store.getters.getStoriesUtter;
        const actions_storie = this.$store.getters.getStoriesAction;
        this.stories = [...intent_storie,...utter_res,...actions_storie];
        this.storie_steps = [...this.$store.getters.getListStories];    
      },
      computed:{
        getStories(){
          return [...this.$store.getters.getListStories];
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
    