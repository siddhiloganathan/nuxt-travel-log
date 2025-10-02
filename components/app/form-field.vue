<script lang="ts" setup>
const props = defineProps<{
  label: string;
  name: string;
  error?: string;
  type?: "text" | "textarea" | "number";
  disabled?: boolean;
}>();

const asType = computed(() => {
  return props.type === "textarea" ? "textarea" : "input";
});

const htmlType = computed(() => {
  return props.type === "number" ? "number" : "text";
});
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :as="asType"
      :name="props.name"
      :type="htmlType"
      :disabled="disabled"
      class="w-full"
      :class="{ 'input-error': props.error,
                'input': !props.type || props.type === 'text' || props.type === 'number',
                'textarea': props.type === 'textarea',
      }"
    />
    <p v-if="props.error" class="fieldset-label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
