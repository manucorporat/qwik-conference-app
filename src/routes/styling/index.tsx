import { component$, useStylesScoped$, useStore } from "@builder.io/qwik";
import StylingCSS from "./Styling.css?inline";
import ChildCSS from "./Child.css?inline";
import SiblingCSS from "./Sibling.css?inline";

export default component$(() => {
  useStylesScoped$(StylingCSS);
  const store = useStore({ open: false, siblings: [0] });

  return (
    <div class="parent">
      <button onClick$={() => (store.open = !store.open)}>toggle</button>
      <button onClick$={() => store.siblings.push(0)}>addSibling</button>
      {JSON.stringify(store)}
      {store.open ? <Child key="child" /> : null}
      {store.siblings.map(() => (
        <Sibling />
      ))}
    </div>
  );
});

export const Child = component$(() => {
  useStylesScoped$(ChildCSS);
  return (
    <child class="child">
      <div>Child</div>
    </child>
  );
});

export const Sibling = component$(() => {
  useStylesScoped$(SiblingCSS);

  return (
    <sibling class="sibling">
      <div>Sibling</div>
    </sibling>
  );
});
