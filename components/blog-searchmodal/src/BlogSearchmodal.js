import { LitElement, html, css } from 'lit-element';
import algoliasearch from 'algoliasearch';
import { svgSearch } from '../../../assets/js/svg.js';

export class BlogSearchmodal extends LitElement {
  static get properties() {
    return {
      href: {
        type: String
      },
      current: {
        type: Boolean,
        reflect: true
      },
      hits: {
        type: Array,
      },
      hasSearched: {
        type: Boolean
      },
      currentPage: {
        type: Number
      },
      totalPages: {
        type: Number
      }
    }
  }

  constructor() {
    super();

    this.hits = [];
    this.hasSearched = false;
    this.currentPage = 0;
  }

  static styles = [
    css`
      :host {
        width: 80vw;
        height: 80vh;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        box-sizing: border-box;
        background-color: var(--background-color);
      }

      @media screen and (min-width: 640px) {
        :host {
          max-width: 640px;
          padding: 2rem;
        }
      }

      a {
        cursor: pointer;
        color: var(--text-color);
        text-decoration: none;
      }

      input {
        color: var(--text-color);
        font-size: 1.1rem;
        width: 100%;
        padding: 1rem;
        box-sizing: border-box;
        background: var(--white);
        border: 2px solid  var(--thick-border-color);
      }

      form {
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--thick-border-color);
      }

      @media screen and (min-width: 640px) {
        form {
          padding-bottom: 2rem;
          margin-bottom: 2rem;
        }
      }

      form div {
        position: relative;
      }

      form span {
        position: absolute;
        display: inline-block;
        right: 1rem;
        bottom: 0.75rem;
      }

      form svg,
      form svg #Path,
      form svg #Oval {
        fill: var(--text-color);
        stroke: var(--text-color);
      }

      form svg #Oval {
        fill: transparent;
      }

      label {
        color: var(--text-color);
        display: block;
        margin-bottom: 3px;
      }

      article {
        margin-bottom: 1rem;
      }

      @media screen and (min-width: 640px) {
        article {
          margin-bottom: 2rem;
        }
      }

      article a {
        color: var(--text-color);
      }

      article h2 {
        margin: 0;
        color: var(--heading-color);
      }

      ul {
        display: flex;
        gap: 0.5rem;
        margin: 1rem 0 0 0;
        padding: 0;
        list-style: none;
      }

      ul a {
        color: var(--link-color);
      }

      section {
        height: 100%;
        overflow: auto;
      }

      .more-posts {
        cursor: pointer;
        color: var(--white);

        text-decoration: none;
        padding: 0.5rem 1rem;
        display: inline-block;
        border-radius: 0.75rem;

        background: var(--blog-tag-background-color);
        transition: background-color 300ms ease;
      }

      .more-posts:hover {
        background: var(--link-color);
      }
    `
  ];

  render() {
    return html`
      <form @submit=${(event) => this.handleSearch(event)}>
        <label for="searchposts">Search:</label>
        <div>
          <input
            type="search"
            id="searchposts"
            name="searchposts"
            placeholder="Search for posts here"
            @keydown=${(event) => this.handleSearch(event)}
            @blur=${(event) => this.handleSearch(event)}/>
          <span>${svgSearch}</span>
        </div>
      </form>
      <section>
        ${this.makePosts()}
        ${this.morePostsBtn()}
      </section>
    `;
  }

  handleSearch(event, isLoadMore = false) {
    if (event.type === 'submit') event.preventDefault();

    const searchTerm = this.shadowRoot.getElementById('searchposts').value;
    const client = algoliasearch('R2CFUR5SSI', '185d2e4b953e5f6887a9226e35a48937');
    const index = client.initIndex('prod_HASANIROGERSBLOG');
    const attributes = [
      'headings',
      'content',
      'author',
      'title',
      'tags',
      'type',
      'date',
      'url'
    ];

    index.search(searchTerm, {
      attributesToRetrieve: attributes,
      hitsPerPage: 10,
      page: this.currentPage
    }).then((data) => {
      console.log(data);
      this.totalPages = data.nbPages;

      if (searchTerm.length > 1) {
        this.hasSearched = true;

        if (isLoadMore) {
          this.hits = this.hits.concat(data.hits);
        } else {
          this.hits = data.hits;
        }
      } else {
        this.hasSearched = false;
        this.hits = [];
      }
    });
  }

  formatDate(timestamp) {
    const postdate = new Date(timestamp*1000);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    const month = months[postdate.getMonth()];
    const day = postdate.getUTCDay();
    const year = postdate.getUTCFullYear();

    return `${month} ${day}, ${year}`;
  }

  makePosts() {
    if (this.hits.length > 0) {
      return this.hits.map((hit) =>{
        if (hit.type === 'post') {
          return html`
            <article>
              <a href=${hit.url}>
                <h2>${hit.title}</h2>
                by ${hit.author} on ${this.formatDate(hit.date)}.
              </a>
              <ul>
                <li>tags:</li>
                ${this.makeTagLinks(hit.tags)}
              </ul>
            </article>
          `
        }
      });
    }

    if (this.hasSearched) {
      return html`<p>What was that? Try searching again.</p>`;
    }
  }

  makeTagLinks(tags) {
    if (tags.length > 0) {
      return tags.map((tag) => {
        return html`
          <li><a @click=${(event) => this.tagLink(event, tag)}>${tag}</a></li>
        `;
      })
    }

    return html`<li>no tags</li>`;
  }

  tagLink(event, tag) {
    event.preventDefault();

    history.pushState(null, null, `/tag/#${tag}`);
    if (location.pathname === '/tag/') location.reload();
  }

  loadMorePosts(event) {
    if (this.currentPage <= this.totalPages) {
      this.currentPage = this.currentPage += 1;

      this.handleSearch(event, true);
    }
  }

  morePostsBtn() {
    if (this.hasSearched && this.currentPage < this.totalPages - 1) {
      return html`
        <a class="more-posts" @click=${(event) => this.loadMorePosts(event)}>More Posts</a>
      `;
    }

    return null;
  }
}
