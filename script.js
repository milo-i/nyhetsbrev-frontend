let root = document.getElementById('root');


let rootTemplate = `
<nav class="wrapper">
 <a href="index.html"><img id="img" src="logo.png" alt="logo"></a>
  <ul class="ul-list">
   <li class="li-item"><a href="index.html">Hem</a></li>
   <li class="li-item"><a href="#">Kontakta</a></li>
   <li class="li-item"><a href="#">Om oss</a></li>
  </ul>
 </nav>


 <div class="user-input">

  <label for="email">Skriv in din email</label>
  <input type="email" id="email" placeholder="Email">

   <label for="password">Skriv in ditt lösenord</label>
   <input type="password" id="password" placeholder="Lösenord">

    <button class="signUpBtn" id="signUpBtn">Registrera dig</button>
    <button class="loginBtn" id="loginBtn">Logga in</button>


    <div id="wrapper">
     <label for="yes_no_radio">Vill du ta del av vårt nyhetsbrev?</label>
     <p>
      <input type="radio" name="yes_no" value="yes" id="yes">Japp!!!</input>
     </p>
     <p>
      <input type="radio" name="yes_no" value="no" id="no" required>Nope!!!!</input>
     </p>
    </div>

 </div>`;

root.insertAdjacentHTML('afterbegin', rootTemplate);