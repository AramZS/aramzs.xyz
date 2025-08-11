module.exports = (url, shareText) => {

  return /*html*/ `
<style>
  .share-actions li {
    position: relative;
  }
  
  .share-actions [role='alert'] {
    inset: 0;
    align-content: center;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: var(--uppercase-kerning);
    font-weight: var(--font-bold);
    font-size: var(--size-step-00);
    background: var(--color-primary);
    color: var(--color-light);
  }
  
  .share-actions [role='alert']:empty {
    display: none;
  }
  
</style>  
<share-actions>
  <script>console.log('html-based sharebutton data', '${url}', '${shareText}')</script>
  <p>${shareText}</p>
  <p>
    <code>${url}</code>
  </p>
</share-actions>
`
}
