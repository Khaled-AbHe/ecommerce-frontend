import { getProducts, getCategories, getProduct, getOrders, getCart } from './services/api';

// Home page loader
export async function homeLoader() {
  try {
    const [products, categories] = await Promise.all([
      getProducts({ active: true }),
      getCategories(),
    ]);
    return {
      products: products.slice(0, 8),
      categories,
    };
  } catch (error) {
    throw new Response('Failed to load home page data', { status: 500 });
  }
}

// Products page loader
export async function productsLoader({ request }) {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const categoryId = url.searchParams.get('categoryId') || '';

    const [products, categories] = await Promise.all([
      getProducts({ search, categoryId, active: true }),
      getCategories(),
    ]);

    return { products, categories, search, categoryId };
  } catch (error) {
    throw new Response('Failed to load products', { status: 500 });
  }
}

// Product detail loader
export async function productDetailLoader({ params }) {
  try {
    const product = await getProduct(params.id);
    return { product };
  } catch (error) {
    throw new Response('Product not found', { status: 404 });
  }
}

// Orders page loader
export async function ordersLoader() {
  try {
    const orders = await getOrders();
    return { orders };
  } catch (error) {
    throw new Response('Failed to load orders', { status: 500 });
  }
}

// Cart page loader
export async function cartLoader() {
  try {
    const cart = await getCart();
    return { cart };
  } catch (error) {
    throw new Response('Failed to load cart', { status: 500 });
  }
}
