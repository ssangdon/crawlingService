const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async () => {
  try {
    return await axios.get("http://www.gaonchart.co.kr/main/section/chart/online.gaon?nationGbn=T&serviceGbn=S1040&targetTime=12&hitYear=2019&termGbn=week");
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.chart").children("table").children("tbody").children("tr").children("td.subject");
    $bodyList.each(function(i, elem) {
      ulList[i] = {
        title: $(this).find('p').text(),
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(res => log(res));