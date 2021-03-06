<template>
  <div class="bb-graphic" v-if="calculatedValues.length" @mouseleave="currentVal = false">

    <div :style="{'min-height': 60+'px'}">
      <BarsCanvas
        :selectable="selectable"
        :selected="selected"
        :values="calculatedValues"
        :binMargin="1"
        :width="'auto'"
        :height="height"
        @update:selected="updateSelected"
        @hovered="setValueIndex($event)"
      />
    </div>
    <div v-if="!currentVal" class="current-value" :title="elementsString">{{ elementsString }}</div>
    <div v-else class="current-value font-table" :title="currentVal" v-html="currentVal"></div>
  </div>
</template>

<script>
import BarsCanvas from '@/components/BarsCanvas'
import { mapState, mapGetters } from 'vuex'
import { arraysEqual } from 'bumblebee-utils'

export default {

  components: {
    BarsCanvas
  },
	props: {
		values: {
			default: ()=>[]
		},
		count: {
			default: ()=>[],
			type: Array
		},
		total: {
			default: 1,
			type: Number
		},
		uniques: {
			default: 1,
			type: Number
		},
		height: {
			default: 60,
			type: Number
    },
    columnIndex: {
      default: -1,
      type: Number
    },
    selectable: {
			default: false,
			type: Boolean
    },
	},

	data () {
		return {
      currentVal: false,
      maxVal: 0,
      selected: [],
		}
  },

  created() {
    this.maxVal = (this.cValues.length) ? this.getMaxVal(this.calculatedValues) : 1
  },

  computed: {

    ...mapGetters(['currentSelection']),
    ...mapState(['tab']),

    cValues () {
      if (this.values.length!==undefined) {
        return this.values
      } else if (this.values.values.length!==undefined) {
        return this.values.values
      } else {
        return []
      }
    },

    calculatedValues() {
      return this.cValues.map((e,i)=>{
        return {
          value: e.value,
          count: e.count,
          percentage: +((e.count/this.total)*100).toFixed(2)
        }
      })
    },

    uniqueElements () {
      return Math.max(this.cValues.length, this.uniques)
    },
    elementsString() {
      return `${(this.cValues.length!=this.uniqueElements) ? this.cValues.length+' of ' : '' }${this.uniqueElements} ${(this.uniqueElements===1) ? 'category' : 'categories'}`
    }
  },

  watch: {
    currentSelection: {
      handler (ds) {
        if (ds && ds.ranged) {
          if (ds.ranged.index!=this.columnIndex && this.selected.length>0) {
            this.selected = []
          }
          else if (ds.ranged.index==this.columnIndex && !arraysEqual(this.selected,ds.ranged.indices)) {
            this.selected = ds.ranged.indices
          }
        }
        else if (ds && ds.ranged===undefined) {
          this.selected = []
        }
      }
    }
  },

	methods: {

    changeValue (newVal) {
			this.currentVal = newVal
		},
		getMaxVal (arr) {
			return arr.reduce(
				(max, p) => (p.count > max ? p.count : max),
				arr[0].count
			)
		},
		normVal (val) {
			return (val * 100) / this.maxVal
    },
    setValueIndex(index) {
      var item = this.calculatedValues[index]
      if (item) {
        let value = item.value;
        if (value === "") {
          value = "<span>Empty</span>"
        }
        this.currentVal = `${value}, ${item.count}, ${item.percentage}%`
      }
    },
    updateSelected(v) {


      v = v || []

      if (arraysEqual(this.selected,v)) {
        return
      }
      else {
        this.selected = v
      }


      var { index, values } = this.currentSelection.ranged || {}

      values = values || []
      index = index || -1

      if (
        (!values.length && v.length)
        ||
        index===this.columnIndex
        ||
        (v.length && index!==this.columnIndex)
      ) {
        var newValues = v.map(i=>this.calculatedValues[i].value)
        if (!arraysEqual(values,newValues) || index!=this.columnIndex )
          this.$store.commit('selection',{
            ranged: {
              index: (!!v.length) ? this.columnIndex : -1,
              values: (!!v.length) ? newValues : [],
              indices: v
            }
          })
      }
    }
	}
}
</script>
