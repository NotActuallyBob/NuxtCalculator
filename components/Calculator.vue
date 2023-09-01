<template>
    <div>
        <v-text-field v-model="input"></v-text-field>
        <v-btn @click="calculate">Calculate</v-btn>
        <h2>{{ output }}</h2>
    </div>  
</template>

<script setup lang="ts">
import { Calculator } from '@/models/calculator'
const input = ref('');
const output = ref('');

function calculate() {
    output.value = Calculator.calculate(input.value).toString();
}
</script>

<style scoped>

</style>