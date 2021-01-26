<template>
  <div class="app-container">
    <header class="baseapp">
      base
    </header>
    <div id="subapp-container"></div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    
    const addCount = () => {
      store.dispatch('incrementCount', 2)
    }

    const count = computed(() => store.state.count)

    return {
      count,
      add: addCount
    }
  }
}
</script>

<style lang="less" scoped>
.app-container {
  color: red;
  font-size: 30px;
}
</style>