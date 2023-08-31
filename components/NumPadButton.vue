<template>
    <div>
        <v-btn @click="$emit('clicked', label)">{{ label }}</v-btn>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    label: String,
})
</script>

<style scoped>

</style>