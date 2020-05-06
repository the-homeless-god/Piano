<script>
  // reference to external library that plays tunes
  import Tone from 'tone'

  // store for clicked tune
  import { clickedTune } from '../stores/tune.store.ts'

  // external library object to play tunes
  const synth = new Tone.Synth().toMaster()

  // action to play tune and update store value for tune
  const play = button => {
    // update store value to clicked tune
    clickedTune.set(button.prefix)

    // call external library to play selected tune
    synth.triggerAttackRelease(button.prefix, 0.5)
  }

  // list of all tunes
  const buttons = [
    {
      prefix: 'C4',
      en: 'C',
      ru: 'До',
    },
    {
      prefix: 'D4',
      en: 'D',
      ru: 'Ре',
    },
    {
      prefix: 'E4',
      en: 'E',
      ru: 'Ми',
    },
    {
      prefix: 'F4',
      en: 'F',
      ru: 'Фа',
    },
    {
      prefix: 'G4',
      en: 'G',
      ru: 'Соль',
    },
    {
      prefix: 'A4',
      en: 'A',
      ru: 'Ля',
    },
    {
      prefix: 'B4',
      en: 'B',
      ru: 'Си',
    },
  ]
</script>

<style>
  .piano__button-list {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 50%;
    align-items: flex-end;
  }

  .piano__button {
    width: 15%;
    height: 45%;
    padding: 20px;
    margin: 0.5px;
    border-radius: 4px;
    color: white;
    font-size: 21px;
    background-color: lightcoral;
  }
</style>

<div class="piano__button-list">
  {#each buttons as button}
    <button class="piano__button" on:click={() => play(button)}>{button.en}</button>
  {/each}
</div>
