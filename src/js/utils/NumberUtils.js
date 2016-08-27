const NumberUtils = {
  MATH_COS: Math.cos,
  MATH_SIN: Math.sin,
  MATH_RANDOM: Math.random,
  MATH_ABS: Math.abs,
  MATH_ATAN2: Math.atan2,

  limit(number, min, max) {
    return Math.min(Math.max(min, number), max)
  },

  getRandomColor() {
    const letters = '0123456789ABCDEF'.split('')
    let color = '#'

    for (let i = 0, len = 6; i < len; i++) {
      color += letters[ Math.round(Math.random() * 15) ]
    }

    return color
  },

  getTimeStampDiff(date1, date2, isDate = true) {
    const time = {}

    // Convert both dates to milliseconds
    const date1Ms = isDate ? date1.getTime() : date1
    const date2Ms = isDate ? date2.getTime() : date2

    // Calculate the difference in milliseconds
    let differenceMs = date2Ms - date1Ms

    // take out milliseconds
    differenceMs /= 1000
    time.seconds = Math.floor(differenceMs % 60)

    differenceMs /= 60
    time.minutes = Math.floor(differenceMs % 60)

    differenceMs /= 60
    time.hours = Math.floor(differenceMs % 24)

    time.days = Math.floor(differenceMs / 24)

    return time
  },

  map(num, min1, max1, min2, max2, round = false , constrainMin = true , constrainMax = true) {
    if (constrainMin && num < min1) {
      return min2
    }

    if (constrainMax && num > max1) {
      return max2
    }

    const num1 = (num - min1) / (max1 - min1)
    const num2 = (num1 * (max2 - min2)) + min2

    if (round) {
      return Math.round(num2)
    }

    return num2
  },

  toRadians(degree) {
    return degree * (Math.PI / 180)
  },

  toDegree(radians) {
    return radians * (180 / Math.PI)
  },

  isInRange(num, min, max, canBeEqual) {
    let ret

    if (canBeEqual) {
      ret = (num >= min && num <= max)
    } else {
      ret = (num >= min && num <= max)
    }

    return ret
  },

  // convert metres in to m / KM
  getNiceDistance(metres) {
    let ret

    if (metres < 1000) {
      ret = `${Math.round(metres)}M`
    } else {
      const km = (metres / 1000).toFixed(2)
      ret = `${km}KM`
    }

    return ret
  },

  pad(num, size) {
    let s = num + ''

    while (s.length < size) {
      s = '0' + s
    }

    return s
  }

}

export default NumberUtils
