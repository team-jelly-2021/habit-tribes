function isAuthenticated(req, res, next) {
  if (!req.currentUser) {
    next({ message: 'User must be authenticated to access this route.', status: 403 })
  }
  next()
}

module.exports = isAuthenticated