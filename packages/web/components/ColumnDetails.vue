<template>
  <div v-if="column">

    <div class="sidebar-subheader hoverable column-title" @click="expanded = !expanded">
      <div class="data-column-data">
        <span class="data-type" :class="`type-${column.profiler_dtype}`">{{ dataTypeHint(column.profiler_dtype) }}</span>
        <span class="data-column-name">{{ column.name }}</span>
      </div>
      <v-icon class="right-button flippable" :class="{'flipped': expanded}" color="black">expand_more</v-icon>
    </div>

    <div class="sidebar-section pt-1" v-if="expanded">
      <div class="component-container">
        <General
         :rowsCount="rowsCount"
         :values="column.stats"
        />
      </div>

      <div
        v-if="column.stats.percentile || column.stats.percentile===0"
        class="component-container"
      >
        <Percentile :values="column.stats" />
        <div
          v-if="column.stats.range!=0"
          class="component-container"
          style="margin-top: -16px; margin-bottom: -12px; z-index:-1"
        >
          <!-- <VegaEmbed
            :name="'box-plot'"
            ref="box-plot"
            class="box-plot-grid mb-2"
            v-if="dataset && dataset.sample"
            :data="{values: dataset.sample.value}"
            :mark="{
              type: 'boxplot',
              whisker: {
                title: 'fff',
                size: 10
              },
              box: {
                title: 'fff',
              },
              outliers: {
                type: 'point',
                filled: true,
                color: '#4db6ac'
              },
              tooltip: [
              {
                field: index.toString(),
                type: 'quantitative'
              },
              {
                field: (index+1).toString()
              },
              ],
            }"
            width="366"
            :encoding="{
              tooltip: [
                {
                  field: index.toString(),
                  type: 'quantitative',
                },
                {
                  field: index.toString(),
                  type: 'quantitative',
                  aggregate: 'median',
                  title: 'Median'
                },
              ],
              x: {
                field: index.toString(),
                axis: {
                  title: null
                },
                type: 'quantitative',
              },
              color: {
                value: '#4db6ac'
              }
            }"
            :config="{
              axis: {
                domainColor: '#fff',
                gridColor: '#fff',
                ticks: false,
                domainOpacity: 0,
                gridOpacity: 0,
                tickOpacity: 0,
                title: null
              },
              view: {
                stroke: 'transparent'
              }
            }"
          /> -->
        </div>
      </div>

      <div
        v-if="column.stats"
        class="component-container"
      >
        <Descriptive :values="column.stats" />
      </div>

      <div
        v-if="false && column.stats.percentile==undefined && column.stats.frequency"
        class="component-container"
      >
        <h3>Top values</h3>
        <TopValues
          v-if="column.stats.frequency"
          :values="column.stats.frequency"
          :total="rowsCount"
        />
      </div>

      <template v-if="column.stats.hist">
        <div
          v-if="column.stats.hist[0]"
          class="component-container"
        >
          <h3>Histogram</h3>
          <Histogram
            :values="column.stats.hist"
            :total="rowsCount"
            :height="90"
          />
        </div>

        <div
          v-if="column.stats.hist.years"
          class="component-container"
        >
          <h3>Years Histogram</h3>
          <Histogram
            :values="column.stats.hist.years"
            :total="rowsCount"
            :height="90"
          />
        </div>

        <div
          v-if="column.stats.hist.months"
          class="component-container"
        >
          <h3>Months Histogram</h3>
          <Histogram
            :values="column.stats.hist.months"
            :total="rowsCount"
            :height="90"
          />
        </div>

        <div
          v-if="column.stats.hist.weekdays"
          class="component-container"
        >
          <h3>Week days Histogram</h3>
          <Histogram
            :values="column.stats.hist.weekdays"
            :total="rowsCount"
            :height="90"
          />
        </div>

        <div
          v-if="column.stats.hist.hours"
          class="component-container"
        >
          <h3>Hours Histogram</h3>
          <Histogram
            :values="column.stats.hist.hours"
            :total="rowsCount"
            :height="90"
          />
        </div>

        <div
          v-if="column.stats.hist.minutes"
          class="component-container"
        >
          <h3>Minutes Histogram</h3>
          <Histogram
            :values="column.stats.hist.minutes"
            :total="rowsCount"
            :height="90"
          />
        </div>

      </template>

      <div
        v-if="column.stats.frequency"
        class="component-container"
      >
        <h3>Frequent values</h3>
        <Frequent
          :uniques="column.stats.count_uniques"
          :values="column.stats.frequency"
          :total="rowsCount"
          :height="90"
        />
      </div>

      <div
        v-if="patternsFrequency"
        class="component-container"
      >
        <h3>Frequent patterns</h3>
        <v-progress-circular
          indeterminate
          color="grey"
          class="mx-auto mt-2 d-flex"
          size="64"
          width="4"
          v-if="patternsFrequency==='loading'"
        />
        <TopValues
          v-else
          :values="patternsFrequency"
          :total="rowsCount"
        />
        <!-- selectable -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import TopValues from '@/components/TopValues'
import Frequent from '@/components/Frequent'
import General from '@/components/General'
import Percentile from '@/components/PercentileStats'
import Descriptive from '@/components/Stats'
import Histogram from '@/components/Histogram'
import DataTypes from '@/components/DataTypes'

import dataTypesMixin from '~/plugins/mixins/data-types'
import applicationMixin from '~/plugins/mixins/application'
import clientMixin from '~/plugins/mixins/client'

import VegaEmbed from '@/components/VegaEmbed'

export default {
	components: {
		TopValues,
		General,
		Percentile,
		Descriptive,
		Frequent,
		Histogram,
		DataTypes,
    VegaEmbed
	},

  mixins: [dataTypesMixin, applicationMixin, clientMixin],

  data () {
    return {
      expanded: false,
      patternsFrequency: false
    }
  },

  props: {
    commandsDisabled: {
      type: Boolean,
      default: false
    },
    column: {
      type: Object
    },
    rowsCount: {
      type: Number
    },
    startExpanded: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters([
      'currentDataset'
    ]),
  },

  mounted () {
    this.getPatterns()
  },

  methods: {
    async getPatterns () {
      try {
        this.patternsFrequency = 'loading'
        var response = await this.evalCode(`_output = ${this.currentDataset.dfName}.cols.patterns("${this.column.name}")`)
        this.patternsFrequency = response.data.result[this.column.name].values
      } catch (err) {
        console.error(err)
        this.patternsFrequency = false
      }
      // var response = await this.evalCode(`_output = ${}`)
    },
  },

  watch: {
    startExpanded: {
      immediate: true,
      handler (value) {
        if (value)
          this.expanded = true
      }
    }
  }
}
</script>

<style lang="scss">
  .data-bar.main-data-bar {
    font-size: 8px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>