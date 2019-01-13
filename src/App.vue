<template>
<div id="app">
	<PaginationSettings
		v-model="selectPerPage"
		:perPageOptions="perPageOptions" />
	<UserList
		:users="users"
		:types="types"
		:selectPerPage="selectPerPage"
		:currentPage="currentPage"
		@addUser="addUser" />
	<Pagination :pages="countPages" @chosePage="choseCurrentPage" />
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserList from '@/components/UserList.vue';
import Pagination from '@/components/Pagination.vue';
import PaginationSettings from '@/components/PaginationSettings.vue';
import User from '@/modules/User';

@Component({
  components: {
	UserList,
	Pagination,
	PaginationSettings,
  },
})
export default class App extends Vue {
  	types = [
    	{ key: 'id', value: '№', sortIndex: 0 },
    	{ key: 'name', value: 'Имя', sortIndex: 0 },
    	{ key: 'surname', value: 'Фамилия', sortIndex: 0 },
	];

	nextId = 1;
	users: User.IUser[] = [];
	currentPage = 1;
    selectPerPage = 5;
    perPageOptions = [5, 10, 50];

    get countPages() {
      return Math.ceil(this.users.length / this.selectPerPage);
	}
	
	addUser(user: User.IUser) {
		this.users.push({
			...user,
			id: this.nextId,
		});
		this.nextId++;
	}

    choseCurrentPage(page: number) {
        this.currentPage = page;
    }
}
</script>
