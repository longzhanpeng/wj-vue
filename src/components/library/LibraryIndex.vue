<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <!--<SideMenu></SideMenu>-->
      <side-menu id="side_menu"></side-menu>
    </el-aside>
    <el-main>
      <books class="books-area"></books>
    </el-main>
  </el-container>
</template>

<script>
import SideMenu from './SideMenu'
import Books from './Books'

export default {
  name: 'libraryIndex',
  components: {SideMenu, Books}
}
</script>

<style scoped>
.books-area {
  width: 990px;
  margin-left: auto;
  margin-right: auto;
}
</style>
