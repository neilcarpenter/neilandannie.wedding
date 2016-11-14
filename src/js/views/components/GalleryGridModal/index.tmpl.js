export const modalItem = `
  <div class="gallery-grid--modal-item">
    <div class="gallery-grid--modal-text">
      <h2><%= item.title %></h2>
      <% if (item.location) { %>
        <h3>
          <%= item.location %>
          <% if (item.timestamp) { %>
            <span> - <%= item.timestamp %></span>
          <% } %>
        </h3>
      <% } %>
      <% if (item.comment_neil) { %>
        <p>
          <span class="quote-mark">“</span><%= item.comment_neil %>
          <span class="name-label">Neil</span>
        </p>
      <% } %>
      <% if (item.comment_annie) { %>
        <p>
          <span class="quote-mark">“</span><%= item.comment_annie %>
          <span class="name-label">Annie</span>
        </p>
      <% } %>
      <span class="toggle-text-btn" data-toggle-text-btn></span>
    </div>
    <div class="gallery-grid--modal-media">
      <img class="<%= imageContain ? 'img--object-contain' : 'img--object-fit' %>" src="<%= item.source %>" alt="<%= item.title %>">
    </div>
  </div>
`
export default `
  <div
    class="gallery-grid--modal"
    data-naaw-tmpl="gallery-grid-modal">
    <button class="close-btn" data-close-btn>Close</button>
    <button class="random-btn" data-random-btn>Show another thing</button>
    <div class="gallery-grid--modal-content" data-modal-content></div>
  </div>
`
