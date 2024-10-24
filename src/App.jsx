import { useCallback, useState,useEffect ,useRef} from 'react'


function App() {
  const [Password, setPassword] = useState("");
  const [Number,setNumberAllowed]=useState(false);
  const [Character,setCharacterAllowed]=useState(false);
  const [length,setLength]=useState(8);
   

   let passwordRef=useRef(null);

  //memoized function generator
  const passwordGenerator = useCallback(()=>{
    // console.log("function called for password genration");
    let characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(Number) characters+='0123456789';
    if(Character) characters+="!@#$%&";
    
    let generatedPassword="";
    for(let i=0;i<length;i++){
      let index=Math.floor(Math.random()*characters.length);
       generatedPassword+=characters.charAt(index);
    }

    setPassword(generatedPassword);
    // console.log(generatedPassword);

  },[length,Number,Character]);// function only recreates when any one of dependencies changes

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,8);
    window.navigator.clipboard.writeText(Password);

  },[Password])

  useEffect(()=>{
    passwordGenerator();
  },[passwordGenerator]);

  return (
    <>
      <div className="w-full h-screen bg-gray-800 flex flex-col items-center gap-4 pt-10">
        <h1 className="text-xl text-white">Password Generator</h1>
        <div className="w-[500px] h-36 bg-slate-400 rounded-lg p-2">
            <div className="">
              <input type="text" id="pass" name="pass" value={Password} readOnly ref={passwordRef}className="outline-none bg-slate-300 px-2 py-2 w-[70%] text-black" ></input>
              <button className="rounded-r-lg px-2 bg-blue-500 hover:bg-blue-800 py-2 w-[10%]"  onClick={copyPasswordToClipboard} >copy</button>
            </div>
            <div className="w-[70%] flex">
              <input type="range" id="length" name="length" value={length} min="8" max="30" onChange={(e)=>{setLength(e.target.value)}} className=""></input>
              <label htmlFor="length" className="text-black" >length ({length})</label>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <div>
              <input type="checkbox" id="number" name="number" checked={Number} onChange={(e)=>setNumberAllowed(e.target.checked)} className="w-6 h-5"></input>
              <label htmlFor="number" className="text-black text-lg">Number{Number}</label>
              </div>
              <div>
              <input type="checkbox" id="character" name="character" checked={Character} onChange={(e)=>setCharacterAllowed(e.target.checked)} className="w-6 h-5"></input>
              <label htmlFor="character" className="text-black text-lg">character{Character}</label>
              </div>
              
            </div>
          
        </div>

      </div>
    </>
  )
}

export default App
