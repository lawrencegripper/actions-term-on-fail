// OTP Modal Component
import { ref, computed, watch, nextTick } from 'vue';

export default {
  name: 'OtpModal',
  template: '#otp-modal-template',
  props: {
    show: Boolean,
    error: String
  },
  emits: ['submit', 'cancel'],
  setup(props, { emit }) {
    const otpCode = ref('');
    const otpInput = ref(null);

    const isValid = computed(() => otpCode.value.length === 6);

    function onInput(e) {
      otpCode.value = e.target.value.replace(/[^0-9]/g, '');
    }

    function onKeypress(e) {
      if (e.key === 'Enter' && isValid.value) {
        submit();
      }
    }

    function submit() {
      if (isValid.value) {
        emit('submit', otpCode.value);
        otpCode.value = '';
      }
    }

    function cancel() {
      otpCode.value = '';
      emit('cancel');
    }

    // Focus input when modal opens
    watch(() => props.show, (show) => {
      if (show) {
        otpCode.value = '';
        nextTick(() => otpInput.value?.focus());
      }
    });

    // Clear code when error changes (retry scenario)
    watch(() => props.error, () => {
      if (props.error) {
        otpCode.value = '';
        nextTick(() => otpInput.value?.focus());
      }
    });

    return {
      otpCode,
      otpInput,
      isValid,
      onInput,
      onKeypress,
      submit,
      cancel
    };
  }
};
