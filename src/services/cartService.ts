import { api } from "./api"
import type { Cart } from "../types/cart"
import type { Product } from "../types/product"

// GET cart for a specific user
export async function fetchCart(userId: string): Promise<Cart> {
  try {
    const res = await api.get(`/cart`, { params: { userId } })
    const data = res.data

    data.createdAt = new Date(data.createdAt)
    data.updatedAt = new Date(data.updatedAt)
    data.items = data.items.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
    }))

    return data
  } catch (error) {
    throw new Error("Failed to fetch cart")
  }
}

// POST to add item to cart
export async function addToCartAPI(
  userId: string,
  product: Product,
  quantity: number,
  selectedVariant?: string
): Promise<Cart> {
  try {
    const res = await api.post("/cart/add", {
      userId,
      productId: product.id,
      unitPrice: product.price,
      quantity,
      selectedVariant,
    })
    return res.data
  } catch (error) {
    throw new Error("Failed to add to cart")
  }
}

// PATCH to update quantity
export async function updateCartItemQuantityAPI(
  cartItemId: string,
  quantity: number
): Promise<Cart> {
  try {
    const res = await api.patch(`/cart/item/${cartItemId}`, { quantity })
    return res.data
  } catch (error) {
    throw new Error("Failed to update cart item")
  }
}

// DELETE a specific cart item
export async function removeCartItemAPI(cartItemId: string): Promise<Cart> {
  try {
    const res = await api.delete(`/cart/item/${cartItemId}`)
    return res.data
  } catch (error) {
    throw new Error("Failed to remove cart item")
  }
}

// DELETE entire cart for a user
export async function clearCartAPI(userId: string): Promise<void> {
  try {
    await api.delete(`/cart`, { params: { userId } })
  } catch (error) {
    throw new Error("Failed to clear cart")
  }
}
