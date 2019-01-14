import { Vue, Component, Prop } from 'vue-property-decorator';
import { SortType } from '@/modules/Sort';
import { IField } from '@/helpers/fields';

export default (cmp: Vue.Component) => {
    @Component
    class SortList extends Vue {
        @Prop() sort!: SortType;
        @Prop() list!: any[];
        @Prop() types!: IField[];
        @Prop() sortActiveField = '';

        get sortList() {
            const newList = [...this.list];
            newList.sort((a, b) => {
                const key = this.sortActiveField;
                const firstValue = String((<any>a)[key]);
                const lastValue = String((<any>b)[key]);

                switch(this.sort) {
                    case SortType.ASC:
                        return (firstValue).localeCompare(lastValue);
                    case SortType.DESC:
                        return (lastValue).localeCompare(firstValue);
                    case SortType.DISABLE:
                    default:
                        return 0;
                }
            });

            return newList;
        }

        render(createElement: typeof Vue.prototype.$createElement) {
            return createElement(
                cmp,
                {
                    attrs: {
                        ...this.$attrs,
                        ...this.$props,
                        list: this.sortList,
                    },
                    on: {
                        ...this.$listeners,
                        changeSort: (field: string) => {
                            const typeIndex = this.types.findIndex(({ key }) => key === field);
                            const currentType = this.types[typeIndex];
                            if (!currentType) return;

                            let sortIndex = this.sort;
                            if (field === this.sortActiveField) sortIndex++;
                            else sortIndex = 0;
                            if (sortIndex > 2) sortIndex = 0;

                            this.$emit('update:sort', sortIndex);
                            this.$emit('update:sortActiveField', field);
                        },
                    },
                },
            );
        }
    }

    return SortList;
}
