<template>
    <div>
    <v-container>
      <v-row no-gutters>
        <v-col 
          cols="8"
          style="padding-left: 50px;"
          >
          <v-card
          elevation="2"
          color="green"
          class="card-text mt-4"
          v-for="(item,i) in intentsExamples"
          :key="i"
        >
            <v-card-title>{{ item.intent }}</v-card-title>
            <v-card-text>
              <ul v-for=" (listexample,index) in item.examples" :key="index">
                <li>{{ listexample }}</li>
              </ul>
            </v-card-text>
            <hr>
            Opciones
            <hr>
            <v-card-text>
              <ul v-for=" (optionLink,index) in item.options_button" :key="index">
                <li>{{ optionLink.title_option}}</li>
              </ul>
            </v-card-text>
            <v-card-text>
              <h2>Respuesta: {{ item.responses }}</h2>
            </v-card-text>
            <v-card-text>
              <v-btn
                depressed
                color="red"
                @click="deleteCard(item.intent)"
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
          intentsExamples: []
        };
      },
      methods: {
        deleteCard(intent){
          this.$store.commit('eliminarIntents',intent);
          this.intentsExamples = this.getIntent;
        }
    },
    created(){
        this.intentsExamples = this.$store.getters.getListExample;
      },
    computed:{
      getIntent(){
        return this.$store.getters.getListExample;
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
    