
function card(p){
  return `<article class="product-card">
    <a href="product.html?id=${p.id}">
      <div class="product-art"></div>
      <div class="product-info">
        <div class="product-kicker">${p.install}</div>
        <div class="product-meta"><h3 class="product-name">${p.name}</h3><span>—</span></div>
        <p class="product-desc">${p.short}</p>
        <span class="product-kicker">View Piece →</span>
      </div>
    </a>
  </article>`
}
function renderProducts(filter='All'){
  let items=window.MANE_PRODUCTS;
  if(filter==='Clip')items=items.filter(p=>p.install.includes('Clip'));
  if(filter==='Bead')items=items.filter(p=>p.install.includes('Bead'));
  const g=document.querySelector('#productGrid'); if(g)g.innerHTML=items.map(card).join('')
}
document.addEventListener('DOMContentLoaded',()=>{
  const filter=new URLSearchParams(location.search).get('install')||'All';
  renderProducts(filter);
  document.querySelectorAll('.filter-btn').forEach(b=>{
    if(b.dataset.filter===filter)b.classList.add('active');
    b.addEventListener('click',()=>{
      document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');renderProducts(b.dataset.filter)
    })
  })
})
