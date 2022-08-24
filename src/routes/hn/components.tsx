import { component$, Slot, useStore } from "@builder.io/qwik";
import type { IStory, IComment } from "./types";

/* eslint no-console: ["off"] */
export const pluralize = (n: number) => n + (n === 1 ? " reply" : " replies");

export const StoryPreview = component$((props: { story: IStory }) => {
  return (
    <story-preview>
      <li class="news-item">
        <span class="score">{props.story.points}</span>
        <span class="title">
          {props.story.url && !props.story.url.startsWith("item?id=") ? (
            <>
              <a href={props.story.url} target="_blank" rel="noreferrer">
                {props.story.title}
              </a>
              <span class="host"> ({props.story.domain})</span>
            </>
          ) : (
            <a href={`/hn/item/${props.story.id}`}>{props.story.title}</a>
          )}
        </span>
        <br />
        <span class="meta">
          {props.story.type !== "job" ? (
            <>
              by{" "}
              <a href={`/hn/users/${props.story.user}`}>{props.story.user}</a>{" "}
              {props.story.time_ago} |{" "}
              <a href={`/hn/stories/${props.story.id}`}>
                {props.story.comments_count
                  ? `${props.story.comments_count} comments`
                  : "discuss"}
              </a>
            </>
          ) : (
            <a href={`/hn/stories/${props.story.id}`}>{props.story.time_ago}</a>
          )}
        </span>
        {props.story.type !== "link" && (
          <>
            {" "}
            <span class="label">{props.story.type}</span>
          </>
        )}
      </li>
    </story-preview>
  );
});

export const Collapsible = component$(() => {
  const state = useStore({ open: true });
  return (
    <collapsible class={state.open ? "toggle open" : "toggle"}>
      <a onClick$={() => (state.open = !state.open)}>
        {state.open ? (
          "[-]"
        ) : (
          <>
            [+] <Slot name="count" />
          </>
        )}
      </a>
      {state.open ? <Slot /> : undefined}
    </collapsible>
  );
});

export const Comment = component$((props: { comment: IComment }) => {
  return (
    <comment>
      <li class="comment">
        <div class="by">
          <a href={`/hn/users/${props.comment.user}`}>{props.comment.user}</a>{" "}
          {props.comment.time_ago} ago
        </div>
        <div class="text" dangerouslySetInnerHTML={props.comment.content}></div>
        {props.comment.comments.length && (
          <>
            <Collapsible>
              <span q:slot="count">
                {pluralize(props.comment.comments.length) + " "}
                collapsed
              </span>
              <ul class="comment-children">
                {props.comment.comments.map((comment) => (
                  <Comment comment={comment} key={comment.id} />
                ))}
              </ul>
            </Collapsible>
          </>
        )}
      </li>
    </comment>
  );
});
