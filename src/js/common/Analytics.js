const MAX_ATTEMPTS = 5

const Analytics = {
  page(route) {
    const args = [ route ]
    const gaArgs = [ 'send', 'pageview' ]

    Analytics._send(gaArgs.concat(args))
  },

  action(type, action, value) {
    const args = [ type, action, value ]
    const gaArgs = [ 'send', 'event' ]

    Analytics._send(gaArgs.concat(args))
  },

  _send(args = [] , attemptNumber = 1) {
    // console.log(`Analytics::_send ${args.join(" -> ")}, attemptNumber=${attemptNumber}`)

    if (window.ga && window.ga.loaded) {
      window.ga.apply(null, args)

    // console.info(
    //   `::Analytics:: SUCCESS\n\n${args.join(" -> ")}\n\n :)`
    // )
    } else {
      if (attemptNumber <= MAX_ATTEMPTS) {
        setTimeout(Analytics._send.bind(null, args, attemptNumber + 1), 1000)
      } else {
        // console.error(
        //   `::Analytics:: =FAIL\n\n${args.join(" -> ")}\n\n :(`
        // )
      }
    }
  }

}

export default Analytics
