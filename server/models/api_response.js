// ApiResponse.js
class ApiResponse {
  constructor(status, data, error) {
    this.status = status;
    this.data = data;
    this.error = error;
  }

  static success(data) {
    return new ApiResponse("success", data, null);
  }

  static failure(error) {
    return new ApiResponse("failure", null, error);
  }

  toJson() {
    return {
      status: this.status,
      data: this.data,
      error: this.error,
    };
  }
}

module.exports = ApiResponse;
