/* ======================================================
                 LLEGIR ABANS DE COMENÇAR
   ======================================================
   Recomano fer aquest exercici LLEGINT MOLT BÉ, a cada pas,
   l'apartat d'Explicació teòrica, consultant el PPT corresponent
   i, només fent a la IA preguntes puntuals.

   ENJOY!
*/



/* ======================================================
   PAS 0: Preparació de variables
   ======================================================
   Explicació teòrica:
   - document.getElementById() retorna un element del DOM per ID.
   - Guardem les referències a elements clau per poder-hi afegir events.
   - 'tasks' és l'array on guardarem totes les tasques.
*/
const form = document.getElementById('todo-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearAllBtn = document.getElementById('clear-all');
const sortButton = document.getElementById('sort');

// A tasks ANIREM GUARDANT LES TASQUES
// CADA TASCA ESTARÀ EMMAGATZEMADA EN UN OBJECTE
   // VEURE PAS 1
let tasks = [];

/* ======================================================
   PAS 1: Afegir tasques amb 'submit'
   ======================================================
   Teoria:
   - Els formularis tenen un event 'submit'.
   - e.preventDefault() evita que la pàgina es recarregui
   (és a dir, que el formulari s'envii)
   - Podem crear objectes JavaScript per representar les tasques.
*/

/* =================== CODI A COMPLETAR =================== */
// Afegir al formulari un listener per l'event 'submit'
form.addEventListener('submit', afegirTasca);

function afegirTasca(e) {
   e.preventDefault();
   // Llegir el value de l'input
   const value = document.getElementById('task-input').value;
   // Crear objecte tasca amb {id, text, completed}.
      // Posar com a id la data actual: Date.now()
      // Posar com a text el value de l'input
      // Posar per defecte completed a false
   let newTask = {"completed": false, "text":value, "id":Date.now()};
   // Afegir-la a l'array tasks
   tasks.push(newTask);
   // Cridar renderTasks() (La declararem a PAS 2)
   renderTasks();
   // Netejar el input de text.
   document.getElementById('task-input').value = "";
   // Posar-li el focus
   input.focus();
}


/* ======================================================
   PAS 2: Renderitzar les tasques
   ======================================================
   Teoria:
   - Per mostrar les tasques al DOM crearem elements <li>.
   - Cada tasca tindrà un botó per esborrar.
   - Podem utilitzar li.dataset.id per identificar cada tasca.
*/

/* =================== CODI A COMPLETAR =================== */
function renderTasks() {
   // Buidar #taskList abans de renderitzar (.innerHTML = '')
   taskList.innerHTML = "";
   // Iterar sobre tasks i per cada task...
   tasks.forEach(task => {
      // crear un <li> i posar-lo dins del #taskList
      let nuevaTarea = document.createElement('li');
      nuevaTarea.textContent = task.text;
      // Posar al <li> el id de la task (per identificar després el <li>)
      nuevaTarea.dataset.id = task.id;
      // Si task.completed == true, posar 'completed' al className del <li>
      if (task.completed) {
         nuevaTarea.className = "completed";
      }
      // Posar el text de la task com a contingut del <li>
      taskList.append(nuevaTarea);
      // Crear botó i posar-lo a dins del <li>
      let boton = document.createElement('button');
      boton.textContent = "Esborra";
      nuevaTarea.append(boton);
   })
}

/* ======================================================
   PAS 3: Delegació d'esdeveniments
   ======================================================
   Teoria:
   - Delegació: posar un sol event listener en un element pare.
   - Ens permet capturar events de fills que es creen dinàmicament.
   - Podem distingir clicks en li o en button amb e.target.tagName.
*/

/* =================== CODI A COMPLETAR =================== */
// Afegir a taskList un listener de l'event 'click'
taskList.addEventListener('click', function (e) {
   // Recuperar el tipus d'element HTML clicat
   let tagName = e.target.tagName;
   // Si s'ha clicat un button -> esborrar tasca (per id)
   if (tagName === "BUTTON") {
      let id = e.target.parentElement.dataset.id;
      tasks = tasks.filter(task => task.id != id);
   }
   // Si s'ha clicat un li -> marcar completada (per id)
   if (tagName === "LI") {
      let id = e.target.dataset.id;
      let task = tasks.find(t => t.id == id);
      task.completed = !task.completed;
   }
   // Tornar a cridar renderTasks().
   renderTasks();
})


   /* ======================================================
      PAS 4: Esborrar totes les tasques
      ======================================================
      Teoria:
      - Botó independent que buida l'array tasks.
      - Cridem renderTasks() per actualitzar la vista.
   */

   /* =================== CODI A COMPLETAR =================== */
clearAllBtn.addEventListener('click', function (e) {
   // Buidar la llista tasks
   tasks = [];
   // Tornar a cridar renderTasks().
   renderTasks(e);
})

/* ======================================================
   PAS 5: Events de teclat
   ======================================================
   Teoria:
   - L'event 'keydown' detecta qualsevol tecla premuda.
   - Podem llegir e.key per saber quina tecla.
   */

/* =================== CODI A COMPLETAR =================== */
// Afegir el listener necessari per a que la tecla 'Backspace' esborri la darrera tasca i l'input està buit
document.addEventListener('keydown', function (e){
   // COMPLETAR CODI HANDLER
   if (e.key === "Backspace" && input.value === "") {
      e.preventDefault();
      
      tasks.pop();

      renderTasks();
   }
});

// /* ======================================================
//    PAS 6: Event personalitzat (OPCIONAL)
//    ======================================================
//    Teoria:
//    - CustomEvent permet crear events propis amb dades.
//    - document.dispatchEvent() envia l'event.
//    - document.addEventListener() pot escoltar-lo.
// */

// /* =================== CODI A COMPLETAR =================== */
// // PRIMER PAS: Crear event 'taskToggled' quan es marca completada.
//       // Això s'haurà de fer modificant el handler del PAS 3

// // ATENDRE EVENT: Posar un listener al body per l'event 'TaskToggled' que acabem
//    // de crear i fer que surti un alert que digui: Tasca completada!


// /* ======================================================
//    REPTES ADICIONALS
//    ======================================================
//    Teoria:
//    - Afegir filtre per mostrar només tasques completes o pendents.
//    - Afegir ordenació per ordre d’addició o alfabètic.
sortButton.addEventListener('click',sortList) 
   function sortList(e) {
      e.preventDefault();
      tasks.sort((a, b) => {
      return a.text.localeCompare(b.text);
      });
      // Tornar a cridar renderTasks().
      renderTasks();
}
//    - Guardar les tasques al localStorage i recuperar-les al carregar la pàgina.
// */