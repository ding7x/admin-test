<template>
  <div class="index-layout p-layout">
    <client-only>
      <div class="dialog">
        <vs-dialog v-model="dialog">
          <template #header>
            <h4 class="not-margin">
              CREATE ACCOUNT
            </h4>
          </template>
          <div class="con-form">
            <div class="username form--item">
              <div class="d7-input-content">
                <input type="text" placeholder="Username" v-model="user.username"/>
              </div>
            </div>
            <div class="message-username error"></div>
            <div class="name form--item">
              <div class="d7-input-content">
                <input type="text" placeholder="Name" v-model="user.name"/>
              </div>
            </div>
            <div class="message-name error"></div>
            <div class="gender form--item" style="display: flex; align-items: center; justify-content: flex-start;">
              <vs-radio v-model="user.gender" val="male" style="font-size: 14px;">
                Male
              </vs-radio>
              <vs-radio v-model="user.gender" val="female" style="font-size: 14px;">
                Female
              </vs-radio>
            </div>
            <div class="birthday form--item">
              <div class="d7-input-content">
                <input type="date" placeholder="Birthday" v-model="user.birthday"/>
              </div>
            </div>
            <div class="message-birthday error"></div>
            <div class="address form--item">
              <div class="d7-input-content">
                <input type="text" placeholder="Address" v-model="user.address"/>
              </div>
            </div>
            <div class="message-address error"></div>
            <div class="email form--item">
              <div class="d7-input-content">
                <input type="email" placeholder="Email" v-model="user.email"/>
              </div>
            </div>
            <div class="message-email error"></div>
          </div>
          <template #footer>
            <div class="footer-dialog">
              <vs-button
                danger
                flat
                style="border-radius: 5px; width: 100px; height: 35px;"
                @click="cancelAndClose"
              >
                Cancel
              </vs-button>
              <vs-button
                active
                primary
                flat
                style="border-radius: 5px; width: 100px; height: 35px;"
                @click="create"
              >
                {{ updateMode ? 'Save' : 'Create' }}
              </vs-button>
            </div>
          </template>
        </vs-dialog>
      </div>
      <div class="wrapper">
        <div class="wrapper_title">
          Account Management
        </div>
        <div class="wrapper_container">
          <div class="wrapper--item">
            <div class="header container--item">
              <div class="action">
                <vs-button
                  floating
                  class="button action--item"
                  @click="createShow"
                  style="width: 120px; white-space: nowrap"
                >
                  Create Account
                </vs-button>
                <vs-button
                  floating
                  class="button action--item"
                  danger
                  @click="deleteMany"
                  style="width: 120px; white-space: nowrap"
                >
                  Delete Account
                </vs-button>
              </div>
              <div class="search">
                <div class="d7-input-content search--item">
                  <input type="text" placeholder="Search" id="search-input" v-model="search"/>
                  <label for="search-input"><i class="fal fa-search"></i></label>
                </div>
              </div>
            </div>
            <div class="body container--item">
              <vs-switch v-model="CardMode" style="width: 70px;">
                <template #off>
                  List
                </template>
                <template #on>
                  Card
                </template>
              </vs-switch>
              <div class="data">
                <div v-if="CardMode">
                  <div class="data-card" id="drop-items">
                    <div class="card" :key="i" @click="selectedCard(u)"
                         v-for="(u, i) in $vs.getPage($vs.getSearch(users, search), page, max)"
                         :class="selected.includes(u)?'selected':''">
                      <div class="avatar">
                        <vs-avatar circle style="height: 90px; width: 90px;">
                          <img :src="u.avatar" alt="">
                        </vs-avatar>
                      </div>
                      <div class="name card--item">
                        <div class="label">
                          {{ u.name }}
                        </div>
                      </div>
                      <div class="username card--item">
                        <div class="label">
                          <i>#{{ u.username }}</i>
                        </div>
                      </div>
                      <div class="email card--item">
                        <div class="label">
                          {{ u.email }}
                        </div>
                      </div>
                      <div class="birthday card--item">
                        <div class="label">
                          {{ u.birthday }}
                        </div>
                      </div>
                      <div class="action-box" style="display: flex; flex-wrap: nowrap;">
                        <div class="delete">
                          <vs-button
                            danger
                            flat
                            style="border-radius: 5px; width: 70px"
                            @click="deleteUser(i)"
                          >
                            Delete
                          </vs-button>
                        </div>
                        <div class="edit">
                          <vs-button
                            primary
                            flat
                            style="border-radius: 5px; width: 70px"
                            @click="updateShow(u)"
                          >
                            Edit
                          </vs-button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <vs-pagination v-model="page" :length="$vs.getLength(users, max)"/>
                </div>
                <div class="data-list" v-else>
                  <vs-table>
                    <template #thead>
                      <vs-tr>
                        <vs-th>
                          <vs-checkbox
                            :indeterminate="selected.length === users.length" v-model="allCheck"
                            @change="selected = $vs.checkAll(selected, users)"
                          />
                        </vs-th>
                        <vs-th
                          sort @click="users = $vs.sortData($event ,users, 'id')"
                        >
                          ID
                        </vs-th>
                        <vs-th>
                          Avatar
                        </vs-th>
                        <vs-th
                          sort @click="users = $vs.sortData($event ,users, 'username')"
                        >
                          Username
                        </vs-th>
                        <vs-th
                          sort @click="users = $vs.sortData($event ,users, 'name')"
                        >
                          Name
                        </vs-th>
                        <vs-th
                          sort @click="users = $vs.sortData($event ,users, 'birthday')"
                        >
                          Date of birth
                        </vs-th>
                        <vs-th
                          sort @click="users = $vs.sortData($event ,users, 'email')"
                        >
                          Email
                        </vs-th>
                        <vs-th>
                          Action
                        </vs-th>
                      </vs-tr>
                    </template>
                    <template #tbody>
                      <vs-tr
                        :key="i"
                        v-for="(u, i) in $vs.getPage($vs.getSearch(users, search), page, max)"
                        :data="u"
                        :is-selected="!!selected.includes(u)"
                      >
                        <vs-td checkbox>
                          <vs-checkbox :val="u" v-model="selected"/>
                        </vs-td>
                        <vs-td>
                          {{ u.id }}
                        </vs-td>
                        <vs-td>
                          <vs-avatar circle>
                            <img :src="u.avatar" alt="">
                          </vs-avatar>
                        </vs-td>
                        <vs-td>
                          {{ u.username }}
                        </vs-td>
                        <vs-td>
                          {{ u.name }}
                        </vs-td>
                        <vs-td>
                          {{ u.birthday }}
                        </vs-td>
                        <vs-td>
                          {{ u.email }}
                        </vs-td>
                        <vs-td>
                          <div class="action-box" style="display: flex; flex-wrap: nowrap;">
                            <div class="delete">
                              <vs-button
                                danger
                                flat
                                style="border-radius: 5px; width: 70px"
                                @click="deleteUser(i)"
                              >
                                Delete
                              </vs-button>
                            </div>
                            <div class="edit">
                              <vs-button
                                primary
                                flat
                                style="border-radius: 5px; width: 70px"
                                @click="updateShow(u)"
                              >
                                Edit
                              </vs-button>
                            </div>
                          </div>
                        </vs-td>
                      </vs-tr>
                    </template>
                    <template #footer>
                      <vs-pagination v-model="page" :length="$vs.getLength(users, max)"/>
                    </template>
                  </vs-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
