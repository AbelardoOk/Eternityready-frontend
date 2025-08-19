
const parser = new DOMParser();

async function getSitemapUrls() {
  try {
    const res = await fetch("/sitemap.xml");
    const xml = await res.text();
    const doc = parser.parseFromString(xml, "application/xml");
    return Array.from(doc.querySelectorAll("url > loc")).map(loc => new URL(loc.textContent).pathname);
  } catch (e) {
    console.warn("No sitemap found. Using manual list.");
    return ["/", "/about.html", "/contact.html"];
  }
}

async function crawlPage(url) {
  const fullUrl = location.origin + url;
  const res = await fetch(fullUrl);
  const text = await res.text();
  const doc = parser.parseFromString(text, "text/html");

  const title = doc.querySelector("title")?.innerText || "No title";
  const content = doc.body.innerText || "";
  const snippet = content.slice(0, 200) + "...";
  const thumbnail = doc.querySelector("meta[property='og:image']")?.content ||
                    doc.querySelector("img")?.src || "";

  return {
    url,
    title,
    snippet,
    content,
    thumbnail
  };
}

async function crawlAll() {
  const pages = await getSitemapUrls();
  const index = [];

  for (const url of pages) {
    try {
      const data = await crawlPage(url);
      index.push(data);
    } catch (e) {
      console.warn("Failed to crawl", url, e);
    }
  }

  const json = JSON.stringify(index);
  const blob = new Blob([json], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "index.json";
  a.click();
}

crawlAll();
