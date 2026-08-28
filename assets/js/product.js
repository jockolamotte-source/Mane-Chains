
document.addEventListener('DOMContentLoaded',()=>{
  const id=new URLSearchParams(location.search).get('id')||'dome-piece';
  const p=window.MANE_PRODUCTS.find(x=>x.id===id)||window.MANE_PRODUCTS[0];
  document.title=`${p.name} | Mane Chain`;
  const mainImg=document.querySelector('#productMainImage'); if(mainImg){mainImg.src=p.image; mainImg.alt=`${p.name} by Mane Chain styled in hair`;}
  document.querySelector('#productName').textContent=p.name;
  document.querySelector('#productInstall').textContent=p.install;
  document.querySelector('#productShort').textContent=p.short;
  document.querySelector('#productLong').textContent=p.details;
  const f=document.querySelector('#finishPills');
  f.innerHTML=p.finish.map((x,i)=>`<button class="pill ${i===0?'active':''}" data-finish="${x}">${x}</button>`).join('');
  f.querySelectorAll('.pill').forEach(x=>x.onclick=()=>{
    f.querySelectorAll('.pill').forEach(y=>y.classList.remove('active'));x.classList.add('active')
  });
  document.querySelector('#addBtn').onclick=()=>addToCart(p.id,f.querySelector('.active')?.dataset.finish||'Gold');
});
