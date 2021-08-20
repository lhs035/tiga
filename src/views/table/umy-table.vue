<template>
  <u-table
    :data="tableData"
    :pagination-show="true"
    :total="pageForm.total"
    :page-size="pageForm.pageSize"
    :current-page="pageForm.currentPage"
    show-summary
    :total-option="totalOption"
    @handlePageSize="handlePageSize"
  >
    <u-table-column prop="name" label="名字" width="180" />
    <u-table-column prop="sex" label="性别" width="180" />
    <u-table-column prop="job" label="工作" width="180" />
    <u-table-column prop="age" label="年龄" />
  </u-table>
</template>

<script>
function createData() {
  const arr = []
  for (let i = 0; i < 100; i++) {
    const obj = {
      sex: '男',
      name: '王小虎',
      job: '工作',
      age: i
    }
    arr.push(obj)
  }
  return arr
}

const tableData2 = createData()

export default {
  name: 'UmyTable',
  data() {
    return {
      totalOption: [{ label: '年龄', unit: '元' }],

      height: 300,
      pageForm: {
        total: 1000,
        pageSize: 10,
        currentPage: 1
      },
      tableData: tableData2.slice(0, 10)
    }
  },
  methods: {
    // 分页事件
    handlePageSize({ page, size }) {
      console.log(page, size)
      this.tableData = tableData2.slice((page - 1) * size, size * page)
    }
  }
}
</script>
