import { component$, useStore } from "@builder.io/qwik";
import { ArchExamples, Cmp } from "./architecture";
/* eslint no-console: ["off"] */

export default component$(() => {
  const store = useStore(
    {
      monolith: createApp(),
      lazy: createApp(),
      islands: createApp(),
      resumables: createApp(),
    },
    { recursive: true }
  );
  return (
    <ArchExamples
      monolith={store.monolith}
      lazy={store.lazy}
      islands={store.islands}
      resumables={store.resumables}
    />
  );
});

export function createApp(): Cmp {
  const product = { class: "product" } as Cmp;
  const cart = {} as Cmp;
  return {
    class: "root",
    children: [
      {
        class: "header",
        isLazy: true,
        children: [
          {
            children: [{}, {}, {}],
          },
          {},
          {},
          {},
          {},
          { children: [{}, {}] },
          {},
          cart,
        ],
      },
      {
        class: "middle",
        children: [
          {
            isLazy: true,
            class: "left",
            children: [{}, {}, {}, {}],
          },
          {
            class: "main",
            isLazy: true,
            children: [
              {
                class: "product-main",
                children: [
                  product,
                  {
                    class: "product-details",
                    children: [
                      { related: product },
                      { related: product },
                      { related: product },
                      { related: product },
                      { related: product },
                      { related: product },
                    ],
                  },
                ],
              },
              {
                class: "product-side",
                children: [
                  { related: cart },
                  { related: cart },
                  { related: cart },
                  { related: cart },
                  { related: cart },
                  { related: cart },
                ],
              },
            ],
          },
        ],
      },
      {
        class: "footer",
        isLazy: true,
        children: [
          {
            children: [{}, {}, {}],
          },
          {},
          {},
        ],
      },
    ],
  };
}
