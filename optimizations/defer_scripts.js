export default (options = {}) => ({
  element: (element) => {
    const src = element.getAttribute("src");
    if (!src) return;

    const skipDirective = element.getAttribute("data-ggf-skip");
    if (skipDirective) return;

    const defer = () => {
      element.setAttribute("async", "true");
      element.setAttribute("defer", "true");
    };

    if (options && options.except && options.except.length) {
      const skip = options.except.find((except) => src.includes(except));
      if (skip) return;
    }
    defer();
  },
});
