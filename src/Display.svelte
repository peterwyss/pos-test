
<script>
export let text;
export let price;

function handleOnChange(){
    console.log("change")
}
</script>
<style>
h1 { color: #111; font-family: 'Helvetica Neue', sans-serif; font-size: 75px; font-weight: bold; letter-spacing: -1px; line-height: 1; text-align: center; }


</style>
    <h1 on:change={handleOnChange} >{text} {price.toFixed(2)}</h1>

