export default {
  getInstance(config = {}) {
    if (!this._instance) this._instance = new this(config)
    return this._instance
  }
}
