<template>
  <div>
    <div class="editor_panel">
      <div class="category">
        <div class="category_arrow" @click="show_category = !show_category">
          <span v-html="data.categories.icon"> </span>
          <span> {{ data.categories.name }} </span>
          <img class="icon" width="15" src="../../static/img/img-layouts/arrow-down.svg" alt="" />
        </div>
        <div class="category_div">
          <ul class="ul_category" v-if="show_category">
            <li class="li_category" v-for="c in categories" :key="c.name" @click="bclick(c)">
              <span v-html="c.icon"> </span>
              <span> {{ c.name }} </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="date_panel">
        <div class="date">
          {{ today }}
        </div>
      </div>
    </div>

    <div class="wrapper-editor_title">
      <b-form-textarea
        id="textarea"
        v-model="data.title"
        placeholder="Write Title"
        rows="1"
        max-rows="50"
        :state="validTitle"
      ></b-form-textarea>
    </div>
    <client-only placeholder="Loading...">
      <div id="codex-editor" ref="editorJs"></div>
    </client-only>
    <div class="wrapper_publish-btn">
      <div class="button-group">
        <div class="bttn-publish" @click="send()">Publish</div>
      </div>
    </div>
  </div>
</template>

<script>
import createHTML from '@/utils/createHTML'
import formatDate from '@/utils/formatDate'
import moment from 'moment'

let EditorJS = null
let Header = null
let Paragraph = null
let LinkTool = null
let Quote = null
let CodeTool = null
let Embed = null
let InlineCode = null
let ImageTool = null
let List = null

if (process.client) {
  EditorJS = require('@editorjs/editorjs')
  Header = require('@editorjs/header')
  Paragraph = require('@editorjs/paragraph')
  LinkTool = require('@editorjs/link')
  Quote = require('@editorjs/quote')
  CodeTool = require('@editorjs/code')
  Embed = require('@editorjs/embed')
  InlineCode = require('@editorjs/inline-code')
  ImageTool = require('@editorjs/image')
  List = require('@editorjs/list')
}

