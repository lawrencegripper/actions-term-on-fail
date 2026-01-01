// Status Banner Component
export default {
  name: 'StatusBanner',
  template: '#status-banner-template',
  props: {
    message: Object,
    type: String
  },
  emits: ['new-session-click', 'enable-notifications'],
  methods: {
    handleClick() {
      if (this.type === 'new-session') {
        this.$emit('new-session-click');
      } else if (this.type === 'notification-prompt') {
        this.$emit('enable-notifications');
      }
    }
  }
};
