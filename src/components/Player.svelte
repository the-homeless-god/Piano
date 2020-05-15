<script>
  import { clickedTune } from '../stores/tune.store.ts'
  import { tick } from 'svelte'

  const stop = () => {
    clickedTune.set('')
    configuration.loop = false
  }

  let configuration = {
    loop: false,
    timeout: 500,
    count: 4,
    tunes: [
      { enabled: false, value: 'G3' },
      { enabled: false, value: 'D#3' },
      { enabled: false, value: 'D3' },
      { enabled: false, value: 'C3' },
    ],
  }

  const timeoutPromise = timeout => new Promise(resolve => setTimeout(resolve, timeout))

  const play = async () => {
    for (let i = 0; i < configuration.count; i++) {
      // drop highlight from previous tune
      if (i !== 0) {
        configuration.tunes[i - 1].enabled = false
      }
      // drop highlight at loop
      else if (configuration.loop) {
        configuration.tunes[configuration.count - 1].enabled = false
      }

      // play tune
      clickedTune.set(configuration.tunes[i].value)

      // add highlight to current tune
      configuration.tunes[i].enabled = true

      await timeoutPromise(configuration.timeout)
    }
  }

  const add = () => {
    configuration.count++
    configuration.tunes.push({
      enabled: false,
      value: '',
    })
  }

  const remove = () => {
    configuration.count--
    configuration.values.pop()
  }

  const loop = async () => {
    configuration.loop = true
    while (configuration.loop) {
      await play()
    }
  }
</script>

<style>
  .tune__list {
    display: flex;
    margin-bottom: 5px;
  }

  .tune__list input {
    border: none;
    width: 80px;
    font-family: cursive;
    font-size: 25px;
    padding: 5px;
    text-align: center;
  }

  input.highlight {
    border-bottom: 1px solid #40310a;
  }
</style>

<div class="tune__list">
  {#each configuration.tunes as tune}
    <input class:highlight={tune.enabled} bind:value={tune.value} placeholder="Fill" />
  {/each}
</div>

<input bind:value={configuration.timeout} />
<button on:click={add}>+</button>
<button on:click={remove}>-</button>

<button on:click={play}>play</button>
<button on:click={loop}>loop</button>
<button on:click={stop}>stop</button>
