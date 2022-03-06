import { LitElement, html, css } from 'lit';

export class BlogPaginator extends LitElement {
  static get properties() {
    return {
      totalPages: {
        type: Number
      },
      currentPage: {
        type: Number
      },
      currentPagePath: {
        type: String
      },
      previousPage: {
        type: Number
      },
      previousPagePath: {
        type: String
      },
      nextPage: {
        type: Number
      },
      nextPagePath: {
        type: String
      },
      firstPage: {
        type: Number
      },
      firstPagePath: {
        type: String
      },
      lastPage: {
        type: Number
      },
      lastPagePath: {
        type: String
      }
    }
  }

  constructor() {
    super();

    this.baseUrl = window.location.href.replace('/', '');
  }

  static styles = [
    css`
      :host {
        display: block;
        text-align: center;
        position: relative;
        top: -0.25rem;
      }

      a {
        cursor: pointer;
        color: var(--link-color);
      }

      ul {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0;
        margin: 0;
        list-style: none;
      }

      li {
        line-height: 1;
      }

      @media screen and (min-width: 640px) {
        ul {
          gap: 1rem;
        }
      }

      span {
        font-size: 1.5rem;
      }

      .num-of-pages {
        margin: 0 0.5rem;
        position: relative;
        top: 2px;
      }

      .num-of-pages span {
        font-size: 1rem;
        display: none;
      }

      @media screen and (min-width: 640px) {
        .num-of-pages {
          margin: 0 1rem;
        }

        .num-of-pages span {
          display: inline;
        }
      }
    `
  ];

  render() {
    return html`
      <ul>
        ${this.getFirstPage()}
        ${this.getPreviousPage()}
        <li class="num-of-pages">
          <span>Page:</span> ${this.currentPage} of ${this.totalPages}
        </li>
        ${this.getNextPage()}
        ${this.getLastPage()}
      </ul>
    `;
  }

  getFirstPage() {
    if (this.firstPage !== this.currentPage && this.totalPages > 2) {
      return html`
        <li class="fisrt-page">
          <span>&laquo;</span>
          <a href="${this.firstPagePath}">First</a>
        </li>
      `;
    }

    return null;
  }

  getPreviousPage() {
    if (this.previousPage) {
      return html`
        <li class="previous-page">
          <span>&lsaquo;</span>
          <a href="${this.previousPagePath}">Previous</a>
        </li>
      `;
    }

    return null;
  }

  getNextPage() {
    if (this.nextPage) {
      return html`
        <li class="next-page">
          <a href="${this.nextPagePath}">Next</a>
          <span>&rsaquo;</span>
        </li>
      `;
    }

    return null;
  }

  getLastPage() {
    if (this.currentPage !== this.lastPage && this.totalPages > 2) {
      return html`
        <li class="last-page">
          <a href="${this.lastPagePath}">Last</a>
          <span>&raquo;</span>
        </li>
      `;
    }

    return null;
  }
}
