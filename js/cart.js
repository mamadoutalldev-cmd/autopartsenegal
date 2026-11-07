/* ==========================================================
   CART — logique panier (ajout, quantités, suppression, total,
   confirmation de commande).
   Dépend de : ui.js (fmtPrice, showToast), router.js (goTo)
   Utilisé par : router.js (renderCart appelé à l'entrée sur l'écran panier),
                 le bouton "Ajouter au panier" de la fiche produit,
                 l'écran paiement (confirmOrder)
   ========================================================== */

let cart = [];
let currentProduct = null;

function addToCart(){
  if(!currentProduct) return;
  const existing = cart.find(c=>c.ref===currentProduct.ref);
  if(existing) existing.qty += 1;
  else cart.push({...currentProduct, qty:1});
  updateCartBadge();
  showToast('Ajouté au panier ✓');
}

function updateCartBadge(){
  const count = cart.reduce((s,c)=>s+c.qty,0);
  const badge = document.getElementById('cart-badge');
  badge.textContent = count;
  badge.classList.toggle('hide', count===0);
}

function changeQty(ref, delta){
  const item = cart.find(c=>c.ref===ref);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) cart = cart.filter(c=>c.ref!==ref);
  updateCartBadge();
  renderCart();
}

function renderCart(){
  const list = document.getElementById('cart-list');
  const empty = document.getElementById('cart-empty');
  const summary = document.getElementById('cart-summary');
  if(cart.length===0){
    list.innerHTML=''; list.style.display='none'; empty.style.display='block'; summary.style.display='none';
    return;
  }
  list.style.display='flex'; empty.style.display='none'; summary.style.display='block';
  list.innerHTML = cart.map(c=>`
    <div class="cart-item">
      <div class="thumb"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 16.5V13l1.6-4.5A2 2 0 0 1 7.5 7h9a2 2 0 0 1 1.9 1.5L20 13v3.5" stroke="#B7C1D1" stroke-width="1.4"/></svg></div>
      <div class="info">
        <div class="name">${c.name}</div>
        <div class="price">${fmtPrice(c.price * c.qty)}</div>
        <div class="row-bottom">
          <div class="qty-stepper">
            <button onclick="changeQty('${c.ref}',-1)">−</button>
            <span>${c.qty}</span>
            <button onclick="changeQty('${c.ref}',1)">+</button>
          </div>
          <span class="cart-remove" onclick="changeQty('${c.ref}',-${c.qty})">Retirer</span>
        </div>
      </div>
    </div>`).join('');
  const total = cart.reduce((s,c)=>s+c.price*c.qty,0);
  document.getElementById('cart-subtotal').textContent = fmtPrice(total);
  document.getElementById('cart-total').textContent = fmtPrice(total);
  document.getElementById('pay-total').textContent = fmtPrice(total);
}

function confirmOrder(){
  const orderNum = 'CMD-' + Math.floor(1000 + Math.random()*9000);
  document.getElementById('order-num').textContent = orderNum;
  cart = [];
  updateCartBadge();
  goTo('confirmation');
}
