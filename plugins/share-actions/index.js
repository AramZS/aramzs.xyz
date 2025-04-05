module.exports = {
  js: function () {
    return /*js*/ `
        class ShareActions extends HTMLElement {
          constructor() {
            super();
          }
        }

        customElements.define('share-actions', ShareActions);
    `;
  }
}
