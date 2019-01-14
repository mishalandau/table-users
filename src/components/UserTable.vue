<template>
<div>
    <table>
        <UserSortSelect
            :types="types"
            @changeSort="$emit('changeSort', $event)" />
        <UserList :list="list"/>
    </table>
</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import UserList from '@/components/UserList.vue';
import UserSortSelect from '@/components/UserSortSelect.vue';
import User from '@/modules/User';
import { IField } from '@/helpers/fields';

@Component({
    components: {
        UserList,
        UserSortSelect,
    },
})
export default class UserTable extends Vue {
    @Prop() types!: IField[];
    @Prop() list!: User.IUser[];
}
</script>
