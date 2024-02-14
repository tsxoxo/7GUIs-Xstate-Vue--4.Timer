import { setup, fromCallback, assign } from 'xstate';

export const timerMachine = setup({
  "types": {
    events: {} as
      { type: 'CHANGE_DURATION', 'value': number } |
      { type: 'TICK' } |
      { type: 'RESET' },
    context: {} as {
      'duration': number,
      'elapsed': number,
    }
  },
  actors: {
    "ticker": fromCallback(({ sendBack }) => {
      const interval = setInterval(() => {
        sendBack({ type: 'TICK' });
      }, 1000);
      return () => clearInterval(interval);
    })
  },
  actions: {
  },
  guards: {
  },
}).createMachine({
  "context": {
    "elapsed": 0,
    "duration": 30
  },
  "id": "7GUIs_4_Timer",
  "initial": "running",
  "states": {
    "running": {
      "invoke": {
        "input": {},
        "src": "ticker",
        "id": "ticker"
      },
      "always": {
        guard: ({ context }) => context.elapsed >= context.duration,
        target: 'stopped'
      },
      "on": {
        "TICK": [
          {
            "target": "running",
            "guard": ({ context }) => context.elapsed < context.duration,
            "actions": assign({
              elapsed: ({ context }) => context.elapsed + 1
            })
          },
          {
            "target": "stopped"
          }
        ]
      }
    },
    "stopped": {
      always: {
        guard: ({ context }) => context.elapsed < context.duration,
        target: 'running'
      }
    }
  },
  "on": {
    "RESET": {
      "target": ".running",
      guard: ({ context }) => context.elapsed > 0,
      actions: assign({
        elapsed: 0
      })
    },
    "CHANGE_DURATION": {
      actions: assign({
        duration: ({ event }) => event.value
      })
    },
  }
})
