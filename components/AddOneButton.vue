<template>
    <div>
        <button @click="store.increment">Add 1</button>
    </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

// access the `store` variable anywhere in the component ✨
const store = useCounterStore()
</script>

<style scoped>

</style>