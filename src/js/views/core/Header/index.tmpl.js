export default `
  <header
    class="header"
    role="banner"
    data-naaw-tmpl="header">
    <h1 class="header--logo">
      <a href="/">
        <%= logoSvg %>
      </a>
      <span class="header--logo-subtitle">
        Wedding time<br>
        5 August 2017<br>
        The Great Barn, Rolvenden
      </span>
    </h1>
    <nav class="header--nav">
      <ul class="unstyled">
        <li><a class="header--nav-item" data-nav-link href="/about">about</a></li>
        <li><a class="header--nav-item" data-nav-link href="/when-where">when & where</a></li>
        <li><a class="header--nav-item" data-nav-link href="/places-to-stay">places to stay</a></li>
        <li><a class="header--nav-item is-gallery" data-nav-link href="/gallery">gallery</a></li>
        <li><a class="header--nav-item" data-nav-link href="/gift-list">gift list</a></li>
      </ul>
    </nav>
    <span class="header--burger-btn" data-burger-btn>
      <span class="label label-open">Menu</span>
      <span class="label label-closed">Close</span>
    </span>
    <span class="header--loader" data-loader>
      Loading...
    </span>
  </header>
`
