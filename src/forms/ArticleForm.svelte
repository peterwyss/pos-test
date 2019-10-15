<script>
import {onMount} from 'svelte';
import {articleList} from '../stores.js';
import axios from 'axios';
import qs from 'qs';
import { fade, fly } from 'svelte/transition';


let allArticles = [];
var data = {"label": "","category": "","link":"" };
var statusText = "";
let feedbackBtn = "";
let feedbackArt = "";

onMount(async () => {
	const res = await fetch(`http://192.168.178.32:3001/getArticle`);
    allArticles = await res.json();
    console.log(allArticles)
    articleList.set(allArticles);
	  if(allArticles.code){
	  await	alert(articleList.code);
	}

});
async function saveButton(qdata){
  console.log("Data: " ,JSON.stringify(qdata));
  console.log('save button');
  //axios.post(`http://192.168.178.32:3001/articleButton`,qs.stringify(data));

  const res = await fetch(`http://192.168.178.32:3001/articleButton`,{
     method: 'POST', // *GET, POST, PUT, DELETE, etc.
     mode: 'cors', // no-cors, *cors, same-origin
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     },
     body: JSON.stringify(qdata) // body data type must match "Content-Type" header
  });
  console.log(res);
  statusText = res.statusText;
  feedbackBtn = data.label;
  data.label = "";
  data.category = "";
}
function handleChange(){
  statusText = "";
  
}
</script>

<h1>Button</h1>
{#if statusText == 'OK'}
  <h3 in:fly="{{ x: -200, duration: 1000 }}" out:fly="{{x:-200, duration: 1000}}"  >Button {feedbackBtn} wurde gespeichert.</h3>
  {/if}
  <p>{data.label} {data.category} {data.link}</p>

<input id="label"    type="text" bind:value={data.label}    placeholder="Name"       on:input={handleChange}/>
<input id="category" type="text" bind:value={data.category} placeholder="Kategorie"  on:input={handleChange}/>

<select name="link" bind:value={data.link} on:change={handleChange} >
{#each allArticles as article}
  <option value={article.id}>{article.name}</option>
{/each}
</select>
<button on:click={() => saveButton(data)}>Save</button>