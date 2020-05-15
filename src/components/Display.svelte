<script>
  // store for clicked tune
  import { clickedTune } from '../stores/tune.store.ts'

  import Player from './Player.svelte'
</script>

<style>
  .display {
    height: 50%;
  }

  .display__current-tune {
    font-size: 42px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: cursive;
  }
</style>

<div class="display">
  <Player />
  <span class="display__current-tune">{$clickedTune}</span>
</div>
