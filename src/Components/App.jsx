import Logo from '../Assets/chatgpt.svg';
import Bookmark from '../Assets/message.svg';
import Send from '../Assets/send.svg';
import ChatGPT from '../Assets/chatgptLogo.svg';
import UserIcon from '../Assets/user-icon.png';
import LogoIcon from '../Assets/chatgptLogo.svg';
import { useEffect, useRef, useState } from 'react';
import sendMessage from '../apiHub/openai';
let newQuestion="";
function App(){
    const showYourFace = useRef("");
    const [state , updateState] = useState("");
    const [bag ,updateBag] = useState([]);
    function shoot(e){
        
        updateState(e.target.value);
    }

    function keyDown(e){
        if(e.key === "Enter"){
            trigger();
        }
    }
    async function trigger(){
        if(state || newQuestion){
            let text = "";
            if(newQuestion){
                text = newQuestion;
            }else{
                text = state;
            }
            
            updateState("");
            updateBag([...bag , {text, isBot : false}])
            const res = await sendMessage(text);
            updateBag([...bag , {text, isBot : false} , {text : res , isBot : true}]);
            // text = "";
            // console.log(bag);
            newQuestion = "";
        }else{
            alert("Kindly enter your query first");
        }
    }
    useEffect(()=>{
        // console.log(showYourFace);
        showYourFace.current.scrollIntoView();
    } , [bag]);
    function refresh(e){
        window.location.reload();
    }
    function questionsTrigger(e){
        if(e.target.classList.contains("ques")){
            newQuestion = e.target.innerText;
            trigger();

        }
    }
    function lightUp(){
        alert("This area is still under development ....");
    }
    return(
        <>
            <div className="main-component">
                <div className="side-1">
                    <div className="side-division-1">
                        <div className="logo-image">
                            <img src={Logo} alt="" />
                            <span className='md-sm-heading'>ChatGPT</span>
                        </div>
                        <div className="side-1-btn">
                            <button onClick={refresh}>
                                <i className="fa-solid fa-plus"></i>
                                New Chat
                            </button>
                        </div>

                        <div className="side-1-questions" onClick={questionsTrigger}>
                            <div className="question">
                                <img src={Bookmark} alt="" />
                                <span className='ques'>What is Programming ?</span>
                            </div>

                            <div className="question">
                                <img src={Bookmark} alt="" />
                                <span className='ques'>How to use API ?</span>
                            </div>
                        </div>
                    </div>
                    <div className="side-division-2" onClick={lightUp}>
                        <div className="side-division-2-icon">
                            <i className="fa-solid fa-house"></i>
                            <span>Home</span>
                        </div>
                        <div className="side-division-2-icon">
                        <i className="fa-solid fa-bookmark"></i>
                            <span>Bookmark</span>
                        </div>
                        <div className="side-division-2-icon">
                            <i className="fa-solid fa-rocket"></i>
                            {/* <img src={Rocket} alt="" /> */}
                            <span>Rocket</span>
                        </div>
                    </div>
                </div>



                <div className="side-2">
                    <div className="bot-texts">
                        <div className="greeting">
                            <img src={ChatGPT} alt="" />
                            <p>Hi !! Myself Parth Kapoor , I am full stack web developer and programmer . I love technology
                                from the bottom of my heart and just wanna explore and more and more
                                and in new erra learning is actually a never ending process so just keep exploring
                                and keep releveling your self and much as you can and yes , HAPPY NEW YEAR 2k24 .
                            </p>
                        </div>
                    </div>

                    {/* here I will generate the text side bro  */}

                    <div className="card">
                        
                        {
                            bag.map(ele => 
                                
                                <div className={ele.isBot === false ? "user-text" : "bot-text"}>
                                    <img src={ele.isBot === false ? UserIcon : LogoIcon} alt="sample" />
                                    <p>{ele.text}</p>
                                </div>

                                
                                
                            )
                        }
                        <div className="last" ref={showYourFace}></div>
                        
                    </div>

                    {/* below ends the text side of the box  */}
                    <div className="footer">
                        <div className="input-text">
                            <input 
                                type="text" 
                                placeholder='Send a message'
                                value={state}
                                onChange={shoot}
                                onKeyDown={keyDown}
                                />
                            <img src={Send} alt="" onClick={trigger}/>
                        </div>
                        <p className="footer-text">This chatgpt clone is designed by Parth Kapoor and may not give accurate result initially .All right reserved @copyright 2023</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default App;