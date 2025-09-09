// filepath: d:\server\model\response.js
class ApiResponse {
  constructor({ success = true, message = "", data = null }) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

module.exports = ApiResponse;
