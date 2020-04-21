const increaseVisits = function (visitCookie, fromHome = false) {
  let visitCount = (visitCookie);
  if (visitCount === undefined) {
    visitCount = 1;
  } else if (fromHome) {
    visitCount = Number(visitCount) + 1;
  }

  return visitCount;
}

module.exports = increaseVisits;
