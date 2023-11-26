class AdminController {
  index(req, res) {
    res.send("Admin PAGES");
  }
  test(req, res) {
    res.send("Admin TEST");
  }
}
module.exports = new AdminController();
