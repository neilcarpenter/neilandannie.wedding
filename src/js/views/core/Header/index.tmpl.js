export default `
  <header
    class="header <%= isHome ? 'is-home' : '' %>"
    role="banner"
    data-naaw-tmpl="header">
    <h1 class="header--logo">
      <a href="/">
        <%= logoSvg %>
      </a>
    </h1>
    <nav class="header--nav">
      <ul class="unstyled">
        <li><a class="header--nav-item" href="/">home</a></li>
        <li><a class="header--nav-item" href="/about">about</a></li>
        <li><a class="header--nav-item" href="/when-where">when & where</a></li>
        <li><a class="header--nav-item" href="/places-to-stay">places to stay</a></li>
        <li><a class="header--nav-item" href="/gallery">gallery</a></li>
        <li>
          <a class="header--nav-item" href="/rsvp">rsvp</a>
          <!-- <ul>
            <li><a href="/rsvp/ceremony">ceremony</a></li>
            <li><a href="/rsvp/evening">evening</a></li>
          </ul> -->
        </li>
      </ul>
    </nav>
  </header>
`
