<script>
  // store for clicked tune
  import { clickedTune } from '../stores/tune.store.ts'
  import { playerConfiguration } from '../stores/player.store.ts'

  import Player from './Player.svelte'
</script>

<style>
  .display {
    height: 50%;
  }
</style>

<div class="display">
  <Player />
</div>
