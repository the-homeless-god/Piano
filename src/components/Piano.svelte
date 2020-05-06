<script>
  import Tone from 'tone'

  const synth = new Tone.Synth().toMaster()

  const play = button => {
    synth.triggerAttackRelease(button.prefix, button.length)
  }

  const buttons = [
    {
      prefix: 'C4',
      en: 'C',
      ru: 'До',
      duration: '64n',
    },
    {
      prefix: 'D4',
      en: 'D',
      ru: 'Ре',
      duration: '64n',
    },
    {
      prefix: 'E4',
      en: 'E',
      ru: 'Ми',
      duration: '64n',
    },
    {
      prefix: 'F4',
      en: 'F',
      ru: 'Фа',
      duration: '64n',
    },
    {
      prefix: 'G4',
      en: 'G',
      ru: 'Соль',
      duration: '64n',
    },
    {
      prefix: 'A4',
      en: 'A',
      ru: 'Ля',
      duration: '64n',
    },
    {
      prefix: 'B4',
      en: 'B',
      ru: 'Си',
      duration: '64n',
    },
  ]
</script>

<style>
  .piano__button-list {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
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
