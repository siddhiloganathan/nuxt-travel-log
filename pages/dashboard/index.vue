<script lang="ts" setup>
const locationsStore = useLocationStore();
const { locations, status } = storeToRefs(locationsStore);
const mapStore = useMapStore();

const scrollContainer = ref<HTMLElement | null>(null);

function onWheel(e: WheelEvent) {
  if (e.shiftKey && scrollContainer.value) {
    e.preventDefault();
    scrollContainer.value.scrollLeft += e.deltaY * 3;
  }
}

onMounted(() => {
  locationsStore.refresh();
});
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl">
      Locations
    </h2>
    <div v-if="status === 'pending'">
      <span class="loading loading-spinner loading-xl" />
    </div>
    <div
      v-else-if="locations && locations.length > 0"
      ref="scrollContainer"
      class="flex flex-nowrap mt-4 gap-2 overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      @wheel="onWheel"
    >
      <div
        v-for="location in locations"
        :key="location.id"
        class="card card-compact bg-base-300 h-28 border-2 w-72 shrink-0 hover:cursor-pointer"
        :class="{
          'border-accent': location.id === mapStore.selectedPoint?.id,
          'border-transparent': location.id !== mapStore.selectedPoint?.id,
        }"
        @mouseenter="mapStore.selectedPoint = location"
        @mouseleave="mapStore.selectedPoint = null"
      >
        <div class="card-body">
          <h3 class="text-xl">
            {{ location.name }}
          </h3>
          <p>{{ location.description }}</p>
        </div>
      </div>
    </div>
    <div v-else class="flex-col gap-2 mt-4">
      <p>Add a location to get started</p>
      <NuxtLink to="/dashboard/add" class="btn btn-primary ">
        Add Location
        <Icon name="tabler:circle-plus-filled" size="24" />
      </NuxtLink>
    </div>
  </div>
</template>
