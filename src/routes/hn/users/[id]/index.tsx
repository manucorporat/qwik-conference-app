import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { getUser } from "../../api";
import { IUser } from "../../types";

export default component$(() => {
  const loc = useLocation();

  const user = useResource$<IUser>(async ({ track }) => {
    const params = track(loc, "params");
    const { id } = params;
    return await getUser(parseInt(id, 10));
  });

  return (
    <user>
      <Resource
        value={user}
        onResolved={(user) => {
          return (
            <div class="user-view">
              <h1>User : {user.id}</h1>
              <ul class="meta">
                <li>
                  <span class="label">Created:</span> {user.created}
                </li>
                <li>
                  <span class="label">Karma:</span> {user.karma}
                </li>
                {user.about && <li class="about">{user.about}</li>}
              </ul>
              <p class="links">
                <a
                  href={`https://news.ycombinator.com/submitted?id=${user.id}`}
                >
                  submissions
                </a>{" "}
                |{" "}
                <a href={`https://news.ycombinator.com/threads?id=${user.id}`}>
                  comments
                </a>
              </p>
            </div>
          );
        }}
      />
    </user>
  );
});
