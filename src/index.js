let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // fetch toy data from db.json
 
function fetching(){
  return fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toydata => {
    creatingToyCards(toydata)
    }
  )}
  fetching()
    

  function postinToyData(newtoyObj){
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
         Accept: "application/json"
      },
      body: JSON.stringify(newtoyObj),
    })
    .then(resp => resp.json())
    .then(toys => {return toys})
  }

  function patchinTheLikesIn(toyElement){
    fetch(`http://localhost:3000/toys/${toyElement.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
         Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": `${toyElement.likes}`, 
      }),
    })
    .then(resp => resp.json())
    .then(toys => {return toys})
  }
  // creating Toy Cards out of Toy data retrived by fetch
  function creatingToyCards(toyData) {
    for(const toyElement of toyData) {
      const toyCard = document.createElement('div');
      toyCard.innerHTML = `<h2>${toyElement.name}</h2>
      <img src='${toyElement.image}' class='toy-avatar'>
      <p>${toyElement.likes} likes</p>
      <button class='likeButton' id='likeButton'> Like ❤️ </button>`
      toyCard.querySelector('#likeButton').addEventListener('click', e => {
        const p = toyCard.querySelector('p');
        toyElement.likes ++
        // console.log(p)
        p.textContent = `${toyElement.likes} likes`
        patchinTheLikesIn(toyElement)
      })
      toyCard.setAttribute('class', 'card')
      appendingToTheDOM(toyCard)
      }
  }
  // appending the Toy Cards to the DOM
  function appendingToTheDOM(element) {
    const toyCollection = document.getElementById('toy-collection');
    toyCollection.appendChild(element);
  }

  function submittingANewToy() {
    const newToyBtnArray = document.getElementsByClassName('submit')
    const newToyBtn = newToyBtnArray[0]
      newToyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let [name, img] = document.getElementsByClassName('input-text');
        name = name.value
        img = img.value
        const newtoyObj = {
          name: name,
          image: img,
          likes: 0,
        }
        document.querySelector('#toy-collection').innerHTML = ""
        postinToyData(newtoyObj);
        fetching()
        document.querySelector('form').reset()
        //  postinToyData(name, img)
      });
  }
  submittingANewToy()


});
