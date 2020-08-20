const VERSION = "0.0.2";

export default () => ({
  element: (element) => {
    element.append(`<meta property='ggf:version' content='${VERSION}'>`, {
      html: true,
    });
  },
});
