<template>
    <v-bottom-navigation
      :value="value"
      :background-color="color"
      grow
    >
    <nuxt-link to="/rasa/rasamodel/createintents" class="navbar-links">
      <v-btn>
        <span class="navbar-items">Crear Intención</span>
  
        <v-icon>mdi-text-box-minus-outline</v-icon>
      </v-btn>
    </nuxt-link>
    <nuxt-link to="/rasa/rasamodel/cardsintents" class="navbar-links">
      <v-btn>
        <span class="navbar-items">Tarjetas</span>
  
        <v-icon>mdi-cards</v-icon>
      </v-btn>
    </nuxt-link>
    <nuxt-link to="/rasa/rasamodel/createStories" class="navbar-links">
      <v-btn>
        <span class="navbar-items">Crear Historia(stories)</span>
  
        <v-icon>mdi-chart-timeline-variant</v-icon>
      </v-btn>

    </nuxt-link>
    <nuxt-link to="/rasa/rasamodel/trainmodel" class="navbar-links">
      <v-btn>
        <span class="navbar-items">Train/Load</span>
  
        <v-icon>mdi-upload</v-icon>
      </v-btn>

    </nuxt-link>
    </v-bottom-navigation>
  </template>
  
  <script>
    export default {
      data: () => ({ value: 3 }),
      computed: {
      color () {
        switch (this.value) {
          case 0: return 'blue-grey'
          case 1: return 'teal'
          case 2: return 'brown'
          case 3: return '#18E8EC'
          default: return 'blue-grey'
        }
      }
    }
    }
  </script>

  <style scoped>
  .navbar-items{
    font-size: 1rem;
  }
  .navbar-links{
    margin-left: 20px;
  }

  </style>