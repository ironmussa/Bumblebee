<template>
  <div>Loading...</div>
</template>


<script>

const { version } = require("@/package.json");

export default {

  middleware: async ({ store, redirect, route, app }) => {
    let isAuthenticated = await store.dispatch('session/isAuthenticated');
    if (!isAuthenticated) {
      return redirect('/login', route.query)
    } else {
      return redirect('/workspaces', route.query)
    }
  },

	data () {
		return {
		}
	},

	mounted() {
		console.log(`Bumblebee v${version}`);
	},


};
</script>

