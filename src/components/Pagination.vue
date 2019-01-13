<template>
    <div>
        <button :key="page" v-for="(page) in pages" v-text="page" @click="$emit('chosePage', page)"></button>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Pagination extends Vue {
    @Prop() pages!: number;
}
</script>