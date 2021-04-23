import { useState } from 'react';

//create your forceUpdate hook
const useForceUpdate = () => {
    const [, setValue] = useState(0); // integer state
    return () => setValue((value) => value + 1); // update the state to force render
}

export default useForceUpdate