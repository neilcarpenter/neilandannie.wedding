const ViewFinder = {

  findChildren (viewInstance, childClasses) {
    if (!viewInstance._views) return false

    let allChildViews = []
    for (let viewKey in viewInstance._views) {
      allChildViews = allChildViews.concat(
        Array.isArray(viewInstance._views[viewKey]) ? viewInstance._views[viewKey] : [viewInstance._views[viewKey]]
      )
    }

    childClasses = Array.isArray(childClasses) ? childClasses : [ childClasses ]

    return allChildViews.filter((view) => {
      return childClasses.reduce((previous, ChildClass) => {
        return previous || view instanceof ChildClass
      }, false)
    })

  }

}

export default ViewFinder
