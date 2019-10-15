<script>
  import {buttonList} from './stores';
  import {orderList} from './stores';
  import Modal from './Modal.svelte';

  let addText = "";
  let showModal = false;
  let oList = [];
  let selected = 0; 
  orderList.subscribe(value => {
	  oList = value;
  });
 
function incrementCount(i){
	oList[i].count +=1;

}

function removeElement(name,i){
  if(oList[i].count > 1){
	  	oList[i].count --;
  }else{
    oList.splice(i,1)
  }


	orderList.set(oList)
}
function getAddText(e){

  console.log(e.detail.text);
  addText = e.detail.text;
  oList[selected].addText = addText;
  oList[selected].edit = true;

  console.log(oList[selected]) 

}
function changePrice(e){
	let newPrice = e.detail.price;
	oList[selected].price = newPrice;
	oList[selected].edit = true;

}
function openModal(value){
	showModal = true;
	selected = value;
	
}
</script>

<style>
select {
		float: left;
		margin: 0 1em 1em 0;
		width: 14em;
	}

#oList:nth-first-child(even) {
  background-color: #cecbc2;
}

#oList:nth-first-child(odd) {
  background-color: #bdd4f3;
}
</style>

{#if showModal}
   <Modal on:close={() => showModal = false} on:changeInputText={getAddText} on:changeInputPrice={changePrice}>
   <div slot="header">Edit {oList[selected].name}</div>
   </Modal>
{/if}
<p>{addText}</p>
<div  id="oList">
 {#each oList as item,i }
    <div value={i} >
	 {i} {item.count} {item.name} .... {item.count * item.price} 
	 <button on:click={() => openModal(i)} >Edit</button> 
	 <button on:click={() => removeElement(item.name,i)} >-</button>
     <button on:click={() => incrementCount(i) }>+</button>
	</div>
	{#if item.addText !== ""}
	<div id="addText">{item.addText}</div>



	{/if}
	
 {/each}
</div>
