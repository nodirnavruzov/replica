<template>
  <div class="wrapper-drop-down">
    <header class="header">
      <nav class="header__nav">
        <ul class="header__navbar">
          <li class="header__item">
            <transition name="dropdown">
              <div class="dropdown__menu" v-bind:class="{ active: show }" v-if="show">
                <ul class="dropdown__menu-nav">
                  <li class="dropdown__menu-item">
                    <div @click="goTo('account')" class="dropdown__menu-link" title="Account">
                      <div class="dropdown__menu-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            d="M3 4.995C3 3.893 3.893 3 4.995 3h14.01C20.107 3 21 3.893 21 4.995v14.01A1.995 1.995 0 0 1 19.005 21H4.995A1.995 1.995 0 0 1 3 19.005V4.995zM5 5v14h14V5H5zm2.972 13.18a9.983 9.983 0 0 1-1.751-.978A6.994 6.994 0 0 1 12.102 14c2.4 0 4.517 1.207 5.778 3.047a9.995 9.995 0 0 1-1.724 1.025A4.993 4.993 0 0 0 12.102 16c-1.715 0-3.23.864-4.13 2.18zM12 13a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                          />
                        </svg>
                      </div>

                      <div class="dropdown__menu-text">Account</div>
                    </div>
                  </li>
                  <li class="dropdown__menu-item">
                    <div @click="goTo('open-articles')" class="dropdown__menu-link" title="Articles">
                      <div class="dropdown__menu-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM7 6h4v4H7V6zm0 6h10v2H7v-2zm0 4h10v2H7v-2zm6-9h4v2h-4V7z"
                          />
                        </svg>
                      </div>
                      <div class="dropdown__menu-text">My Articles</div>
                    </div>
                  </li>
                  <li class="dropdown__menu-item">
                    <div @click="goTo('open-bookmark')" class="dropdown__menu-link" title="Bookmark">
                      <div class="dropdown__menu-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1zm13 2H6v15.432l6-3.761 6 3.761V4z"
                          />
                        </svg>
                      </div>
                      <div class="dropdown__menu-text">Bookmark</div>
                    </div>
                  </li>
                  <li class="dropdown__menu-item" @click="logOut()">
                    <nuxt-link to="/login" class="dropdown__menu-link" title="Log Out">
                      <div class="dropdown__menu-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm2-7h7v2H6v3l-5-4 5-4v3z"
                            fill="#000"
                          />
                        </svg>
                      </div>
                      <div class="dropdown__menu-text">Log out</div>
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </transition>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['show'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['GET_LOGIN_STATE', 'GET_USER'])
  },
  mounted() {
    this.userStatus = this.GET_LOGIN_STATE
  },
  methods: {
    goTo(event_name) {
      if (event_name === 'account') {
        this.$router.push('/personal-page')
      }
      this.$store.dispatch('USER_ARTICLES_OR_BOOKMARK', event_name)
      this.$router.push('/personal-page')
    },
    logOut() {
      this.$store.dispatch('LOGIN_STATE', false)
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }
}
</script>

<style lang="scss">
:root {
  --font-primary: 'Open Sans', sans-serif;
  --color-gray: #dadce0;
}

// Global
*,
::after,
::before {
  box-sizing: border-box;
}
ul {
  list-style-type: none;
}
body {
  // font-size: 1rem;
  // -webkit-text-size-adjust: 100%;
  // font-family: var(--font-primary);
  // overflow: hidden;
}
hr {
  border: 0;
  height: 0;
  margin: 1.5rem 0;
  border-top: 1px solid var(--color-gray);
}

// Header Menu

.wrapper-drop-down {
}
.header {
  // padding: 2rem 5rem 2rem 5rem;
  &__nav {
    position: relative;
    left: 100px;
  }
  &__navbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  &__item {
    // padding: 1rem;
  }
  &--icon {
    width: 1.65rem;
    height: 1.65rem;
  }
  &--button {
    top: 0;
    right: 0;
    position: absolute;
    margin: 0;
    padding: 0;
    color: gray;
    cursor: pointer;
    border: 1px solid transparent;
    background-color: transparent;
    &:focus {
      outline: 0;
    }
  }
}

// Dropdown Menu

.dropdown__menu {
  top: 100%;
  right: 0;
  position: absolute;
  z-index: 10;
  height: 15rem !important;
  min-width: 200px;
  margin-top: 3rem;
  overflow-y: auto;
  padding: 1rem 1rem 1rem 0rem;
  border-radius: 12px;
  background-color: white;
  border: 1px solid #dadce0;
  border: 1px solid var(--color-gray);
  background-clip: padding-box;
  .dropdown__menu-svg {
    display: flex;
  }
  &-link {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.6);
    padding: 0.5rem 0 0.5rem 2rem;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    border-radius: 0 50px 50px 0;
    &:hover {
      color: #17bf63;
      background-color: rgba(79, 192, 141, 0.1);
    }
  }
  &-svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  &-text {
    font-weight: 300;
    margin-left: 1rem;
    margin-right: 1rem;
  }
}

// Animation Menu Icon

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.6s;
}
.slide-fade-enter,
.slide-fade-leave-active {
  opacity: 0;
}
.slide-fade-enter {
  transform: translateX(31px);
}
.slide-fade-leave-active {
  transform: translateX(-31px);
}

// Dropdown Menu Animation

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 1s;
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

// Wrapper

.main {
  margin: 6rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &__subtitle {
    color: #4f5959;
    font-weight: 100;
    margin-bottom: 2rem;
  }
  &__link {
    margin-right: 1.5rem;
    display: inline-block;
    &:last-child {
      margin-right: 0;
    }
  }
  &__svg {
    width: 2rem;
    height: 2rem;
    opacity: 0.6;
    color: #94a2b0;
    &:hover {
      color: #ffad1f;
    }
  }
}
</style>
