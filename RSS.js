

links = [`https://rss.stopgame.ru/rss_news.xml`, `https://www.playground.ru/rss/news.xml`];

const smallTextSize = 19;
const normalTextSize = 22;
const bigTextSize = 25;

const smallDescSize = 17;
const bigDescSize = 20;

j = 1;

links.forEach(link => {
	$.ajax({
		url: "https://api.rss2json.com/v1/api.json?rss_url=" + link,
		dataType: "json",
		success: function (result) {
			RSS = document.getElementById("RSS" + j);
			j++;
			result = result.items;
			console.log(result);
			result.forEach(element => {date = element.pubDate;
				hours = date[11] + date[12];
				hours = parseInt(hours) + 3;
				hours = hours + "";
				date = date.replaceAt(11, hours[0]);
				date = date.replaceAt(12, hours[1]);

				date = date.replaceAt(4, ".");
				date = date.replaceAt(7, ".");
				date = date.slice(0, 16);
				date = date.slice(0, 10) + " — " + date.slice(10, 16);

	
				desc = element.description.replace("[…]", "") + "<br>" + date;
				cs = 0;
				if (element.title.length <= 75){
					cs = bigTextSize;
				}
				if (element.title.length > 75 && element.title.length <= 87){
					cs = normalTextSize;
				}
				if (element.title.length > 87){
					cs = smallTextSize;
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
	
});

String.prototype.replaceAt = function(index, replacement) {
	return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}