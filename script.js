let root = document.getElementById('root');

// Template for HTML
let rootTemplate = `<nav class="wrapper">
	<ul class="ul-list">
		<li class="li-item"><a href="index.html">Hem</a></li>
		<li class="li-item"><a href="#">Kontakta</a></li>
		<li class="li-item"><a href="#">Om oss</a></li>
		</ul>
 	</nav>

 <div class="user-input">

  <label for="email">Skriv in din email: </label>
  <input type="email" id="email" placeholder="Email">

   <label for="password">Skriv in ditt lösenord: </label>
   <input type="password" id="password" placeholder="Lösenord" required>

    <button class="signUpBtn" id="signUpBtn">Registrera dig</button>
    <button class="loginBtn" id="loginBtn">Logga in</button>

    <div id="wrapper">
     <label for="yes_no_radio">Vill du ta del av vårt nyhetsbrev?</label>
     <p>
      <input type="radio" name="yes_no" value="true" id="yes">Japp!!!</input>
     </p>
     <p>
      <input type="radio" name="yes_no" value="false" id="no">Nope!!!!</input>
     </p>
    </div>
 </div>`;

root.insertAdjacentHTML('afterbegin', rootTemplate);

function logIn(username, subscription, id) {
	root.innerHTML = '';
	let loginTemplate = `<nav class="wrapper">
	<ul class="ul-list">
		<li class="li-item"><a href="index.html">Hem</a></li>
		<li class="li-item"><a href="#">Kontakta</a></li>
		<li class="li-item"><a href="#">Om oss</a></li>
		</ul>
 	</nav>

 <div class="user-data">

<h1>Hej ${username} och välkommen till Login sidan</h1>

<p>Din prenumerationsstatus är: ${subscription}</<p>

 </div>
	
	    <div id="wrapper">
     <label for="yes_no_radio">Vill du ändra din prenumerationsstatus? Klicka i någon av knapparna och sedan klickar du på Spara knappen</label>
     <p>
      <input type="radio" name="yes_no" value="true" id="yes">Japp!!!</input>
     </p>
     <p>
      <input type="radio" name="yes_no" value="false" id="no">Nope!!!!</input>
     </p>
			<button>Spara</button>

    </div>`;

	root.insertAdjacentHTML("afterbegin", loginTemplate);


}



// Variables and eventlisteners to retrieve input values

let userEmail = document.getElementById('email')
let userPassword = document.getElementById('password')
let signUpBtn = document.getElementById('signUpBtn');
let loginBtn = document.getElementById('loginBtn');
let subscription = document.getElementsByName('yes_no');


// SIGNUP
signUpBtn.addEventListener('click', (e) => {
	e.preventDefault();

	let subscriptionChoice;

	subscription.forEach(radio => {
		if (radio.checked) {
			// console.log(radio.value); FYI BOOLEAN VÄRDENA SOM VISAS I SUBSCRIPTION ÄR TYPEOF STRING OCH INTE BOOLEAN 
			// console.log(typeof radio.value);
			return subscriptionChoice = radio.value;
		}
	});

	let newUser = {
		userEmail: userEmail.value,
		userPassword: userPassword.value,
		subscription: subscriptionChoice
	}

	console.log(newUser);


	// Se till att alla fält måste vara ifyllda för att en user ska kunna reggas.

	fetch("http://localhost:3000/users/new", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newUser)
	})
		.then(res => res.json())
		.then(data => console.log(data)); // Kolla denna console.log och den ska tas bort


})


// LOGIN
loginBtn.addEventListener('click', (e) => {
	e.preventDefault();

	let checkUser = {
		userEmail: userEmail.value,
		userInputPassword: userPassword.value
	}

	fetch("http://localhost:3000/users/login", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(checkUser)
	})
		.then(res => res.json())
		.then((data) => {

			console.log(data);


			if (data.message) {
				if (data.message == 'Fel användarnamn eller lösenord ifyllt') {
					alert('Fel användarnamn eller lösenord ifyllt')
					return root.insertAdjacentHTML('afterbegin', rootTemplate);
				}
			} else {

				logIn(data.userName, data.subscription, data.userId)
				saveLogin(data.userName, data.subscription, data.userId);
			}
		});
})



function saveLogin(username, subscription, id) {
	let user = JSON.stringify({
		id: id,
		username: username,
		subscription: subscription
	});
	localStorage.setItem('user', user);
}


function getLogin() {
	// Kolla om det finns localStorage
	let user = localStorage.getItem('user');
	let checkUser = JSON.parse(user);
	if (checkUser != null) {
		console.log('inloggad');
		console.log(checkUser);
		console.log(typeof checkUser);
		// anropa funktion för att skriva ut templates för en inloggad användare
		logIn(checkUser.username, checkUser.subscription, checkUser.id)
	}
}
getLogin();