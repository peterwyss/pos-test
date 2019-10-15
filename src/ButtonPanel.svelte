<script>
	import { onMount } from 'svelte';

	import Button from './Button.svelte';
    import Display from './Display.svelte';
	import {buttonList} from './stores.js'
	import {orderList} from './stores.js'
	import {articleListSt} from './stores.js';
		
	let displayText = "";
	let articlePrice = 0;
	let found = [];
 	onMount(async () => {
		const res = await fetch(`http://192.168.178.32:3001`);
		let btnList = await res.json();
        //articleListSt.set(articleList);
		// ist ja nich wirklich die Lösung um Fehler auszugeben 
		if(buttonList.code){
		  await	alert(buttonList.code);

		}
       buttonList.set(btnList)
	});

    function handleClick(name,pr){
		displayText = name;
		articlePrice = pr;
		console.log("click ",name)
		const list = $orderList;

        found = list.find(function(element){
			return element.name == name;
		});
		
		if(found == undefined){
		  list.push({"name": name, "price":articlePrice,"count": 1,"addText": "","edit":false});
		}else if(found.edit == false){
			found.count ++;
		}else{
          found = list.find(function(element){
		  	return element.name == name && element.edit == false;
		  });			
		  if(found == undefined){
			  	list.push({"name": name, "price":articlePrice,"count": 1,"addText": "","edit":false});

		  }else{
			  found.count ++;
		  }
		}

		

        		
		orderList.set(list);
		console.log("OrderList: ",$orderList);
     
    }
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<Display text = {displayText} price={articlePrice} />
{#each $buttonList as item}
	<Button func={() => handleClick(item.name,item.price)} name={item.label} />
{/each}

