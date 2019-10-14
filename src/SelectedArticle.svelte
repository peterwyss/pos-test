<script>
  import {buttonList} from './stores';
  import Modal from './Modal.svelte';

  let addText = "";
  let showModal = false;
  let orderList = [];
  let selected = 0; 
  buttonList.subscribe(value => {
	  orderList = value;
  });
 
function incrementCount(i){
	orderList[i].count +=1;

}

function removeElement(name,i){
  if(orderList[i].count > 1){
	  	orderList[i].count --;
  }else{
    orderList.splice(i,1)
  }


	buttonList.set(orderList)
}
function getAddText(e){

  console.log(e.detail.text);
  addText = e.detail.text;
  orderList[selected].addText = addText;
  orderList[selected].edit = true;

  console.log(orderList[selected]) 

}
function changePrice(e){
	let newPrice = e.detail.price;
	orderList[selected].price = newPrice;
	orderList[selected].edit = true;

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

#orderList:nth-first-child(even) {
  background-color: #cecbc2;
}

#orderList:nth-first-child(odd) {
  background-color: #bdd4f3;
}
</style>

{#if showModal}
   <Modal on:close={() => showModal = false} on:changeInputText={getAddText} on:changeInputPrice={changePrice}>
   <div slot="header">Edit {orderList[selected].name}</div>
   </Modal>
{/if}
<p>{addText}</p>
<div  id="orderList">
 {#each orderList as item,i }
    <div value={i} >
	 {item.count} {item.name} .... {item.count * item.price} 
	 <button on:click={() => openModal(i)} >Edit</button> 
	 <button on:click={() => removeElement(item.name,i)} >-</button>
     <button on:click={() => incrementCount(i) }>+</button>
	</div>
	{#if item.addText !== ""}
	<div id="addText">{item.addText}</div>



	{/if}
	
 {/each}
</div>
