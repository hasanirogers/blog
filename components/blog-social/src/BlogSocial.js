import { LitElement, html, css } from 'lit-element';
import { svgCodePen, svgGitHub, svgLinkedIn, svgNPM, svgStackBlitz, svgTwitter } from '../../../assets/js/svg.js';

export class BlogSocial extends LitElement {
  static get properties() {
    return {
      theme: {
        type: String,
        reflect: true
      }
    }
  }

  constructor() {
    super();

    this.theme = window.localStorage.getItem('hasanirogersblog-theme') || 'light';
    document.addEventListener('blog-theme-change', (event) => this.handleThemeChange(event));
  }

  static styles = [
    css`
      :host {
        display: flex;
        justify-content: space-around;
      }

      @media only screen and (min-width: 1024px) {
        :host {
          display: block;
        }
      }

      ul {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
        padding: 0;
        margin: 0;
        list-style: none;
      }

      a {
        color: var(--primary-color);
        display: flex;
        text-decoration: none;
      }

      svg {
        width: 32px;
        height: 32px;
        display: inline-block;
        margin-right: 0.25rem;
      }

      #twitter {
        width: 28px;
        height: 28px;
      }

      #github {
        width: 26px;
        height: 26px;
      }

      #linkedin {
        transform: scale(1.25);
        position: relative;
        right: -0.5rem;
        top: 0.25rem;
      }

      #stackblitz {
        width: 26px;
        height: 26px;
      }

      #twitter path,
      #stackblitz path {
        fill: var(--primary-color);
      }

      :host([theme="dark"]) a {
        color: var(--text-color);
      }

      :host([theme="dark"]) #twitter path,
      :host([theme="dark"]) #github path,
      :host([theme="dark"]) #codepen path,
      :host([theme="dark"]) #npm path,
      :host([theme="dark"]) #linkedin path,
      :host([theme="dark"]) #stackblitz path {
        fill: var(--text-color);
      }
    `
  ];

  render() {
    return html`
      <ul>
        <li>
          <a href="https://twitter.com/hasanirogers" target="_blank">${svgTwitter} Twitter</a>
        </li>
        <li>
          <a href="https://github.com/hasanirogers" target="_blank">${svgGitHub} GitHub</a>
        </li>
        <li>
          <a href="https://codepen.io/hasanirogers" target="_blank">${svgCodePen} CodePen</a>
        </li>
        <li>
          <a href="https://www.npmjs.com/~hasanirogers" target="_blank">${svgNPM} NPM</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/hasani-rogers-85523829/" target="_blank">${svgLinkedIn} LinkedIn</a>
        </li>
        <li>
          <a href="https://stackblitz.com/@hasanirogers" target="_blank">${svgStackBlitz} StackBlitz</a>
        </li>
      </ul>
    `;
  }

  handleThemeChange(event) {
    this.theme = event.detail;
  }
}
