<template>
    <div>
    <v-container>
      <v-row no-gutters>
            <v-col cols="6">

                <v-btn
                depressed
                color="red"
                @click="sendDataTrain"
                style="margin-left: 100px;"
                >
                Entrenar Data(Train Data)
                </v-btn>
            </v-col>
            <br><br>
            <v-col cols="6">                
                <v-btn
                depressed
                color="green"
                @click="loadModel"
                style="margin-left: 100px;"
                >
                Cargar modelo(load model)
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
          listexamples: [],
          storie_steps: [],
          action_storie: [],
          namegz: null,
        };
      },
      methods: {
        generarData(){
         let yamlString = `intents:\n`;
          this.listexamples.forEach((item, i) => {
            yamlString += `  - ${item.intent}\n`;
          });
          //actions
          yamlString += `actions: [`;
           this.action_storie.forEach((item, i) => {
            if(i===0){
              yamlString += `${item}`;
            }
            else{
              yamlString += `,${item}`;
            }
           });
           yamlString += `]\n`

          //respuestas
          this.listexamples.forEach((item,i)=>{
            if(i==0){yamlString += `responses:\n`;}
              yamlString +=`  utter_${item.intent}:\n`;
              yamlString +=`  - text: ${item.responses}\n`
              yamlString +=`    image: ${item.url_Image}\n`
              yamlString +=`    buttons:\n`
              item.options_button.forEach((dataoption,index) => {
                console.log(JSON.stringify(dataoption));
                yamlString +=`    - title: ${dataoption.title_option}\n`
                yamlString +=`      payload: ${dataoption.payload_option}\n` 
              })
            
          });
          yamlString +=`session_config:\n`;
          yamlString +=`  session_expiration_time: 60\n`;
          yamlString +=`  carry_over_slots_to_new_session: true\n`;
          // preguntas cliente
          yamlString += `nlu:\n`;
          this.listexamples.forEach((item, i) => {
              yamlString += `- intent: ${item.intent}\n`;
              yamlString += `  examples: |\n`;
              item.examples.forEach((item_example,index_example)=>{
                yamlString += `    - ${item_example}\n`;
              })
            });
            //PATHS CAMINOS //regla => historia
          yamlString += `stories:\n`;
          this.storie_steps.forEach((item_resp_storie,index_resp_storie)=>{
            
            yamlString += `- story: ${item_resp_storie.title_storie}\n`;
            yamlString += `  steps:\n`;
            item_resp_storie.steps_storie.forEach((payload_storie,payload_index) => {
              if(payload_index%2===0){
                yamlString += `  - intent: ${payload_storie}\n`;
              }
              else{
                yamlString += `  - action: ${payload_storie}\n`;
              }
  
            })
          })
  
          return yamlString;
          
        },
  
        async sendDataTrain() {
          const nluyaml = this.generarData();
          console.log(nluyaml);
          try {
           const datagzip = await  this.$axios.post('http://127.0.0.1:5005/model/train',nluyaml);
           this.namegz = datagzip.headers.filename;
          //  this.downloadUrl = URL.createObjectURL(new Blob([datagzip.data]));
            
  
          } catch (error) {
            console.error('Error al cargar los datos', error);
          }
        },
        async loadModel(){
          const instruction = {
            model_file: `models/${this.namegz}`
          };
          console.log(this.namegz)
          try {
              await this.$axios.put('http://127.0.0.1:5005/model', instruction);
          } catch (error) {
            console.log(error);
            
          }
        }
      },
      created(){
        this.listexamples = this.$store.getters.getListExample;
        this.storie_steps= this.$store.getters.getListStories; 
        this.action_storie = this.$store.getters.getStoriesAction;   
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
    