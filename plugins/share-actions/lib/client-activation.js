module.exports = {
  js: function () {
    return /*js*/ `
        class ShareActions extends HTMLElement {
          constructor() {
            super();
          }

          // Finds all buttons and attaches a click event to our handler
          assignEvents() {
            const buttons = this.querySelectorAll('button');

            if (buttons.length) {
              buttons.forEach((button) =>
                button.addEventListener('click', (event) => this.handleClick(event)),
              );
            }
          }

          // Takes an event, works out the method based on the trigger's 'data-method' attribute then invokes the right event handler
          handleClick(event) {
            const method = event.currentTarget.dataset.method;

            switch (method) {
              case 'share':
                this.triggerShare(event.currentTarget);
                return;
              case 'clipboard':
                this.copyToClipboard(event.currentTarget);
                return;
            }
          }

          // Takes the event trigger context (<button>), triggers the share API, then passes that context and alert text to the renderAlert method
          triggerShare(context) {
            navigator
              .share({
                title: this.title,
                url: this.url,
                text: this.description,
              })
              .then(() => {
                this.renderAlert('Thanks!', context);
              })
              .catch((error) => console.error('Error sharing', error));
          }

          // Takes the event trigger context (<button>), triggers the clipboard API, then passes that
          // context and alert text to the renderAlert method
          copyToClipboard(context) {
            navigator.clipboard
              .writeText(this.url)
              .then(() => {
                this.renderAlert('Copied!', context);
              })
              .catch((error) => console.error(error));
          }

          // Takes message text, the event context and an optional millisecond value for clearing the alert. It then renders that as a sibling (to the button) alert element *or* a local alert element to this component. If neither are available, nothing happens here.
          renderAlert(text, context, clearTime = 3000) {
            const alert = context
              ? context.nextElementSibling
              : this.querySelector('[role="alert"]');

            if (alert) {
              alert.innerText = text;

              setTimeout(() => {
                alert.innerText = '';
              }, clearTime);
            }
          }

          connectedCallback() {
            // No support is available for either share or clipboard APIs so we bail out here and let the component's child HTML take over
            if (!this.hasShareSupport && !this.hasClipboardSupport) {
              console.log('No support so revert to MVE');
              return;
            }

            const clipboardHtml = this.hasClipboardSupport ? '<li>' +
                '<button class="button" data-method="clipboard">Copy URL</button>' + 
                '<div role="alert"></div>' +
              '</li>' : "";

            const hasShareSupport = this.hasShareSupport ? '<li>' +
                '<button class="button" data-method="share">Share</button>' +
                '<div role="alert"></div>' +
              '</li>' : '';

            // Support of at least one API is available so now we render those buttons conditionally
            this.innerHTML = '<ul class="share-actions cluster" role="list">' +
                hasShareSupport + 
                clipboardHtml +
              '</ul>';

              // Buttons are now rendered so we can assign the events
              this.assignEvents();
          }

          // Returns a url prop value or the current page url as a fallback
          get url() {
            return this.getAttribute('url') || window.location.href;
          }

          // Returns a title prop value or the page <title>
          get title() {
            return this.getAttribute('title') || document.title;
          }

          // Looks for a meta description and extracts the value if it is found. Returns an empty string if not
          get description() {
            const metaDescriptionElement = document.querySelector('meta[name="description"]');

            return metaDescriptionElement ? metaDescriptionElement.getAttribute('content') : '';
          }

          // Determine if this browser can use the share API
          get hasShareSupport() {
            return navigator.share;
          }

          // Determine if this browser can use the clipboard API
          get hasClipboardSupport() {
            return navigator.clipboard;
          }
        }

        customElements.define('share-actions', ShareActions);
    `;
  },
}
