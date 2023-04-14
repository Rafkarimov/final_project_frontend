<template>
  <div
    :class="`modal ${modelValue?.size} fade`"
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
            @click="close()"
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
import { ref, onMounted, watch, defineComponent, PropType } from "vue";
import { Modal } from "bootstrap";

export interface ModalProperties {
  isVisible: boolean;
  size: string;
}

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<ModalProperties>,
      default: () => ({
        modalProperties: {
          isVisible: true,
          size: "",
        },
        required: true,
      }),
    },
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
      () => {
        return props.modelValue.isVisible;
      },
      (value) => {
        if (value) {
          modal.show();
        } else {
          modal.hide();
        }
      }
    );

    function close() {
      context.emit("update:modelValue", { isVisible: false, size: "modal-lg" });
    }

    return {
      modalRef,
      props,
      close,
    };
  },
});
</script>

<style scoped></style>
