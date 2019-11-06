let players = [];

    function Player(name, number) {
    this.name = name;
    this.number = number;
    this.lives = 3;
    }

    let setButton = function() {
        let addPlayersButton = document.getElementById('addPlayers');
        return addPlayersButton;
    } 

    setButton().addEventListener('click', addAmount);

    function addAmount() {
        let amount = document.getElementById('numberPlayers');
        let startContainer = document.querySelector('.section');
        if (isNaN(amount.value) || amount.value == "" || amount.value <= 1) {
            amount.value = "Must be a number more than 1!"
            amount.onfocus = function() {
                amount.value = "";
            }
            return false;
           
        }
        
        window.sessionStorage.setItem('amount', amount.value);
        startContainer.remove();
        
        createInitContainer();
        createInitCaption();
        createInitFields();
        createInitButton();
    }

    function createInitContainer() {
        let initContainer = document.createElement('div');
        initContainer.classList.add('column-container');
        document.body.appendChild(initContainer);

        return initContainer;
    }

    let initContainer = createInitContainer();

    function createInitCaption() {
        
        let captionInit = document.createElement('h1');
        captionInit.textContent = "Fill the fields";
        captionInit.style.textAlign = "center";
        initContainer.appendChild(captionInit);
    }

     function createInitFields() {
        let amount = window.sessionStorage.getItem('amount');
        for (let i = 0; i < amount; i++) {
            let div = document.createElement('div');
            initContainer.appendChild(div);

            let name = document.createElement('input');
            name.type = "text";
            name.placeholder = "Name:"
            name.classList.add('input');
            div.appendChild(name);

            let number = document.createElement('input');
            number.type = "number";
            number.placeholder = "Number:";
            number.classList.add('input');
            div.appendChild(number);
        }
     }
     
    function createInitButton () {
         let div = document.createElement('div');
         initContainer.appendChild(div);

         let buttonInit = document.createElement('button');
         buttonInit.textContent = "Play";
         buttonInit.classList.add('btn');
         buttonInit.classList.add('btn-primary');
         div.appendChild(buttonInit);

         buttonInit.addEventListener('click', addInfoSessionStorage);
         buttonInit.addEventListener('click', addInfoObject);
         buttonInit.addEventListener('click', removeFields);
         buttonInit.addEventListener('click', startGame);
     }
     
     function addInfoSessionStorage() {
         let names = document.querySelectorAll("input[type=text]");
         let numbers = document.querySelectorAll("input[type=number]");
         let length = window.sessionStorage.getItem('amount');

         for (let i = 0; i < length; i++) {
             window.sessionStorage.setItem(names[i].value, numbers[i].value);
         }
     }
        
     function addInfoObject (){
     window.sessionStorage.removeItem('amount');  

     for( let i = 0; i < window.sessionStorage.length; i++) {
         let key = sessionStorage.key(i);
         let name = new Player(sessionStorage.key(i), sessionStorage.getItem(key));
         players.push(name);
       }
     }

     function removeFields() {
        initContainer.remove();
     }
     
     function startGame() {
         
         let i = 0;
         let flag = false;
         
         let container = document.createElement('div');
         container.classList.add('column-container');
        
         let winner = document.createElement('h1');
         winner.classList.add('winner');

         let againButton = document.createElement('button');
         againButton.classList.add('btn');
         againButton.classList.add('btn-primary');
         againButton.textContent = "AGAIN"
         againButton.addEventListener('click', () => {
            window.location.reload();
         });

        let div = document.createElement('div');
        document.body.appendChild(div);
      
        let caption = document.createElement('h1');
        caption.textContent = `Goes ${players[i].name}`;
        div.appendChild(caption);

        let input = document.createElement('input');
        input.type = "number";
        input.classList.add('input');
        div.appendChild(input);

        let button = document.createElement('button');
        button.textContent = "Next";
        button.classList.add('btn');
        button.classList.add('btn-primary');
        div.appendChild(button);
        
        button.addEventListener('click', function() {
            for (let i = 0; i < players.length; i++) {
                if (input.value == players[i].number) {
                    players[i].lives--;
                    console.log(players[i]);
                }
                if (players[i].lives == 0) {
                    alert(`${players[i].name} has gone`)
                    players.splice(i,1);
                }
                if (players.length == 1) {
                 window.sessionStorage.clear();
                 div.remove();
                 document.body.style.backgroundColor = "green";
                 flag = true;
                }
            }

            i++;
            if (i >= players.length) {
                i = 0;
            }
            
            caption.textContent = `Goes ${players[i].name}`;
            input.value = "";
            input.focus()

            if (flag == true) {
                winner.innerHTML = `Won: ${players[0].name}`;
                document.body.appendChild(container);
                container.appendChild(winner);
                container.appendChild(againButton);
            }
        });
     }

     if (window.location.reload) {
        window.sessionStorage.clear();
     }