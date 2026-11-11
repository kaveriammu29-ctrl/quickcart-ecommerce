import { useMemo, useState } from 'react';
import { Search, ShoppingBag, Heart, Star, Plus, Minus, Trash2, Menu, X, ArrowRight, SlidersHorizontal } from 'lucide-react';

const products = [
  { id: 1, name: 'Everyday Canvas Tote', category: 'Accessories', price: 599, oldPrice: 799, rating: 4.8, tag: 'Bestseller', emoji: '👜', tone: 'peach', description: 'A roomy carry-all for busy days.' },
  { id: 2, name: 'Minimal Ceramic Mug', category: 'Home', price: 349, oldPrice: 449, rating: 4.7, tag: 'Popular', emoji: '☕', tone: 'sage', description: 'Your slow-morning companion.' },
  { id: 3, name: 'Wireless Earbuds', category: 'Electronics', price: 1499, oldPrice: 1999, rating: 4.6, tag: 'Deal', emoji: '🎧', tone: 'lavender', description: 'Clear sound, compact comfort.' },
  { id: 4, name: 'Daily Planner', category: 'Stationery', price: 279, oldPrice: 349, rating: 4.9, tag: 'New', emoji: '📒', tone: 'butter', description: 'Make space for your next big idea.' },
  { id: 5, name: 'Soft Knit Cushion', category: 'Home', price: 799, oldPrice: 999, rating: 4.5, tag: 'Cozy pick', emoji: '🛋️', tone: 'rose', description: 'A little extra comfort for home.' },
  { id: 6, name: 'Steel Water Bottle', category: 'Accessories', price: 499, oldPrice: 649, rating: 4.7, tag: 'Eco choice', emoji: '🥤', tone: 'blue', description: 'Hydration that goes everywhere.' },
  { id: 7, name: 'Smart Desk Lamp', category: 'Electronics', price: 1199, oldPrice: 1599, rating: 4.6, tag: 'Limited deal', emoji: '💡', tone: 'butter', description: 'A brighter setup for focused work.' },
  { id: 8, name: 'Color Pop Highlighters', category: 'Stationery', price: 199, oldPrice: 249, rating: 4.8, tag: 'Under ₹200', emoji: '🖍️', tone: 'peach', description: 'Bring your notes to life.' },
];

const money = n => '₹' + n.toLocaleString('en-IN');

