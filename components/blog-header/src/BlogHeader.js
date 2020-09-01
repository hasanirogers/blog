import { LitElement, html, css } from 'lit-element';
import { svgHamburger, svgSearch } from '../../../assets/js/svg.js';
import '../../blog-site-links/blog-site-links.js';

export class BlogHeader extends LitElement {
  static styles = [
    css`
      :host {
        color: var(--text-color-header);
        position: fixed;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100px;
        padding: 1rem;
        box-sizing: border-box;
        background: var(--primary-color);
      }

      a {
        cursor: pointer;
        color: var(--white);
        text-decoration: none;
      }

      h1 {
        margin: 0;
      }

      header {
        display: grid;
        grid-template-columns: 1fr auto;
        height: 100%;
        align-items: center;
      }

      @media screen and (min-width: 640px) {
        header {
          grid-template-columns: auto 1fr auto;
        }
      }

      .extras {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      @media screen and (min-width: 640px) {
        .hamburger {
          display: none;
        }
      }

      .hamburger svg {
        fill: var(--secondary-color);
        width: 32px;
        height: 32px;
      }
    `
  ];

  render() {
    return html`
      <header>
        <div class="logo">
          <a href="/">
            <h1 class="name">Hasani's Blog</h1>
          </a>
        </div>
        <blog-site-links location="header"></blog-site-links>
        <div class="extras">
          <blog-theme-toggle></blog-theme-toggle>
          <a class="search">${svgSearch}</a>
          <a class="hamburger" @click=${this.toggleDrawer}>${svgHamburger}</a>
        </div>
      </header>
    `;
  }


  toggleDrawer() {
    const drawer = document.querySelector('kemet-drawer');

    drawer.toggle();
  }
}
