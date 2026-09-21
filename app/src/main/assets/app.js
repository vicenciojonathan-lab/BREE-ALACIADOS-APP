const CONFIG = {
  salonName: "Bree Beauty Center and More",
  whatsapp: "528182104618",
  displayWhatsapp: "81 8210 4618",
  socials: {
    facebook: "https://www.facebook.com/bree.alaciados",
    instagram: "https://www.instagram.com/breealaciados/",
    tiktok: "https://www.tiktok.com/@breealaciados"
  }
};

const services = [
  {name:"Alaciado RCplex / RCPLEX", category:"Alaciados", desc:"Servicio destacado publicado por Bree. En sus publicaciones se presenta como opción para cabello muy procesado o deshidratado. Requiere valoración previa."},
  {name:"Keratina", category:"Alaciados", desc:"Tratamiento/alaciado capilar publicado por Bree. Costo y duración se confirman según largo, volumen y condición del cabello."},
  {name:"Botox capilar", category:"Tratamientos", desc:"Tratamiento capilar publicado por Bree. Requiere diagnóstico para confirmar la opción adecuada."},
  {name:"Alaciado japonés", category:"Alaciados", desc:"Alaciado permanente incluido en el catálogo publicado por Bree."},
  {name:"Nanoplastia", category:"Alaciados", desc:"Tratamiento de alaciado incluido en el catálogo publicado por Bree."},
  {name:"Alaciado progresivo", category:"Alaciados", desc:"Servicio promocionado por Bree en publicaciones de 2026. Confirmar precio y promoción vigente."},
  {name:"Cortes personalizados", category:"Cabello", desc:"Servicio incluido en publicaciones del salón."},
  {name:"Tintes y diseños de color", category:"Color", desc:"Diseño de color y tintes. Se recomienda valoración previa del cabello."},
  {name:"Limpieza facial", category:"Facial", desc:"Servicio facial publicado por Bree. Confirma el tipo de limpieza disponible."},
  {name:"Depilación", category:"Belleza", desc:"Servicio de depilación publicado por Bree. Confirma zonas y técnica disponibles."},
  {name:"Aplicación de pestañas", category:"Mirada", desc:"Servicio de pestañas incluido en el catálogo publicado del salón."},
  {name:"Manicure y aplicación de uñas", category:"Uñas", desc:"Servicio de manicure y aplicación de uñas publicado por Bree."},
  {name:"Lash Lifting", category:"Mirada", desc:"Lifting de pestañas incluido en publicaciones del salón."},
  {name:"Laminado de ceja", category:"Mirada", desc:"Servicio de laminado de ceja incluido en publicaciones del salón."},
  {name:"Tratamientos de cabina", category:"Belleza", desc:"Tratamientos de cabina anunciados por Bree. Confirma opciones vigentes."},
  {name:"Cursos", category:"Cursos", desc:"Bree también ha publicado cursos. Solicita fechas, temario y disponibilidad."}
];

const products = [
  {id:1,name:"Shampoo artesanal",desc:"Producto mencionado en una ficha pública de Alaciados Bree. Presentación, fórmula, existencia y precio por confirmar."},
  {id:2,name:"Keratina capilar",desc:"Producto/tratamiento mencionado públicamente por Alaciados Bree. Consulta presentación y precio vigente."},
  {id:3,name:"Botox capilar",desc:"Producto/tratamiento mencionado públicamente por Alaciados Bree. Consulta presentación y precio vigente."},
  {id:4,name:"Catálogo de productos Bree",desc:"Bree publica venta de productos. Solicita por WhatsApp el catálogo actualizado, presentaciones y precios."}
];

const promos = [
  {title:"Promociones en alaciados",text:"Bree ha publicado promociones especiales en sus alaciados. Consulta la promoción vigente antes de reservar."},
  {title:"RCplex",text:"Uno de los servicios destacados recientemente por Bree. Solicita valoración y precio según tu cabello."},
  {title:"Color y tratamientos",text:"Pregunta por disponibilidad y paquetes vigentes de diseño de color, tratamientos y mantenimiento."}
];

