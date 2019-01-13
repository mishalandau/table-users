<template>
<div id="app">
	<PaginationSettings
		v-model="selectPerPage"
		:perPageOptions="perPageOptions" />
    <br />
	<AddUser @addUser="addUser" />
	<UserTable
		:sort.sync="sort"
		:sortActiveField.sync="sortActiveField"
		:list="pageUsers"
		:types="types"
		:selectPerPage="selectPerPage"
		:currentPage="currentPage"/>
	<Pagination :pages="countPages" @chosePage="choseCurrentPage" />
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserTable from '@/components/UserTable.vue';
import AddUser from '@/components/AddUser.vue';
import Pagination from '@/components/Pagination.vue';
import PaginationSettings from '@/components/PaginationSettings.vue';
import User from '@/modules/User';
import SortList from '@/hocs/SortList';

@Component({
  components: {
	UserTable: SortList(UserTable),
	Pagination,
	PaginationSettings,
	AddUser,
  },
})
export default class App extends Vue {
  	types = [
    	{ key: 'id', value: '№' },
    	{ key: 'name', value: 'Имя' },
    	{ key: 'surname', value: 'Фамилия' },
	];

	sort = null;
	sortActiveField = '';

	nextId = 1;
	users: User.IUser[] = [];
	currentPage = 1;
    selectPerPage = 5;
    perPageOptions = [5, 10, 50];

    get countPages() {
      return Math.ceil(this.users.length / this.selectPerPage);
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