function App() {
  const [cart, setCart] = useState({});
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [cartOpen, setCartOpen] = useState(false);
  const [liked, setLiked] = useState([]);
  const [notice, setNotice] = useState('');

  const categories = ['All', 'Accessories', 'Home', 'Electronics', 'Stationery'];
  const visible = useMemo(() => {
    let list = products.filter(p => (category === 'All' || p.category === category) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())));
    if (sort === 'low') list.sort((a,b) => a.price-b.price);
    if (sort === 'high') list.sort((a,b) => b.price-a.price);
    if (sort === 'rating') list.sort((a,b) => b.rating-a.rating);
    return list;
  }, [category, search, sort]);

  const count = Object.values(cart).reduce((a,b) => a+b, 0);
  const subtotal = products.reduce((sum,p) => sum + p.price*(cart[p.id] || 0), 0);
  const add = id => { setCart(c => ({...c, [id]: (c[id] || 0)+1})); setNotice('Added to your cart'); setTimeout(() => setNotice(''), 1800); };
  const change = (id, delta) => setCart(c => { const next = {...c, [id]: Math.max(0,(c[id] || 0)+delta)}; if (!next[id]) delete next[id]; return next; });
  const toggleLike = id => setLiked(a => a.includes(id) ? a.filter(x=>x!==id) : [...a,id]);

  return <div className="app">
    <div className="announcement">A little joy in every order <span>✦</span> Free delivery on orders above ₹999</div>
    <header className="header">
      <a className="brand" href="#"><span className="brand-mark">q</span> quickcart<span className="brand-dot">.</span></a>
      <nav><a href="#shop">Shop</a><a href="#why">Why QuickCart</a><a href="#footer">Contact</a></nav>
      <div className="header-actions">
        <label className="searchbox"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." /></label>
        <button className="cart-button" onClick={()=>setCartOpen(true)} aria-label="Open cart"><ShoppingBag size={19}/><span>Cart</span><b>{count}</b></button>
      </div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow">THE EVERYDAY EDIT · 2026</p><h1>Good finds.<br/><em>Great days.</em></h1><p className="hero-text">Thoughtful little things for your home, desk and daily routine. Find your next favourite.</p><a className="primary-btn" href="#shop">Explore the collection <ArrowRight size={17}/></a><div className="hero-proof"><span>★★★★★</span> Loved by everyday explorers</div></div>
        <div className="hero-art"><div className="sun"></div><div className="hero-card card-one"><span>✿</span><strong>little<br/>joys</strong></div><div className="hero-card card-two"><span>☕</span><small>slow mornings<br/>start here</small></div><div className="hero-orbit">Q</div><div className="hero-caption">CURATED FOR YOU <b>↗</b></div></div>
      </section>

      <section className="benefits" id="why"><div><span>✦</span><p><b>Thoughtful picks</b><small>Useful, lovely essentials</small></p></div><div><span>↗</span><p><b>Easy checkout</b><small>A smooth shopping flow</small></p></div><div><span>♡</span><p><b>Made for daily life</b><small>Small upgrades, big smiles</small></p></div></section>

      <section className="shop-section" id="shop">
        <div className="section-heading"><div><p className="eyebrow">THE QUICKCART COLLECTION</p><h2>Find your <em>favourite.</em></h2></div><div className="sort-wrap"><SlidersHorizontal size={16}/><select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="rating">Top rated</option></select></div></div>
        <div className="filters">{categories.map(c=><button key={c} className={category===c?'filter active':'filter'} onClick={()=>setCategory(c)}>{c}</button>)}</div>
        <div className="product-grid">{visible.map(p=><article className="product-card" key={p.id}><div className={'product-art '+p.tone}><span className="tag">{p.tag}</span><button className={'like '+(liked.includes(p.id)?'liked':'')} onClick={()=>toggleLike(p.id)} aria-label="Save product"><Heart size={17} fill={liked.includes(p.id)?'currentColor':'none'}/></button><span className="product-emoji">{p.emoji}</span></div><div className="product-info"><div className="product-meta"><span>{p.category}</span><span className="rating"><Star size={13} fill="currentColor"/> {p.rating}</span></div><h3>{p.name}</h3><p>{p.description}</p><div className="product-bottom"><div><b>{money(p.price)}</b><del>{money(p.oldPrice)}</del></div><button className="add-btn" onClick={()=>add(p.id)}><Plus size={16}/> Add</button></div></div></article>)}</div>
        {visible.length===0 && <div className="empty">No products found. Try another search.</div>}
      </section>
      <section className="newsletter"><div><p className="eyebrow">A NOTE FROM QUICKCART</p><h2>Good things are<br/><em>worth sharing.</em></h2><p>Thanks for stopping by. Your next everyday favourite is waiting.</p></div><div className="newsletter-stamp">QC<br/><span>EST. 2026</span></div></section>
    </main>

    <footer id="footer"><a className="brand" href="#"><span className="brand-mark">q</span> quickcart<span className="brand-dot">.</span></a><p>Everyday finds, delivered with a little delight.</p><small>© 2026 QuickCart. Student project demo.</small></footer>

    {notice && <div className="toast">{notice} ✓</div>}
    {cartOpen && <div className="overlay" onClick={()=>setCartOpen(false)}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><p className="eyebrow">YOUR BAG</p><h2>Shopping cart ({count})</h2></div><button className="icon-btn" onClick={()=>setCartOpen(false)}><X/></button></div>
      {count===0 ? <div className="cart-empty"><span>🛍️</span><h3>Your cart is waiting</h3><p>Add something lovely from the collection.</p><button className="primary-btn" onClick={()=>setCartOpen(false)}>Continue shopping</button></div> :
      <><div className="cart-items">{products.filter(p=>cart[p.id]).map(p=><div className="cart-item" key={p.id}><span className={'mini-art '+p.tone}>{p.emoji}</span><div className="cart-item-info"><b>{p.name}</b><small>{money(p.price)}</small><div className="quantity"><button onClick={()=>change(p.id,-1)}><Minus size={13}/></button><span>{cart[p.id]}</span><button onClick={()=>change(p.id,1)}><Plus size={13}/></button></div></div><button className="remove" onClick={()=>setCart(c=>{const n={...c};delete n[p.id];return n;})}><Trash2 size={16}/></button></div>)}</div><div className="cart-total"><div><span>Subtotal</span><b>{money(subtotal)}</b></div><small>Shipping calculated at checkout. Demo only, no payment is collected.</small><button className="checkout" onClick={()=>{setNotice('Demo checkout: no payment collected');setCartOpen(false);setTimeout(()=>setNotice(''),2200)}}>Continue to checkout <ArrowRight size={17}/></button></div></>}
    </aside></div>}
  </div>;
}
export default App;
