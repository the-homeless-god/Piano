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

{#each buttons as button}
  <button on:click={() => play(button)}>{button.en}</button>
{/each}
