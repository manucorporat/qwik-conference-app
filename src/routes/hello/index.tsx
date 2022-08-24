import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="my-app p-20">
      <h1 class="text-3xl mb-2">Congratulations Qwik is working!</h1>
      <hr class="mt-10" />
      <p class="text-center text-sm mt-2">
        Made with ❤️ by{" "}
        <a target="_blank" href="https://www.builder.io/">
          Builder.io
        </a>
      </p>
    </div>
  );
});
