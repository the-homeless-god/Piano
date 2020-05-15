<script>
  import { playerConfiguration } from '../../../stores/player.store.ts'
</script>

<style>
  .tune__list {
    display: flex;
    margin-bottom: 5px;
    width: 50%;
    flex-wrap: wrap;
    justify-content: center;
    max-height: 600px;
    overflow-y: scroll;
  }

  .tune__list input {
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
</style>

<div class="tune__list">
  {#each $playerConfiguration.tunes as tune}
    <input class:highlight={tune.enabled} bind:value={tune.value} placeholder="Fill" />
  {/each}
</div>
