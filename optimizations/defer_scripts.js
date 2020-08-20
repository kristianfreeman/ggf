export default (options = {}) => ({
  element: (element) => {
    const src = element.getAttribute("src");
    if (!src) return;

    const defer = () => {
      element.setAttribute("async", "true");
      element.setAttribute("defer", "true");
    };

    if (options && options.except && options.except.length) {
      const skip = options.except.find((except) => src.includes(except));
      if (!skip) defer();
    } else {
      defer();
    }
  },
});
