<script>
  import {testList} from './stores';
  import Modal from './Modal.svelte';

  let addText = "";
  let showModal = false;
  let orderList = [];
  let selected = 0; 
  testList.subscribe(value => {
	  orderList = value;
  });
 


function removeElement(name,i){

	console.log('click ',name)
	console.log(orderList)
	let found = orderList.find(function(element){
			return element.name === name;
		});
	console.log(found)	
	if(found.count > 1){
		console.log('grösser als 1')
		found.count -= 1;
		console.log(found)
	}else{
      	orderList.splice(i,1)
	}
	testList.set(orderList)
}
function handleChange(e){

  console.log(orderList[selected]);

}

</script>

<style>
select {
		float: left;
		margin: 0 1em 1em 0;
		width: 14em;
	}
</style>

{#if showModal}
   <Modal on:close="{() => showModal = false}">
   Edit
   <input bind:value={addText} placeholder="Add text" on:change={handleChange}/>
   </Modal>
{/if}
<p>{addText}</p>
<div size="10">
 {#each orderList as item,i }
     <div value={i}>{item.count} {item.name} .... {item.price} <button on:click={() => showModal = true, selected = i} >Edit</button>  <button on:click={() => removeElement(item.name,i)} >Delete</button></div>
 {/each}
</div>