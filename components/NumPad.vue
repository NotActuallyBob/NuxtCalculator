<template>
    <div>
        <h2>{{ display }}</h2>
        <v-row>
            <NumPadButton :label="'1'" @clicked="(label) => handleClick(label)"></NumPadButton>
            <NumPadButton :label="'2'" @clicked="(label) => handleClick(label)"></NumPadButton>
            <NumPadButton :label="'3'" @clicked="(label) => handleClick(label)"></NumPadButton>
            <v-btn @click="clear()">C</v-btn>
        </v-row>
        <v-row>
            <NumPadButton :label="'4'" @clicked="(label) => handleClick(label)"></NumPadButton>
            <NumPadButton :label="'5'" @clicked="(label)  => handleClick(label)"></NumPadButton>
            <NumPadButton :label="'6'" @clicked="(label) => handleClick(label)"></NumPadButton>
        </v-row>
        <v-row>
            <NumPadButton :label="'7'" @clicked="(label) => handleClick(label)"></NumPadButton>
            <NumPadButton :label="'8'" @clicked="(label) => handleClick(label)"></NumPadButton>
            <NumPadButton :label="'9'" @clicked="(label) => handleClick(label)"></NumPadButton>
        </v-row>
        <v-row>
            <v-btn @click="executeCommand('subtraction')">-</v-btn>
            <NumPadButton :label="'0'" @clicked="(label) => handleClick(label)"></NumPadButton>
            <v-btn @click="executeCommand('addition')">+</v-btn>
        </v-row>
        <v-row>
            <v-btn @click="executeCommand('multiplication')">*</v-btn>
            <v-btn @click="executeCommand('equals')">=</v-btn>
            <v-btn @click="executeCommand('division')">/</v-btn>
        </v-row>
    </div>
</template>

<script setup lang="ts">
const display: string = ref('');
const input: string = ref('');
const total: num = ref(0);

const operation: string = ref('equals');

function handleClick(value: string) {
    input.value = input.value.concat(value);
    display.value = input.value;
    switch(operation.value){
        case 'equals':
            total.value = Number(input.value);
            break;
    }
}

function clear() {
    display.value = '';
    input.value = '';
    operation.value = 'equals';
    total.value = 0;
}

function executeCommand(type: string) {
    finnishOperation();
    operation.value = type;
    input.value = '';

    if(type === 'equals'){
        display.value = total.value.toString();
        return;
    }

    display.value = input.value;
}

function finnishOperation(){
    switch(operation.value){
        case 'addition':
            total.value = total.value + Number(input.value);
            break;
        case 'subtraction':
            total.value = total.value - Number(input.value);
            break;
        case 'multiplication':
            total.value = total.value * Number(input.value);
            break;
        case 'division':
            total.value = total.value / Number(input.value);
            break;
        case 'equals':
            break;
        
    }
}
</script>

<style scoped>

</style>