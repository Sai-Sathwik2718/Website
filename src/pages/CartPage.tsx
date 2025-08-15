import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some products to get started!</p>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">{items.length} items in your cart</p>
          </div>

          {/* Cart Items */}
          <div className="px-6 py-4">
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 p-4 border border-gray-200 rounded-lg">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0 text-center md:text-left">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {item.product.category}
                    </p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      ${item.product.price}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    
                    <span className="text-lg font-semibold min-w-[3rem] text-center">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="text-right min-w-0">
                    <p className="text-lg font-bold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 mt-2 flex items-center space-x-1 mx-auto md:mx-0"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="text-sm">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex space-x-4">
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Clear Cart
                </button>
                <Link
                  to="/"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
              
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  Total: ${totalPrice.toFixed(2)}
                </p>
                <Link
                  to="/checkout"
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 inline-block"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;