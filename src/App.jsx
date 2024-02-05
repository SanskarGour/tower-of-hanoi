import { useEffect, useState } from "react";
import "./App.css";
import React from "react";

function App() {
  const [NUM_DISCS , setNUM_DISCS] = useState(3);
  const [towers, setTowers] = useState([[3 , 2 , 1], [], []]);
  const [selectedTowerIdx, setSelectedTowerIdx] = useState(undefined);

  function handleClickedTower(clickedTowerIdx) {
    if (selectedTowerIdx !== undefined) {
      if (towers[selectedTowerIdx].length === 0) {
        setSelectedTowerIdx(undefined);
        return;
      }
      const selectedTower = towers[selectedTowerIdx];
      const clickedTower = towers[clickedTowerIdx];

      if (selectedTower[0] > (clickedTower[0] ?? Infinity)) {
        return;
      }

      const newTowers = [...towers];
      const poppedDisc = newTowers[selectedTowerIdx].shift();
      newTowers[clickedTowerIdx].unshift(poppedDisc);

      if (newTowers[2].length === NUM_DISCS) {
        setSelectedTowerIdx(undefined);
        setTowers([[3, 2, 1], [], []]);
        alert("You Win!");
      } else {
        setSelectedTowerIdx(undefined);
      }

      setTowers(newTowers);
      setSelectedTowerIdx(undefined);
    } else {
      setSelectedTowerIdx(clickedTowerIdx);
    }
  }

  const changeHandler = (event) => {
    if(event.target.value <= 3){
      alert("Value should be greater than THREE");
      return;
    }else{
      setNUM_DISCS(event.target.value);
      // console.log(NUM_DISCS);
    }
  };

  function clickHandler (){
    if(NUM_DISCS <= 3){
      alert("Value should be greater than THREE");
      return;
    }
    initialiseArray()
  }

  function initialiseArray(){
    const newArray = Array.from({ length: NUM_DISCS }, (_, index) => index + 1);
    // console.log(towers);
    setTowers([newArray,[],[]]);
    console.log(towers);
  }

  return (
    <div className="app">
      <div className="user-input">
        <input 
        name="NUM_DISCS"
        type="number" 
        value={NUM_DISCS}
        onChange={changeHandler}>
        </input>
        <button 
        className="btn" 
        onClick={()=>clickHandler()}>
          PLAY
        </button>
      </div>
      
      {towers.map((discs, towerIdx) => {
        return (
          <div
            onClick={() => handleClickedTower(towerIdx)}
            className={
              "tower " + (selectedTowerIdx === towerIdx ? "selected" : "")
            }
            key={towerIdx}
          >
            <div className="line" style={{ height: `${NUM_DISCS * 2 + 5 }rem`}}></div>
            <div className="discs">
              {discs.reverse().map((discNumber) => (
                <div
                  className="disc"
                  key={discNumber}
                  style={{ width: discNumber * 20 + 40 }}
                >
                  {discNumber}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;

{
  /*
  // decrement selected tower and increment clicked tower
  newTowers[selectedTowerIdx]--;
  newTowers[clickedTowerIdx]++;

  useState<undefined | int>(undefined) : takes value as undefined or number only 
  
  new Array(3) : create an array with element 3 in it
  ... new Array(3) : spreads that array
  [new Array(3)] : creates an array of arrays with
  [... new Array(3)] : spreads that array of arrays
  */
}
