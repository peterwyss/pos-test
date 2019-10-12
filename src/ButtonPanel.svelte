<script>
	import { onMount } from 'svelte';
	import Button from './Button.svelte';
    import Display from './Display.svelte';
    import {testList} from './stores.js';

	export var articleList = [];
	
	let displayText = "";
	let articlePrice = 0;
	let found = [];
 	onMount(async () => {
		const res = await fetch(`http://192.168.178.32:3001`);
		articleList = await res.json();

		if(articleList.code){
					await	alert(articleList.code);

		}

	});

    function handleClick(name,pr){
		displayText = name;
		articlePrice = pr;
		console.log("click ",name)
		const list = $testList;

        found = list.find(function(element){
			return element.name == name;
		});
		
		if(found == undefined){
		  list.push({"name": name, "price":articlePrice,"count": 1,"addText": "","edit":false});
		  console.log(list)
		}else if(found.edit == false){
			console.log(list)
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

		

        		
		testList.set(list);
     
    }
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<Display text = {displayText} price={articlePrice} />
{#each articleList as item}
	<Button func={() => handleClick(item.name,item.price)} name={item.name} />
{/each}

