const mapStories = {
  top: "news",
  new: "newest",
  show: "show",
  ask: "ask",
  job: "jobs",
};

export function getStory(id: number) {
  return get(`https://node-hnapi.herokuapp.com/item/${id}`);
}
export function getUser(id: number) {
  return get(`https://hacker-news.firebaseio.com/v0/user/${id}.json`);
}
export function getStories(type: keyof typeof mapStories, page: number) {
  const l = mapStories[type];
  return l ? get(`https://node-hnapi.herokuapp.com/${l}?page=${page}`) : [];
}

async function get(href: string) {
  const res = await fetch(href, {
    headers: { "User-Agent": "chrome" },
  });

  return res.json();
}
