<template>
    <div>
        <button @click="store.add(5)">Add 5</button>
    </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

// access the `store` variable anywhere in the component ✨
const store = useCounterStore()
</script>

<style scoped>

</style>