<template>
  <div id="__layout-main">
    <div class="navbar" :class="this.lgWidth ? 'lg':''">
      <div class="left">
        <div class="bars" @click="setLgWidth">
          <i class="far fa-bars"></i>
        </div>
        <!--        <div class="breadcrumb">
                  <nuxt-link to="/">
                    <div class="breadcrumb&#45;&#45;item">
                      Home
                    </div>
                  </nuxt-link>
                  <i class="fal fa-angle-right"></i>
                  <nuxt-link to="/p">
                    <div class="breadcrumb&#45;&#45;item">
                      Bài viết
                    </div>
                  </nuxt-link>
                </div>-->
      </div>
      <div class="info" @click="openPopover">
        <div class="name">
          TuanDH
        </div>
        <!--        <vs-avatar circle>
                  <img src="https://ding7x.com/_nuxt/img/dinh-hoang-tuan-ding7x_info.d54ddaa.jpg" alt="dinh-hoang-tuan">
                </vs-avatar>-->
        <vs-avatar circle>
          <img src="/images/male.jpg" alt="dinh-hoang-tuan">
        </vs-avatar>
        <div class="popover" v-if="popoverShow">
          <div class="popover--item">
            <div class="popover--item_icon">
              <i class="far fa-user"></i>
            </div>
            <div class="popover--item_label">
              Trang cá nhân
            </div>
          </div>
          <!--          <div class="popover&#45;&#45;item" @click="$store.dispatch('setDark', !$store.state.dark)">
                      <div class="popover&#45;&#45;item_icon">
                        <i class="far fa-adjust"></i>
                      </div>
                      <div class="popover&#45;&#45;item_label">
                        Chế độ tối
                      </div>
                    </div>-->
          <div class="popover--item logout">
            <div class="popover--item_icon">
              <i class="far fa-sign-out"></i>
            </div>
            <div class="popover--item_label">
              Đăng xuất
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="menu-sidebar">
      <vs-sidebar
        relative
        v-model="active"
        open
        square
        not-shadow
        :reduce="!lgWidth"
        :style="{width: this.lgWidth ? '260px':'50px'}"
        dark
      >
        <template #logo>
          <a href="/" style="text-decoration: none">
            <div class="brand">
              <img src="/logo-dark.svg" alt="ding-logo">
              <div class="label" v-if="lgWidth">
                Ding Ambition
              </div>
            </div>
          </a>
        </template>
        <vs-sidebar-item id="home" to="/">
          <template #icon>
            <i class="fas fa-home-alt"></i>
          </template>
          Trang Chủ
        </vs-sidebar-item>
      </vs-sidebar>
    </div>
    <div class="__container" :class="this.lgWidth ? 'lg':''">
      <nuxt/>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      active: 'home',
      searchString: '',
      lgWidth: true,
      darkMode: false,
      popoverShow: false,
    }
  },
  created() {
    if (process.client) {
      window.addEventListener("resize", this.getWSize);
    }
  },
  mounted() {
    if (window.innerWidth < 768) {
      this.lgWidth = false
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.getWSize);
  },
  methods: {
    setLgWidth() {
      this.lgWidth = !this.lgWidth
    },
    openPopover() {
      this.popoverShow = !this.popoverShow
    },
    getWSize() {
      if (window.innerWidth <= 768) {
        this.lgWidth = false
      }
    },
    goTo(link) {
      this.$router.push(link)
    }
  },
}
</script>
<style lang="scss" scoped>
@import "./assets/css/responsive";

#__layout-main {
  .navbar {
    height: 60px;
    background: var(--bg-widget);
    width: calc(100vw - 80px);
    z-index: 9999999;
    position: fixed;
    top: 10px;
    right: 10px;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    display: flex;
    transition: all .25s;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.04);

    .left {
      display: flex;
      align-items: center;
    }

    .bars {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 50px;
      cursor: pointer;
      height: 35px;
      width: 35px;
      border-radius: 10000px;
      font-size: 20px;
    }

    .breadcrumb {
      flex-wrap: nowrap;
      width: fit-content;
      align-items: center;
      justify-content: flex-start;
      display: none;

      @include responsive_768 {
        display: flex;
      }

      a {
        text-decoration: none;
        color: var(--text-color);
      }

      i {
        font-size: 13px;
        margin: 0 10px;
        transform: translateY(1px);
      }

      .breadcrumb--item {
        font-size: 13px;
        opacity: .7;
        transition: all .2s;

        &:hover {
          opacity: 1;
          transition: all .2s;
        }
      }
    }


    .info {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      cursor: pointer;

      .name {
        font-weight: 600;
        margin-right: 10px;
      }

      .popover {
        position: absolute;
        background: var(--bg-widget);
        padding: 20px;
        border-radius: 5px;
        right: 0;
        top: calc(100% + 15px);
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.04);

        .popover--item {
          width: 160px;
          height: 40px;
          padding: 5px 20px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          white-space: nowrap;
          text-align: center;
          border-radius: 5px;
          cursor: pointer;
          transition: all .2s;
          background: rgba(0, 0, 0, 0);
          font-weight: 500;

          &:not(:last-child) {
            margin-bottom: 5px;
          }

          .popover--item_icon {
            margin-right: 10px;
            opacity: .6;
          }

          .popover--item_label {
            opacity: .76;
          }

          &:hover {
            transition: all .2s;
            background: rgba(0, 0, 0, .04);
            padding-left: 25px;

            .popover--item_icon, .popover--item_label {
              opacity: 1;
              transition: all .2s;
            }
          }
        }

        .logout {
          color: red;
          background: rgba(255, 0, 0, .1) !important;
        }
      }
    }
  }

  .menu-sidebar {
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
    background: var(----bg-widget);
    z-index: 99999;

    .brand {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        height: 30px;
        width: 30px;
      }

      .label {
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 1px;
        margin-left: 10px;
        color: var(--text-color);
        white-space: nowrap;
      }
    }

  }


  .__container {
    position: absolute;
    transition: all .25s;
    width: calc(100vw - 80px);
    height: 100vh;
    right: 10px;
    top: 80px;
  }

  .lg {
    width: calc(100vw - 290px);
    transition: all .25s;
  }
}
</style>
