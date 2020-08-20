import DeferScripts from "./optimizations/defer_scripts";
import LazyLoadImages from "./optimizations/lazy_load_images";
import VersionMetaTag from "./optimizations/version";

const defaultConfig = {
  // Not safe to enable by default
  deferScripts: false,
  // Safe to enable by default
  lazyLoadImages: true,
  // Safe to enable by default
  versionMetaTag: true,
};

// Optimizations are key-value pairs, where the key is a
// matching config option (see `defaultConfig`) and the value
// is a two-element array containing an HTML tag to operate
// on (e.g. `script`), and an optimization to perform.
//
// See ./optimizations/lazy_load_images.js for a simple
// reference optimization in case you want to build your own!
const optimizations = {
  deferScripts: ["script", DeferScripts],
  lazyLoadImages: ["img", LazyLoadImages],
  versionMetaTag: ["head", VersionMetaTag],
};

const gottaGoFast = async (response, config = {}) => {
  // Wrap in promise and resolve so responses or promises
  // that _resolve_ to responses can be passed in
  const resp = await Promise.resolve(response);

  // Assign defaults from `defaultConfig` but let config
  // overwrite them
  const conf = Object.assign({}, defaultConfig, config);
  let rewriter = new HTMLRewriter();

  Object.keys(conf).forEach((key) => {
    let foundConfig = conf[key];
    let options = {};
    let enabled = false;

    // If the config passed in is an object, set `enabled`
    // to the value of the `enabled` key, and set `options`
    // to the provided `options` object.
    //
    // TODO: none of this is actually validated :)
    if (typeof foundConfig === "object") {
      enabled = foundConfig.enabled;
      options = foundConfig.options;
    } else {
      enabled = foundConfig;
    }

    if (enabled) {
      // Pull out the selector and handler from the optimization
      const [selector, handler] = optimizations[key];
      // And attach them to the rewriter
      rewriter.on(selector, handler(options));
    }
  });

  return rewriter.transform(resp);
};

export default gottaGoFast;
