const DNS  = require('dns')

const searchUrl = 'google.com'

async function dnsIP(){
    const ip = await DNS.promises.resolve4(searchUrl)
    console.log(ip)
}

dnsIP()

async function ipDns() {
    const dns = await DNS.promises.resolveNs(searchUrl)
    console.log(dns)
}

ipDns()

// dns.resolve4(searchUrl, (err, res) => {
//     if(err){
//         console.error('deu erro', err)
//         return
//     }
//     console.log(res)
// })
