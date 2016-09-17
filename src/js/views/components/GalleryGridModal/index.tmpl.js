export const modalItem = `
  <div class="gallery-grid--modal-item">
    <div class="gallery-grid--modal-text">
      <h2><%= item.title %></h2>
      <% if (item.location) { %>
        <h3><%= item.location %></h3>
      <% } %>
    </div>
    <div class="gallery-grid--modal-media">
      <img class="img--object-fit" src="<%= item.source %>" alt="<%= item.title %>">
    </div>
  </div>
`
export default `
  <div
    class="gallery-grid--modal"
    data-naaw-tmpl="gallery-grid-modal">
    <button class="close-btn" data-close-btn>Close</button>
    <button class="random-btn" data-random-btn>Show another thing</button>
    <div data-modal-content></div>
  </div>
`