const hours=["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];
let bookings=JSON.parse(localStorage.getItem("bree_bookings")||"[]");
let cart=JSON.parse(localStorage.getItem("bree_cart")||"[]");
const $=q=>document.querySelector(q);

function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),2200)}
function go(url){ if(url) location.href=url; }
function sendWhatsApp(text){go(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`)}

function renderServices(){
  $("#servicesGrid").innerHTML=services.map(s=>`
    <article class="card">
      <span class="tag">${s.category.toUpperCase()}</span>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <button class="btn secondary" onclick="chooseService(${JSON.stringify(s.name)})">Agendar</button>
    </article>`).join("");
}
window.chooseService=(name)=>{ $("#service").value=name; location.hash="#agenda"; };

function renderPromos(){
  const el=$("#promoGrid");
  if(!el) return;
  el.innerHTML=promos.map(p=>`<article class="card"><span class="tag">PROMO</span><h3>${p.title}</h3><p>${p.text}</p><button class="btn secondary" onclick="askPromo(${JSON.stringify(p.title)})">Consultar</button></article>`).join("");
}
window.askPromo=(title)=>sendWhatsApp(`Hola, vi en la app de ${CONFIG.salonName} la sección "${title}". ¿Me compartes la promoción y precio vigentes?`);

function initAgenda(){
  $("#service").innerHTML=services.map(s=>`<option>${s.name}</option>`).join("");
  $("#time").innerHTML=hours.map(h=>`<option>${h}</option>`).join("");
  const d=new Date(); d.setDate(d.getDate()+1); const ds=d.toISOString().slice(0,10);
  $("#date").min=ds; $("#date").value=ds;
}
function dataFromForm(){return{id:Date.now(),name:$("#name").value.trim(),phone:$("#phone").value.trim(),service:$("#service").value,date:$("#date").value,time:$("#time").value,hair:$("#hairLength").value,notes:$("#notes").value.trim()}}
function bookingText(b){return `Hola, quiero solicitar una cita en ${CONFIG.salonName}.\n\nNombre: ${b.name}\nWhatsApp: ${b.phone}\nServicio: ${b.service}\nFecha: ${b.date}\nHora: ${b.time}\nLargo: ${b.hair}\nComentarios: ${b.notes||"Sin comentarios"}\n\n¿Me confirmas disponibilidad, duración y costo?`}
function saveBooking(b){bookings.unshift(b);localStorage.setItem("bree_bookings",JSON.stringify(bookings));renderBookings()}
$("#bookingForm").addEventListener("submit",e=>{e.preventDefault();const b=dataFromForm();saveBooking(b);toast("Cita guardada en este teléfono");e.target.reset();initAgenda()})
$("#sendBooking").addEventListener("click",()=>{if(!$("#bookingForm").reportValidity())return;const b=dataFromForm();saveBooking(b);sendWhatsApp(bookingText(b))})
function renderBookings(){
 $("#bookingList").innerHTML=bookings.length?bookings.map(b=>`<div class="booking"><div><strong>${b.service}</strong><small>${b.date} · ${b.time} · ${b.name}</small></div><button class="pill" onclick="deleteBooking(${b.id})">Eliminar</button></div>`).join(""):`<div class="notice"><p>Aún no hay citas guardadas.</p></div>`;
}
window.deleteBooking=id=>{bookings=bookings.filter(x=>x.id!==id);localStorage.setItem("bree_bookings",JSON.stringify(bookings));renderBookings()}

function renderProducts(){
 $("#productGrid").innerHTML=products.map(p=>`<article class="card"><span class="tag">PRODUCTO</span><h3>${p.name}</h3><p>${p.desc}</p><strong>Precio por confirmar</strong><br><button class="btn secondary" onclick="addProduct(${p.id})">Agregar a consulta</button></article>`).join("");
}
window.addProduct=id=>{if(!cart.includes(id))cart.push(id);localStorage.setItem("bree_cart",JSON.stringify(cart));renderCart();toast("Producto agregado")}
function renderCart(){
 $("#cartCount").textContent=cart.length;
 $("#cartItems").innerHTML=cart.length?cart.map(id=>{const p=products.find(x=>x.id===id);return `<div class="cart-row"><div><strong>${p.name}</strong><small>Precio / existencia por confirmar</small></div><button class="pill" onclick="removeProduct(${id})">Quitar</button></div>`}).join(""):`<p class="muted">No hay productos en la consulta.</p>`;
}
window.removeProduct=id=>{cart=cart.filter(x=>x!==id);localStorage.setItem("bree_cart",JSON.stringify(cart));renderCart()}
$("#cartBtn").addEventListener("click",()=>$("#cartDialog").showModal());
$("#closeCart").addEventListener("click",()=>$("#cartDialog").close());
$("#sendOrder").addEventListener("click",()=>{
 if(!cart.length){toast("Agrega al menos un producto");return}
 const list=cart.map(id=>"• "+products.find(x=>x.id===id).name).join("\n");
 sendWhatsApp(`Hola, quiero consultar estos productos en ${CONFIG.salonName}:\n\n${list}\n\n¿Me confirmas presentaciones, precios y existencia?`);
});
window.openSocial=name=>go(CONFIG.socials[name]);
window.openWhatsApp=()=>sendWhatsApp(`Hola, quiero información de ${CONFIG.salonName}.`);

renderServices();renderPromos();initAgenda();renderBookings();renderProducts();renderCart();
