# React Part 1 

---

## 1. React

React is a JavaScript library for building UI (User Interface). Instead of writing raw HTML, you write **components** (small reusable pieces) and React takes care of putting them on the screen.

---

## 2. Vite

Vite is a **build tool** that runs your React project. It's super fast.

- You run `npm run dev` → Vite starts a local server
- You edit code → Vite instantly refreshes the browser (Hot Module Replacement)
- Think of Vite as the "engine" that runs your React app during development

---

## 3. Components

A **component** is just a function that returns some JSX (HTML-like code).

```jsx
function Post(props) {
  return (
    <div style={{margin:20, padding:20, background:"red"}}>
      <div>{props.name}</div>
      <div>{props.message}</div>
    </div>
  )
}
```

### Key points:
- Component name **must start with a capital letter** (Post, not post)
- It **must return** JSX 
- You can pass data to components using **props** (like function arguments)

### Using a component:
```jsx
<Post name="rahul" message="hi"/>
<Post name="raja" message="hello man!"/>
```

Each `<Post/>` is a **separate copy** with its own data. This is the power of components — write once, reuse many times!

---

## 4. Props

Props = Properties. They are how you **pass data from parent to child** component.

```jsx
// Parent passes data
<Post name="rahul" message="hi"/>

// Child receives it
function Post(props) {
  return <div>{props.name}</div>  // shows "rahul"
}
```

Think of props like **arguments to a function**.

---

## 5. Loop Magic with Array (.map)

If you have an **array of data**, you can loop through it and create components for each item:

```jsx
let posts = [
  { name: "chetan", message: "first message" },
  { name: "gautam", message: "second message" },
  { name: "vikram", message: "third message" }
];

// This creates 3 LinkedinPost components automatically!
{posts.map(p => <LinkedinPost name={p.name} message={p.message}/>)}
```

### How `.map()` works:
- It goes through **each item** in the array one by one
- For each item, it creates a new `<LinkedinPost/>` component
- `p` is the current item (each post object)
- `p.name` and `p.message` are passed as props

### Why this is powerful:
- Array has 3 items → 3 components appear
- Array has 100 items → 100 components appear
- You don't write 100 lines of code — just 1 line with `.map()`!

---

## 6. setInterval

`setInterval` runs a piece of code **repeatedly** after a fixed time (in milliseconds).

```jsx
setInterval(() => {
  console.log("running interval");
  posts.push({
    name: "testing user",
    message: "testing message"
  });
  console.log(posts);
}, 1000);  // runs every 1000ms = 1 second
```

### What's happening here:
- Every 1 second, it adds a new post to the `posts` array
- You can see it in the browser console (F12 → Console tab)

### ⚠️ Important lesson:
Even though `posts` array is growing every second, the **screen does NOT update**! This is because React doesn't know the data changed. To make the screen update, you need **state** (useState) — which is the next topic to learn!

---

## Summary Table

| Concept | One-line explanation |
|---------|---------------------|
| React | Library to build UI with components |
| Vite | Fast tool to run your React project |
| Component | A function that returns JSX (UI piece) |
| Props | Data passed from parent to child component |
| .map() | Loop through array → create component for each item |
| setInterval | Run code repeatedly every X milliseconds |

---

## File Structure

```
src/
├── App.tsx      → Main component (contains Post, LinkedinPost)
├── main.tsx     → Entry point (renders App into the page)
└── index.css    → Styles
```

---

## Next Steps to Learn
- **useState** → Make the screen update when data changes
- **useEffect** → Run code at the right time (fix the setInterval problem)
- **key prop** → Tell React which item is which in a list
