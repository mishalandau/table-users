<template>
<form>
    <input type="text" placeholder="Имя" v-model="formData.name">
    <input type="text" placeholder="Фамилия" v-model="formData.surname">
    <button @click.prevent="addUser">Добавить</button>
</form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import User from '@/modules/User';
import { isEmptyField } from '@/helpers/fields';

interface IFormData {
    name: string;
    surname: string;
}

@Component
export default class AddUser extends Vue {
    @Prop() pages!: number;

    formData: IFormData = {
      name: '',
      surname: '',
    };

  	addUser() {
        if (isEmptyField(<User.IUser>this.formData)) return;
        this.$emit('addUser', this.formData);
        this.clearFormData();
    }

    clearFormData() {
        this.formData = {
            name: '',
            surname: '',
        };
    }
}
</script>