import { LitElement, html, css } from 'lit-element';

export class BlogSiteLinks extends LitElement {
  static styles = [
    css`
      a {
        color: var(--white);
        font-weight: bold;
        text-decoration: none;
        cursor: pointer;
      }

      :host([location="header"]) {
        display: none;
      }

      @media screen and (min-width: 640px) {
        :host([location="header"]) {
          display: inline-block;
        }
      }

      :host([location="header"]) ul {
        display: flex;
        gap: 1rem;
        margin: 0 2rem;
        padding: 0;
        list-style: none;
      }

      :host([location="sidenav"]) ul {
        display: block;
        margin: calc(var(--header-height) + 2rem) 0;
        padding: 0;
        list-style: none;
      }

      :host([location="sidenav"]) li {
        font-size: 1.25rem;
        padding: 1rem;
        margin: 1rem 0;
        border-left: 2px solid var(--text-color);
        transition: background-color ease 300ms;
      }

      :host([location="sidenav"]) li:hover {
        background: rgba(255,255,255,0.1);
      }
    `
  ];

  render() {
    return html`
      <ul>
        <li>
          <a href="http://hasanirogers.me" target="_blank">Portfolio</a>
        </li>
        <li>
          <a href="http://contact.hasanirogers.me" target="_blank">Contact</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    `;
  }
}
