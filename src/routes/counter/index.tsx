import { component$, useStore } from "@builder.io/qwik";

export default component$(() => {
  const store = useStore({ count: 0 });
  console.log("Render CounterRoot");
  return (
    <div>
      <CounterChild store={store} />
      <p>
        <button
          onClick$={() => {
            console.log("Click Increment");
            store.count++;
          }}
        >
          Increment
        </button>
        <button
          onClick$={() => {
            console.log("Click Alert");
            alert("I am an Alert!!");
          }}
        >
          Alert
        </button>
      </p>
    </div>
  );
});

export const CounterChild = component$(
  (props: { store: { count: number } }) => {
    console.log("Render CounterChild");
    return <p>Count: {props.store.count}</p>;
  }
);

////////////////////////////////////////////////////////////////////////////////

// export const Counter_onClick = () => store.count++;

// import { useLexicalScope } from "@builder.io/qwik";
// export const Counter_onClick = () => {
//   const [store] = useLexicalScope();
//   store.count++;
// };
