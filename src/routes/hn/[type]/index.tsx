import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { getStories } from "../api";
import { StoryPreview } from "../components";
import { IStory } from "../types";

interface Result {
  stories: IStory[];
  page: number;
  type: string;
}
export default component$(() => {
  const loc = useLocation();

  const stories = useResource$<Result>(async ({ track }) => {
    const params = track(loc, "params");
    const { type } = params;
    const page = parseInt(loc.query.page ?? "0", 10);
    const stories = await getStories(type as any, page);
    return {
      stories,
      page,
      type,
    };
  });
  return (
    <stories>
      <Resource
        value={stories}
        onPending={() => <div>Loading</div>}
        onResolved={({ stories, page, type }) => {
          return (
            <div class="news-view">
              <div class="news-list-nav">
                {page > 1 ? (
                  <a
                    class="page-link"
                    href={`/hn/${type}?page=${page - 1}`}
                    aria-label="Previous Page"
                  >
                    {"<"} prev
                  </a>
                ) : (
                  <span class="page-link disabled" aria-disabled="true">
                    {"<"} prev
                  </span>
                )}
                <span>page {page}</span>
                {stories && stories.length >= 29 ? (
                  <a
                    class="page-link"
                    href={`/hn/${type}?page=${page + 1}`}
                    aria-label="Next Page"
                  >
                    more {">"}
                  </a>
                ) : (
                  <span class="page-link disabled" aria-disabled="true">
                    more {">"}
                  </span>
                )}
              </div>
              <main class="news-list">
                {stories && (
                  <ul>
                    {stories.map((story: IStory) => (
                      <StoryPreview story={story} />
                    ))}
                  </ul>
                )}
              </main>
            </div>
          );
        }}
      />
    </stories>
  );
});
