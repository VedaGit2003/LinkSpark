import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import './App.css';

function App() {
  const [isClicking, setIsClicking] = useState(false);

  //start the clicking 
  const startClicking = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: executeStartClicking, 
        });
      }
    });
    setIsClicking(true); // Disable the start button
  };
// stop the clicking
  const stopClicking = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: executeStopClicking, 
        });
      }
    });
    setIsClicking(false); // Enable the start button
  };

  // Function for start clicking on "Connect" buttons
  function executeStartClicking() {
    window.clickInterval = setInterval(() => {
      const connectButtons = Array.from(document.querySelectorAll('button')).filter(
        (button) => button.textContent.trim() === 'Connect'
      );

      if (connectButtons.length > 0) {
        const randomIndex = Math.floor(Math.random() * connectButtons.length);
        connectButtons[randomIndex].click();
        console.log('Clicked a Connect button');
      } else {
        alert('No Connect buttons are available on this tab.');
        console.log('No Connect buttons found');
        clearInterval(window.clickInterval); // Stop clicking if no buttons are found
      }
    }, Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000);
  }

  // Function injected to stop clicking
  function executeStopClicking() {
    clearInterval(window.clickInterval);
    console.log('Stopped clicking Connect buttons');
  }

  return (
    <div className='main-container' style={{backgroundColor:'black'}}>
      <div style={{backgroundColor:'black'}}>
        <a href="https://wxt.dev" target="_blank">
          <img src={wxtLogo} className="logo" alt="WXT logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 style={{color:'white'}}>WXT + React</h1>
      <div className="control-buttons">
        <button onClick={startClicking} disabled={isClicking} style={{color:'green',margin:3}}>
          Connect with All.
        </button>
        <button onClick={stopClicking} disabled={!isClicking} style={{color:'green'}} >
          Stop sending connection
        </button>
      </div>
      <p className="read-the-docs" style={{color:'white'}}>
        LinkSpark : send connection on LinkedIn Automatically...
        Crafted with ❤️ by Veda.
      </p>
    </div>
  );
}

export default App;
