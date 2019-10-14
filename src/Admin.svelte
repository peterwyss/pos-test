<script>
import {onMount} from 'svelte';
import {articleList} from './stores.js';
let allArticles = [];

 	onMount(async () => {
		const res = await fetch(`http://192.168.178.32:3001/getArticle`);
    allArticles = await res.json();
    console.log(allArticles)
    articleList.set(allArticles);

		if(allArticles.code){
					await	alert(articleList.code);

		}

	});



</script>
<h1>Admin</h1>
<select>
{#each allArticles as article}
  <option>{article.name}</option>
{/each}
</select>
