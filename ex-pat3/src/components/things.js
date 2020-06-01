import React, { useState, useEffect } from "react";

const MyCompo = () => {
  /* 1 ::Forcing a component remount using key property
  By leverageing the key property from the parent App component we could easily reset the state
  inside the counter component. The tricks come really handy sometimes, although yu should be aware
  of performance implicagtions
    const [key, setKey] = useState(0);
  return (
    <div>
      <h1>This is for test</h1>
      <Counter key={key} />
      <button onClick={() => setKey(key + 1)}>Reset the state</button>
    </div>
  );
  */
  /*2:::Passing component as props ::: React recommends using composition instead of inheritance  to
  reuse code between components and for that we hav props.childred so to speak
  You might find some references to this as using "slots or "holes" (link) in your component
  */

  /* functional updates using useState lets work with the example 1*/

  const [key, setKey] = useState(0);
  return (
    <div>
      <h1>This is for test</h1>
      <Counter key={key} />
      <button onClick={() => setKey(key + 1)}>Reset the state</button>
    </div>
  );
};

export default MyCompo;

const Counter = () => {
  /* 1st Example 
  const [count, setCount] = useState(0);
  return (
    <div>
      <p> Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => (count <= 0 ? setCount(0) : setCount(count - 1))}>
        -
      </button>
    </div>
  );
  
  */

  /*3nd Example::: Functional updates using useState:: this only updates to 1 and stops there why?
  Well , closures. Because count is being captured onn it's initial value in setInterval, which 
  is 0 , we are stuck at 1
  take a look on the console*/
  const [count, setCount] = useState(0);

  useEffect(() => {
    let counterInterval = setInterval(() => {
      console.log("Current count", count);
      // setCount(count + 1); it uddates setcount to 1 and stuck so how about below
      setCount((count) => count + 1); //now counter counts the number every second and increments it
    }, 1000);

    return () => clearInterval(counterInterval);
  }, []);
  return (
    <div>
      <p> Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => (count <= 0 ? setCount(0) : setCount(count - 1))}>
        -
      </button>
    </div>
  );
};
