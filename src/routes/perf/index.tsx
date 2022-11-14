import { component$, useStore } from '@builder.io/qwik'

export default component$(() => {
  const state = useStore({
    count: 0
  })

  return (
    <>
      <button onClick$={() => state.count++}>{state.count}</button>
      {new Array(1000).fill(0).map(() => (
        <Foo />
      ))}
    </>
  )
})

export const Foo = component$(() => {
  const bigBlob: any[] = []
  for (let i = 0; i < 100; i++) {
    bigBlob.push({ a: i })
  }
  const store = useStore(
    {
      bigBlob
    },
    // recursive further slows down resume to 2s+
    // , { recursive: true }
  )
  return (
    <div
      onClick$={() => {
        store.bigBlob.push({ a: store.bigBlob.length })
      }}
    >
      {store.bigBlob.map((item) => (
        <div>{item.a}</div>
      ))}
    </div>
  )
})