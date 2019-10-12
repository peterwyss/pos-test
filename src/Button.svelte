<script>
  export let name;
  export let func;
</script>

<style>

  button {
      color: red;
      border: 2px solid #4CAF50; /* Green */
      height: 4em;
      width: 8em;
      border-radius: 2px;
      


  }

</style>

<button on:click={func} id={name} >
  {name}
</button>