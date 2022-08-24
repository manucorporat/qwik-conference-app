import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./header.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class="header-inner">
        <section class="logo">
          <a href="/">Qwik Conference App ✈️</a>
        </section>
      </div>
    </header>
  );
});
