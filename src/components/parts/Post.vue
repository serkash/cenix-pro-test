<template>
  <div class="post">
    <span class="post__title text-h5" v-if="!isTitleEdit" @click="isTitleEdit = true">
      {{ title }}
    </span>
    <v-form @submit.prevent="changePostTitle" v-else>
      <v-text-field v-model="newTitle" clearable></v-text-field>
      <v-btn type='"submit"' color="primary">
        {{ buttonChangeText }}
      </v-btn>
    </v-form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'PostComponent',
    props: {
      id: {
        type: String,
        default: null
      },
      title: {
        type: String,
        default: 'Example title'
      }
    },
    data: () => ({
      newTitle: null,
      isTitleEdit: false,
      buttonChangeText: 'Изменить'
    }),
    created () {
      this.newTitle = this.title
    },
    methods: {
      ...mapActions(["changePostName"]),
      changePostTitle() {
        const payload = {
          postId: this.id,
          postName: this.newTitle
        }
        this.changePostName(payload)
        this.isTitleEdit = false
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