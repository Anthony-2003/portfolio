
const toggleBtn = document.getElementById("_toggle");
const nav = document.getElementById("_nav");
const navList = document.getElementById("_navList");
const listOption = document.querySelectorAll(".list-option");
const sendEmailBtn = document.getElementById('sendEmail');

// Agregar evento de clic a cada opción del menú
listOption.forEach(option => {
  option.addEventListener('click', () => {
    nav.classList.remove("open");
    navList.classList.remove("open");
    toggleBtn.classList.remove("close");
    enableScroll();
    removeMenuOptionsText();
  });
});

toggleBtn.addEventListener('click', () => {
  nav.classList.toggle("open");
  navList.classList.toggle("open");
  toggleBtn.classList.toggle("close");

  if (navList.classList.contains('open')) {
    disableScroll();
    listOption[0].querySelector('.icon').insertAdjacentText('afterend', 'Introducción');
    listOption[1].querySelector('.icon').insertAdjacentText('afterend', 'Proyectos');
    listOption[2].querySelector('.icon').insertAdjacentText('afterend', 'Habilidades');
    listOption[3].querySelector('.icon').insertAdjacentText('afterend', 'Contacto');
  } else {
    enableScroll();
    removeMenuOptionsText();
  }
});

sendEmailBtn.addEventListener('click', async () => {
  try {
      const emailData = {
          from: 'Acme <onboarding@resend.dev>',
          to: ['anthonyvolquezkiki@gmail.com'],
          subject: 'Asunto del Correo',
          html: '<p>Contenido del Correo</p>',
      };

      const response = await fetch('http://localhost:3000/send-email', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error(`Error al enviar el correo electrónico: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data.message);
 
  } catch (error) {
      console.error('Error al enviar el correo electrónico:', error.message);
  }
});

function disableScroll() {
  document.body.style.overflow = "hidden";
}

function enableScroll() {
  document.body.style.overflow = "auto";
}

function removeMenuOptionsText() {
  listOption.forEach(option => {
    const textNode = option.querySelector('.icon').nextSibling;
    if (textNode) {
      textNode.remove();
    }
  });
}

console.log(sendEmailBtn);