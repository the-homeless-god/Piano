<script>
  // reference to external library that plays tunes
  import Tone from 'tone'

  // store for clicked tune
  import { clickedTune } from '../stores/tune.store.ts'

  import OctaveHelper from '../helpers/octave.helper.ts'
  import ButtonColorEnum from '../enums/button.color.enum.ts'

  // external library object to play tunes
  const synth = new Tone.Synth().toMaster()

  // action to play tune and update store value for tune
  const play = button => {
    // update store value to clicked tune
    clickedTune.set(button.name)

    // call external library to play selected tune
    synth.triggerAttackRelease(button.name, 0.5)
  }

  // // handler for user keys to play button by clicked key
  // const playKey = event => {
  //   // find button with user key
  //   const button = buttons.find(button => button.key === event.key)
  //   // play button when exist
  //   if (button) {
  //     play(button)
  //   }
  // }

  // list of all tunes
  const octaves = new OctaveHelper().octaves
</script>

<style>
  .piano__octave-list {
    display: flex;
    width: 100%;
    overflow-x: scroll;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .piano__octave {
    display: flex;
    width: 100%;
  }

  .piano__button {
    padding: 30px;
    height: 250px;
    color: black;
    background: #fff;
    border: 1px solid black;
    border-radius: 4px;
    font-size: 21px;
    outline: none;
    z-index: 1;
  }

  .black {
    background: black;
    color: white;
    position: relative;
    right: 25px;
    height: 130px;
    padding: 20px;
    margin-left: 2px;
    margin-right: -45px;
    z-index: 100;
  }

  .piano__button.highlight {
    transition-delay: 50ms;
    z-index: 10;
    box-shadow: 0 35px 35px #40310a;
  }
</style>

<!-- <svelte:body on:keydown={playKey} /> -->

<div class="piano__octave-list">
  {#each octaves as octave}
    <div class="piano__octave">
      {#each octave.buttons as button}
        <button
          class:black={button.color === ButtonColorEnum.black}
          class:highlight={button.name === $clickedTune}
          class="piano__button"
          on:click={() => play(button)} />
      {/each}
    </div>
  {/each}
</div>
