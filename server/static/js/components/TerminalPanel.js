// Terminal Panel Component
export default {
  name: 'TerminalPanel',
  template: '#terminal-panel-template',
  props: {
    open: Boolean,
    sessionName: {
      type: String,
      default: 'Terminal'
    }
  },
  emits: ['close']
};
