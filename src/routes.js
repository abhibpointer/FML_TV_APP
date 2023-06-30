import React from 'react'

const lazyRetry = function (componentImport) {
  return new promise((resolve, reject) => {
    const hasRefreshed = JSON.parse(
      window.sessionStorage.getItem('retry-lazy-refreshed') || 'false'
    )
    componentImport()
      .then(component => {
        window.sessionStorage.setItem('retry-lazy-refreshed', 'false')
        resolve(component)
      })
      .catch(error => {
        if (!hasRefreshed) {
          window.sessionStorage.setItem('retry-lazy-refreshed', 'true')
          return window.location.reload()
        }
        reject(error)
      })
  })
};

const Home = React.lazy(()=>import('./components/Home/index.js'));

const routes =[
    {path:'/home',exact: true,name:'Home'}
    {path:'/bannerlist',name:'BannerList',element:Home}
]

export default routes