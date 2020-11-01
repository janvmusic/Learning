## Thinking in React
- You think about apps as you build them

### Step 1: Break the UI into a Component Hierarchy
- Separate your system as components
- How do you do that?
  - Remember **Single Responsibility Principle**
  - One component must do **one thing, and only one thing**
  - If it grows, should be decomposed

### Step 2: Build a static / mocked version
- Build static/mocked components require a lot of typing and no thinking
- While interactivity requires a lot of thinking and not a lot of typing
- It's better to decouple these steps
- Try to not use **state** during this process
- If its a simple app, then follow **top-down** approach
- If its a larger app, then follow **bottom-up** approach
- React it's **one-way binding**

### Step 3: Identify the minimal (but complete) representation of UI state
- To make your UI interactive, you will need to be able to trigger data changes in your model
- React achieves this using **state**
- Remember **components** forces you to think on: _DRY: Don't repeat yourself_
- Try to figure out the minimal `state` required
- It will be required to think on these questions:
  - Is it passed in `props`? Should not be in `state`
  - Does it remain unchanged over time? Should not be in `state`
  - Can you compute it based on any other state or props in your component? Should not be in `state`

### Step 4: Identify where your state should live
- React is all about one-way data flow down the component hierarchy!!
- Identify every component that renders something based on state
- Find common **owners** of data
- If you can't find the owner of the data, then create a new component that will be holding this state

### Step 5: Add inverse data flow
- Call backs to parent components
- Use functions to update states from state owners

