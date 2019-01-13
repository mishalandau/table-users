<template>
<div>
    <label>Кол-во элементов на странице: &nbsp;</label>
    <select v-model="selectPerPage">
    <option :key="perPage" v-for="(perPage) in perPageOptions" v-text="perPage"></option>
    </select>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import User from '@/modules/User';

@Component
export default class UserList extends Vue {
    @Prop() value!: number;
    @Prop() perPageOptions!: number[];

    get selectPerPage() {
        return this.value;
    }

    set selectPerPage(val) {
        this.$emit('input', val);
    }
}
</script>