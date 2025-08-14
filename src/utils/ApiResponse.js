/*
to streamline response
not part of core node js : express
so we make own class without extends like in case of ApiError
*/

class ApiResponse {
    //* constructor => these data must be present to send response thorugh this class
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}