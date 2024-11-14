import React, { useState } from 'react';
import './App.css'
import { team_lib } from './team_list.js';
import { game_list } from './game_list';

function App() {
  // App Level States
  const [modalOpen, setModalOpen] = useState(false)
  const [intromodalOpen, setintroModalOpen] = useState(true)
  const [guesses, setGuesses] = useState(['', '', '', '', ''])
  const [curTeam1, setCurTeam1] = useState('Guess Team')
  const [curTeam2, setCurTeam2] = useState('Guess Team')
  const [curModal,setCurModal] = useState()
  const [guessCount, setGuessCount] = useState(0)
  const [isCorrect, setIsCorrect] = useState(0)
  const [isB1Correct, setIsB1Correct] = useState() // color
  const [isB2Correct, setIsB2Correct] = useState() //color
  const [openEndModal, setOpenEndModal] = useState(false)
  const endModalVis = openEndModal===true
  const buttonVis = curTeam1 !== 'Guess Team' && curTeam2 !== 'Guess Team';


  // Box States B1
  const [B1Sport, setB1Sport] = useState('')
  const [B1Loc, setB1Loc] = useState('')
  const [B1Col1, setB1Col1] = useState('')
  const [B1Col2, setB1Col2] = useState('')

  const [B1SportOut, setB1SportOut] = useState()
  const [B1LocOut, setB1LocOut] = useState()
  const [B1Col1Out, setB1Col1Out] = useState()
  const [B1Col2Out, setB1Col2Out] = useState()


    // Box States B2
  const [B2Sport, setB2Sport] = useState('')
  const [B2Loc, setB2Loc] = useState('')
  const [B2Col1, setB2Col1] = useState('')
  const [B2Col2, setB2Col2] = useState('')

  const [B2SportOut, setB2SportOut] = useState()
  const [B2LocOut, setB2LocOut] = useState()
  const [B2Col1Out, setB2Col1Out] = useState()
  const [B2Col2Out, setB2Col2Out] = useState()

  // Modal States
  const [modalSport, setModalSport] = useState('NFL');


  const currentDate = new Date().toLocaleDateString('en-US');
  const gameOfDay = game_list.filter(event => event[0] === currentDate);
  const teams_correct = [gameOfDay[0][1],gameOfDay[0][2]]
  const game_time = gameOfDay[0][3]
  
  const ansTeam1 = team_lib.find(row => row.team === teams_correct[0]);
  const ansTeam2 = team_lib.find(row => row.team === teams_correct[1]);

  const handleBoxClick = (guess_box) => {
    setModalOpen(true);
    setCurModal(guess_box)
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeintroModal = () => {
    setintroModalOpen(false);
  };

  const setCurTeam = (in_team) => {
    if (curModal === '1') {
      setCurTeam1(in_team)
    } 
    if (curModal === '2') {
      setCurTeam2(in_team)
    } 
    closeModal()
  }

    const checkGuess = () => {

      function findMatchingKeys(obj1, obj2) {
        let matchingKeys = [];
    
        for (let key in obj1) {
            if (obj1[key] === obj2[key]) {
                matchingKeys.push(key);
            }
        }
        return matchingKeys;
      }

      const guessTeam1 = team_lib.find(row => row.team === curTeam1);
      const guessTeam2 = team_lib.find(row => row.team === curTeam2);

      // Green Matches- full correct
      const matches_b1 = findMatchingKeys(guessTeam1, ansTeam1)
      const matches_b2 = findMatchingKeys(guessTeam2, ansTeam2)

      // Yellow Matches- partial correct
      const yellows_b1 = findMatchingKeys(guessTeam1, ansTeam2)
      const yellows_b2 = findMatchingKeys(guessTeam2, ansTeam1)

      // Set new small box values
     
      // Yellows
      yellows_b1.forEach((e) => {
        if (e === "sport") {setB1Sport(guessTeam1[e]); setB1SportOut('LemonChiffon')}
        if (e === "region") {setB1Loc(guessTeam1[e]); setB1LocOut('LemonChiffon')}
        if (e === "color_1") {setB1Col1(guessTeam1[e]); setB1Col1Out('LemonChiffon')}
        if (e === "color_2") {setB1Col2(guessTeam1[e]); setB1Col2Out('LemonChiffon')}
        // if (e === "team") {setCurTeam1(guessTeam1[e])}
      })

      yellows_b2.forEach((e) => {
        if (e === "sport") {setB2Sport(guessTeam2[e]); setB2SportOut('LemonChiffon')}
        if (e === "region") {setB2Loc(guessTeam2[e]); setB2LocOut('LemonChiffon')}
        if (e === "color_1") {setB2Col1(guessTeam2[e]); setB2Col1Out('LemonChiffon')}
        if (e === "color_2") {setB2Col2(guessTeam2[e]); setB2Col2Out('LemonChiffon')}
        // if (e === "team") {setCurTeam2(guessTeam2[e])}
      })

        // Greens
        matches_b1.forEach((e) => {
          if (e === "sport") {setB1Sport(guessTeam1[e]); setB1SportOut('lightgreen')}
          if (e === "region") {setB1Loc(guessTeam1[e]); setB1LocOut('lightgreen')}
          if (e === "color_1") {setB1Col1(guessTeam1[e]); setB1Col1Out('lightgreen')}
          if (e === "color_2") {setB1Col2(guessTeam1[e]); setB1Col2Out('lightgreen')}
          if (e === "team") {setCurTeam1(guessTeam1[e])}
        })

        matches_b2.forEach((e) => {
          if (e === "sport") {setB2Sport(guessTeam2[e]); setB2SportOut('lightgreen')}
          if (e === "region") {setB2Loc(guessTeam2[e]); setB2LocOut('lightgreen')}
          if (e === "color_1") {setB2Col1(guessTeam2[e]); setB2Col1Out('lightgreen')}
          if (e === "color_2") {setB2Col2(guessTeam2[e]); setB2Col2Out('lightgreen')}
          if (e === "team") {setCurTeam2(guessTeam2[e])}
        })


      const updateGuess = (newGuess) => {
        setGuesses(prevGuesses => {
          const updatedGuesses = [...prevGuesses];  // Copy the current guesses array
          updatedGuesses[guessCount] = newGuess;    // Update the element at the index of guessCount
          return updatedGuesses;
        });
      };



      // if (ansTeam1 === guessTeam1 && ansTeam2 === guessTeam2) {setIsCorrect(1)}
      // console.log({ comparison: (ansTeam1 === guessTeam1 && ansTeam2 === guessTeam2) });
      // setCurTeam1(ansTeam1 !== guessTeam1 ? 'Guess Team' : ansTeam1.team);
      // setCurTeam2(ansTeam2 !== guessTeam2 ? 'Guess Team' : ansTeam2.team);
      // const result = (isCorrect === 0) ? '❌' : '✅'

      if (ansTeam1 === guessTeam1 && ansTeam2 === guessTeam2) {setIsCorrect(1);}
      setCurTeam1(ansTeam1 !== guessTeam1 ? 'Guess Team' : ansTeam1.team);
      setCurTeam2(ansTeam2 !== guessTeam2 ? 'Guess Team' : ansTeam2.team);
      if (ansTeam1===guessTeam1) {setIsB1Correct('lightgreen')}
      if (ansTeam2===guessTeam2) {setIsB2Correct('lightgreen')}
      // const result = (ansTeam1 === guessTeam1 && ansTeam2 === guessTeam2) ? '✅' : '❌';
      // const result1 = (ansTeam1 === guessTeam1) ? '✅' : '❌';
      // const result2 = (ansTeam2 === guessTeam2) ? '✅' : '❌';
      // updateGuess(`${result1} ${guessTeam1.team} VS ${result2} ${guessTeam2.team}`)

      updateGuess(`${guessTeam1.team} VS ${guessTeam2.team}`)
      setGuessCount(guessCount+1)
      if (guessCount > 3) {setOpenEndModal(true)}
      if (ansTeam1 === guessTeam1 && ansTeam2 === guessTeam2) {setOpenEndModal(true)}
    }




  return (
    <div className="App">
      <div className="h1 text-center my-5">VERSUS
      </div>

      <div className="container text-center mt-2">
      <div className="row">
        <div className="col-6">
          <div className="large-square" onClick={() => handleBoxClick('1')} style= {{borderColor: `${isB1Correct}`, borderWidth: '2px', borderStyle: 'solid' }}>{curTeam1}</div>
          <div className='text-sm'>HOME</div>
          <div className="d-flex justify-content-center mt-1">
            <div className="small-square" style= {{borderColor: `${B1SportOut}`, borderWidth: '2px', borderStyle: 'solid' }}>{B1Sport}</div>
            <div className="small-square" style= {{borderColor: `${B1LocOut}`, borderWidth: '2px', borderStyle: 'solid' }}>{B1Loc}</div>
            <div className= "small-square" >
              <div className="triangle top-left" style= {{borderColor: `${B1Col1Out}`, borderWidth: '2px', borderStyle: 'solid', backgroundColor: `${B1Col1}`}}></div>
              <div className="triangle bottom-right" style= {{borderColor: `${B1Col2Out}`, borderWidth: '2px', borderStyle: 'solid', backgroundColor: `${B1Col2}`}}></div>
              </div>
            </div>
          </div>

        
        <div className="col-6">
          <div className="large-square" onClick={() => handleBoxClick('2')} style= {{borderColor: `${isB2Correct}`, borderWidth: '2px', borderStyle: 'solid' }}>{curTeam2}</div>
          <div className='text-sm'>AWAY</div>
          <div className="d-flex justify-content-center mt-1">
          <div className="small-square" style= {{borderColor: `${B2SportOut}`, borderWidth: '2px', borderStyle: 'solid' }}>{B2Sport}</div>
          <div className="small-square" style= {{borderColor: `${B2LocOut}`, borderWidth: '2px', borderStyle: 'solid' }}>{B2Loc}</div>
          <div className= "small-square" style= {{borderColor: `${B2Col1Out}`, borderWidth: '2px', borderStyle: 'solid'}}>
              <div className="triangle top-left" style= {{borderColor: `${B2Col1Out}`, borderWidth: '2px', borderStyle: 'solid', backgroundColor: `${B2Col1}`}}></div>
              <div className="triangle bottom-right" style= {{borderColor: `${B2Col2Out}`, borderWidth: '2px', borderStyle: 'solid', backgroundColor: `${B2Col2}`}}></div>
          </div>
        </div>
        </div>
      </div>

      
    {/* <h3 className="mt-5">Guesses</h3> */}
      <table className="table table-bordered table-striped mt-3">
        <thead className="thead-dark">
          {/* <tr>
            <th scope="col">Matchup</th>
          </tr> */}
        </thead>
        <tbody>
          <tr >
            <td style={{color: isCorrect ===1 ? 'lightgreen': 'lightcoral'}}>{guesses[0]}</td>
          </tr>
          <tr>
            <td style={{color: isCorrect ===1 ? 'lightgreen': 'lightcoral'}}>{guesses[1]}</td>
          </tr>
          <tr>
            <td style={{color: isCorrect ===1 ? 'lightgreen': 'lightcoral'}}>{guesses[2]}</td>
          </tr>
          <tr>
            <td style={{color: isCorrect ===1 ? 'lightgreen': 'lightcoral'}}>{guesses[3]}</td>
          </tr>
          <tr>
            <td style={{color: isCorrect ===1 ? 'lightgreen': 'lightcoral'}}>{guesses[4]}</td>
          </tr>
        </tbody>
      </table>
      {buttonVis && 
        (<button type="button" class="btn btn-outline-dark" onClick={checkGuess} >Submit</button>)}

{endModalVis && (
    <>
      <div className="modal-overlay">
      <div className="container rounded text-center mt-2" style={{
          borderColor: 'black',
          borderWidth: '2px',
          borderStyle: 'solid',
          backgroundColor: 'dimgrey',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '80%' ,
          flexDirection: 'column', // Stack items vertically
        }}>
        <div className="text-white  " style={{ marginBottom: '2px' }}>{isCorrect ? 'Great Job!': "Better luck next time"}</div>
        <div className="h5 text-center" style={{ marginBottom: '2px' }}>{teams_correct[0]+ ' VS ' + teams_correct[1]}</div>
        <div className="small text-center" style={{ marginBottom: '6px' }}>{game_time}</div>

        <div className="d-flex justify-content-center mt-1">
          <div className="h6 text-center mx-2">HOME</div>
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="xs-square mx-1" style={{
                  backgroundColor: guesses[index] 
                      ? (guesses[index].split(' VS ')[0] === teams_correct[0] ? "lightgreen" : "lightcoral") 
                      : "grey"}}></div>
            ))}
          </div>
          
          <div className="d-flex justify-content-center mt-1">
          <div className="h6 text-center mx-2">AWAY</div>
            {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="xs-square mx-1" style={{
                  backgroundColor: guesses[index] 
                      ? (guesses[index].split(' VS ')[1] === teams_correct[1] ? "lightgreen" : "lightcoral") 
                      : "grey"
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

    </>
)}
</div>

{intromodalOpen && (
  <>
    <div className="modal-backdrop fade show --black" onClick={closeintroModal}></div>
    <div className="modal show" style={{ display: 'block' }} onClick={(e) => e.stopPropagation()}>
      <div className="popup-overlay d-flex justify-content-center align-items-center" onClick={closeintroModal}>
        <div className="popup-content card bg-dark text-light p-4 shadow-lg rounded">
          <h2 className="card-title text-center mb-3">How to Play</h2>
          <p className="card-text mb-3">
            You have five chances to guess the game of the day- a matchup taking place today in the NFL, NBA, NHL or MLB.
          </p>
          <p className="card-text mb-3">
            If a team that you guess is in the same league, the same region of the US, or has one of the same primary colors as the correct team, those hints will appear on the board. 
          </p>
          <p className="card-text mb-3">
            A green box means you got the correct attribute and team. A yellow box means that the attribute you guessed matches one of the correct teams, just not the one you guessed.
          </p>
          <button className="btn btn-dark">Let's Play</button>
        </div>
      </div>
    </div>
  </>
)}

   


    {modalOpen && (
        <>
          <div className="modal-backdrop fade show" onClick={closeModal}></div>
          <div className="modal show" style={{ display: 'block' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  {/* <h5 className="modal-title">NFL</h5> */}
                  <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
              <input 
                type="radio" 
                className="btn-check" 
                name="NFL" 
                id="NFL" 
                autoComplete="off" 
                checked={modalSport === 'NFL'} 
                onChange={() => setModalSport('NFL')}
              />
              <label className="btn btn-outline-dark" htmlFor="NFL">NFL</label>

              <input 
                type="radio" 
                className="btn-check" 
                name="NBA" 
                id="NBA" 
                autoComplete="off" 
                checked={modalSport === 'NBA'} 
                onChange={() => setModalSport('NBA')}
              />
              <label className="btn btn-outline-dark" htmlFor="NBA">NBA</label>

              <input 
                type="radio" 
                className="btn-check" 
                name="MLB" 
                id="MLB" 
                autoComplete="off" 
                checked={modalSport === 'MLB'} 
                onChange={() => setModalSport('MLB')}
              />
              <label className="btn btn-outline-dark" htmlFor="MLB">MLB</label>

              <input 
                type="radio" 
                className="btn-check" 
                name="NHL" 
                id="NHL" 
                autoComplete="off" 
                checked={modalSport === 'NHL'} 
                onChange={() => setModalSport('NHL')}
              />
              <label className="btn btn-outline-dark" htmlFor="NHL">NHL</label>
            </div>
                </div>
                <div className="modal-body">
                  {/* {team_lib.map((team) => (<div key={team.id} className="h5" onClick={() => setCurTeam(team.team)}>{team.team}</div>))} */}
                  {team_lib.filter(row => row.sport === modalSport).map((team) => (<div key={team.id} className="h5" onClick={() => setCurTeam(team.team)}>{team.team}</div>))}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    <div className="text-center text-light py-3">
      <img src="./logo_v.jpeg" alt="footer logo" style={{ maxHeight: '50px' }} />
      <p>&copy; Play Versus</p>
    </div>




    </div>
  );
}

export default App;
