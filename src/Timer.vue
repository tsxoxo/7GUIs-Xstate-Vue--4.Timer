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
    <div>
      <p id="elapsed" class="round-display">{{ snapshot.context.elapsed }}</p>
      <div id="duration-section" class="center-children">
        <p id="duration-number" class="round-display">{{ snapshot.context.duration }} </p>
        <input @input="(event) => send({ type: 'CHANGE_DURATION', value: +(event!.target as HTMLInputElement)!.value })"
          type="range" id="duration" name="duration" min="1" max="120" :value="snapshot.context.duration" />
        <label for="duration">Duration</label>
      </div>
    </div>
    <div id="button-and-label" class="center-children">
      <button value="reset" @click="send({ type: 'RESET' })">
      </button>
      <p class="label">RESET</p>
    </div>
  </main>
</template>

<style scoped>
.frame {
  display: flex;
  width: 236px;
  padding: 16px 20px 24px 20px;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px 8px 32px 32px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.00) 96.31%, rgba(230, 233, 218, 0.20) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 94.83%, rgba(72, 75, 56, 0.10) 100%), #AAB397;
  box-shadow: -5px 2px 4.6px 0px rgba(80, 83, 64, 0.15), 5px 2px 4.6px 0px rgba(80, 83, 64, 0.15), 0px 16px 4.6px -6px rgba(80, 83, 64, 0.15), 0px 0px 4px 4px rgba(80, 83, 64, 0.10) inset;
}

main div:first-child {
  display: flex;
  padding: 16px 0px 24px;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  flex: 1 0 0;
  align-self: stretch;

  border-radius: 8px 8px 32px 32px;
  background: #484B38;
  box-shadow: 0px 0px 4px 2px hsla(53, 29%, 6%, 0.25), 0px -2px 4px 0px hsla(72, 25%, 88%, 0.75) inset, 0px 2px 4px 0px hsla(53, 29%, 6%, 0.15) inset, -6px 4px 4px 0px rgba(20, 19, 11, 0.05) inset;
}

label,
.label {
  display: block;
  text-align: center;
  align-self: stretch;
  box-sizing: content-box;
  text-transform: uppercase;
  font-size: 20px;
  color: var(--color-light);
  background: var(--color-dark);
  padding: 8px 16px;
  border-radius: 1px;
  box-shadow: 0px 1px 2px rgba(31, 35, 18, 0.25), inset 0px 0.5px 1px #f4f5f2;
  white-space: pre-line;
}

#elapsed {
  width: 140px;
  height: 140px;
  font-size: 46px;
}

#duration-section {
  background: hsl(80, 13%, 60%);
  border-radius: 8px;
  padding: 8px 0 0;
}

#duration-number {
  width: 70px;
  height: 70px;
  font-size: 16px;
}

.round-display {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  background: #E6E9DA;
  box-shadow: 1px 4px 4px 0px rgba(51, 57, 40, 0.70), 1px 13px 1px 0px rgba(48, 55, 36, 0.25) inset, 0px 0px 0px 10px #7A8663 inset, 1px -27px 1px -11px rgba(244, 246, 237, 0.90) inset;
  color: hsla(60, 10%, 4%, 70%);
  font-family: monospace;
  ;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

button {
  border: 0;
  padding: 0;
  width: 100px;
  height: 100px;
  border-radius: 9999px;
  background: #2F3025;
  box-shadow: 0px 10px 1px 2px rgba(20, 19, 11, 0.85), 0px -8px 4px -3px rgba(25, 25, 15, 0.50) inset, 0px 1px 4px -1px rgba(230, 233, 218, 0.40) inset;
}

button:active {
  transform: translateY(10px);
  box-shadow: 0px 1px 1px 2px rgba(20, 19, 11, 0.85), 0px -7px 4px -3px rgba(25, 25, 15, 0.50) inset, 0px 3px 4px -1px rgba(230, 233, 218, 0.30) inset;
}
</style>
