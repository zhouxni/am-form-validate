/* eslint-disable */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var Event = /*#__PURE__*/function () {
  function Event() {
    this.events = {};
  }

  var _proto = Event.prototype;

  _proto.$emit = function $emit(type, args) {
    (this.events[type] || []).forEach(function (fn) {
      return fn(args);
    });
  };

  _proto.$on = function $on(type, fn) {
    if (!this.events[type]) {
      this.events[type] = [];
    }

    this.events[type].push(fn);
  };

  return Event;
}();

export default Event;