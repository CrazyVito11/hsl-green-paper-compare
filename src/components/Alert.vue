<template>
    <div class="flex p-4 rounded my-2 bg-yellow-200 text-yellow-600">
        <div class="shrink-0 pr-2">
            <i class="fas fa-exclamation-triangle text-lg text-yellow-500"></i>
        </div>

        <div class="flex-grow">
            <h2 class="font-semibold text-lg" v-text="title"></h2>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Alert",
    props: {
        title: {
            type: String,
            required: true
        }
    }
};
</script>
