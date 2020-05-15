<script>
  import { clickedTune } from '../stores/tune.store.ts'
  import { playerConfiguration } from '../stores/player.store.ts'
  import PlayerTunePanel from './player/panels/tune.svelte'
  import PlayerActionPanel from './player/panels/action.svelte'
</script>

<style>
  .player {
    display: flex;
    width: 100%;
    justify-content: center;
  }
</style>

<div class="player">

  <PlayerTunePanel />
  <PlayerActionPanel />
</div>
