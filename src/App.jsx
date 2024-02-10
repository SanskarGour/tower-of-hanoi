import { useEffect, useState } from "react";
import "./App.css";
import React from "react";

function App() {
  const [NUM_DISCS, setNUM_DISCS] = useState(3);
  const [solve, setSolve] = useState(false);
  const [towers, setTowers] = useState([[1, 2, 3], [], []]);
  const [selectedTowerIdx, setSelectedTowerIdx] = useState(undefined);
  const [solution, setSolution] = useState([]);
  const [currIdx, setCurrIdx] = useState(0);

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

      if (newTowers[2].length === NUM_DISCS && towers[2].length === NUM_DISCS) {
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

  function reset() {
    setSelectedTowerIdx(undefined);
    setTowers([[1, 2, 3], [], []]);
    setNUM_DISCS(3);
    setCurrIdx(0);
    return;
  }

  function initialiseArray() {
    const newArray = Array.from({ length: NUM_DISCS }, (_, index) => index + 1);
    setTowers([newArray, [], []]);
    console.log(towers);
  }

  const changeHandler = (event) => {
    if (event.target.value < 3) {
      alert("Value should be greater than THREE");
      return;
    } else {
      setNUM_DISCS(event.target.value);
    }
  };

  function solveTowerOfHanoi() {
    let res = [];

    function towerOfHanoi(n, start, end, other) {
      if (n == 1) {
        res.push([start, end]);
        return;
      }
      towerOfHanoi(n - 1, start, other, end);
      res.push([start, end]);
      towerOfHanoi(n - 1, other, end, start);
      return;
    }

    towerOfHanoi(NUM_DISCS, 0, 2, 1);
    setSolution(res);

    console.log(solution);
  }

  function nextHandler() {
    // debugger;
    const sol = solution;
    if (currIdx >= sol.length) {
      alert("No Next Move!");
      reset();
      return;
    }
    let move = sol[currIdx];
    setCurrIdx((prev) => prev + 1);
    let newTowers = [...towers];
    let poppedDisc = newTowers[move[0]][0];
    newTowers[move[0]].shift();
    newTowers[move[1]].unshift(poppedDisc);

    console.log(newTowers);
    setTowers(newTowers);
  }

  function prevHandler() {
    const sol = solution;
    if (currIdx <= 0) {
      alert("No Previous Move!");
      reset();
      return;
    }

    let move = sol[currIdx - 1];
    setCurrIdx((prev) => prev - 1);
    console.log(move);
    let newTowers = [...towers];
    let poppedDisc = newTowers[move[1]][0];
    newTowers[move[1]].shift();
    newTowers[move[0]].unshift(poppedDisc);

    console.log(newTowers);
    setTowers(newTowers);
  }

  function clickHandler() {
    if (NUM_DISCS < 3) {
      alert("Value should be greater than THREE");
      return;
    }
    initialiseArray();
    solveTowerOfHanoi();
    return;
  }

  return (
    <div className="app">
      <div className="navbar">
        <button className="btn" onClick={() => setSolve((prev) => !prev)}>
          {!solve ? `Solve Yourself` : `Let Algo Solve for you`}
        </button>

        <input
          className="input-field"
          name="NUM_DISCS"
          type="number"
          value={NUM_DISCS}
          onChange={changeHandler}
        ></input>
        {!solve ? (
          <button className="btn" onClick={() => clickHandler()}>
            SOLVE
          </button>
        ) : (
          <button
            className="btn"
            onClick={() => {
              if (NUM_DISCS < 3) {
                alert("Value should be greater than THREE");
                return;
              }
              initialiseArray();
            }}
          >
            PLAY
          </button>
        )}
        <button className="btn" onClick={() => reset()}>
          RESET
        </button>
        {!solve ? (
          <div className="flex gap-[1rem]">
            <button className="btn" onClick={() => prevHandler()}>
              PREV
            </button>
            <button className="btn" onClick={() => nextHandler()}>
              NEXT
            </button>
          </div>
        ) : null}
      </div>

      <div className="main">
        {towers.map((discs, towerIdx) => {
          return (
            <div
              onClick={() => {
                if (solve) {
                  handleClickedTower(towerIdx);
                } else {
                  solveTowerOfHanoi();
                }
              }}
              className={
                "tower " + (selectedTowerIdx === towerIdx ? " selected " : "")
              }
              key={towerIdx}
            >
              <div
                className="line"
                style={{ height: `${NUM_DISCS * 2 + 5}rem` }}
              ></div>
              <div className="discs">
                {solve
                  ? discs.reverse().map((discNumber) => (
                      <div
                        className="disc"
                        key={discNumber}
                        style={{ width: discNumber * 20 + 40 }}
                      >
                        {discNumber}
                      </div>
                    ))
                  : discs.map((discNumber) => (
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
