import logo from './logo.svg';
import './App.css';
import { create } from 'zustand';
import useCounterStore from './component/zustand/store';
import Todolist from './component/zustand/todo_main';


const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))

function BearCounter() {
  const bears = useStore((state) => state.bears)
  return <h1>{bears} bears around here...</h1>
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation)
  const removeAllBears = useStore((state) => state.removeAllBears)
  return (
    <div>
      <button onClick={increasePopulation}>Add Bear 🐻</button>
      <button onClick={removeAllBears} style={{ marginLeft: '10px' }}>
        Remove All Bears
      </button>
    </div>
  )
}

function App() {
   const { count, increase, reset } = useCounterStore();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to Zustand Tutorial</h1>
        <BearCounter />
        <Controls />
       <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Counter: {count}</h1>
      <button onClick={increase}>Increase</button>
      <button onClick={reset} style={{ marginLeft: '10px' }}>Reset</button>
    </div>
    <Todolist/>
      </header>
    </div>
  );
}


export default App;
