import React,{useState,useEffect} from "react"
import { FaArrowRightLong } from "react-icons/fa6";
import "./index.css"
const Home=(props)=>{
    const {level,changePage}=props
    const[num,setNumber]=useState(0)
    const[ans,setAnwser]=useState("")
    const[val,setValue]=useState(null)
    const[totalQuestions,setTotalQuestions]=useState(0)
    const[correctAns,setCorrectAns]=useState(0)
    const[showGamePage,setShowGamePage]=useState(true)
    const[nextButtonText,setNxtButtonText]=useState(true)

    useEffect(() => {
        generateRandomNumber();
    }, [totalQuestions]);

      const generateRandomNumber = () => {
        const newNumber = Math.floor(Math.random() * level); // Generate a random single-digit number
        setNumber(newNumber);
      };
    
      

      const handleCheckValue=()=>{
        if(ans !==""){
            if (parseInt(ans) === num + 1) {
                setValue(true);
                 setAnwser("")
                 setTotalQuestions(totalQuestions+1)
                 setCorrectAns(correctAns+1)
                 generateRandomNumber();
               } else {
                 setValue(false);
                 setAnwser("")
                 setTotalQuestions(totalQuestions+1)
                 generateRandomNumber();
               }

        }
        
      }

      const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          handleCheckValue();
        }
      };

      useEffect(() => {
        if (totalQuestions === 20) {
          setShowGamePage(false);
          if(correctAns!==20){
            setNxtButtonText(false)
          }else{
            setNxtButtonText(true)
          }
        }
      }, [totalQuestions]);

      const onClickNextLevel=()=>{
        if(correctAns===20){
            changePage()
        }else{
            setTotalQuestions(0);
            setCorrectAns(0);
            setShowGamePage(true)
            setValue(null)
        }
      }


    const renderFindNextNumberScorePage=()=>{
      const findNxtNumGif= correctAns===totalQuestions
        return(
            <div className="find-next-number-score-main-container">
                <h1 >SCORE BOARD</h1>
                {findNxtNumGif ? (
  <iframe src="https://giphy.com/embed/X9izlczKyCpmCSZu0l"   frameBorder="0" className="giphy-embed find-nxt-gif" allowFullScreen></iframe>
) : (
  <iframe src="https://giphy.com/embed/OKvgO8uBDWi3Uu6ht3"  frameBorder="0" className="giphy-embed find-nxt-gif" allowFullScreen></iframe>
)}

                 <div>
                    <h3 className="find-nxt-num-score-dis-text">Total Questions    - {totalQuestions}</h3>
                    <h3 className="find-nxt-num-score-dis-text">Correct Anwsers - {correctAns}</h3>
                    <h3 className="find-nxt-num-score-dis-text">Pass Percentage - {((correctAns / totalQuestions) * 100).toFixed(2)}%</h3>
                </div>
                <button className={nextButtonText? "find-nxt-num-nxt-btn-sus":"find-nxt-num-nxt-btn-fail"} onClick={onClickNextLevel}>{nextButtonText?"Next Level": "Re-Try"}</button>
            </div>
        )
    }

    const renderFindNextNumberGamePage=()=>{
        return(
            <div className="main-container-next-number">
        <h1 className="h1">Upto {level} Numbers</h1>
        <div className="img-container">
          <img className="find-next-number-img" src="https://res.cloudinary.com/dvxhniunx/image/upload/v1711341549/IMG-20240325-WA0004_oynr6o.jpg" alt="img"/>
        </div>
        <h3 className="second-heading"> What number comes next?</h3>
        <div className="game-container">
            <div className="box">{num}</div>
            
            <div className="box2"><FaArrowRightLong className="icon"/></div>
            
            <div className="box">
                <input onKeyDown={handleKeyDown} type="number" onClick={()=>setValue(null)}  value={ans}  className="number-input" onChange={(e)=>setAnwser(e.target.value)}/>
            </div>
        </div>
        <div className="btn-container">
            <button className="button" onClick={handleCheckValue}>Check</button>
            
        </div>
        {val !== null && (
  <h2 className={val?"find-nxt-num-result-crt":"find-nxt-num-result-rng"}>
    {val ? "Nice Sudhiksha You Are Right" : "Sudhiksha You Are Wrong"}
  </h2>
)}
        
    </div>
        )
    }
    return(

    <div>
        {showGamePage? renderFindNextNumberGamePage() : renderFindNextNumberScorePage()}
    </div>
    
  )
}

export default Home