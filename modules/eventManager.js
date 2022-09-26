export const EvenetManager = (function () {
  const events = {};

  function subscribe(eventName, subscribers) {
    if (!events[eventName]) {
      events[eventName] = [subscribers];
    } else {
      events[eventName].push(subscribers);
    }
  }

  function publish(eventName, data) {
    const subscribers = events[eventName];
    for (const subscriber of subscribers) {
      subscriber(data);
    }

    return { subscribe, publish };
  }
})();
