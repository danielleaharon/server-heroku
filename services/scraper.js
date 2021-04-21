let axios = require('axios');
let cheerio = require('cheerio');
const postService = require('../services/post');

const scrape = async () => {
    const page = await axios.get('https://en.wikipedia.org/wiki/Friends_(season_6)')    
    const $ = cheerio.load(page.data);    
    $('tr.vevent').each(function () {
        $('td.summary', this).each(function(){
            const row = $(this);
            title = row.text();

            let content = row.nextAll().eq(2).text();
            

            postService.createPostScrape(title, "anonymous","other",content);
        });        
    });
};

module.exports = {
    scrape
};