<template>
    <div class="tw-flex tw-flex-col tw-min-h-screen">
        <nav
            class="navbar navbar-expand-lg navbar-light border-bottom tw-sticky tw-top-0 tw-z-50 tw-bg-white tw-shadow-sm">
            <div class="container">
                <RouterLink to="/" class="navbar-brand">NGTHANHVU</RouterLink>
                <div class="navbar-collapse d-flex justify-content-center">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link tw-font-semibold">Trang chủ</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/product" class="nav-link tw-font-semibold">Sản phẩm</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="#" class="nav-link tw-font-semibold">Về chúng tôi</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="#" class="nav-link tw-font-semibold">Tin tức</router-link>
                        </li>
                    </ul>
                </div>
                <div class="d-flex">
                    <router-link to="/cart"
                        class="tw-px-4 tw-py-2 tw-p tw-rounded-[20px] tw-border tw-me-2 hover:tw-bg-gray-100">
                        <i class="fa-solid fa-cart-shopping"></i> Giỏ hàng <span>0</span>
                    </router-link>
                    <router-link to="/login"
                        class="tw-px-4 tw-p tw-rounded-[20px] tw-border tw-bg-blue-500 text-white tw-p-2 hover:tw-bg-blue-600">
                        Đăng
                        nhập</router-link>
                </div>
            </div>
        </nav>

        <div class="tw-flex-grow">
            <router-view></router-view>
        </div>

        <footer class="tw-bg-white tw-text-gray-600 tw-py-4 tw-border-t">
            <div class="tw-grid tw-grid-cols-2">
                <div class="tw-flex tw-items-center tw-justify-center">
                    <p>© 2023 Nghanhvu. All rights reserved.</p>
                </div>
                <div class="tw-flex tw-items-center tw-justify-center">
                    <p>Privacy Policy</p>
                    <p class="tw-mx-2">|</p>
                    <p>Terms & Conditions</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
</script>

<style></style>