# Vue 3 + TypeScript + Vite

```
  "axios": "^0.27.2",
  "pinia": "^2.0.21",
  "pixi-spine": "^3.1.0",
  "pixi.js": "^6.5.3",
  "vue": "^3.2.39",
  "vue-router": "^4.1.5",
  "@vitejs/plugin-vue": "^3.0.3",
  "sass": "^1.54.5",
  "typescript": "^4.6.4",
  "vite": "^3.1.1",
  "vue-tsc": "^0.39.5"
  
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
