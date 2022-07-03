const WebkitService = {
  webkitPostMessage(payload) {
    window.webkit.messageHandlers.data.postMessage(payload);
  },

  isWebkit() {
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.data) {
      return true;
    }
    return false;
  },
};

export default WebkitService;
