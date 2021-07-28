window.addEventListener('DOMContentLoaded', () => {
  getMonsters();
  createMonsterForm()
})

function getMonsters(){
  fetch('http://localhost:3000/monsters')
  .then(resp => resp.json())
  .then(monsters => show50Monsters(monsters))
}

function show50Monsters(e){
  const monsters = e
  let lastCard = 50
  let ind = 0
  for(ind; ind < lastCard; ind++){
    createMonsterCard(e[ind])
  }
  const fwBtn = document.querySelector('#forward');
  const bkBtn = document.querySelector('#back');
  const cardsDiv = document.querySelector('#monster-container')
  fwBtn.addEventListener('click', () => {
    if(lastCard <= e.length - 50){
      cardsDiv.innerHTML = ''
      lastCard += 50
      for(ind; ind < lastCard; ind++){
        createMonsterCard(monsters[ind])
      }
      console.log('ind', ind)
    }else if(ind === e.length){
      console.log('end of list')
    }else{
      cardsDiv.innerHTML = ''
      lastCard += e.length - ind
      for(ind; ind < lastCard; ind++){
        createMonsterCard(monsters[ind])
      }
      console.log('ind', ind)
    }
  })
  bkBtn.addEventListener('click', () =>{
    if (ind >= 100) {
      cardsDiv.innerHTML = '';
      lastCard -= 50
      ind = lastCard - 50
      for(ind; ind < lastCard; ind++){
        createMonsterCard(e[ind])
      }
    }else{
      cardsDiv.innerHTML = '';
      ind = 0
      lastCard = 50
      for(ind; ind < lastCard; ind++){
        createMonsterCard(e[ind])
      }
    }
  })
}

function createMonsterCard(monster){
  const monstersDiv = document.querySelector('#monster-container')
  const monsterCard = document.createElement('div')
    const name = document.createElement('h2')
    const age = document.createElement('p')
    const desc = document.createElement('p')
    monsterCard.id = `monster-${monster.id}`
    name.textContent = monster.name
    age.textContent = monster.age
    desc.textContent = monster.description
    monstersDiv.appendChild(monsterCard)
    monsterCard.append(name, age, desc)
}

function createMonsterForm(){
  const formDiv = document.querySelector('#create-monster')
  const createMonster = document.createElement('form')
  const nameInput = document.createElement('input')
  const ageInput = document.createElement('input')
  const descInput = document.createElement('input')
  const submitInput = document.createElement('input')
  nameInput.type = 'text'
  nameInput.placeholder = 'Monster Name'
  ageInput.type = 'text'
  ageInput.placeholder = 'Monster Age'
  descInput.type = 'text'
  descInput.placeholder = 'Monster Description'
  submitInput.type = 'submit'
  submitInput.textContent = 'Submit'
  createMonster.addEventListener('submit', handleSubmit)
  formDiv.appendChild(createMonster)
  createMonster.append(nameInput, ageInput, descInput, submitInput)
}

function handleSubmit(e){
  e.preventDefault()
  const monsterObj = {
    name: e.target[0].value,
    age: e.target[1].value,
    description: e.target[2].value
  }
  addMonster(monsterObj)
  document.querySelector('form').reset()
}

function addMonster(monster){
  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(monster)
  })
}


