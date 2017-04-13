<template>
  <div id="home">
    <comHeader />
    <div class="home-wrap">
      <comSideNav />
      <div class="home-main">
        <transition name="router-fade" mode="out-in" class="">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import comHeader from '../components/comHeader.vue'
  import comSideNav from '../components/comSideNav.vue'
  export default {
    components: {
      comHeader,
      comSideNav
    }
  }
</script>

<style lang="scss" scoped>
  .router-fade-enter-active, .router-fade-leave-active {
	  transition: all .5s cubic-bezier(.55, 0, .1, 1);
	}
	.router-fade-enter, .router-fade-leave-active {
    opacity: 0;
    transform: translate3d(30px, 0, 0);
	}
  .home {
    @at-root &-wrap {
      position: absolute;
      top: 70px;
      bottom: 0;
      display: flex;
      width: 100%;
    }
    @at-root &-main {
      flex: 1;
      padding: 40px 30px 40px;
      overflow-y: scroll;
    }
  }
</style>
