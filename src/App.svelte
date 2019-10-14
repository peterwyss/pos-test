<script>
  import { Router, Link, Route } from "svelte-routing";
  import  Pos from "./Pos.svelte";
  import Admin from "./Admin.svelte";

  export let url = "";
</script>

<Router url="{url}">
  <div>
    <Link to="/"><button>POS</button></Link>
    <Link to="admin"><button>Admin</button></Link>
  </div>
  <div>
    <Route path="admin" component="{Admin}" />
    <Route path="/"><Pos /></Route>
  </div>
</Router>
