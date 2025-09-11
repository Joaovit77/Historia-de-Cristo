// 1️⃣ Importar módulos Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
  limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 2️⃣ Configuração do seu projeto Firebase (troque pelos seus dados)
const firebaseConfig = {
  apiKey: "AIzaSyDXxa9MS3I6gaWI2uRM9pp6R1QwnUxE3lU",
  authDomain: "historia-de-cristo-4567b.firebaseapp.com",
  projectId: "historia-de-cristo-4567b",
  storageBucket: "historia-de-cristo-4567b.appspot.com",
  messagingSenderId: "669792972416",
  appId: "1:669792972416:web:bdcdc6dc034abceed24065"
};

// 3️⃣ Inicializar Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const testemunhosCol = collection(db, "testemunhos");

// 4️⃣ Função para enviar testemunho
async function enviarTestemunho() {
  const nomeEl = document.getElementById('nomeTestemunho');
  const textoEl = document.getElementById('textoTestemunho');
  const nome = (nomeEl.value || "Anônimo").trim();
  const texto = (textoEl.value || "").trim();

  if (!texto) {
    alert("Escreva algo antes de enviar.");
    return;
  }

  if (texto.length > 1200) {
    alert("Testemunho muito longo. Use até 1200 caracteres.");
    return;
  }

  try {
    await addDoc(testemunhosCol, {
      nome,
      texto,
      aprovado: false,   // só admin aprova
      criadoEm: serverTimestamp()
    });

    textoEl.value = "";
    alert("Obrigado! Seu testemunho foi enviado para moderação.");
  } catch (err) {
    console.error(err);
    alert("Erro ao enviar. Tente novamente mais tarde.");
  }
}

document.getElementById('btnEnviarTest').addEventListener('click', enviarTestemunho);

// 5️⃣ Mostrar testemunhos aprovados em tempo real
const q = query(testemunhosCol, where('aprovado','==', true), orderBy('criadoEm','desc'), limit(50));

onSnapshot(q, (snapshot) => {
  const lista = document.getElementById('listaTestemunhos');
  lista.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const bloco = document.createElement('div');
    bloco.className = 'testemunho-item';
    const nomeEl = document.createElement('strong');
    nomeEl.textContent = data.nome || 'Anônimo';
    const p = document.createElement('p');
    p.textContent = data.texto;
    bloco.appendChild(nomeEl);
    bloco.appendChild(p);
    lista.appendChild(bloco);
  });
});

// opcional para console
window.enviarTestemunho = enviarTestemunho;