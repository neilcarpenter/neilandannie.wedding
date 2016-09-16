export default `
  <div
    class="gallery-grid--item hide <%= classNames.join(' ') %>"
    data-grid-item="<%= slug %>"
    <%= style ? 'style="' + style + '"' : '' %>>
    <div class="gallery-grid--item-inner">
      <img src="<%= imgSrc %>">
    </div>
  </div>
`
