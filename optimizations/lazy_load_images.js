// Optimizations are functions that returns an HTMLRewriter handler
// object. While most are simple optimizations, wrapping the function
// allows you to pass in a config object and key off of it while
// rewriting HTML (see the DeferScripts optimization for an example).
//
// The below optimization performs a simple optimization on incoming `img`
// tags by setting the attribute `loading` to `lazy`, as per the web.dev
// instructions for implementing native lazy-loading:
// https://web.dev/native-lazy-loading/
//
// For more documentation on HTMLRewriter handlers, see the Workers docs:
// https://developers.cloudflare.com/workers/runtime-apis/html-rewriter
export default () => ({
  element: (element) => {
    // element will always be an `img` tag
    element.setAttribute("loading", "lazy");
  },
});
