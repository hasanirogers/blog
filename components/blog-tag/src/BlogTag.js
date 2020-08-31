import { LitElement, html, css } from 'lit-element';

export class BlogTag extends LitElement {
  static get properties() {
    return {
      href: {
        type: String
      },
      current: {
        type: Boolean,
        reflect: true
      }
    }
  }

  static styles = [
    css`
      :host {
        display: inline-block;
      }

      a {
        cursor: pointer;
        color: var(--white);
        background: var(--primary-color);
        transition: background-color 300ms ease;
      }

      a,
      span {
        text-decoration: none;
        padding: 0.5rem 1rem;
        display: inline-block;
        border-radius: 0.75rem;
      }

      a:hover {
        background: var(--link-color);
      }

      :host([current]) span {
        cursor: default;
        color: var(--primary-color);
        background: transparent;
        border: 2px solid var(--primary-color);
      }
    `
  ];

  render() {
    if (this.current) {
      return html`
        <span>
          <slot></slot>
        </span>
      `
    }

    return html`
      <a @click=${() => this.goToPage()}>
        <slot></slot>
      </a>
    `;
  }

  goToPage() {
    window.location.href = this.href;
    window.location.reload();
  }
}
