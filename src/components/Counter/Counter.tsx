import React from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/useTypedHooks';
import { increment, decrement } from '../../features/counter/counterSlice';

const Counter = () => {
    const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>−</button>
    </div>
  )
}

export default Counter;