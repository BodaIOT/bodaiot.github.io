const RSS_URL = `https://rss.stopgame.ru/rss_news.xml`;
const RSS_URL2 = `https://www.playground.ru/rss/news.xml`;
const smallTextSize = 19;
const normalTextSize = 22;
const bigTextSize = 25;

const smallDescSize = 17;
const bigDescSize = 20;

$.ajax({
	url: "https://api.rss2json.com/v1/api.json?rss_url=" + RSS_URL,
	dataType: "json",
	success: function (result) {
		RSS = document.getElementById("RSS");
		result = result.items;
		console.log(result);
		result.forEach(element => {
			desc = element.description.replace("[…]", "") + "<br>" + element.pubDate;
			console.log(element);
			cs = 0;
			if (element.title.length <= 75){
				cs = bigTextSize;
			}
			if (element.title.length > 75 && element.title.length <= 87){
				cs = normalTextSize;
			}
			if (element.title.length > 87){
				cs = smallTextSize;
				console.log("small");
			}

			cds = smallDescSize;
			if (element.description.length <= 225){
				cds = bigDescSize;
			}

			RSS.innerHTML += `
			<a target="_blank" href="` + element.link + `" style="none">
			<div class="wrap wrap--1">
				<div class="container container--1" style="background: linear-gradient(0deg, rgb(0 0 0 / 92%) 48%, rgb(0 0 0 / 48%) 100%), url(` + element.enclosure.link + `); background-size: cover;">
				<div class="desc" style="font-size:` + cds + `px;">` + desc + `</div>
				<div class="title" style="font-size:` + cs + `px;">` + element.title + `</div>
				</div>
			</div>
			</a>
			`
		});

		
	},
	error: function (error) {
		  console.log("НЕ УДАЛОСЬ ПРОЧЕСТЬ RSS!!!");
	}
});
$.ajax({
		  url: "https://api.rss2json.com/v1/api.json?rss_url=" + RSS_URL2,
		  dataType: "json",
		  success: function (result) {
			  RSS = document.getElementById("RSS2");
			  result = result.items;
			  console.log(result);
			  result.forEach(element => {
				desc = element.description.replace("[…]", "") + "<br>" + element.pubDate;
				cs = 0;
				if (element.title.length <= 75){
					cs = bigTextSize;
				}
				if (element.title.length > 75 && element.title.length <= 87){
					cs = normalTextSize;
				}
				if (element.title.length > 87){
					cs = smallTextSize;
					console.log("small");
				}
			
				cds = smallDescSize;
				if (element.description.length <= 225){
					cds = bigDescSize;
				}
	
				RSS.innerHTML += `
				<a target="_blank" href="` + element.link + `" style="none">
				<div class="wrap wrap--1">
					<div class="container container--1" style="background: linear-gradient(0deg, rgb(0 0 0 / 92%) 48%, rgb(0 0 0 / 48%) 100%), url(` + element.enclosure.link + `); background-size: cover;">
					<div class="desc" style="font-size:` + cds + `px;">` + desc + `</div>
					<div class="title" style="font-size:` + cs + `px;">` + element.title + `</div>
					</div>
				</div>
				</a>
				`
			  });

			  
		  },
		  error: function (error) {
				console.log("НЕ УДАЛОСЬ ПРОЧЕСТЬ RSS!!!");
		  }
	  });