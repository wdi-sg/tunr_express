const visitCounter = function (req, res, next)  {
  let visitCount = req.cookies['visits'];
  if (visitCount === undefined) {
    visitCount = 1;
  } else if (req.path === '/') {
    visitCount = Number(visitCount) + 1;
  }

  res.cookie('visits', visitCount);
  req.visitCount = visitCount;
  next();
};

module.exports = visitCounter;
