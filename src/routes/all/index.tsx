import { component$ } from "@builder.io/qwik";
import Clock from "../clock";
import Counter from "../counter";
import HelloWorld from "../hello";
import Reactivity from "../reactivity";
import TodoApp from "../todo";

export default component$(() => {
  return (
    <div>
      <HelloWorld />
      <hr />
      <Counter />
      <hr />
      <Reactivity />
      <hr />
      <TodoApp />
      <hr />
      <Clock />
      <hr />
    </div>
  );
});
