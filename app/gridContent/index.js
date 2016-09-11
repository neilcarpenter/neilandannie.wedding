import neilAndAnnieData from './neilAndAnnie'
import neilAndAnnieExtensionData from './neilAndAnnieExtension'
import weddingData from './wedding'
import locationData from './location'

// home - neilandannie + neilandannie extension + wedding
// about - neilandannie + wedding
// when & where - wedding
// places to stay - location
// gallery - neilandannie + neilandannie extension + wedding
// rsvp - neilandannie + wedding

const neilAndAnnie = {
  label: 'neil_and_annie',
  data: neilAndAnnieData
}

const neilAndAnnieExtension = {
  label: 'neil_and_annie_extension',
  data: neilAndAnnieExtensionData
}

const wedding = {
  label: 'wedding',
  data: weddingData
}

const location = {
  label: 'location',
  data: locationData
}

const all = [
  neilAndAnnie,
  neilAndAnnieExtension,
  wedding,
  location
]

export {
  all,
  neilAndAnnie,
  neilAndAnnieExtension,
  wedding,
  location
}
