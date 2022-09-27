import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div>
      <table>
        <tr>
          <th></th>
          <th>Demo</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>🔩</td>
          <td>
            <a href="/hello">Hello World</a>
          </td>
          <td>Understanding basic static app.</td>
        </tr>
        <tr>
          <td>🔢</td>
          <td>
            <a href="/counter">Counter</a>
          </td>
          <td>Understanding lazy loading and closure serialization.</td>
        </tr>
        <tr>
          <td>⚡️</td>
          <td>
            <a href="/reactivity">Reactivity</a>
          </td>
          <td>
            Understanding reactivity created on server and transferred to
            client.
          </td>
        </tr>
        <tr>
          <td>⏰</td>
          <td>
            <a href="/clock">Clock</a>
          </td>
          <td>Understanding visible intersections.</td>
        </tr>
        <tr>
          <td>📰</td>
          <td>
            <a href="/hn/top">Hacker News</a>
          </td>
          <td>Understanding data-shaking.</td>
        </tr>
        <tr>
          <td>✅</td>
          <td>
            <a href="/todo">To do</a>
          </td>
          <td>Understanding resumability.</td>
        </tr>
        <tr>
          <td>🏛</td>
          <td>
            <a href="/architecture">Architecture comparison</a>
          </td>
          <td>Understanding how the mental model is different</td>
        </tr>
        <tr>
          <td>🌅</td>
          <td>
            <a href="/styling">Styling</a>
          </td>
          <td>Understanding styling lazy loading.</td>
        </tr>
        <tr>
          <td>🚛</td>
          <td>
            <a href="/streaming">Streaming</a>
          </td>
          <td>SSR streaming demo</td>
        </tr>
        <tr>
          <td>⚛️</td>
          <td>
            <a href="/qwik-react">QwikReact</a>
          </td>
          <td>Qwik React demo using Threejs</td>
        </tr>
        <tr>
          <td>📦</td>
          <td>
            <a href="/container">Containers</a>
          </td>
          <td>Microfrontend</td>
        </tr>
        <tr>
          <td>*️⃣</td>
          <td>
            <a href="/all">All</a>
          </td>
          <td>All together</td>
        </tr>
      </table>
    </div>
  );
});
