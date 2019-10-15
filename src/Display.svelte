
<script>
export let text;
export let price;
import { slide } from 'svelte/transition';
import { quintOut } from 'svelte/easing';

</script>
<style>
h1 { color: #111; font-family: 'Helvetica Neue', sans-serif; font-size: 75px; font-weight: bold; letter-spacing: -1px; line-height: 1; text-align: center; }


</style>
    <h1  >{text} {price.toFixed(2)}</h1>

