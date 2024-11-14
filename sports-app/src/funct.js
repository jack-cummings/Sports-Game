  // const [guesses, setGuesses] = useState(['New York Yankees vs Philadelphia Phillies', 'Los Angeles Dodgers vs San Francisco Giants', 'Chicago Cubs vs St. Louis Cardinals'])

const gt1at1Elements = []
const gt1at2Elements = []
const gt2at1Elements = []
const gt2at2Elements = []

const atts = ['team','sport','region','primary_colors']

setCurTeam1('Guess Team')
setCurTeam2('Guess Team')

atts.forEach((x) => {
  if (guessTeam1[x]=== ansTeam1[x]) { gt1at1Elements.push(x)}
  if (guessTeam1[x]=== ansTeam2[x]) { gt1at2Elements.push(x)}
  if (guessTeam2[x]=== ansTeam1[x]) { gt2at1Elements.push(x)}
  if (guessTeam1[x]=== ansTeam1[x]) { gt2at2Elements.push(x)}
})

const scores = [
  { name: 'gt1at1Score', value: gt1at1Elements },
  { name: 'gt1at2Score', value: gt1at2Elements },
  { name: 'gt2at1Score', value: gt2at1Elements },
  { name: 'gt2at2Score', value: gt2at2Elements }
];
console.log(scores)

scores.sort((a, b) => b.value.length - a.value.length);

const topTwo = scores.slice(0, 2).map(item => item.name);

topTwo.forEach((label) => {
if (label.startsWith('gt1')) {
  const dict = scores.find(row => row.name === label)
  const answer = dict.name[5]
  var out;
  if (answer === '1') {out = ansTeam1}
  if (answer === '2') {out = ansTeam2}
  dict.value.forEach((e) => {
    if (e === "sport") {setB1Sport(out[e])}
    if (e === "region") {setB1Loc(out[e])}
    if (e === "primary_colors") {setB1Col(out[e])}
    if (e === "team") {setCurTeam1(out[e])}
  })
} 
if (label.startsWith('gt2')){
  const dict = scores.find(row => row.name === label)
  const answer = dict.name[5]
  let out;
  if (answer === '1') {out = ansTeam1}
  if (answer === '2') {out = ansTeam2}
  console.log(out)
  dict.value.forEach((e) => {
    if (e === "sport") {setB2Sport(out[e])}
    if (e === "region") {setB2Loc(out[e])}
    if (e === "primary_colors") {setB2Col(out[e])}
    if (e === "team") {setCurTeam2(out[e])}
  })
}
})



// ENd Modals
{endModalVis && (
    <>
      <div className="modal-overlay" onClick={closeModal}>

        {isCorrect && (
        <div className="container rounded text-center mt-2" style={{
          borderColor: 'darkgreen',
          borderWidth: '2px',
          borderStyle: 'solid',
          backgroundColor: 'lightgreen',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '80%' 
        }}>
        <div className="row" style={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
          <div className='h5'>Way to Go!</div>
          <div className="col-5 d-flex justify-content-center">
            <div className="med-square" style={{ width: '90px', height: '90px', borderColor: "darkgreen", borderWidth: '2px', borderStyle: 'solid', backgroundColor: "lightgreen"}}>{ansTeam1.team}</div>
          </div>
          <div className="col-5 d-flex justify-content-center">
            <div className="med-square" style={{ width: '90px', height: '90px', borderColor: "darkgreen", borderWidth: '2px', borderStyle: 'solid', backgroundColor: "lightgreen"}}>{ansTeam2.team}</div>
          </div>
          <div className='text small'>date/time</div>
        </div>
        </div>
        )}

        {!isCorrect && (
        <div className="container rounded text-center mt-2" style={{
          borderColor: 'darkred',
          borderWidth: '2px',
          borderStyle: 'solid',
          backgroundColor: 'lightcoral',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '80%' ,
          position: 'fixed',      
          bottom: 10,        
          left: 0,
          right:0
        }}>
        <div className="row" style={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
          <div className='h5'>Better Luck Next Time!</div>
          <div className="col-5 d-flex justify-content-center">
            <div className="med-square" style={{ width: '90px', height: '90px', borderColor: "darkred", borderWidth: '2px', borderStyle: 'solid', backgroundColor: "lightcoral"}}>{ansTeam1.team}</div>
          </div>
          <div className="col-5 d-flex justify-content-center">
            <div className="med-square" style={{ width: '90px', height: '90px', borderColor: "darkred", borderWidth: '2px', borderStyle: 'solid', backgroundColor: "lightcoral"}}>{ansTeam2.team}</div>
          </div>
          <div className='text small'>date/time</div>
        </div>
        </div>
        )}
      </div>
    </>
  )}


//   <div className="xs-square mx-1" style={{backgroundColor: guesses[0].split(' VS ')[0]===teams_correct[0] ? "lightgreen" : "lightcoral"}} ></div>
//   <div className="xs-square mx-1" style={{backgroundColor: guesses[1].split(' VS ')[0]===teams_correct[0] ? "lightgreen" : "lightcoral"}} ></div>
//   <div className="xs-square mx-1" style={{backgroundColor: guesses[2].split(' VS ')[0]===teams_correct[0] ? "lightgreen" : "lightcoral"}} ></div>
//   <div className= "xs-square mx-1" style={{backgroundColor: guesses[3].split(' VS ')[0]===teams_correct[0] ? "lightgreen" : "lightcoral"}} ></div>
//   <div className= "xs-square mx-1" style={{backgroundColor: guesses[4].split(' VS ')[0]===teams_correct[0] ? "lightgreen" : "lightcoral"}} ></div>