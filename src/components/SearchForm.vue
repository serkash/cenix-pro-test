<template>
  <div class="search">
    <v-container>
      <form @submit.prevent="setSearch(searchTerm)" class="search__form">
        <v-text-field v-model="searchTerm" :placeholder="searchPlaceholder"></v-text-field>
        <v-btn type='"submit"' color="primary">
          {{ searchButtonText }}
        </v-btn>
      </form>
      <div class="search__results" v-if="searchResults">
        <div class="text-center">
          <v-btn @click.prevent="setSearch('')" color="error">
            {{ closeSearchText }}
          </v-btn>
        </div>
        <span class="text-h4 d-block text-center pt-4">
          {{ searchResultsTitle }}
        </span>
        <span class="text-h6 d-block text-center pt-4" v-if="searchResults.length === 0">
          {{ noResultsText }}
        </span>
        <v-row class="text-center pt-4" v-else>
          <v-col cols="12" v-for="result in searchResults" :key="result.id">
            <Post :id="result.id" :title="result.name" />
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Post from './parts/Post.vue';

  export default {
    name: 'SearchForm',
    components: {
      Post
    },
    computed: mapGetters({
      searchResults: 'getSearch'
    }),
    data: () => ({
      isLoading: false,
      searchTerm: null,
      searchButtonText: 'Найти',
      searchResultsTitle: 'Результаты поиска:',
      noResultsText: 'Ничего не найдено',
      searchPlaceholder: 'Введите текст запроса...',
      closeSearchText: 'Закрыть',
      buttonLoadText: 'Загрузить ещё'
    }),
    methods: mapActions([
      'setSearch'
    ])
  }
</script>