/*import Sortable from 'sortablejs';*/

export default {
  name: 'index',
  data() {
    return {
      updateMode: false,
      dialog: false,
      search: '',
      CardMode: false,
      page: 1,
      max: 8,
      allCheck: false,
      indexUpdate: -1,
      selected: [],
      user: {
        id: '',
        avatar: "",
        name: "",
        username: "",
        email: "",
        birthday: "",
        address: "",
        gender: "male"
      },
      userTemp: {
        id: '',
        avatar: "",
        name: "",
        username: "",
        email: "",
        birthday: "",
        address: "",
        gender: "male"
      },
      users: [
        {
          id: '123abc',
          name: 'Leanne Graham',
          username: 'bretatey',
          email: 'Sincere@april.biz',
          birthday: '1999-06-07',
          avatar: '/images/male.jpg',
          gender: 'male',
          address: "New York"
        },
        {
          id: '2c4b5a',
          name: 'Ervin Howell',
          username: 'antonette',
          email: 'Shanna@melissa.tv',
          birthday: '1998-05-01',
          avatar: '/images/female.jpg',
          gender: 'female',
          address: "Paris"
        },
        {
          id: '112baa',
          name: 'Clementine Bauch',
          username: 'samantha',
          email: 'Nathan@yesenia.net',
          birthday: '1995-09-03',
          avatar: '/images/male.jpg',
          gender: 'male',
          address: "Manchester City"
        },
        {
          id: '12a4ab',
          name: 'Patricia Lebsack',
          username: 'karianne',
          email: 'Julianne.OConner@kory.org',
          birthday: '1999-02-08',
          avatar: '/images/female.jpg',
          gender: 'female',
          address: "Manchester City"
        },
        {
          id: '3bcd12',
          name: 'Chelsey Dietrich',
          username: 'kamrenane',
          email: 'Lucio_Hettinger@annie.ca',
          birthday: '1999-09-23',
          avatar: '/images/male.jpg',
          gender: 'male',
          address: "New York"
        },
        {
          id: '33bba1',
          name: 'Mrs. Dennis Schulist',
          username: 'leopoldocorkery',
          email: 'Karley_Dach@jasper.info',
          birthday: '1999-12-02',
          avatar: '/images/male.jpg',
          gender: 'male',
          address: "New York"
        },
        {
          id: '4caa22',
          name: 'Kurtis Weissnat',
          username: 'elwynskilesana',
          email: 'Telly.Hoeger@billy.biz',
          birthday: '1994-06-04',
          avatar: '/images/female.jpg',
          gender: 'female',
          address: "Roma"
        },
        {
          id: '332baa',
          name: 'Nicholas Runolfsdottir V',
          username: 'taximetienow',
          email: 'Sherwood@rosamond.me',
          birthday: '1994-10-08',
          avatar: '/images/female.jpg',
          gender: 'female',
          address: "Ha Noi"
        },
        {
          id: 'aaa123',
          name: 'Glenna Reichert',
          username: 'tuelphine',
          email: 'Chaim_McDermott@dana.io',
          birthday: '1994-06-1',
          avatar: '/images/female.jpg',
          gender: 'female',
          address: "Tokyo"
        },
        {
          id: 10,
          name: 'Clementina DuBuque',
          username: 'moriahstanton',
          email: 'Rey.Padberg@karina.biz',
          birthday: '1999-06-04',
          avatar: '/images/female.jpg',
          gender: 'female',
          address: "Paris"
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    deleteUser(index) {
      this.users.splice(index, 1)
      this.openNotification(null, 'success', 'Deleted', `You deleted user <strong>${this.users[index].name}</strong>`)
    },
    deleteMany() {
      const list = this.users.filter(item => {
          return !this.selected.includes(item)
        }
      )
      this.openNotification(null, 'success', 'Deleted', `You deleted list user.`)
      return this.users = list
    },
    createShow() {
      this.updateMode = false
      this.cancel()
      this.dialog = true
    },
    create() {
      let error = false
      const regUsername = /[a-z0-9]{7}/
      const regEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!regUsername.test(this.user.username)) {
        error = true
        this.error('.message-username', 'Username must be 8 characters (a-z0-9).')
      }
      if (this.user.name.length > 20 || this.user.name.length <= 0) {
        error = true
        this.error('.message-name', 'Name must be from 1 to 20 character.')
      }
      if (this.user.address.length <= 0) {
        error = true
        this.error('.message-address', 'Address is required.')
      }
      if (this.user.address.length > 200) {
        error = true
        this.error('.message-address', 'Address must be less than 200 character.')
      }
      if (this.user.birthday.length <= 0) {
        error = true
        this.error('.message-birthday', 'Birthday is required.')
      }
      if (!regEmail.test(this.user.email)) {
        error = true
        this.error('.message-email', 'Email invalidate.')
      }
      if (!error) {
        this.user.id = this.id()
        this.user.gender === 'male' ? this.user.avatar = '/images/male.jpg' : this.user.avatar = '/images/female.jpg'
        if (this.updateMode) {
          this.updateInfo(this.user)
          this.openNotification(null, 'success', 'Updated', `You updated user <strong>${this.user.name}</strong>`)
        } else {
          this.users.unshift(this.user)
          this.openNotification(null, 'success', 'Created', `You created user <strong>${this.user.name}</strong>`)
        }
        this.dialog = false
      }
    },
    updateShow(user, index) {
      this.indexUpdate = index
      this.userTemp = {
        id: user.id,
        avatar: user.avatar,
        name: user.name,
        username: user.username,
        email: user.email,
        birthday: user.birthday,
        address: user.address,
        gender: user.gender
      }
      this.user = {
        id: user.id,
        avatar: user.avatar,
        name: user.name,
        username: user.username,
        email: user.email,
        birthday: user.birthday,
        address: user.address,
        gender: user.gender
      }
      this.updateMode = true
      this.dialog = true
    },
    selectedCard(u) {
      const index = this.selected.indexOf(u)
      if (index !== -1) {
        this.selected.splice(index, 1)
      } else {
        this.selected.push(u)
      }

    },
    updateInfo(user) {
      const index = this.users.findIndex(item => {
        return item.id === this.userTemp.id
      })
      if (index !== -1) {
        return this.users.splice(index, 1, user)
      }
    },
    error(className, text) {
      document.querySelector(className).style.display = 'block'
      document.querySelector(className).innerText = text

      setTimeout(() => {
        document.querySelector(className).style.display = 'none'
        document.querySelector(className).innerText = ''
      }, 1000)
    },
    cancelAndClose() {
      this.cancel();
      this.dialog = false
      this.updateMode = false
    },
    cancel() {
      return this.user = {
        id: '',
        name: this.updateMode ? this.userTemp.name : '',
        username: this.updateMode ? this.userTemp.username : '',
        email: this.updateMode ? this.userTemp.email : '',
        birthday: this.updateMode ? this.userTemp.birthday : '',
        address: this.updateMode ? this.userTemp.address : '',
        gender: this.updateMode ? this.userTemp.gender : 'male'
      }
    },
    openNotification(position = null, color, title, text) {
      return this.$vs.notification({
        flat: true,
        color,
        position,
        title: title,
        text: text
      })
    },
    id() {
      return 'xxxyyy'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  },
  watch: {
    CardMode: {
      immediate: true,
      handler(value) {
        if (value) {
          setTimeout(() => {
            if (process.client) {
              const dropItems = document.getElementById('drop-items')
              new Sortable(dropItems, {
                animation: 350,
                chosenClass: "sortable-chosen",
                dragClass: "sortable-drag",
                invertSwap: true,
              });
            }
          }, 50)
        } else {
          setTimeout(() => {
            if (process.client) {
              document.querySelector('tbody').id = 'drop-items-table'
              const dropItemsTable = document.getElementById('drop-items-table')
              new Sortable(dropItemsTable, {
                animation: 350,
                chosenClass: "sortable-chosen",
                dragClass: "sortable-drag",
                invertSwap: true,
              });
            }
          }, 50)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "./assets/css/responsive";

.container--item {

  &:not(:last-child) {
    margin-bottom: 20px;
  }
}

.header {
  display: grid;
  justify-content: space-between;
  grid-template-columns: 100%;
  grid-gap: 15px;

  @include responsive_768 {
    grid-template-columns: 1fr 300px;
  }

  @include responsive_1024 {
    grid-template-columns: 1fr 400px;
  }
}

.action {
  display: flex;
  align-items: center;

  .action--item {

    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}

.search--item {
  position: relative;
  border-radius: 100000px;

  input {
    border-radius: 100000px;
    padding: 0 45px 0 25px;
  }

  label {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .2s;
    cursor: pointer;

    &:hover {
      transition: all .2s;
      background: rgba(0, 0, 0, .05);
    }
  }
}


.data {
  padding: 20px 0;

  .data-card {
    position: relative;
    display: grid;
    grid-gap: 15px;
    margin-bottom: 40px;
    grid-template-columns: repeat(1, 1fr);

    @include responsive_768 {
      grid-template-columns: repeat(2, 1fr);
    }
    @include responsive_992 {
      grid-template-columns: repeat(3, 1fr);
    }

    @include responsive_1024 {
      grid-template-columns: repeat(4, 1fr);
    }

    .card {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border-radius: 5px;
      box-shadow: 0 5px 20px 0 rgba(0, 0, 0, .04);
      padding: 25px;

      &:hover {
        background: rgba(25, 200, 255, .02);
        transition: all .2s;
      }

      .card--item {
        margin-bottom: 5px;
        font-size: 14px;
      }

      .name {
        font-weight: 600;
        margin-top: 10px;
        font-size: 18px;
      }

      .username {
      }

      .action-box {
        margin-top: 10px;
      }

    }
  }
}

.con-form {
}

.form--item {
  margin-bottom: 10px;
  width: 350px;
}

.footer-dialog {
  display: flex;
  justify-content: center;
  align-content: center;

  .button {
    height: 35px;
    border-radius: 5px;
    background: var(--blue-primary);
    width: 100px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .2s;

    &:first-child {
      background: var(--red-primary);
    }

    &:hover {
      transition: all .2s;
      opacity: .8;
    }
  }
}

.error {
  color: var(--red-primary);
  font-size: 12px;
  margin-bottom: 10px;
  padding-left: 5px;
  max-width: 350px;
  display: none;
  transition: all .2s;
}

.drag-item {
  user-select: none;
}

.selected {
  background: rgba(25, 91, 255, .1) !important;
  transition: all .2s;
}
</style>
