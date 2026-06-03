import { create } from 'zustand'

const useStore = create((set) => ({
  selectedProduct: null,
  cartItems: [],
  hoveredProduct: null,
  activeCategory: 'all',

  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setHoveredProduct: (id) => set({ hoveredProduct: id }),
  setActiveCategory: (cat) => set({ activeCategory: cat }),

  addToCart: (product) =>
    set((state) => {
      const exists = state.cartItems.find((p) => p.id === product.id)
      if (exists) return state
      return { cartItems: [...state.cartItems, { ...product, qty: 1 }] }
    }),

  removeFromCart: (id) =>
    set((state) => ({ cartItems: state.cartItems.filter((p) => p.id !== id) })),

  cartCount: () => {
    // derived — read directly from cartItems.length
  },
}))

export default useStore
