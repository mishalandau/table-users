<template>
<div>
    <br />
    <form>
        <input type="text" placeholder="Имя" v-model="formData.name">
        <input type="text" placeholder="Фамилия" v-model="formData.surname">
        <button @click.prevent="addUser">Добавить</button>
    </form>
    <br />
    <table>
        <tr>
            <th
                :key="type.key"
                v-for="(type) in types"
                v-text="type.value"
                @click="changeSort(type.key)"></th>
        </tr>
        <tr :key="user.id" v-for="user in sortUsers">
            <td v-text="user.id"></td>
            <td v-text="user.name"></td>
            <td v-text="user.surname"></td>
        </tr>
    </table>
</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import User from '@/modules/User';
import { isEmptyField } from '@/helpers/fields';

enum types {
    ASC,
    DESC,
    DISABLE,
}

interface IField {
    key: string;
    value: string;
    sortIndex: number;
}

interface IFormData {
    name: string;
    surname: string;
}

@Component
export default class UserList extends Vue {
    @Prop() types!: IField[];
    @Prop() users!: User.IUser[];
    @Prop() selectPerPage: number = 5;
    @Prop() currentPage: number = 1;

    formData: IFormData = {
      name: '',
      surname: '',
    };

    sortActiveField = '';

    get sortUsers() {
        if (!this.sortActiveType) return this.pageUsers;

        const newUsers = [...this.pageUsers];
        newUsers.sort((a, b) => {
            const key = this.sortActiveField;
            const firstValue = String((<any>a)[key]);
            const lastValue = String((<any>b)[key]);
        
            switch(this.sortActiveType) {
                case 'ASC':
                    return (firstValue).localeCompare(lastValue);
                case 'DESC':
                    return (lastValue).localeCompare(firstValue);
                case 'DISABLE':
                default:
                    return 0;
            }
        });

        return newUsers
    }

    get sortActiveType() {
        const value = this.types.find((type) => type.key === this.sortActiveField);
        if (value) return types[value.sortIndex];
        else return types[0];
    }

    get pageUsers() {
        const users = [...this.users];
        const spliceStart = this.currentPageFromIndex * this.selectPerPage;
        const newUsers = users.splice(spliceStart, this.selectPerPage);
        return newUsers;
    }

    get currentPageFromIndex() {
      return this.currentPage - 1;
    }

  	addUser() {
        if (isEmptyField(<User.IUser>this.formData)) return;
        this.$emit('addUser', this.formData);
        this.clearFormData();
    }

    changeSort(type: string) {
        const typeIndex = this.types.findIndex(({ key }) => key === type);
        const currentType = this.types[typeIndex];
        if (!currentType) return;

        let { sortIndex } = currentType;

        if (type === this.sortActiveField) sortIndex++;
        if (sortIndex > 2) sortIndex = 0;

        this.$set(this.types, typeIndex, {
            key: currentType.key,
            value: currentType.value,
            sortIndex: sortIndex
        });

        this.sortActiveField = type;
    }

    clearFormData() {
        this.formData = {
            name: '',
            surname: '',
        };
    }
}
</script>
