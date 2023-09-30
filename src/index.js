let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded")
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
//function adds new toy to DOM
function toyToDom(element) {
  const card = document.createElement('div');
        card.classList.add("card");
        const toy = document.querySelector("#toy-collection").appendChild(card);
        const h2 = document.createElement('h2');
        h2.textContent = element['name'];
        card.appendChild(h2);
        const img = document.createElement('img');
        img.classList.add('toy-avatar');
        img.src = element['image'];
        card.appendChild(img);
        const p = document.createElement('p');
        p.textContent = element['likes'];
        card.appendChild(p);
        const btn = document.createElement('btn');
        btn.classList.add('like-btn');
        btn.id = element['id'];
        btn.textContent = 'Like ❤️';
        card.appendChild(btn)
        btn.addEventListener('click', addLikes)

}


  //Add Toy Info to the Card
  const configuration = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }
  fetch('http://localhost:3000/toys', configuration)
    .then(res => res.json())
    .then(data => {
      for (let element of data) {
        toyToDom(element)
      }
    })
  //Add a New Toy
   document.querySelector(".submit")
    .addEventListener('click', () => {
      fetch('http://localhost:3000/toys', {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": document.querySelector('input[name=name]').value,
          "image": document.querySelector('input[name=image]').value ,
          "likes": 0
        })
      })
      .then(res=>res.json())
      .then(data=>{
        toyToDom(data);
        console.log(data)
        document.querySelector('input[name=name]').value="";
        document.querySelector('input[name=image]').value=''
        addToy=false
        toyFormContainer.style.display = "none";

      })
    })

    //Increase a Toy's Likes
  function addLikes(e) {
    e.preventDefault();
    const id = e.target.id;
    const card = e.target.parentElement;
    const newNumberOfLikes = parseInt(card.querySelector('p').innerText) + 1;
    console.log(newNumberOfLikes)
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": newNumberOfLikes
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("this  is the response", data)
        card.querySelector('p').innerText = data['likes']
      })
  }
})
