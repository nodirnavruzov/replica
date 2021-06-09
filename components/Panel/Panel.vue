<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col md="8" class="panel">
        <div class="panel__wrapper">
          <div class="panel__search">
            <b-form-input @input="searchPost()" v-model="text" placeholder="Search"></b-form-input>
          </div>
          <div class="panel__sort">
            <div v-if="showCategorySort">
              <b-dropdown id="dropdown-1" :text="selectedCategory" class="m-md-2">
                <b-dropdown-item v-for="c in categories" :key="c" @click="selectCategory(c)">
                  {{ c }}
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <div>
              <b-dropdown id="dropdown-2" :text="selectedSortBy" class="m-md-2">
                <b-dropdown-item v-for="s in sortBy" :key="s" @click="sortByStatus(s)">
                  {{ s }}
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { EventBus } from '@/boot/EventBus'

export default {
  props: ['categories', 'sortBy'],
  data() {
    return {
      text: '',
      selectedCategory: 'Category',
      selectedSortBy: 'Recent',
      showCategorySort: true
    }
  },
  methods: {
    searchPost() {
      EventBus.$emit('search-post', this.text.toLowerCase())
    },
    selectCategory(c) {
      this.selectedCategory = c
      EventBus.$emit('select-category', this.selectedCategory)
    },
    sortByStatus(s) {
      this.selectedSortBy = s
      EventBus.$emit('sort-by', this.selectedSortBy)
    }
  },
  mounted() {
    console.log(this.$router.history.current.fullPath)

    if (this.$router.history.current.fullPath == '/news') {
      this.showCategorySort = false
    }
  }
}
</script>
