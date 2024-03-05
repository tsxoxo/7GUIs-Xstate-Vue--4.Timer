<script setup lang="ts">
import { computed } from 'vue'
import { useMachine } from '@xstate/vue'
import { timerMachine } from './timerMachine';
import { createBrowserInspector } from '@statelyai/inspect';

const { inspect } = createBrowserInspector({
  // Comment out the line below to start the inspector
  autoStart: false
});

const { snapshot, send } = useMachine(timerMachine, {
  inspect
})
const progressPercentage = computed(() => {
  return Number(snapshot.value.context.elapsed / snapshot.value.context.duration * 100).toFixed(2).toString()
})

const progressBarStyle = computed(() => {
  return `linear-gradient(to right, var(--display-text) ${progressPercentage.value}%, transparent ${progressPercentage.value}%), repeating-linear-gradient(to right, var(--display-text), var(--display-text) 4%, transparent 4%, transparent 8%)`
})
</script>

<template>
  <div class="log" style="color: 'white' "> {{ }} </div>
  <main class="frame center-children">
    <div id="button-and-label" class="center-children">
      <button value="reset" @click="send({ type: 'RESET' })">
      </button>
    </div>
    <div id="display" class="center-children">
      <p class="display-number">{{ snapshot.context.elapsed }}</p>
      <div id="display-progress" style="{backgroundImage: 'linearGradient(to right, red 0%, blue 50%)'}" />
      <p class="display-number">{{ snapshot.context.duration }} </p>
    </div>
    <div>
      <input @input="(event) => send({ type: 'CHANGE_DURATION', value: +(event!.target as HTMLInputElement)!.value })"
        type="range" id="duration" name="duration" min="1" max="120" :value="snapshot.context.duration" />
    </div>
  </main>
</template>

<style>
.log {
  color: white
}

:root {
  --background: #1F201B;
  --frame: #4B533C;
  --display-bg: #253018;
  --display-text: #B9F8A9;
  --interactives: #8F9485;
}

body {
  background: var(--background);
}

.frame {
  align-items: normal;
  gap: 32px;
  width: 357px;
  padding: 24px;
  border-radius: 4px;
  background: var(--frame);
}

button {
  border: 0;
  padding: 0;
  width: 64px;
  height: 64px;
  border-radius: 2px;
  background: var(--interactives);
  box-shadow: 0px 10px 1px 2px rgba(20, 19, 11, 0.85), 0px -8px 4px -3px rgba(25, 25, 15, 0.50) inset, 0px 1px 4px -1px rgba(230, 233, 218, 0.40) inset;
}

button:active {
  transform: translateY(10px);
  box-shadow: 0px 1px 1px 2px rgba(20, 19, 11, 0.85), 0px -7px 4px -3px rgba(25, 25, 15, 0.50) inset, 0px 3px 4px -1px rgba(230, 233, 218, 0.30) inset;
}

#display {
  align-items: normal;
  gap: 16px;
  background: var(--display-bg);
  color: var(--display-text);
  padding: 16px;
}

.display-number {
  font-size: 96px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: monospace;
  ;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

#display-progress {
  /*alt syntax for the dashed line
  background-image: linear-gradient(to right, transparent 50%, var(--display-bg) 50%), var(--display-text);*/
  /* background-image: linear-gradient(to right, var(--display-text) 10%, transparent 10%), repeating-linear-gradient(to right, var(--display-text), var(--display-text) 4%, transparent 4%, transparent 8%);*/
  background-image: v-bind('progressBarStyle');
  background-size: 100%, 50% 8px;
  background-repeat: repeat-x;
  background-position: 0% center;
  /*outline: var(--display-text) 1px solid;*/
  height: 40px;
}

input[type=range] {
  position: relative;
  width: 100%;
  height: 12px;
  appearance: none;
  background-color: var(--background);
  border-radius: 8px;

}

::-webkit-slider-thumb {
  height: 58px;
  width: 32px;
  appearance: none;
  background-color: var(--interactives);
}
</style>
