import { defineStore } from "pinia"

export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)
    const name = ref('Eduardo')
    const doubleCount = computed(() => count.value * 2)

    function increment() {
      count.value++
    }

    function add(value: number) {
      count.value = count.value + value;
    }
  
    return { count, name, doubleCount, increment, add }
})