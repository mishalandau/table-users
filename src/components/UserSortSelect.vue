<template>
<thead>
    <tr>
        <th
            :key="type.key"
            v-for="(type) in types"
            v-text="type.value"
            @click="$emit('changeSort', type.key)"></th>
    </tr>
</thead>    
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IField } from '@/helpers/fields';

@Component
export default class UserList extends Vue {
    @Prop() types!: IField[];
}
</script>