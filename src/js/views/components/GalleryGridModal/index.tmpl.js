export const modalItem = `
  <div class="gallery-grid--modal-item">
    <%= title %>
    <img src="<%= source %>" alt="">
  </div>
`
export default `
  <div
    class="gallery-grid--modal"
    data-naaw-tmpl="gallery-grid-modal">
    <button data-close-btn>Close</button>
    <button data-random-btn>Show another thing</button>
    <div data-modal-content></div>
  </div>
`
