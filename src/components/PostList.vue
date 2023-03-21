<template>
  <div class="post-list pt-4" v-if="!searchResults">
    <v-container>
      <v-row class="text-center">
        <v-col cols="12" v-for="post in latestPosts" :key="post.id" class="post-list__item">
          <Post :id="post.id" :title="post.name"/>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <div v-intersect.quiet="loadMorePosts">
        <div class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Post from './parts/Post.vue'
  import json from '@/json/posts.json'

  export default {
    name: 'PostList',
    components: {
      Post
    },
    computed: mapGetters({
      posts: 'getPosts',
      latestPosts: 'getLatestPosts',
      searchResults: 'getSearch'
    }),
    created () {
      this.setPosts(json.posts)
    },
    methods: {
      ...mapActions(["setPosts", "setLatestPosts"]),
      loadMorePosts() {
        if (this.latestPosts) {
          const currentIndex = this.latestPosts.length + 1
          const payload = {
            posts: this.posts, 
            currentIndex: currentIndex
          }
          this.setLatestPosts(payload)
        }
      }
    }
  }
</script>
