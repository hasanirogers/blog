import { LitElement, html, css } from 'lit-element';

export class BlogPostExcerpt extends LitElement {
  static get properties() {
    return {
      date: {
        type: String
      },
      url: {
        type: String
      },
      title: {
        type: String
      },
      author: {
        type: String
      }
    }
  };

  static styles = [
    css`
      :host {
        display: block;
        margin: 1rem 0;
        padding: 0;
        border-bottom: 1px solid var(--text-color);
      }

      :host([location="post"]) {
        margin: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      a {
        cursor: pointer;
        color: var(--link-color);
        text-decoration: none;
        display: inline-block;
        margin-top: 2rem;
      }

      :host([location="post"]) .read-more {
        display: none;
      }

      h2 {
        color: var(--hading-color);
        font-size: 1.75rem;
        font-weight: normal;
        line-height: 1.2;
        margin: 0.5rem 0 0 0;
      }

      @media screen and (min-width: 640px) {
        h2 {
          margin: 1rem 0;
          font-size: 2.5rem;
        }
      }

      @media screen and (min-width: 768px) {
        h2 {
          grid-column: span 2;
        }

        :host([location="post"]) h2 {
          grid-row: 1;
        }
      }

      img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
      }

      time {
        font-size: 1.5rem;
        display: block;
        margin: 1rem 0;
      }

      @media screen and (min-width: 768px) {
        time {
          grid-column: 2/3;
          text-align: right;
          align-self: center;
        }

        header {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
      }

      .author {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      @media screen and (min-width: 768px) {
        .author {
          grid-column: 1/2;
          grid-row: 1;
        }

        :host([location="post"]) time,
        :host([location="post"]) .author {
          grid-row: 2;
        }
      }

      .author span {
        font-size: 2rem;
      }

      .read-more {
        margin-bottom: 2rem;
      }

      .back-home {
        display: inline-block;
        position: relative;
        margin-top: 0;
      }

      .back-home span {
        font-size: 2rem;
      }

      :host([location="home"]) .back-home {
        display: none;
      }

      :host([location="post"]) .excerpt {
        display: none;
      }

      ::slotted(p) {
        line-height: 1.5;
      }

      ::slotted(ul) {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 2rem;
        padding: 0;
        list-style: none;
      }
    `
  ];

  render() {
    const imagePath = `/assets/img/authors/${this.author.replace(' ', '-').toLowerCase()}.jpeg`;

    return html`
      <article>
        <header>
          <time>${this.date}</time>
          <div class="author">
            <img src=${imagePath} />
            <span>${this.author}</span>
          </div>
          <h2>${this.title}</h2>
        </header>
        <div class="excerpt">
          <slot></slot>
        </div>
        <a class="read-more" href="${this.url}">Read More</a>
        <a class="back-home" @click=${() => this.goBack()}>
          <span>←</span>
          Go Back
        </a>
      </article>
    `;
  }

  goBack() {
    window.history.back();
  }
}
