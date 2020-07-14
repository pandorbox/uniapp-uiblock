import components from "./components";

const install = Vue => {
  if (install.installed) {
    return;
  } else {
    install.installed = true;
  }

  components.map(component => {
    Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default Object.assign(components, {
  install
});
