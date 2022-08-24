import { component$ } from "@builder.io/qwik";
import { ThreeJS } from "~/react/threejs";
import { MUIButton } from "~/react/mui";

export default component$(() => {
  return (
    <>
      <MUIButton></MUIButton>
      <ThreeJS client:visible></ThreeJS>
    </>
  );
});
