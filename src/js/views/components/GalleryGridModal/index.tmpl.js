export const modalItem = `
  <div class="gallery-grid--modal-item">
    <%= title %>
  </div>
`
export default `
  <div
    class="gallery-grid--modal"
    data-naaw-tmpl="gallery-grid-modal">
    <button data-close-btn>Close</button>
    <div data-modal-content></div>
  </div>
`
