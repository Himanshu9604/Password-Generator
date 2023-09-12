import { useCallback, useEffect, useState ,useRef} from "react";

function App() {
  const [length, setLength] = useState(8); //for length of char
  const [numberAllowed, setNumberAllowed] = useState(false); //for checkbox
  const [charAllowed, setCharAllowed] = useState(false); //for another checkbox
  const [password, setPassword] = useState(""); //for password input field

  // useref hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str +="!@#$%^&*()[]{}~`'";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);                                       // deepndencies- for optimization purpose
  }, [length, numberAllowed, charAllowed, setPassword]); //usecallback take 2 argument fn and dependencies it use for funtion rerendering

   useEffect(()=>{
    passwordGenerator()
   },[length,numberAllowed,charAllowed,passwordGenerator])  //dependenices - if any changes happen r-render this alll things

   const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()    // give effect when text get copy
  passwordRef.current?.setSelectionRange(0,50)   //copy only 0 to 3 charater
       window.navigator.clipboard.writeText(password)

   },[password])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-4xl text-center text-white my-3">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder=" password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className="outline-none bg-sky-600 px-3 py-0.5 shrink-0 text-black">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
