import axios from "axios";
import cheerio from "cheerio";

const isPromotional = (paragraph) => {
  const promoKeywords = [
    "Click here",
    "subscribe",
    "download",
    "sign up",
    "newsletter",
    "promotional messages",
    "subscribe",
  ];
  return promoKeywords.some((keyword) =>
    paragraph.toLowerCase().includes(keyword.toLowerCase())
  );
};

async function scraper(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    let body = "";
    $("p").each(function (i, elem) {
      if (!isPromotional($(this).text()) && $(this).text().length > 100) {
        body += $(this).text() + "\n\n";
      }
    });
    return body;
  } catch (error) {
    console.error("Failed to retrieve the page:", error);
    return "";
  }
}

export default scraper;
