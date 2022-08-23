import {
  component$,
  useStore,
  useStyles$,
  useClientEffect$,
} from "@builder.io/qwik";
import styles from "./clock.css?inline";

export default component$(() => {
  const items = new Array(60).fill(null).map((_, index) => "item " + index);

  return (
    <div>
      <p onClick$={() => console.log("test")}>
        This is an example of Lazy executing code on component when component
        becomes visible.
      </p>

      <p>
        ⬇️ <strong>Scroll down</strong> until the clock is in view.
      </p>

      <ul>
        {items.map((i) => (
          <li>{i}</li>
        ))}
      </ul>

      <Clock />
    </div>
  );
});

export const Clock = component$(
  () => {
    useStyles$(styles);

    const store = useStore({
      hour: 10,
      minute: 20,
      second: 30,
    });

    useClientEffect$(() => {
      const update = () => {
        const now = new Date();
        store.second = now.getSeconds() * (360 / 60);
        store.minute = now.getMinutes() * (360 / 60);
        store.hour = now.getHours() * (360 / 12);
      };
      update();
      const tmrId = setInterval(update, 1000);
      return () => clearInterval(tmrId);
    });

    console.log('Render Clock');
    return (
      <clock class="clock">
        <div class="twelve"></div>
        <div class="three"></div>
        <div class="six"></div>
        <div class="nine"></div>
        <div
          class="hour"
          style={{ transform: `rotate(${store.hour}deg)` }}
        ></div>
        <div
          class="minute"
          style={{ transform: `rotate(${store.minute}deg)` }}
        ></div>
        <div
          class="second"
          style={{ transform: `rotate(${store.second}deg)` }}
        ></div>
      </clock>
    );
  },
);
