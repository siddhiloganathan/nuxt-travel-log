<script lang="ts" setup>
import { CENTER_INDIA } from "~/lib/constants";

const colorMode = useColorMode();
const style = computed(() => colorMode.value === "dark" ? "/styles/dark.json" : "https://tiles.openfreemap.org/styles/liberty");
const zoom = 3.5;
</script>

<template>
  <MglMap :map-style="style" :center="CENTER_INDIA" :zoom="zoom">
    <MglNavigationControl />
  </MglMap>
</template>
