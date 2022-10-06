import { component$ } from "@builder.io/qwik";
import { RemoteApp } from "./remote";

export default component$(() => {
  return (
    <>
      <RemoteApp name="header" />
      <RemoteApp name="body" />
      <RemoteApp name="footer" />
    </>
  );
});
