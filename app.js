let main = document.getElementById('main')
let addBtn = document.getElementById('addBtn')

addBtn.addEventListener('click', addNote)

function addNote() {
    const note = document.createElement('div')
    note.classList.add('note')
    note.innerHTML = `
    <div class="tool">
        <i id='save' class="fa-solid fa-save"></i>
        <i id='trash' class="fa-solid fa-trash"></i>
    </div>
    <textarea></textarea>
    `

    const save = note.querySelector('#save')
    const trash = note.querySelector('#trash')
    const textarea = note.querySelector('textarea')

    save.addEventListener("click", saveNotes);
    textarea.addEventListener('input', saveNotes)
    trash.addEventListener('click', ()=>{
        note.remove()
        saveNotes()
    })

    main.appendChild(note)
}

function saveNotes() {
    const notes = document.querySelectorAll(".note textarea")
    const data = Array.from(notes).map(note => note.value)
    console.log(notes, data);

    if (data.length === 0) {
        localStorage.removeItem('notes')
    }else{
        localStorage.setItem('notes', JSON.stringify(data))
    }

}

const loadNotes =()=>{

    const lsNotes = JSON.parse(localStorage.getItem('notes'))

    if (lsNotes!==null) {
        lsNotes.forEach(nodeText =>{
            addNote();
            const notes = document.querySelectorAll('.note textarea')
            const lastNote = notes[notes.length-1]
            lastNote.value = nodeText
        });
    }else{
        addNote()
    }

}

loadNotes()