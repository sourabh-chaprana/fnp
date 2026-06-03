import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../../components/ui/Navbar'

const FADE = (i = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.45, ease: [0.22,1,0.36,1] } },
})

// ─── Tiny section heading ─────────────────────────────────────────────────────
function SectionHeading({ step, title }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
        style={{ background: 'linear-gradient(135deg,#e91e8c,#c9921a)' }}>{step}</span>
      <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{title}</h2>
    </div>
  )
}

// ─── Text input ───────────────────────────────────────────────────────────────
function Field({ label, type = 'text', value, onChange, placeholder, required, half }) {
  return (
    <div className={half ? 'col-span-1' : 'col-span-2'}>
      <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-pink-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-50 transition-all"
      />
    </div>
  )
}

// ─── Payment option radio ─────────────────────────────────────────────────────
function PayOption({ id, label, icon, selected, onSelect, children }) {
  return (
    <div className={`rounded-xl border-2 transition-all duration-150 overflow-hidden
      ${selected ? 'border-pink-400 shadow-sm' : 'border-gray-100 hover:border-pink-200'}`}>
      <button
        type="button"
        onClick={() => onSelect(id)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        <span className="text-xl">{icon}</span>
        <span className="font-semibold text-gray-700 text-sm flex-1">{label}</span>
        <span className={`w-4 h-4 rounded-full border-2 transition-colors flex-shrink-0
          ${selected ? 'border-pink-500 bg-pink-500' : 'border-gray-300'}`}>
          {selected && <span className="block w-full h-full rounded-full scale-50 bg-white" />}
        </span>
      </button>
      {selected && children && (
        <div className="px-4 pb-4 pt-1 bg-pink-50/50 border-t border-pink-100">
          {children}
        </div>
      )}
    </div>
  )
}

const DELIVERY_SLOTS = [
  { id: 'today',      label: 'Today',      sub: 'Before midnight',     price: 'FREE' },
  { id: 'tomorrow',   label: 'Tomorrow',   sub: '10 AM – 8 PM',        price: 'FREE' },
  { id: 'dayafter',   label: 'Day After',  sub: '10 AM – 8 PM',        price: 'FREE' },
]

export default function Checkout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { product, qty = 1 } = location.state || {}

  // ── Delivery form ──
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    address: '', apartment: '',
    city: '', state: '', pincode: '',
    message: '',
  })
  const setF = (key) => (val) => setForm((f) => ({ ...f, [key]: val }))

  const [deliverySlot, setDeliverySlot] = useState('tomorrow')
  const [payMethod, setPayMethod]       = useState('card')

  // ── Card form ──
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const setC = (k) => (v) => setCard((c) => ({ ...c, [k]: v }))

  // ── UPI ──
  const [upiId, setUpiId] = useState('')

  // ── Wallet ──
  const [wallet, setWallet] = useState('paytm')

  const total    = product ? product.price * qty : 0
  const discount = product ? product.originalPrice * qty - total : 0

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
      alert('Please fill in all required delivery fields.')
      return
    }
    navigate('/order-confirmation', {
      state: {
        product, qty, total,
        address: form,
        deliverySlot,
        payMethod,
        orderId: `FNP-${Date.now().toString().slice(-7)}`,
      },
    })
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4" style={{ background: '#fdfaf8' }}>
        <p className="text-gray-400 text-lg">Your cart is empty.</p>
        <button onClick={() => navigate('/')} className="px-6 py-2.5 rounded-full text-white text-sm font-semibold"
          style={{ background: 'linear-gradient(135deg,#e91e8c,#c9921a)' }}>
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full" style={{ background: 'linear-gradient(160deg,#fdfaf8,#fef6f2)' }}>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-16">
        {/* Page heading */}
        <motion.div {...FADE(0)} className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-pink-500 transition-colors shadow-sm">
            ‹
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
          <span className="ml-auto flex items-center gap-1.5 text-green-600 text-xs font-semibold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            SSL Secured
          </span>
        </motion.div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

            {/* ══ LEFT — Delivery + Payment ══ */}
            <div className="space-y-8">

              {/* Delivery details */}
              <motion.div {...FADE(1)} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <SectionHeading step="1" title="Delivery Details" />
                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                  <Field label="Full Name"    value={form.name}      onChange={setF('name')}      placeholder="Sourabh Chaprana"   required />
                  <Field label="Phone Number" value={form.phone}     onChange={setF('phone')}     placeholder="+91 98765 43210"    required half type="tel" />
                  <Field label="Email Address" value={form.email}    onChange={setF('email')}     placeholder="you@email.com"      half type="email" />
                  <Field label="Address Line 1" value={form.address} onChange={setF('address')}   placeholder="House / Flat / Street" required />
                  <Field label="Apartment / Area" value={form.apartment} onChange={setF('apartment')} placeholder="Colony, Locality"  />
                  <Field label="City"         value={form.city}      onChange={setF('city')}      placeholder="Mumbai"             required half />
                  <Field label="Pincode"      value={form.pincode}   onChange={setF('pincode')}   placeholder="400001"             required half type="text" />
                  <Field label="State"        value={form.state}     onChange={setF('state')}     placeholder="Maharashtra"        />
                  <Field label="Gift Message (optional)" value={form.message} onChange={setF('message')} placeholder="Write a personal message for the recipient..." />
                </div>
              </motion.div>

              {/* Delivery slot */}
              <motion.div {...FADE(2)} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <SectionHeading step="2" title="Choose Delivery Slot" />
                <div className="grid grid-cols-3 gap-3">
                  {DELIVERY_SLOTS.map((slot) => (
                    <button type="button" key={slot.id}
                      onClick={() => setDeliverySlot(slot.id)}
                      className={`rounded-xl p-3 border-2 text-left transition-all duration-150
                        ${deliverySlot === slot.id
                          ? 'border-pink-400 bg-pink-50'
                          : 'border-gray-100 hover:border-pink-200'}`}>
                      <p className="font-bold text-gray-800 text-sm">{slot.label}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{slot.sub}</p>
                      <p className="text-green-500 text-xs font-bold mt-1">{slot.price}</p>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Payment method */}
              <motion.div {...FADE(3)} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <SectionHeading step="3" title="Payment Method" />
                <div className="space-y-3">

                  <PayOption id="card" label="Credit / Debit Card" icon="💳" selected={payMethod === 'card'} onSelect={setPayMethod}>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {[
                        { label: 'Card Number',  key: 'number',  placeholder: '1234  5678  9012  3456', span: 'col-span-2' },
                        { label: 'Cardholder Name', key: 'name', placeholder: 'As on card',              span: 'col-span-2' },
                        { label: 'Expiry Date',  key: 'expiry',  placeholder: 'MM / YY',                 span: '' },
                        { label: 'CVV',          key: 'cvv',     placeholder: '•••',                     span: '' },
                      ].map(({ label, key, placeholder, span }) => (
                        <div key={key} className={span || ''}>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</label>
                          <input type="text" value={card[key]} onChange={(e) => setC(key)(e.target.value)}
                            placeholder={placeholder}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-pink-400 transition-colors" />
                        </div>
                      ))}
                    </div>
                    {/* Card logos */}
                    <div className="flex gap-2 mt-3">
                      {['VISA', 'MC', 'AMEX', 'RuPay'].map((b) => (
                        <span key={b} className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-[10px] font-bold text-gray-500">{b}</span>
                      ))}
                    </div>
                  </PayOption>

                  <PayOption id="upi" label="UPI / GPay / PhonePe / Paytm" icon="📱" selected={payMethod === 'upi'} onSelect={setPayMethod}>
                    <div className="mt-2">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">UPI ID</label>
                      <div className="flex gap-2">
                        <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@upi"
                          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-pink-400 transition-colors" />
                        <button type="button" className="px-4 py-2 rounded-lg text-white text-xs font-bold"
                          style={{ background: 'linear-gradient(135deg,#e91e8c,#c9921a)' }}>Verify</button>
                      </div>
                      <div className="flex gap-3 mt-3">
                        {[['📲','PhonePe'],['💚','GPay'],['🔵','Paytm'],['🟠','BHIM']].map(([ic, name]) => (
                          <div key={name} className="flex flex-col items-center gap-1">
                            <span className="text-2xl">{ic}</span>
                            <span className="text-[10px] text-gray-400">{name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PayOption>

                  <PayOption id="netbanking" label="Net Banking" icon="🏦" selected={payMethod === 'netbanking'} onSelect={setPayMethod}>
                    <div className="mt-2">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Select Bank</label>
                      <select className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 focus:outline-none focus:border-pink-400 transition-colors bg-white">
                        {['SBI','HDFC Bank','ICICI Bank','Axis Bank','Kotak Bank','Yes Bank','Other Banks'].map((b) => (
                          <option key={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </PayOption>

                  <PayOption id="cod" label="Cash on Delivery" icon="💵" selected={payMethod === 'cod'} onSelect={setPayMethod}>
                    <p className="text-gray-400 text-xs mt-2">Pay ₹{total.toLocaleString()} in cash when your order arrives. Available for orders under ₹5,000.</p>
                  </PayOption>

                </div>
              </motion.div>
            </div>

            {/* ══ RIGHT — Order Summary ══ */}
            <motion.div {...FADE(1)} className="space-y-5">
              {/* Product */}
              <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm sticky top-24">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Order Summary</h3>

                {/* Product row */}
                <div className="flex gap-4 pb-4 border-b border-gray-100 mb-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100"
                    style={{ background: product.color + '15' }}>
                    <img src={product.image} alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display='none' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 text-sm font-semibold leading-snug line-clamp-2">{product.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{product.subtitle}</p>
                    <p className="text-gray-400 text-xs mt-1">Qty: {qty}</p>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="space-y-2 text-sm mb-4">
                  {[
                    { label: 'Price',            val: `₹${(product.originalPrice * qty).toLocaleString()}` },
                    { label: `Discount (${product.discount}% OFF)`, val: `-₹${discount.toLocaleString()}`, green: true },
                    { label: 'Delivery',         val: 'FREE',  green: true },
                  ].map(({ label, val, green }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-gray-400">{label}</span>
                      <span className={green ? 'text-green-500 font-semibold' : 'text-gray-700'}>{val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 mt-2 border-t border-gray-100 font-bold text-base">
                    <span className="text-gray-900">Total</span>
                    <span className="text-pink-500">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Savings badge */}
                <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2 mb-5">
                  <span className="text-lg">🎉</span>
                  <p className="text-green-600 text-xs font-semibold">
                    You save ₹{discount.toLocaleString()} on this order!
                  </p>
                </div>

                {/* Place order CTA */}
                <button type="submit"
                  className="w-full py-4 rounded-2xl text-white font-bold text-sm tracking-wider uppercase shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                  style={{ background: 'linear-gradient(135deg,#e91e8c,#c9921a)' }}>
                  Place Order  →  ₹{total.toLocaleString()}
                </button>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  {['🔒 Secure Pay', '↩ Easy Returns', '⭐ 4.8 Rated'].map((t) => (
                    <span key={t} className="text-[10px] text-gray-400">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </form>
      </div>
    </div>
  )
}
