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


// Variables and eventlisteners to retrieve input values

let userEmail = document.getElementById('email')
let userPassword = document.getElementById('password')
let signUpBtn = document.getElementById('signUpBtn');
let loginBtn = document.getElementById('loginBtn');
let subscription = document.getElementsByName('yes_no');


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


	// Se till att alla fält måste vara ifyllda för att en user ska kunna reggas. 2. Verifiera så att det inte finns user med samma email

	fetch("http://localhost:3000/users/new", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newUser)
	})
		.then(res => res.json())
		.then(data => console.log(data));


})

loginBtn.addEventListener('click', (e) => {
	e.preventDefault();

	let checkUser = {
		userEmail: userEmail.value,
		userInputPassword: userPassword.value
	}

	console.log(checkUser);

	fetch("http://localhost:3000/users/login", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(checkUser)
	})
		.then(res => res.json())
		.then(data => console.log(data));


})