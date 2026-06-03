// ─── Images — matched to file names the user set ─────────────────────────────
import cakeImg           from '../images/normal-images/cake.webp'
import delightsBdayImg   from '../images/normal-images/delights-birthday.webp'
import flowerWithCakeImg from '../images/normal-images/flower-with-cake.webp'
import flowerWithSilkImg from '../images/normal-images/flower-with-silk.webp'
import fourFlowerImg     from '../images/normal-images/four-flower.webp'

// ─── Viewer background images ─────────────────────────────────────────────────
import cakeBg       from '../images/background-images/cake-bg.png'
import flowerBg     from '../images/background-images/flower-bg.png'
import flowerBg1    from '../images/background-images/flower-bg-1.png'
import flowerBg2    from '../images/background-images/flower-bg-2.png'

// ─── Compressed GLB models for cards (Vite resolves ?url to hashed asset URL) ─
import flowerWithCakeCompressed  from '../images/compressed-images/flower-with-cake-compressed.glb?url'
import cakeCompressed            from '../images/compressed-images/cake-compressed.glb?url'
import flowerWithSilkCompressed  from '../images/compressed-images/flower-with-silk-compressed.glb?url'
import fourFlowerCompressed      from '../images/compressed-images/four-flower-compressed.glb?url'
import delightsBdayCompressed    from '../images/compressed-images/delights-birthday-compressed.glb?url'

// ─── GLB models — served from /public/models/ ────────────────────────────────
export const MODEL_URLS = {
  cake:          '/models/cake.glb',
  delightsBday:  '/models/delights-birthday.glb',
  flowerWithCake:'/models/flower-with-cake.glb',
  flowerWithSilk:'/models/flower-with-silk.glb',
  fourFlower:    '/models/four-flower.glb',
}

// ─── Finish palettes ──────────────────────────────────────────────────────────
const CAKE_FINISHES = [
  { id: 'natural',    label: 'Natural',        color: null,      swatch: '#f5ede4', ring: '#ddd' },
  { id: 'darkchoco',  label: 'Dark Chocolate', color: '#2C1208', swatch: '#2C1208' },
  { id: 'milkchoco',  label: 'Milk Chocolate', color: '#6B3A2A', swatch: '#6B3A2A' },
  { id: 'caramel',    label: 'Caramel',        color: '#C9921A', swatch: '#C9921A' },
  { id: 'strawberry', label: 'Strawberry',     color: '#D4364A', swatch: '#D4364A' },
  { id: 'cream',      label: 'Vanilla Cream',  color: '#F5E6CC', swatch: '#F5E6CC', ring: '#ddd' },
]

const ROSE_FINISHES = [
  { id: 'natural',    label: 'Natural',        color: null,      swatch: '#f5ede4', ring: '#ddd' },
  { id: 'hotpink',    label: 'Hot Pink',       color: '#E91E8C', swatch: '#E91E8C' },
  { id: 'rosepink',   label: 'Rose Pink',      color: '#E85A8C', swatch: '#E85A8C' },
  { id: 'softpink',   label: 'Soft Pink',      color: '#F4A7C3', swatch: '#F4A7C3', ring: '#e8b0c8' },
  { id: 'darkchoco',  label: 'Dark Chocolate', color: '#2C1208', swatch: '#2C1208' },
  { id: 'green',      label: 'Leaf Green',     color: '#2D5016', swatch: '#2D5016' },
]

const MIXED_FINISHES = [
  { id: 'natural',    label: 'Natural',        color: null,      swatch: '#f5ede4', ring: '#ddd' },
  { id: 'purple',     label: 'Orchid Purple',  color: '#7B3F9E', swatch: '#7B3F9E' },
  { id: 'hotpink',    label: 'Hot Pink',       color: '#E91E8C', swatch: '#E91E8C' },
  { id: 'gold',       label: 'Gold',           color: '#C9921A', swatch: '#C9921A' },
  { id: 'violet',     label: 'Violet',         color: '#8B4FB8', swatch: '#8B4FB8' },
  { id: 'rosepink',   label: 'Rose',           color: '#E85A8C', swatch: '#E85A8C' },
]

const LUXE_FINISHES = [
  { id: 'natural',    label: 'Natural',        color: null,      swatch: '#f5ede4', ring: '#ddd' },
  { id: 'champagne',  label: 'Champagne Gold', color: '#C9921A', swatch: '#C9921A' },
  { id: 'onyx',       label: 'Onyx Black',     color: '#1A1A1A', swatch: '#1A1A1A' },
  { id: 'cream',      label: 'Cream',          color: '#E8D5B0', swatch: '#E8D5B0', ring: '#d4c090' },
  { id: 'darkgold',   label: 'Dark Gold',      color: '#A67614', swatch: '#A67614' },
  { id: 'bronze',     label: 'Bronze',         color: '#8B6914', swatch: '#8B6914' },
]

