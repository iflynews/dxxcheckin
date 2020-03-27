//-----Config Start-----//
var url="http://dxx.****.com/v1/user/commit";//青年大学习打卡请求所对应url，不同省份不一样，请自行抓包，已经抓过包的同学可以分享出来（通过发issue的方式）方便别的同学
var stage_id="22";//青年大学习打卡期数，不同的星期不同的学习内容所对应的期数不同（同样可以通过提issue的方式分享给别的同学）
var org=[*,2***,2***,2**2];//青年大学习打卡所对应的组织，即你所在的班级，不同班不一样（可通过抓包获取）
var last_org=2**2;//青年大学习打卡所对应的组织的最后一项，即上面org数组中的最后一个
var org_name="****团支部";//你们班的团支部名称
//-----Config End-----//
let msg
const checkpass = async request => {
  
  const { name,number } = await request.json()
  console.log(name,number)
  const headers = { 'Content-Type': 'application/json' }
  //const { number } = await request.json()
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"stage_id":stage_id,"name":name,"tel":number,"org":org,"last_org":last_org,"org_name":org_name});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

const result = await fetch(url, requestOptions)
  .then(function(response) {
    console.log(response)
    console.log("ok")
    return response.json();
  })
  .then(function(myJson) {
    msg = myJson;
    
  })
  .catch(error => console.log('error', error));
console.log(msg)
  return new Response(JSON.stringify(msg), { headers })
}
async function handleRequest(request) {
  let response
  if (request.method === 'POST') {
    response = await checkpass(request)
  } else {
    response = new Response(“Error,Github@iflynews”, { headers: { 'Content-Type': 'text/html' } })
  }
  return response
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
