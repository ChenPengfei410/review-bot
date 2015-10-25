export default class BadgeBase {

  /**
   * @constructor
   *
   * @param {String} url
   */
  constructor(url) {
    this.url = url;
  }

  /**
   * Replace some characters which is used for splitting parts of url in badgs middleware.
   *
   * @param {String} text
   *
   * @return {String}
   */
  _escape(text) {
    return text
      .replace(/-/g, '--')
      .replace(/_/g, '__')
      .replace(/\s/g, '_');
  }

  /**
   * Creates badge. [subject|status].
   *
   * @param {String} subject
   * @param {String} status
   * @param {String} [color] - color of badge. Default: lightgrey
   * @param {String} [url] - url from badge
   *
   * @return {String} img or a tag with propper url and img src.
   */
  create(subject, status, color = 'lightgrey', url) {
    if (!subject) throw new Error('Badge should have subject!');
    if (!status) throw new Error('Badge should have status!');

    status = this._escape(status);
    subject = this._escape(subject);

    const img = `<img src="${this.url}${subject}-${status}-${color}.svg" />`;

    if (url) {
      return `<a href="${url}">${img}</a>`;
    }

    return img;
  }

}
