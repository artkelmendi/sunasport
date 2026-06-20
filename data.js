/* =========================================================================
   SUNASPORT — product catalog (frontend demo data)
   Swap any item's `img` field with a real photo URL/path to use photography.
   ========================================================================= */

const BRAND_THEME = {
  Nike:          { from: '#1a1a1d', to: '#0b0b0c', ink: '#ffffff' },
  Adidas:        { from: '#15233f', to: '#0a1120', ink: '#ffffff' },
  Puma:          { from: '#3a0f12', to: '#120708', ink: '#ffffff' },
  'New Balance': { from: '#2a2d30', to: '#101113', ink: '#ffffff' },
  'Under Armour':{ from: '#14181d', to: '#080a0c', ink: '#ffffff' },
  Reebok:        { from: '#16243a', to: '#0a0f18', ink: '#ffffff' },
  Asics:         { from: '#10243f', to: '#081320', ink: '#ffffff' },
  Converse:      { from: '#222226', to: '#0c0c0e', ink: '#ffffff' },
  Jordan:        { from: '#2b0d14', to: '#0c0406', ink: '#ffffff' },
  Columbia:      { from: '#11261f', to: '#07120d', ink: '#ffffff' },
};

/* category -> svg icon key */
const PRODUCTS = [
  { id:'nk-pegasus',  name:'Air Zoom Pegasus 41',      brand:'Nike',          group:'Shoes',       sub:'Running',    gender:'Men',   price:129.90, old:159.90, rating:4.8, reviews:412, badge:'SALE', icon:'shoe',    colors:['#0b0b0c','#c6ff00','#2563eb'], sizes:[40,41,42,43,44,45] },
  { id:'jd-retro1',   name:'Air Jordan 1 Retro High',  brand:'Jordan',        group:'Shoes',       sub:'Lifestyle',  gender:'Men',   price:189.00, old:null,   rating:4.9, reviews:980, badge:'HOT',  icon:'shoe',    colors:['#b8121b','#0b0b0c','#ffffff'], sizes:[40,41,42,43,44,45,46] },
  { id:'ad-ultrab',   name:'Ultraboost Light',         brand:'Adidas',        group:'Shoes',       sub:'Running',    gender:'Women', price:179.95, old:null,   rating:4.7, reviews:331, badge:'NEW',  icon:'shoe',    colors:['#0b0b0c','#ff4d6d','#e5e5e5'], sizes:[37,38,39,40,41,42] },
  { id:'nb-990',      name:'990v6 Made in USA',        brand:'New Balance',   group:'Shoes',       sub:'Lifestyle',  gender:'Men',   price:209.00, old:null,   rating:4.8, reviews:204, badge:null,   icon:'shoe',    colors:['#6b7280','#0b0b0c'],          sizes:[41,42,43,44,45] },
  { id:'pm-suede',    name:'Suede Classic XXI',        brand:'Puma',          group:'Shoes',       sub:'Lifestyle',  gender:'Women', price:79.90,  old:99.90,  rating:4.6, reviews:512, badge:'SALE', icon:'shoe',    colors:['#b91c1c','#0b0b0c','#1d4ed8'],sizes:[37,38,39,40,41] },
  { id:'as-gel',      name:'Gel-Kayano 31',            brand:'Asics',         group:'Shoes',       sub:'Running',    gender:'Men',   price:169.00, old:null,   rating:4.7, reviews:288, badge:null,   icon:'shoe',    colors:['#1d4ed8','#0b0b0c','#c6ff00'],sizes:[41,42,43,44,45,46] },
  { id:'nk-mercurial',name:'Mercurial Vapor 16 FG',    brand:'Nike',          group:'Shoes',       sub:'Football',   gender:'Men',   price:239.99, old:null,   rating:4.9, reviews:147, badge:'NEW',  icon:'cleat',   colors:['#c6ff00','#0b0b0c','#ff00aa'],sizes:[40,41,42,43,44,45] },
  { id:'nk-lebron',   name:'LeBron XXII',              brand:'Nike',          group:'Shoes',       sub:'Basketball', gender:'Men',   price:199.99, old:null,   rating:4.8, reviews:96,  badge:null,   icon:'shoe',    colors:['#0b0b0c','#7c3aed','#c6ff00'],sizes:[42,43,44,45,46,47] },

  { id:'nk-tech',     name:'Tech Fleece Hoodie',       brand:'Nike',          group:'Clothing',    sub:'Hoodies',    gender:'Men',   price:104.99, old:124.99, rating:4.8, reviews:640, badge:'SALE', icon:'hoodie',  colors:['#0b0b0c','#374151','#1e3a8a'],sizes:['S','M','L','XL','XXL'] },
  { id:'ad-tiro',     name:'Tiro 24 Training Pants',   brand:'Adidas',        group:'Clothing',    sub:'Pants',      gender:'Men',   price:54.95,  old:null,   rating:4.6, reviews:233, badge:null,   icon:'pants',   colors:['#0b0b0c','#1d4ed8'],          sizes:['S','M','L','XL'] },
  { id:'ua-tee',      name:'HeatGear Armour Tee',      brand:'Under Armour',  group:'Clothing',    sub:'T-Shirts',   gender:'Men',   price:34.90,  old:null,   rating:4.7, reviews:401, badge:null,   icon:'tee',     colors:['#0b0b0c','#dc2626','#1f2937'],sizes:['S','M','L','XL','XXL'] },
  { id:'nk-prowmn',   name:'Pro Dri-FIT Leggings',     brand:'Nike',          group:'Clothing',    sub:'Leggings',   gender:'Women', price:49.99,  old:64.99,  rating:4.8, reviews:712, badge:'SALE', icon:'pants',   colors:['#0b0b0c','#ff4d6d'],          sizes:['XS','S','M','L','XL'] },
  { id:'pm-jacket',   name:'evoSTRIPE Full-Zip',       brand:'Puma',          group:'Clothing',    sub:'Jackets',    gender:'Women', price:89.95,  old:null,   rating:4.5, reviews:128, badge:'NEW',  icon:'jacket',  colors:['#0b0b0c','#b91c1c'],          sizes:['XS','S','M','L'] },
  { id:'cb-shell',    name:'Watertight II Shell',      brand:'Columbia',      group:'Clothing',    sub:'Jackets',    gender:'Men',   price:99.00,  old:null,   rating:4.7, reviews:175, badge:null,   icon:'jacket',  colors:['#11261f','#0b0b0c','#c6ff00'],sizes:['S','M','L','XL','XXL'] },

  { id:'nk-brasilia', name:'Brasilia 9.5 Backpack',    brand:'Nike',          group:'Accessories', sub:'Bags',       gender:'Unisex',price:44.99,  old:null,   rating:4.6, reviews:356, badge:null,   icon:'bag',     colors:['#0b0b0c','#1f2937'],          sizes:['One Size'] },
  { id:'ad-ball',     name:'UCL Pro Match Ball',       brand:'Adidas',        group:'Accessories', sub:'Equipment',  gender:'Unisex',price:149.00, old:null,   rating:4.9, reviews:88,  badge:'HOT',  icon:'ball',    colors:['#ffffff','#0b0b0c','#c6ff00'],sizes:['Size 5'] },
  { id:'nk-cap',      name:'Club Unstructured Cap',    brand:'Nike',          group:'Accessories', sub:'Headwear',   gender:'Unisex',price:24.99,  old:29.99,  rating:4.5, reviews:209, badge:'SALE', icon:'cap',     colors:['#0b0b0c','#dc2626','#1d4ed8'],sizes:['One Size'] },
  { id:'rb-socks',    name:'Active Crew Socks (3pk)',  brand:'Reebok',        group:'Accessories', sub:'Socks',      gender:'Unisex',price:14.90,  old:null,   rating:4.4, reviews:147, badge:null,   icon:'socks',   colors:['#ffffff','#0b0b0c','#6b7280'],sizes:['39-42','43-46'] },

  /* ---- real catalogue (photos in products/) ---- */
  { id:'pm-mmq-tee',      name:'MMQ Heavyweight Tee',         brand:'Puma',   group:'Clothing', sub:'T-Shirts', gender:'Men',   price:39.90, old:null,  rating:4.7, reviews:64,  badge:'NEW',  icon:'tee',    colors:['#2f6f6f','#0b0b0c'],          sizes:['S','M','L','XL','XXL'],            img:'products/692054-41/1.jpg', imgs:['products/692054-41/1.jpg','products/692054-41/2.jpg','products/692054-41/3.jpg'] },
  { id:'pm-sheer-pant',   name:'Dare to Sheer Wide Pant',     brand:'Puma',   group:'Clothing', sub:'Pants',    gender:'Women', price:54.90, old:69.90, rating:4.5, reviews:38,  badge:'SALE', icon:'pants',  colors:['#0b0b0c'],                    sizes:['XS','S','M','L'],                  img:'products/634598-01/2.jpg', imgs:['products/634598-01/2.jpg','products/634598-01/3.jpg'] },
  { id:'nk-court-td',     name:'Court Borough Low Recraft',   brand:'Nike',   group:'Shoes',    sub:'Lifestyle',gender:'Kids',  price:44.99, old:null,  rating:4.8, reviews:120, badge:null,   icon:'shoe',   colors:['#9aa0a6','#ffffff','#0b0b0c'],sizes:[21,22,23,24,25,26,27],             img:'products/DV5458-016/1.jpg', imgs:['products/DV5458-016/1.jpg','products/DV5458-016/2.jpg','products/DV5458-016/3.jpg'] },
  { id:'nk-calm-slide',   name:'Calm Slide',                  brand:'Nike',   group:'Shoes',    sub:'Slides',   gender:'Women', price:54.99, old:null,  rating:4.8, reviews:212, badge:'HOT',  icon:'shoe',   colors:['#efe7d3','#0b0b0c'],          sizes:[36,37,38,39,40,41],                img:'products/HJ5601-101/1.jpg', imgs:['products/HJ5601-101/1.jpg','products/HJ5601-101/2.jpg','products/HJ5601-101/3.jpg','products/HJ5601-101/4.jpg'] },
  { id:'nk-jdi-crew',     name:'Sportswear Fleece Crew',      brand:'Nike',   group:'Clothing', sub:'Hoodies',  gender:'Men',   price:79.99, old:null,  rating:4.7, reviews:156, badge:'NEW',  icon:'hoodie', colors:['#1f8f4e','#0b0b0c'],          sizes:['S','M','L','XL','XXL'],            img:'products/IF1639-365/1.jpg', imgs:['products/IF1639-365/1.jpg','products/IF1639-365/2.jpg','products/IF1639-365/3.jpg'] },
  { id:'nk-sw-tee',       name:'Sportswear Big Logo Tee',     brand:'Nike',   group:'Clothing', sub:'T-Shirts', gender:'Men',   price:32.99, old:null,  rating:4.6, reviews:301, badge:null,   icon:'tee',    colors:['#ffffff','#0b0b0c'],          sizes:['S','M','L','XL','XXL'],            img:'products/IH1143-100/1.jpg', imgs:['products/IH1143-100/1.jpg','products/IH1143-100/2.jpg','products/IH1143-100/3.jpg'] },
  { id:'nk-max90-tee',    name:'Max90 Graphic Tee',           brand:'Nike',   group:'Clothing', sub:'T-Shirts', gender:'Men',   price:39.99, old:null,  rating:4.8, reviews:88,  badge:'NEW',  icon:'tee',    colors:['#efe7cf','#1f8f4e'],          sizes:['S','M','L','XL','XXL'],            img:'products/IH1361-113/1.jpg', imgs:['products/IH1361-113/1.jpg','products/IH1361-113/2.jpg','products/IH1361-113/3.jpg','products/IH1361-113/4.jpg'] },
  { id:'ad-zne-shorts',   name:'Z.N.E. Premium Shorts',       brand:'Adidas', group:'Clothing', sub:'Shorts',   gender:'Men',   price:49.95, old:null,  rating:4.6, reviews:142, badge:null,   icon:'pants',  colors:['#c9c9cc','#0b0b0c'],          sizes:['S','M','L','XL','XXL'],            img:'products/JJ4892/1.jpg', imgs:['products/JJ4892/1.jpg','products/JJ4892/2.jpg','products/JJ4892/3.jpg','products/JJ4892/4.jpg'] },
  { id:'ad-trefoil-short',name:'Trefoil Essentials Shorts',   brand:'Adidas', group:'Clothing', sub:'Shorts',   gender:'Men',   price:39.95, old:49.95, rating:4.7, reviews:264, badge:'SALE', icon:'pants',  colors:['#4a3328','#0b0b0c'],          sizes:['S','M','L','XL','XXL'],            img:'products/KE3386/1.jpg', imgs:['products/KE3386/1.jpg','products/KE3386/2.jpg','products/KE3386/3.jpg'] },
  { id:'ad-trefoil-tank', name:'Trefoil Sleeveless Tee',      brand:'Adidas', group:'Clothing', sub:'T-Shirts', gender:'Men',   price:29.95, old:null,  rating:4.5, reviews:97,  badge:null,   icon:'tee',    colors:['#ffffff','#0b0b0c'],          sizes:['S','M','L','XL'],                  img:'products/KE3396/psd_1.jpg', imgs:['products/KE3396/psd_1.jpg','products/KE3396/psd_2.jpg','products/KE3396/psd_3.jpg','products/KE3396/psd_4.jpg','products/KE3396/psd_5.jpg'] },
  { id:'ad-adilette',     name:'Adilette Slide',              brand:'Adidas', group:'Shoes',    sub:'Slides',   gender:'Unisex',price:39.95, old:null,  rating:4.7, reviews:430, badge:null,   icon:'shoe',   colors:['#7a5c46','#0b0b0c'],          sizes:[38,39,40,41,42,43,44,45],          img:'products/KK3581/1.jpg', imgs:['products/KK3581/1.jpg','products/KK3581/2.jpg','products/KK3581/3.jpg','products/KK3581/4.jpg','products/KK3581/5.jpg'] },
  { id:'ad-firebird',     name:'Adicolor Firebird Track Top', brand:'Adidas', group:'Clothing', sub:'Jackets',  gender:'Women', price:84.95, old:null,  rating:4.8, reviews:176, badge:'HOT',  icon:'jacket', colors:['#6b6b70','#0b0b0c'],          sizes:['XS','S','M','L','XL'],             img:'products/KT4614/1.jpg', imgs:['products/KT4614/1.jpg','products/KT4614/2.jpg','products/KT4614/3.jpg'] },
];

