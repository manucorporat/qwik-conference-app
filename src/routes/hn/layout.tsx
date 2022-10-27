import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import main from "./main.css?inline";

export default component$(() => {
  useStyles$(main);
  return (
    <>
      <nav>
        <header class="header">
          <nav class="inner">
            <a href="/hn/top">
              <strong>HN</strong>
            </a>
            <a href="/hn/new">
              <strong>New</strong>
            </a>
            <a href="/hn/show">
              <strong>Show</strong>
            </a>
            <a href="/hn/ask">
              <strong>Ask</strong>
            </a>
            <a href="/hn/job">
              <strong>Jobs</strong>
            </a>
            <a
              class="github"
              href="http://github.com/builderio/qwikdev"
              target="_blank"
              rel="noreferrer"
            >
              Built with Qwik
            </a>
          </nav>
        </header>
      </nav>
      <Slot />
    </>
  );
});
