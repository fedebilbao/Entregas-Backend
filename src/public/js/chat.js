const socketClientchat = io();
const h4Name = document.getElementById("name");
const form = document.getElementById ("chatForm");
const inputMessage = document.getElementById ("message");
const divChat = document.getElementById("chat");

Swal.fire({
    title: 'Bienvenido!',
    text: 'Cual es tu correo electronico?',
    input: "text",
    inputValidator: (value=>{
        if(!value){
            return "Necesita completar el mail"
        }
    }),
    confirmButtonText: 'Ingresar al Chat'
  })
  .then (input=>{
    user= input.value;
    h4Name.innerText = user;
    socketClientchat.emit("newUser",user);
  })

  socketClientchat.on("UserConnected", (user) => {
    Toastify({
        text: user + " se ha conectado",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
  })

  form.onsubmit = (e) => {
    e.preventDefault()
    const infoMessage = {
        user: user,
        message: inputMessage.value,
    };
    inputMessage.innerText ="";
    socketClientchat.emit("message",infoMessage);
  }

  socketClientchat.on ("chat", (messages)=> {
    const chat = messages
        .map ((m)=>{
        return "<p>"+ m.user + ": " + m.message + "</p>";
    })
        .join(" ");
    divChat.innerHTML = chat;

  });