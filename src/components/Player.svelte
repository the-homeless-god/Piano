<script>
  import { clickedTune } from '../stores/tune.store.ts'
  import { playerConfiguration } from '../stores/player.store.ts'
  import { tick } from 'svelte'

  const stop = () => {
    clickedTune.set('')
    $playerConfiguration.loop = false
  }

  const timeoutPromise = timeout => new Promise(resolve => setTimeout(resolve, timeout))

  const play = async () => {
    for (let i = 0; i < $playerConfiguration.count; i++) {
      // drop highlight from previous tune
      if (i !== 0) {
        $playerConfiguration.tunes[i - 1].enabled = false
      }
      // drop highlight at loop
      else if ($playerConfiguration.loop) {
        $playerConfiguration.tunes[$playerConfiguration.count - 1].enabled = false
      }

      // play tune
      clickedTune.set($playerConfiguration.tunes[i].value)

      // add highlight to current tune
      $playerConfiguration.tunes[i].enabled = true

      await timeoutPromise($playerConfiguration.timeout)
    }
  }

  const add = () => {
    $playerConfiguration.count++
    $playerConfiguration.tunes.push({
      enabled: false,
      value: '',
    })
  }

  const remove = () => {
    $playerConfiguration.count--
    $playerConfiguration.tunes.pop()
  }

  const loop = async () => {
    $playerConfiguration.loop = true
    while ($playerConfiguration.loop) {
      await play()
    }
  }
</script>

<style>
  .player {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .tune__list {
    display: flex;
    margin-bottom: 5px;
    width: 50%;
    flex-wrap: wrap;
    justify-content: center;
  }

  .tune__list input,
  .player__actions > * {
    border: none;
    width: 80px;
    font-family: cursive;
    padding: 5px;
    font-size: 25px;

    text-align: center;
  }

  input.highlight {
    border-bottom: 1px solid #40310a;
  }

  .player__actions {
    display: flex;
    align-items: center;
    width: 50%;
    height: 50px;
    justify-content: center;
  }

  .player__actions > :not(:first-child) {
    margin-left: 5px;
  }

  .player__actions span {
    cursor: pointer;
  }
</style>

<div class="player">
  <div class="tune__list">
    {#each $playerConfiguration.tunes as tune}
      <input class:highlight={tune.enabled} bind:value={tune.value} placeholder="Fill" />
    {/each}
  </div>

  <div class="player__actions">
    <span class="icon-plus" on:click={add} />
    <span class="icon-minus" on:click={remove} />
    <input bind:value={$playerConfiguration.timeout} />
    <span class="icon-play" on:click={play} />
    <span class="icon-stop" on:click={stop} />
    <span class="icon-loop" on:click={loop} />
  </div>
</div>
