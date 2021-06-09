export default {
  // пуск + ;        эмоджи
  makeParagraph(obj) {
    return `
      <p class='content__content-text'>
        ${obj.data.text}    
      </p>`
  },
  makePreviewImage(obj) {
    console.log(obj)
    return `<div class='news_preview-image-wrapper'>
               <img src='${obj.data.file.url}' alt='Image not found' />
            </div>
            `
  },
  makeImage(obj) {
    const caption = obj.data.caption
      ? `<div class='blog_caption'>
             <p>${obj.data.caption}</p>
         </div>`
      : ''
    return `
    <div class='blog_image'>
      <img src='${obj.data.file.url}' alt='${obj.data.caption}'/>
        ${caption}
    </div>`
  },
  makeEmbed(obj) {
    const caption = obj.data.caption
      ? `
      <b-row class="justify-content-md-center">
      <b-col col="8" md="6" lg="4"">  
      <div class="list_item_btm_text">
      <p class="content_link-signature"> ${obj.data.caption}</p>
  </div>  
      </b-col>
                  </b-row>
     `
      : ''
    return `<section class="section_link-preview">
    <b-row class="justify-content-md-center">
                  <b-col col="8" md="6" lg="4"">
                      <div class="list_item_btm">
                          <div class="list_item_btm_img">
                            <iframe width="730" height="415" src="${obj.data.embed}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                          </div>
                          ${caption}
                      </div>
                  </b-col>
                  </b-row>
            </section>`
  },
  makeHeader(obj) {
    return `<h${obj.data.level} class='blog_post_h${obj.data.level}'>${obj.data.text}</h${obj.data.level}>`
  },
  makeCode(obj) {
    return `<section class="nws3_sec4">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8">
               <div class="news_code">
                    <pre>
                        <code class="html">
                        ${obj.data.code}
                        </code>
                     </pre>
                </div>
            </div>
        </div>
    </section>	`
  },
  makeList(obj) {
    if (obj.data.style == 'unordered') {
      const list = obj.data.items.map(item => {
        return `<li>${item}</li>`
      })
      return `
        <ul class='blog_post_ul'>
          ${list.join('')}
        </ul>`
    } else {
      const list = obj.data.items.map(item => {
        return `<li>${item}</li>`
      })
      return `
        <ol class='blog_post_ul'>
          ${list.join('')}  
        </ol>`
    }
  },

  makeQuote(obj) {
    return `
    <b-row class="justify-content-md-center">
    <b-col md="10" class="content__card justify-content-md-center">
      <blockquote>
      <div class="content__card-header">
      </div>
      <p class="content__card-text">${obj.data.text}</p>

      <div class="content__card-footer">
      </div>
      <p class="blockquota-signature">${obj.data.caption}</p>

       </blockquote>
    </b-col>
  </b-row>
    `

    // return `
    //   <div class='spcl_line mar_b30'>
    //     <blockquote>
    //       <p class='spcl_line_p'>
    //         ${obj.data.text}
    //       </p>
    //     </blockquote>
    //     <p>- ${obj.data.caption}</p>
    //   </div>`
  },
  makeWarning(obj) {
    return `
    <section class="nws3_sec4">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <div class="table_warning">
            <h3><span><i class="fas fa-exclamation"></i></span>${obj.data.title}</h3>
            <p>${obj.data.message}</p>
          </div>
        </div>
      </div>
    </section>	`
  },
  makeChecklist(obj) {
    const list = obj.data.items.map(item => {
      return `
        <div class='_1checkbox'>
          <span class='_1checkbox_round'></span>
         ${item.text}
        </div>`
    })
    return `
    <section class='nws3_sec4'>
      <div class='row justify-content-center'>
        <div class='col-12 col-md-10 col-lg-8'>
          <div class='table_top_sec'>
              ${list.join('')}
          </div>
        </div>
      </div>
    </section>	`
  },
  makeDelimeter(obj) {
    return `
    <div class='ce-block'>
      <div class='ce-block__content'>
        <div class='ce-delimiter cdx-block'></div>
      </div>
    </div>\n`
  }
}
