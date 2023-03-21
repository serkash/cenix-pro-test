<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <span>{{ title }}</span>
      </div>
    </v-app-bar>

    <v-main>
      <Search />
      <PostForm />
      <PostList />
    </v-main>
  </v-app>
</template>

<script>
import Search from './components/SearchForm.vue';
import PostForm from './components/PostForm.vue';
import PostList from './components/PostList';

export default {
  name: 'App',

  components: {
    PostList,
    PostForm,
    Search
  },

  data: () => ({
    title: 'Cenix.pro test'
  }),
};
</script>
