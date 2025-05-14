import { ref } from 'vue';

export function useProduct() {
    const API_URL = "http://localhost:3000";
    const products = ref('');
    const loading = ref(false);
    const error = ref('');

    const fetchProducts = async () => {
        loading.value = true;
        error.value = null;

        try {
            const res = await fetch(API_URL + `/api/products`);
            if (!res.ok) {
                throw new Error('Failed to fetch products');
            }
            products.value = await res.json()
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    fetchProducts();

    return {
        products,
        loading,
        error,
        fetchProducts
    }
}

export default useProduct