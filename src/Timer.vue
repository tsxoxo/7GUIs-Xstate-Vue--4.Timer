<script setup lang="ts">
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
</script>
<template>
  <main class="frame center-children">
    <div id="button-and-label" class="center-children">
      <button value="reset" @click="send({ type: 'RESET' })">
      </button>
    </div>
    <div id="display">
      <p class="display-number">{{ snapshot.context.elapsed }}</p>
      <div id="display-progress" class="center-children" />
      <p class="display-number">{{ snapshot.context.duration }} </p>
    </div>
    <div>
      <input @input="(event) => send({ type: 'CHANGE_DURATION', value: +(event!.target as HTMLInputElement)!.value })"
        type="range" id="duration" name="duration" min="1" max="120" :value="snapshot.context.duration" />
    </div>
  </main>
</template>

<style >
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
  padding: 16px;
  border-radius: 4px;
  background: var(--frame);
}

button {
  border: 0;
  padding: 0;
  width: 100px;
  height: 100px;
  border-radius: 2px;
  background: var(--interactives);
  box-shadow: 0px 10px 1px 2px rgba(20, 19, 11, 0.85), 0px -8px 4px -3px rgba(25, 25, 15, 0.50) inset, 0px 1px 4px -1px rgba(230, 233, 218, 0.40) inset;
}

button:active {
  transform: translateY(10px);
  box-shadow: 0px 1px 1px 2px rgba(20, 19, 11, 0.85), 0px -7px 4px -3px rgba(25, 25, 15, 0.50) inset, 0px 3px 4px -1px rgba(230, 233, 218, 0.30) inset;
}

#display {
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
  background: var(--display-text);
  height: 40px
}

input[type=range] {
  width: 100%;
}
</style>
