<template>
  <div
    class="modal modal-xl fade"
    tabindex="-1"
    ref="modalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ title }}
          </h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="close"
          />
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch, defineComponent } from "vue";
import { Modal } from "bootstrap";

export default defineComponent({
  props: {
    modelValue: Boolean,
    title: String,
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const modalRef = ref<HTMLElement | null>(null);
    let modal: Modal;

    onMounted(() => {
      if (modalRef.value) {
        modal = new Modal(modalRef.value);
      }
    });

    watch(
      () => props.modelValue,
      (modelValue) => {
        if (modelValue) {
          modal.show();
        } else {
          modal.hide();
        }
      }
    );

    function close() {
      context.emit("update:modelValue", false);
    }

    return {
      modalRef,
      props,
      close,
    };
  },
});

// emits: ["update:modelValue"],
//     setup(props, { emit }) {
// emit("update:modelValue", false);
// const props = defineProps<{
//   modelValue: boolean;
//   title: string;
// }>();
//
// const emit = defineEmits<{
//   (e: "update:modelValue", modelValue: boolean): void;
// }>();
//
// const modalRef = ref<HTMLElement | null>(null);
// let modal: Modal;
//
// onMounted(() => {
//   if (modalRef.value) {
//     modal = new Modal(modalRef.value);
//   }
// });
//
// watch(
//   () => props.modelValue,
//   (modelValue) => {
//     if (modelValue) {
//       modal.show();
//     } else {
//       modal.hide();
//     }
//   }
// );
//
// function close() {
//   emit("update:modelValue", false);
// }
</script>

<style scoped></style>
