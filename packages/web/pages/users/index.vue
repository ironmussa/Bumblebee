<template>
	<Layout>
		<v-layout wrap class="elevation-0 pa-0 d-flex flex-column align-top justify-start">
      <div class="bb-container" data-name="users">
        <MoreMenu
          :items="moreMenu"
        >
        </MoreMenu>
        <div class="bb-content pa-12">
          <UsersList
            @update:total="total = $event"
          />
        </div>
        <v-footer fixed="fixed" app>
          <v-layout class="px-4" justify-space-between>
            <span />
            <span v-if="total !== undefined" class="caption-2">
              {{ total | formatNumberInt }} Workspaces &emsp;
            </span>
          </v-layout>
        </v-footer>
      </div>
		</v-layout>
	</Layout>
</template>


<script>
import Layout from "@/components/Layout"
import UsersList from "@/components/UsersList"
import MoreMenu from "@/components/MoreMenu"
import clientMixin from "@/plugins/mixins/client"

import { HELP_LINK } from "bumblebee-utils"

export default {
	components: {
    Layout,
    UsersList,
    MoreMenu
  },

  mixins: [ clientMixin ],

  middleware: 'authenticated',

	data () {
		return {
      total: 0
		}
	},

	computed: {
    moreMenu () {

      var menu = [
        { text: 'Sign out', click: this.signOut }
      ];

      if (HELP_LINK) {
        menu = [
          { text: 'Help', link: HELP_LINK },
          { divider: true },
          ...menu
        ];
      }


      return menu
    },
	},

	watch: {

  },

  mounted () {
    window.intercomSettings["vertical_padding"] = 48;
    window.Intercom("update");
  },

	methods: {

	}
}
</script>
