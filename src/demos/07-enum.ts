enum HttpStatus {
  OK = "OK",
  NotFound = "NOT_FOUND",
}
function handle(status: HttpStatus) {
  if (status === HttpStatus.OK) console.log("Respons berhasil!");
}
handle(HttpStatus.OK);