export const products = [
  {
    id: 1,
    name: 'Angelic Rose Bouquet & Truffle Bliss',
    subtitle: 'Rose Bouquet + Chocolate Truffle Cake',
    category: 'cakes',
    price: 799, originalPrice: 925, discount: 14,
    rating: 5.0, reviewCount: 257, orderedCount: 2443,
    deliveryType: 'Free Delivery',
    description:
      'A stunning arrangement of fresh pink and red roses paired with a rich dark chocolate truffle cake. Crafted to delight — your arrangement will reflect the design, with natural variations in bloom, shade, and season.',
    flavour: 'Chocolate Truffle', weight: '500g',
    model: MODEL_URLS.flowerWithCake,
    compressedModel: flowerWithCakeCompressed,
    color: '#E85A8C', accent: '#2C1208',
    bgImage: flowerBg1,
    finishes: ROSE_FINISHES,
    image:  flowerWithCakeImg,
    images: [flowerWithCakeImg, flowerWithCakeImg, flowerWithCakeImg],
    tags: ['Best Seller', 'Free Delivery'],
    offers: [
      { provider: 'Paytm',      text: 'Get Cashback up to ₹300 on a min. transaction of ₹799' },
      { provider: 'Amazon Pay', text: 'Get up to ₹200 cashback on 2 Amazon Pay Balance orders' },
    ],
  },
  {
    id: 2,
    name: 'Truffle Joyful Eggless Birthday Cake',
    subtitle: 'Premium Eggless Dark Truffle',
    category: 'cakes',
    price: 625, originalPrice: 775, discount: 19,
    rating: 4.8, reviewCount: 1832, orderedCount: 5610,
    deliveryType: 'Same Day Delivery',
    description:
      "A decadent eggless dark chocolate truffle cake with silky ganache frosting, adorned with a golden 'Happy Birthday' topper. Perfect for celebrations that deserve pure indulgence.",
    flavour: 'Dark Chocolate Truffle', weight: '500g',
    model: MODEL_URLS.cake,
    compressedModel: cakeCompressed,
    color: '#c9921a', accent: '#e8b84b',
    bgImage: cakeBg,
    finishes: CAKE_FINISHES,
    image:  cakeImg,
    images: [cakeImg, cakeImg, cakeImg],
    tags: ['Trending', 'Same Day'],
    offers: [
      { provider: 'Paytm', text: 'Get Cashback up to ₹300 on a min. transaction of ₹799' },
    ],
  },
  {
    id: 3,
    name: 'Birthday Bliss with Roses & Cake',
    subtitle: 'Pink Roses Bouquet + Cake Combo',
    category: 'combos',
    price: 1575, originalPrice: 1799, discount: 12,
    rating: 4.7, reviewCount: 943, orderedCount: 1820,
    deliveryType: 'Free Delivery',
    description:
      'Celebrate in full bloom with this exquisite combo — a lush bouquet of premium pink roses cradled in elegant silk paper, paired with a creamy birthday cake.',
    flavour: 'Vanilla & Roses', weight: '1 kg',
    model: MODEL_URLS.flowerWithSilk,
    compressedModel: flowerWithSilkCompressed,
    color: '#E91E8C', accent: '#F4A7C3',
    bgImage: flowerBg,
    finishes: ROSE_FINISHES,
    image:  flowerWithSilkImg,
    images: [flowerWithSilkImg, flowerWithSilkImg, flowerWithSilkImg],
    tags: ['Free Delivery', 'Combo'],
    offers: [],
  },
  {
    id: 4,
    name: 'Gemini Baby Chocolate Eggless Photo Cake',
    subtitle: 'Personalised Photo Printed Cake',
    category: 'personalised',
    price: 699, originalPrice: 849, discount: 18,
    rating: 4.9, reviewCount: 512, orderedCount: 890,
    deliveryType: 'Same Day Delivery',
    description:
      'A fully customisable eggless chocolate cake featuring a printed photo of your choice on food-grade icing paper. Decorated with star toppers and confetti.',
    flavour: 'Chocolate', weight: '500g',
    model: MODEL_URLS.fourFlower,
    compressedModel: fourFlowerCompressed,
    color: '#7c5cbf', accent: '#f5d78e',
    bgImage: flowerBg2,
    finishes: MIXED_FINISHES,
    image:  fourFlowerImg,
    images: [fourFlowerImg, fourFlowerImg, fourFlowerImg],
    tags: ['Personalised', 'Best Seller'],
    offers: [
      { provider: 'Amazon Pay', text: 'Get up to ₹200 cashback on 2 Amazon Pay Balance orders' },
    ],
  },
  {
    id: 5,
    name: 'Birthday Delights Special Surprise',
    subtitle: 'Premium Birthday Celebration Combo',
    category: 'combos',
    price: 895, originalPrice: 1099, discount: 19,
    rating: 4.6, reviewCount: 2104, orderedCount: 4200,
    deliveryType: 'Same Day Delivery',
    description:
      'A spectacular birthday celebration combo bursting with delightful surprises. Rich layers of premium flavours beautifully presented for the most memorable birthday.',
    flavour: 'Assorted', weight: '1 kg',
    model: MODEL_URLS.delightsBday,
    compressedModel: delightsBdayCompressed,
    color: '#C9921A', accent: '#E8D5B0',
    bgImage: flowerBg2,
    finishes: LUXE_FINISHES,
    image:  delightsBdayImg,
    images: [delightsBdayImg, delightsBdayImg, delightsBdayImg],
    tags: ['Trending', 'Same Day'],
    offers: [
      { provider: 'Paytm', text: 'Get Cashback up to ₹300 on a min. transaction of ₹799' },
    ],
  },
]

export const categories = [
  { id: 'all',          label: 'All Gifts' },
  { id: 'cakes',        label: 'Cakes' },
  { id: 'combos',       label: 'Combos' },
  { id: 'personalised', label: 'Personalised' },
  { id: 'flowers',      label: 'Flowers' },
]

export const getProductById = (id) => products.find((p) => p.id === Number(id))
