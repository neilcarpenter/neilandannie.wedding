export default `
  <div
    class="gallery-grid cf"
    data-naaw-tmpl="gallery-grid"
    data-grid-content='<%= JSON.stringify(gridContent) %>'>
    <div
      class="gallery-grid--inner"
      data-grid-inner></div>
    <%= modal %>
  </div>
`
