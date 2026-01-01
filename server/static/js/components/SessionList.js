// Session List Component
export default {
  name: 'SessionList',
  template: '#session-list-template',
  props: {
    sessions: {
      type: Array,
      default: () => []
    }
  },
  emits: ['select-session'],
  computed: {
    isEmpty() {
      return this.sessions.length === 0;
    }
  },
  methods: {
    formatTime(dateString) {
      return new Date(dateString).toLocaleTimeString();
    },
    selectSession(session) {
      this.$emit('select-session', session);
    }
  }
};
