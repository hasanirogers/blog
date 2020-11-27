import { LitElement, html, css } from 'lit-element';
import { svgHamburger, svgSearch } from '../../../assets/js/svg.js';
import '../../blog-site-links/blog-site-links.js';

export class BlogHeader extends LitElement {
  static get properties() {
    return {
      resize: {
        type: Boolean,
        reflect: true
      },
      resizeOffset: {
        type: Number,
      }
    }
  }

  constructor() {
    super();

    this.resize = false;
    this.resizeOffset = 0;
  }

  static styles = [
    css`
      :host {
        color: var(--text-color-header);
        position: fixed;
        top: 0;
        z-index: 1;
        width: 100%;
        height: var(--header-height);
        padding: 1rem;
        box-sizing: border-box;
        background: var(--header-background-color);
        transition: height 300ms ease;
      }

      :host([resize]) {
        height: var(--header-height-resize);
      }

      @media screen and (min-width: 640px) {
        :host([resize]) {
          height: 100px;
        }
      }

      a {
        cursor: pointer;
        color: var(--white);
        text-decoration: none;
      }

      h1 {
        margin: 0;
        font-size: 1.5rem;
      }

      @media screen and (min-width: 640px) {
        h1 {
          font-size: 1.75rem;
        }
      }

      header {
        display: grid;
        grid-template-columns: 1fr auto;
        max-width: 1440px;
        margin: auto;
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

      svg #Path,
      svg #Oval {
        fill: var(--white);
        stroke: var(--white);
      }

      svg #Oval {
        fill: transparent;
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
          <a class="search" @click=${() => this.openModal()}>${svgSearch}</a>
          <blog-theme-toggle></blog-theme-toggle>
          <a class="hamburger" @click=${this.toggleDrawer}>${svgHamburger}</a>
        </div>
      </header>
    `;
  }

  firstUpdated() {
    this.transformHeader();
  }


  toggleDrawer() {
    const drawer = document.querySelector('kemet-drawer');
    drawer.toggle();
  }

  transformHeader() {
    window.addEventListener('scroll', () => {
      const effectPoint = this.offsetHeight + 100;

      if (window.pageYOffset >= effectPoint) {
        this.resize = true;
      } else {
        this.resize = false;
      }
    });
  }

  openModal() {
    const modal = document.getElementById('searchmodal');
    modal.open();
  }
}
