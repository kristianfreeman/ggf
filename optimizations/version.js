const VERSION = "0.0.1";

export default () => ({
  element: (element) => {
    element.append(`<meta property='ggf:version' content='${VERSION}'>`, {
      html: true,
    });
  },
});
