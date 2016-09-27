export default `
  <div
    class="gallery-grid--item hide <%= classNames.join(' ') %>"
    data-grid-item="<%= slug %>"
    style="width: <%= width %>px; height: <%= width %>px; left: <%= left %>px; top: <%= top %>px;' : '' %>">
    <div class="gallery-grid--item-inner">
      <img src="<%= imgSrc %>">
    </div>
  </div>
`
