export const state = () => ({
    nluData: {
        listexamples: [],
        listStories: [],
        actions_Storie: [],
      },
    //   nlu:{
    //     intent:null,
    //     examples:[],
    //     options:[],
    //     payloadOption: [],
    //     steps_storie_prev: [],
    //     storie_steps: [
    //     ]
    //   }
  })
  
  export const getters = {
    getListExample(state) {
      return state.nluData.listexamples;
    },
    getListStories(state){
        return state.nluData.listStories;
    },
    getStories(state){
        return state.nluData.listexamples.map((value)=>value.intent);
    },
    getStoriesUtter(state){
        return state.nluData.listexamples.map((value) => `utter_${value.intent}`)
    },
    getStoriesAction(state){
      return state.nluData.actions_Storie
    }
  }
  
  export const mutations = {
      saveIntents(state,examples) {
        console.log("examples",examples);
          state.nluData.listexamples.push(examples);
        },
      saveStories(state,stories){
        state.nluData.listStories.push(stories);
      },
      appendAction(state,actionStorie){
        state.nluData.actions_Storie.push(actionStorie)
      },
      eliminarIntents(state,intent_value){
        state.nluData.listexamples = state.nluData.listexamples.filter(objeto => objeto.intent !== intent_value)
      },
      deleteStories(state,title_storie){
        state.nluData.listStories = state.nluData.listStories.filter(objeto => objeto.title_storie !== title_storie)
      } 
  }
  
  export const actions = {
    async fetchCounter({ state }) {
      // make request
      const res = { data: 10 };
      state.counter = res.data;
      return res.data;
    }
  }