<template>
    <div>
        <v-text-field v-model="input" @update:model-value="calculate"></v-text-field>
        <h2>{{ output }}</h2>
    </div>  
</template>

<script setup lang="ts">
import { Calculator } from '@/models/calculator'
const input = ref('');
const output: Ref<string | undefined> = ref('');

function calculate() {
    const result = Calculator.calculate(input.value);
    if (result !== undefined) {
        output.value = result.toString();
    } else {
        output.value = 'Error';
    }
}
</script>

<style scoped>

</style>