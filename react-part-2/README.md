# React Part 2 

## Topics Covered

### 1. useState Hook
- Used to manage state in functional components
- Example: `const [data, setData] = useState<Todo[]>([])`
- State updates trigger a re-render

### 2. useEffect Hook
- Runs side effects (API calls, timers, etc.)
- **Empty dependency array `[]`** → runs only once on mount
- **With dependencies `[id]`** → runs again when `id` changes
- **Cleanup function** → returned function runs before the effect re-runs or on unmount

### 3. useEffect Cleanup
- Used to clean up timers, subscriptions, etc.
- Prevents memory leaks
- Example:
```tsx
useEffect(() => {
  let interval = setInterval(() => { ... }, 1000);

  return () => {
    clearInterval(interval); // cleanup!
  };
}, [id]);
```

### 4. Fetching Data with Axios
- `axios.get(url)` returns a promise
- Use `.then(response => ...)` to handle the response
- Always call API inside `useEffect`, never directly in the component body

### 5. TypeScript Interfaces
- Define the shape of your data
- Helps TypeScript understand what properties exist
```tsx
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
```

### 6. Props
- Pass data from parent to child component
- Example: `<Todo id={todo} />`
- Access in child: `props.id`

### 7. Conditional Rendering
- Show different text based on state: `d.completed ? "true" : "false"`

### 8. Rendering Lists with `.map()`
- Always provide a unique `key` prop
```tsx
{data.map(d => <p key={d.id}>{d.title}</p>)}
```

---

## Key Takeaways

| Concept | Why It Matters |
|---------|---------------|
| `useEffect` with `[]` | Fetch data once on load |
| `useEffect` with `[dep]` | Re-run when dependency changes |
| Cleanup in `useEffect` | Avoid memory leaks (clear timers, cancel requests) |
| TypeScript interfaces | Catch bugs early, get autocomplete |
| `key` in lists | Helps React track which items changed |
