<template>
    <div :style="{ padding: '10px 40px' }">
        <h1 :style="{marginBottom:'40px'}">Сервис логирования</h1>
        <a-table
                :columns="columns"
                :rowKey="v => Math.random()"
                :dataSource="data"
                :pagination="pagination"
                :loading="loading"
                @change="handleTableChange"
        >
            <span slot="Level" slot-scope="Level">
                <a-tag :color="levelColor(Level)">
                    {{Level}}
                </a-tag>
            </span>
            <span slot="RegistrationTime" slot-scope="RegistrationTime">
                {{RegistrationTime | dateParse('YYYY-MM-DD HH:mm:ss') | dateFormat('YYYY-MM-DD HH:mm:ss') }}
            </span>
        </a-table>
        <div :style="{display: 'flex', alignItems:'center', justifyContent: 'center'}">
            <div :style="{marginRight:'10px'}">Всего записей: {{data.length}}</div>
            <div :style="{marginRight: '10px'}">На страницу: </div>
            <a-select defaultValue="10" @change="handleChange">
                <a-select-option value="10">10</a-select-option>
                <a-select-option value="25">25</a-select-option>
                <a-select-option value="50">50</a-select-option>
                <a-select-option value="100">100</a-select-option>
            </a-select>
        </div>
    </div>

</template>
<script>
    import axios from 'axios'
    const columns = [
        {
            title: 'Сервис',
            dataIndex: 'ServiceName',
            width: '174px'
        },
        {
            title: 'Раздел',
            dataIndex: 'Section',
            width: '174px'
        },
        {
            title: 'Подраздел',
            dataIndex: 'Subsection',
            width: '201px'
        },
        {
            title: 'UserId',
            dataIndex: 'UserId',
            width: '82px'
        },
        {
            title: 'Уровень',
            dataIndex: 'Level',
            scopedSlots: { customRender: 'Level' },
            width: '95px'
        },
        {
            title: 'Время',
            dataIndex: 'RegistrationTime',
            sorter: (a, b) => Date.parse(a.RegistrationTime) - Date.parse(b.RegistrationTime),
            scopedSlots: { customRender: 'RegistrationTime' },
            width: '200px'
        },
        {
            title: 'Данные',
            dataIndex: 'Data',
            width: '273px'
        },
    ];

    export default {
        name: 'ServiceLog',
        mounted() {
            this.fetch();
        },
        data() {
            return {
                data: [],
                pagination: {
                    pageSize: 10
                },
                loading: false,
                columns,
            };
        },
        methods: {
            handleTableChange(pagination) {
                const pager = { ...this.pagination };
                pager.current = pagination.current;
                this.pagination = pager;
                this.fetch();
            },
            fetch () {
                this.loading = true;
                axios
                    .get('http://docker.dev.ktotam.info:1505/SysLog?parameters={}')
                    .then(response => {
                        const pagination = { ...this.pagination };
                        this.loading = false;
                        this.data = response.data.RegisteredMessages;
                        this.pagination = pagination;
                    })
                    .catch(error => {
                        console.log(error);
                        this.loading = false;
                    });
            },
            handleChange(value) {
                this.pagination.pageSize = Number(value);
                this.pagination.current = 1;
            },
            levelColor (level) {
                var color = 'silver';
                if (level==='Fatal') {
                    color = 'purple';
                } else if (level==='Warn') {
                    color = 'yellow';
                } else if (level==='Debug') {
                    color = 'green';
                } else if (level==='Error') {
                    color = 'red';
                } else if (level==='Info') {
                    color = 'blue';
                }
                return color;
            },
        },
    };
</script>