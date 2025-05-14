<template>
    <h2>All products</h2>
    <table class="table table-bordered mt-3 text-center">
        <thead>
            <tr>
                <td>#</td>
                <td>Name</td>
                <td>Description</td>
                <td>Price</td>
                <td>Image</td>
                <td>Action</td>
            </tr>
        </thead>
        <tbody>
            <tr v-if="loading">
                <td colspan="6">Loading...</td>
            </tr>

            <template v-else>
                <tr v-for="p in products" :key="p.id">
                    <td>{{ p.id }}</td>
                    <td>{{ p.name }}</td>
                    <td>{{ p.description }}</td>
                    <td>{{ p.price }}</td>
                    <td><img :src="p.image_url" width="100" alt=""></td>
                    <td>
                        <router-link :to="`/edit/${p.id}`">Edit</router-link>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script setup>
import { useProduct } from '../composables/useProduct';
const { products, loading, errror } = useProduct();

</script>

<style></style>