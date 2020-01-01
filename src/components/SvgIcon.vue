<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :href="iconName" />
  </svg>
</template>

<script>
export default {
  props: {
    iconClass: {
      type: String,
      required: true
    },

    className: {
      type: String,
      default: ''
    }
  },

  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },

    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className;
      } else {
        return 'svg-icon';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.svg-icon  {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: -0.15em;
  overflow: hidden;
  margin-right: 16px
}
</style>
