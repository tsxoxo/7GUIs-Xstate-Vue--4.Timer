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
  return {
    backgroundImage: `linear-gradient(to right, var(--display-text) ${progressPercentage.value}%, transparent ${progressPercentage.value}%), repeating-linear-gradient(to right, var(--display-text), var(--display-text) 1%, transparent 1%, transparent 2%), linear-gradient(var(--display-text), var(--display-text)), linear-gradient(var(--display-text), var(--display-text)), linear-gradient(var(--display-text), var(--display-text)), linear-gradient(var(--display-text), var(--display-text)), linear-gradient(var(--display-text), var(--display-text))`,
    backgroundSize: `100%, 5% 4px, 4px 100%, 4px 60%, 4px 60%, 4px 30%, 4px 30%`,
    backgroundRepeat: `no-repeat, space no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat`,
    backgroundPosition: `0% center, 0% center, center, 25%, 75%, 0%, 100%`
  }
})

// , linear-gradient(var(--display - text), var(--display - text))
</script>

<template>
  <div class="log" style="color: 'white' "> {{ }} </div>
  <main class="frame center-children">
    <div id="button-wrapper" class="center-children">
      <button value="reset" @click="send({ type: 'RESET' })">
      </button>
    </div>
    <div id="display" class="center-children">
      <p class="display-number">{{ snapshot.context.elapsed }}</p>
      <div id="display-progress" style="{backgroundImage: 'linearGradient(to right, red 0%, blue 50%)'}" />
      <p class="display-number">{{ snapshot.context.duration }} </p>
    </div>
    <div id="slider-wrapper" class="center-children">
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
  --frame: linear-gradient(180deg, #98A387 0%, #808971 100%);
  --display-bg: linear-gradient(180deg, #151811 0%, #171C11 100%);
  --display-text: #64864E;
  --interactives: #8F9485;
}



.frame {
  align-items: normal;
  padding: 12px 24px;
  gap: 12px;
  width: 357px;
  box-shadow: 4px 8px 3px 2px rgba(114, 121, 98, 0.2), 2px 2px 2px rgba(109, 117, 91, 0.5), inset 0px 3px 1px rgba(217, 222, 209, 0.15), inset -4px -6px 1px -1px rgba(120, 126, 109, 0.3);
  border-radius: 12px;
  background: var(--frame);
}

#button-wrapper {
  padding: 8px;
}

button {
  border: 0;
  padding: 0;
  width: 80px;
  height: 80px;
  background: #B4BBA5;
  border: 4px solid #B4BAA7;
  box-shadow: 0px 0px 0.5px 1px #A6AC9A, 0px 4px 1px rgba(83, 87, 78, 0.25), 0px 5px 3px 2px rgba(71, 74, 65, 0.2), inset 0px 1px 2px -1px rgba(210, 213, 203, 0.4), inset 0px 26px 5px -1px rgba(172, 178, 159, 0.2), inset 0px -44px 5px -21px rgba(194, 200, 183, 0.2), inset 0px -1px 2px -1px rgba(149, 154, 138, 0.4);
  border-radius: 9999px;
}

button:active {
  transform: translateY(5px);
  box-shadow: 0px 4px 4px -3px rgba(25, 25, 15, 0.20) inset, 0px 3px 4px -1px rgba(230, 233, 218, 0.20) inset;
}

#display {
  align-items: normal;
  gap: 16px;
  padding: 16px;
  background: var(--display-bg);
  color: var(--display-text);
  box-shadow: 0px 0px 4px 4px rgba(124, 133, 108, 0.5), inset 0px 14px 12px rgba(36, 48, 27, 0.35), inset 0px 0px 6px 5px rgba(60, 87, 38, 0.27), inset 0px -20px 8px rgba(15, 18, 13, 0.35);
  border-radius: 8px;
}

.display-number {
  text-align: center;
  font-family: 'Rationale', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 104px;
  line-height: 120px;
}

#display-progress {
  /*alt syntax for the dashed line
  background-image: linear-gradient(to right, transparent 50%, var(--display-bg) 50%), var(--display-text);*/
  /* background-image: linear-gradient(to right, var(--display-text) 10%, transparent 10%), repeating-linear-gradient(to right, var(--display-text), var(--display-text) 4%, transparent 4%, transparent 8%);*/

  background-image: v-bind('progressBarStyle.backgroundImage');
  background-size: v-bind('progressBarStyle.backgroundSize');
  background-repeat: v-bind('progressBarStyle.backgroundRepeat');
  background-position: v-bind('progressBarStyle.backgroundPosition');
  background-origin: content-box;
  /*outline: var(--display-text) 1px solid;*/
  height: 22px;
}

#slider-wrapper {
  padding: 12px;
  height: 76px;
}

input[type=range] {
  position: relative;
  width: 100%;
  height: 12px;
  appearance: none;
  background: #171611;
  box-shadow: inset 3px 4px 2px #121310;
  border-radius: 8px;

}

::-webkit-slider-thumb {
  appearance: none;
  width: 72px;
  height: 36px;
  background: linear-gradient(89.78deg, rgba(0, 0, 0, 0.44) 0.93%, rgba(0, 0, 0, 0.44) 27.78%, rgba(0, 0, 0, 0.44) 68.3%, rgba(43, 38, 38, 0.44) 91.7%), linear-gradient(150.07deg, rgba(132, 113, 113, 0.27) 50.07%, rgba(17, 15, 15, 0.27) 72.56%, rgba(0, 0, 0, 0.27) 83.57%), linear-gradient(90.2deg, #000000 0%, #1B1A1A 30.58%, #2B2525 68.13%, #0E0E0E 99.66%);
  box-shadow: 0px 1px 1px #0A0A09, 0px 2px 3px rgba(0, 0, 0, 0.5), inset 0px 1px 1px -1px rgba(245, 243, 243, 0.5), inset -1px 0px 2px rgba(20, 21, 23, 0.3), inset 2px 0px 4px rgba(32, 36, 39, 0.15), inset 0px -2px 2px rgba(8, 8, 10, 0.3);
  border-radius: 16px;
}
</style>
