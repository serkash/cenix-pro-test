<template>
  <div class="add-form">
    <v-container>
      <div class="text-center">
        <v-btn color="primary" @click="isFormShown = true" v-if="!isFormShown">
          {{ buttonShowText }}
        </v-btn>
        <v-btn color="error" @click="isFormShown = false" v-else>
          {{ buttonCloseText }}
        </v-btn>
      </div>
      <form @submit.prevent="addNewPost" class="add-form__form" v-if="isFormShown">
        <v-text-field v-model="post.name" :placeholder="namePlaceholder"></v-text-field>
        <v-btn type='"submit"' color="primary">
          {{ buttonAddPost }}
        </v-btn>
        <span class="pt-4 red--text" v-if="error">{{ errorText }}</span>
      </form>
    </v-container>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import md5 from 'md5'

  export default {
    name: 'PostForm',
    data: () => ({
      isFormShown: false,
      namePlaceholder: 'Напишите имя поста',
      buttonShowText: 'Добавить пост',
      buttonCloseText: 'Закрыть',
      buttonAddPost: 'Отправить',
      post: {
        id: null,
        name: null
      },
      errorText: 'Напишите название поста',
      error: false
    }),
    methods: {
      ...mapActions(["addPost"]),
      addNewPost() {
        if (this.post.name) {
          this.post.id = md5(this.post.name)
          this.addPost(this.post)
          this.isFormShown = false
        } else {
          this.error = true
        }
        
        this.post.id = null
        this.post.name = null
      }
    }
  }
</script>

<style scoped lang="scss">
  .post {
    &__title {
      cursor: pointer;
      padding-bottom: 10px;
      border-bottom: 1px solid grey;
    }
  }

</style>