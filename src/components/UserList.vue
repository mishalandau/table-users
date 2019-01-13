<template>
<tbody>
    <tr :key="user.id" v-for="user in list">
        <td v-text="user.id"></td>
        <td v-text="user.name"></td>
        <td v-text="user.surname"></td>
    </tr>
</tbody>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import User from '@/modules/User';

@Component
export default class UserList extends Vue {
    @Prop() list!: User.IUser[];
}
</script>