/* ---- description generator (keeps data terse, copy rich) ---- */
function productCopy(p){
  const lines = {
    Running:'Engineered for the long run — responsive cushioning and a breathable upper that keeps every kilometre feeling fresh.',
    Lifestyle:'A street-ready icon. Premium materials and a timeless silhouette that move from the gym to the city without missing a beat.',
    Football:'Built for the final third. A grippy, lightweight build for explosive acceleration and precision on the ball.',
    Basketball:'Lockdown support meets court-ready energy return so you can cut, drive and rise without hesitation.',
    Hoodies:'Soft, structured warmth with a tailored fit — the layer you reach for on every training day and rest day alike.',
    Pants:'Tapered, durable and made to move, with zip pockets to keep your essentials secure through every session.',
    'T-Shirts':'Sweat-wicking fabric that stays light and dry when the intensity climbs.',
    Leggings:'High-rise, squat-proof support with four-way stretch that holds its shape rep after rep.',
    Jackets:'Weather-ready protection that packs down small and shrugs off wind and rain.',
    Bags:'Organised, hard-wearing and ready for the daily commute or the away game.',
    Equipment:'Match-grade quality, tournament-tested for true flight and touch.',
    Headwear:'Lightweight everyday coverage with an adjustable, dialed-in fit.',
    Socks:'Cushioned, arch-supported comfort built to go the distance.',
  };
  return lines[p.sub] || 'Performance gear designed and tested for athletes who never settle.';
}

if (typeof window !== 'undefined') {
  window.SUNA = { PRODUCTS, BRAND_THEME, productCopy };
}
