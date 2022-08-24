import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { getStory } from "../../api";
import { Comment } from "../../components";
import { IStory } from "../../types";

export default component$(() => {
  const loc = useLocation();

  const story = useResource$<IStory>(async ({ track }) => {
    const params = track(loc, "params");
    const { id } = params;
    return await getStory(parseInt(id, 10));
  });

  return (
    <story>
      <Resource
        value={story}
        onResolved={(story) => {
          return (
            <div class="item-view">
              <div class="item-view-header">
                <a href={"/hn" + story.url} target="_blank">
                  <h1>{story.title}</h1>
                </a>
                {story.domain && <span class="host">({story.domain})</span>}
                <p class="meta">
                  {story.points} points | by{" "}
                  <a href={`/hn/users/${story.user}`}>{story.user}</a>{" "}
                  {story.time_ago} ago
                </p>
              </div>
              <div class="item-view-comments">
                <p class="item-view-comments-header">
                  {story.comments_count
                    ? story.comments_count + " comments"
                    : "No comments yet."}
                </p>
                <ul class="comment-children">
                  {story.comments.map((comment) => (
                    <Comment comment={comment} />
                  ))}
                </ul>
              </div>
            </div>
          );
        }}
      />
    </story>
  );
});