export default {
  data() {
    return {
      today: '',
      validTitle: null,
      show_category: false,
      editor: null,
      categories: [
        {
          name: 'News',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M16 20V4H4v15a1 1 0 0 0 1 1h11zm3 2H5a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v7h4v9a3 3 0 0 1-3 3zm-1-10v7a1 1 0 0 0 2 0v-7h-2zM6 6h6v6H6V6zm2 2v2h2V8H8zm-2 5h8v2H6v-2zm0 3h8v2H6v-2z"/></svg>'
        },
        {
          name: 'Blog',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM7 6h4v4H7V6zm0 6h10v2H7v-2zm0 4h10v2H7v-2zm6-9h4v2h-4V7z"/></svg>'
        },
        {
          name: 'Technology',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13 4.055c4.5.497 8 4.312 8 8.945v9H3v-9c0-4.633 3.5-8.448 8-8.945V1h2v3.055zM19 20v-7a7 7 0 0 0-14 0v7h14zm-7-2a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>'
        },
        {
          name: 'Programming',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"/></svg>'
        },
        {
          name: 'Design',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7.05 14.121L4.93 16.243l2.828 2.828L19.071 7.757 16.243 4.93 14.12 7.05l1.415 1.414L14.12 9.88l-1.414-1.415-1.414 1.415 1.414 1.414-1.414 1.414-1.414-1.414-1.415 1.414 1.415 1.414-1.415 1.415L7.05 14.12zm9.9-11.313l4.242 4.242a1 1 0 0 1 0 1.414L8.464 21.192a1 1 0 0 1-1.414 0L2.808 16.95a1 1 0 0 1 0-1.414L15.536 2.808a1 1 0 0 1 1.414 0zM14.12 18.363l1.415-1.414 2.242 2.243h1.414v-1.414l-2.242-2.243 1.414-1.414L21 16.757V21h-4.242l-2.637-2.637zM5.636 9.878L2.807 7.05a1 1 0 0 1 0-1.415l2.829-2.828a1 1 0 0 1 1.414 0L9.88 5.635 8.464 7.05 6.343 4.928 4.929 6.343l2.121 2.12-1.414 1.415z"/></svg>'
        }
      ],
      data: {
        categories: {
          name: 'News',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M16 20V4H4v15a1 1 0 0 0 1 1h11zm3 2H5a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v7h4v9a3 3 0 0 1-3 3zm-1-10v7a1 1 0 0 0 2 0v-7h-2zM6 6h6v6H6V6zm2 2v2h2V8H8zm-2 5h8v2H6v-2zm0 3h8v2H6v-2z"/></svg>'
        },
        title: '',
        post: '',
        date: '',
        preview: '',
        previewImage: '',
        user_id: '',

        jsonData: null
      },
      articleHTML: ''
    }
  },
  methods: {
    bclick(c) {
      this.data.categories.name = c.name
      this.data.categories.icon = c.icon
      this.show_category = false
    },
    send() {
      if (this.data.title.length) {
        this.editor
          .save()
          .then(data => {
            for (let i = 0; i < data.blocks.length; i++) {
              const el = data.blocks[i]
              if (el.type === 'paragraph' || el.type === 'header') {
                let previewHtml = createHTML.makeParagraph(el)
                this.data.preview = previewHtml
                break
              }
            }
            for (let j = 0; j < data.blocks.length; j++) {
              const element = data.blocks[j]
              if (element.type === 'image') {
                let imageHtml = createHTML.makePreviewImage(element)
                this.data.previewImage = imageHtml
                break
              }
            }
            let user = this.$store.getters.GET_USER
            this.data.user_id = user.id
            this.data.jsonData = data
            this.data.date = formatDate.formatDate(data.time)
            this.data.original_date = data.time
            this.outputHTML(data)
          })
          .then(() => {
            this.data.post = this.articleHTML
            return this.$store.dispatch('SEND_CONTENT', this.data)
          })
          .then(res => {
            location.reload()
            // this.data.title = ''
            // this.editor.clear()
            // window.scrollTo(0, 0)
          })
      } else {
        this.validTitle = false
      }
    },

    outputHTML(data) {
      data.blocks.map(el => {
        switch (el.type) {
          case 'paragraph':
            this.articleHTML += createHTML.makeParagraph(el)
            break
          case 'image':
            this.articleHTML += createHTML.makeImage(el)
            break
          case 'header':
            this.articleHTML += createHTML.makeHeader(el)
            break
          case 'raw':
            this.articleHTML += `
                <div class="ce-block">
                  <div class="ce-block__content">
                    <div class="ce-code">
                      <code>${el.data.html}</code>
                    </div>
                  </div>
                </div>\n`
            break
          case 'code':
            this.articleHTML += createHTML.makeCode(el)
            break
          case 'list':
            this.articleHTML += createHTML.makeList(el)
            break
          case 'quote':
            this.articleHTML += createHTML.makeQuote(el)
            break
          case 'embed':
            this.articleHTML += createHTML.makeEmbed(el)
            break
          case 'delimiter':
            this.articleHTML += createHTML.makeDelimeter(el)
            break
          // case 'personality':
          //   this.articleHTML += null
          //   break
          default:
            return ''
        }
      })
    }
  },

  mounted() {
    this.today = moment().format('DD-MM-YYYY')
    this.editor = new EditorJS({
      holder: 'codex-editor',
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a Header',
            levels: [2, 3, 4],
            defaultLevel: 3
          }
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true
        },
        list: {
          class: List,
          inlineToolbar: true
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'http://localhost:3000/api/upload/upload-image' // Your backend file uploader endpoint
            }
          }
        },
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+M'
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              pinterest: true,
              facebook: true,
              aparat: true,
              instagram: true,
              twitter: true,
              'yandex-music-track': true,
              'yandex-music-album': true,
              'yandex-music-playlist': true,
              vimeo: true,
              'twitch-video': true,
              'twitch-channel': true,
              codepen: true
            }
          }
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+O',
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: "Quote's author"
          }
        },
        code: CodeTool,
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: 'http://localhost:3000/api/upload/content-link' // Your backend endpoint for url data fetching
          }
        }
      }
    })
  }
}
</script>

<style lang="scss">
.wrapper-editor_title {
  background-color: #fff;
  display: flex;
  justify-content: center;
}
#textarea {
  display: flex;
  font-weight: 500;
  font-size: 22px;
  border: 1px solid rgb(255, 255, 255);
  width: 75%;
  overflow: hidden !important;
  margin-bottom: 5px;
  resize: none;

  &:focus-visible {
    outline: -webkit-focus-ring-color auto 0px;
  }
}
.form-control:focus {
  overflow: hidden !important;

  color: #495057;
  background-color: #fff;
  border-color: #fff !important;
  outline: 0;
  box-shadow: 0 0 0 0.2rem #fff;
}
.codex-editor {
  background-color: #fff;
}
h1 {
  font-size: 50px;
}
.ce-inline-tool {
  color: #69849b;
}
.ce-inline-tool--active {
  color: rgb(9, 87, 255);
}
/* .cdx-input {
} */
.cdx-settings-button {
  color: #69849b;
}
.cdx-settings-button--active {
  color: rgb(9, 87, 255);
}
.wrapper_publish-btn {
  display: flex;
  justify-content: center;
  .button-group {
    width: 85%;
  }
}
.bttn-publish {
  background-color: #fff;
  color: #264653;
  display: inline-block;
  font-weight: 500;
  padding: 8px 20px;
  border-radius: 0.25rem;
  border: 1px solid #457b9d;
  cursor: pointer;
  box-shadow: 0px 1px 1px 0px #fff;
  margin: 0 0 20px 20px;
  &:hover {
    background-color: #fff;
    color: #03071e;
    box-shadow: 1px 1px 1px 0px #caced1;
  }
}
</style>