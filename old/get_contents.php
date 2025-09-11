<? 
function getPageContent($url) {
    $html = file_get_contents($url);
    $dom = new DOMDocument();
    @$dom->loadHTML($html);
    
    $body = $doc->getElementsByTagName('body');
    $content = $body ? trim($body->textContent) : '';
    
    echo "<pre>"; var_dump($body);
    
    return [
        'url' => $url,
        'title' => trim($title),
        'content' => trim($body)
    ];
}

$pages = [
    'www.eternityready.com/'
];

$index = [];

foreach ($pages as $page) {
    $index[] = getPageContent($page);
}



file_put_contents('search-index.json', json_encode($index));

?>