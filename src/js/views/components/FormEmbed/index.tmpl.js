export default `
  <div data-naaw-tmpl="form-embed">
    <% if (embed) { %>
      <%= embed %>
    <% } else { %>
      <iframe src="<%= src %>" width="760" height="1300" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
    <% } %>
  </div>
`
