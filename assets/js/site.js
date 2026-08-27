
const $=(s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>[...c.querySelectorAll(s)];
function getCart(){try{return JSON.parse(localStorage.getItem('maneCart'))||[]}catch(e){return[]}}
function saveCart(c){localStorage.setItem('maneCart',JSON.stringify(c));renderCart()}
function addToCart(id,finish='Gold'){
  const p=window.MANE_PRODUCTS.find(x=>x.id===id); if(!p)return;
  const cart=getCart(),key=id+'-'+finish,found=cart.find(x=>x.key===key);
  if(found)found.qty++;else cart.push({key,id,finish,qty:1});
  saveCart(cart);openCart()
}
function removeFromCart(key){saveCart(getCart().filter(x=>x.key!==key))}
function renderCart(){
  const cart=getCart(),count=cart.reduce((a,b)=>a+b.qty,0);
  $$('.cart-count').forEach(x=>x.textContent=count);
  const box=$('#cartItems'); if(!box)return;
  box.innerHTML=cart.length?cart.map(i=>{
    const p=window.MANE_PRODUCTS.find(x=>x.id===i.id);
    return `<div class="cart-item"><div class="cart-thumb"></div><div><h4>${p.name}</h4><small>${i.finish} · Qty ${i.qty}</small></div><button class="cart-remove" onclick="removeFromCart('${i.key}')">×</button></div>`
  }).join(''):`<div class="empty"><p>Your bag is empty.</p><a class="btn outline" href="shop.html">Shop Hair Jewelry</a></div>`;
}
function openCart(){$('#cartDrawer')?.classList.add('open');$('#overlay')?.classList.add('show');document.body.style.overflow='hidden'}
function closeCart(){$('#cartDrawer')?.classList.remove('open');$('#overlay')?.classList.remove('show');document.body.style.overflow=''}
function renderShell(){
  document.body.insertAdjacentHTML('afterbegin',`
  <div class="announcement">Hair jewelry made to shine</div>
  <header class="site-header"><div class="container nav">
    <button class="mobile-toggle" aria-label="Menu">☰</button>
    <nav class="nav-links"><a href="shop.html">Shop</a><a href="index.html#how">How It Works</a><a href="about.html">About</a><a href="events.html">Events</a><a href="faq.html">FAQ</a></nav>
    <a href="index.html" class="brand"><div class="brand-main">Mane Chain</div><div class="brand-sub">Hair Jewelry</div></a>
    <div class="nav-actions"><a href="contact.html">Contact</a><button class="cart-button">Bag <span class="cart-count">0</span></button></div>
  </div></header>`);
  document.body.insertAdjacentHTML('beforeend',`
  <div id="overlay" class="overlay"></div>
  <aside id="cartDrawer" class="cart-drawer">
    <div class="cart-head"><h3>Your Bag</h3><button class="cart-close">×</button></div>
    <div id="cartItems" class="cart-items"></div>
    <div class="cart-foot"><div class="notice">Live checkout will be connected after product pricing and payment links are finalized.</div><button class="btn" style="width:100%" disabled>Checkout</button></div>
  </aside>
  <footer class="site-footer"><div class="container">
    <div class="footer-grid">
      <div class="footer-brand"><div class="brand-main">Mane Chain</div><div class="brand-sub">Hair Jewelry</div><p>Playful, polished hair jewelry designed to bring a little shine to every style.</p></div>
      <div class="footer-col"><h4>Shop</h4><a href="shop.html">All Pieces</a><a href="shop.html?install=Clip">Clip-In</a><a href="shop.html?install=Bead">Bead</a></div>
      <div class="footer-col"><h4>Discover</h4><a href="index.html#how">How It Works</a><a href="about.html">About Alli</a><a href="events.html">Events</a><a href="faq.html">FAQ</a></div>
      <div class="footer-col"><h4>Help</h4><a href="contact.html">Contact</a><a href="faq.html#shipping">Shipping</a><a href="faq.html#care">Care</a></div>
    </div>
    <div class="footer-bottom">© 2026 Mane Chain · V1.2</div>
  </div></footer>`);
  $('.mobile-toggle')?.addEventListener('click',()=>$('.nav-links')?.classList.toggle('open'));
  $('.cart-button')?.addEventListener('click',openCart);
  $('.cart-close')?.addEventListener('click',closeCart);
  $('#overlay')?.addEventListener('click',closeCart);
  renderCart();
}
document.addEventListener('DOMContentLoaded',renderShell);
