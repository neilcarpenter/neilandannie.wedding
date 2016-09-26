export default `
  <header
    class="header"
    role="banner"
    data-naaw-tmpl="header">
    <h1 class="header--logo">
      <a href="/">
        <%= logoSvg %>
      </a>
    </h1>
    <nav class="header--nav">
      <ul class="unstyled">
        <!-- <li><a class="header--nav-item" href="/">home</a></li> -->
        <li><a class="header--nav-item" data-nav-link href="/about">about</a></li>
        <li><a class="header--nav-item" data-nav-link href="/when-where">when & where</a></li>
        <li><a class="header--nav-item" data-nav-link href="/places-to-stay">places to stay</a></li>
        <li><a class="header--nav-item" data-nav-link href="/gallery">gallery</a></li>
        <li>
          <a class="header--nav-item" data-nav-link href="/rsvp">rsvp</a>
          <!-- <ul>
            <li><a href="/rsvp/ceremony">ceremony</a></li>
            <li><a href="/rsvp/evening">evening</a></li>
          </ul> -->
        </li>
      </ul>
    </nav>
    <span class="header--burger-btn" data-burger-btn>
      <span class="label label-open">Menu</span>
      <span class="label label-closed">Close</span>
    </span>
  </header>
`
