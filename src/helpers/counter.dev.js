export default function () {
  let referrer = document.referrer
  if (sessionStorage.getItem('referrer')) {
    referrer = sessionStorage.getItem('referrer')
    sessionStorage.removeItem('referrer')
  }
  if (!sessionStorage.getItem('_swa') && referrer.indexOf(location.protocol + '//' + location.host) !== 0) {
    fetch(
      'https://counter.dev/track?' +
        new URLSearchParams({
          referrer: referrer,
          screen: screen.width + 'x' + screen.height,
          user: 'ignis',
          utcoffset: '2',
        }),
    )
  }
  sessionStorage.setItem('_swa', '1')
}
