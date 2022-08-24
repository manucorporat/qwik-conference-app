////////////////////////////////////////////////////////////////////////
// Todo Application State Interfaces
////////////////////////////////////////////////////////////////////////

import {
  component$,
  createContext,
  useContext,
  useContextProvider,
  useRef,
  useStore,
  useStyles$,
  useWatch$,
} from "@builder.io/qwik";
import styles from "./index.css?inline";

export const TODOS = createContext<Todos>("TodoApp");

export interface TodoItem {
  completed: boolean;
  title: string;
}

export interface Todos {
  filter: FilterStates;
  items: TodoItem[];
}

export type FilterStates = "all" | "active" | "completed";

export const FilterStates: FilterStates[] = ["all", "active", "completed"];

export const FILTERS = {
  all: () => true,
  active: (i: TodoItem) => i.completed == false,
  completed: (i: TodoItem) => i.completed == true,
};

export default component$(() => {
  useStyles$(styles);

  const todos = useStore<Todos>(
    {
      filter: "all",
      items: [
        { completed: false, title: "Read Qwik docs" },
        { completed: false, title: "Build HelloWorld" },
        { completed: false, title: "Profit" },
      ],
    },
    { recursive: true }
  );
  useContextProvider(TODOS, todos);

  return (
    <section class="todoapp">
      <Header />
      <Body />
      <Footer />
    </section>
  );
});

export const Body = component$(() => {
  const todos = useContext(TODOS);
  return (
    <div class="main">
      <ul class="todo-list">
        {todos.items.filter(FILTERS[todos.filter]).map((key) => (
          <Item item={key} key={key.title} />
        ))}
      </ul>
    </div>
  );
});

/**
 * Footer showing items remaining and filtering options
 *
 * It only rerenders if the todos count changes or filters are reset.
 */
export const Footer = component$(() => {
  /**
   * Example of lite-component (it will always be included with the parent component)
   */
  const todos = useContext(TODOS);

  function Filter({ filter }: { filter: FilterStates }) {
    const lMode = filter.toLowerCase();
    return (
      <li>
        <a
          class={{ selected: todos.filter == lMode }}
          onClick$={() => {
            todos.filter = filter;
          }}
        >
          {filter[0].toUpperCase() + filter.slice(1)}
        </a>
      </li>
    );
  }
  const remaining = todos.items.filter(FILTERS.active).length;
  return (
    <footer class="footer">
      {todos.items.length > 0 ? (
        <>
          <span class="todo-count">
            <strong>{remaining}</strong>
            {remaining == 1 ? " item" : " items"} left
          </span>
          <ul class="filters">
            {FilterStates.map((f) => (
              <Filter filter={f} />
            ))}
          </ul>
          {remaining > 0 ? (
            <button
              class="clear-completed"
              onClick$={() => {
                todos.items = todos.items.filter(FILTERS.active);
              }}
            >
              Clear completed
            </button>
          ) : null}
        </>
      ) : null}
    </footer>
  );
});

/**
 * Header component which is responsible for providing UI to ender new todo item.
 *
 * This component only rerenders if the user interacts with it through the input.
 */
export const Header = component$(() => {
  const state = useStore({ text: "" });
  const todos = useContext(TODOS);
  return (
    <header>
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={state.text}
        onKeyup$={(event: any) => {
          const inputValue = (event.target as HTMLInputElement).value;
          state.text = inputValue;
          if (event.key === "Enter" && inputValue) {
            todos.items.push({
              completed: false,
              title: state.text,
            });
            state.text = "";
          }
        }}
      />
    </header>
  );
});

/**
 * Individual items of the component.
 *
 * It only rerenders if the user infarcts with it or if the item itself changes.
 */

export interface ItemProps {
  item: TodoItem;
}

export const Item = component$((props: ItemProps) => {
  const state = useStore({ editing: false });
  const editInput = useRef<HTMLInputElement>();
  const todos = useContext(TODOS);

  useWatch$(({ track }) => {
    const current = track(editInput, "current");
    if (current) {
      current.focus();
      current.selectionStart = current.selectionEnd = current.value.length;
    }
  });

  return (
    <li class={{ completed: props.item.completed, editing: state.editing }}>
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          checked={props.item.completed}
          onClick$={() => {
            props.item.completed = !props.item.completed;
          }}
        />
        <label
          onDblclick$={async () => {
            state.editing = true;
          }}
        >
          {props.item.title}
        </label>
        <button
          class="destroy"
          onClick$={() => {
            const todoItem = props.item;
            todos.items = todos.items.filter((i) => i != todoItem);
          }}
        />
      </div>
      {state.editing ? (
        <input
          class="edit"
          ref={editInput}
          value={props.item.title}
          onBlur$={() => (state.editing = false)}
          onKeyup$={(event: any) => {
            const inputValue = (event.target as HTMLInputElement).value;
            props.item.title = inputValue;
            if (event.key === "Enter") {
              state.editing = false;
            }
          }}
        />
      ) : null}
    </li>
  );
});
