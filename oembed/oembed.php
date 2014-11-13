<?php
$format = $_REQUEST["format"];
$url =  $_REQUEST["url"];

$data = array(
    'version' => '1.0',
    'type' => 'rich',
    'width' => 475,
    'height' => 300,
    'title' => 'Timer - E.ggTimer',
    'url' => $url,
    'provider_name' => 'E.ggTimer',
    'provider_url' => 'http://e.ggtimer.com',
    'html'=> '<iframe width="475" height="300" src="' . $url . '" frameborder="0" allowfullscreen allowtransparency></iframe>'
);



if ($format === "xml") {
    header('Content-Type: application/xml');
    $xml = new SimpleXMLElement('<oembed/>');
    array_walk_recursive(array_flip($data), array ($xml, 'addChild'));
    echo $xml->asXML();
} else if ($format === "json") {
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    echo '';
}
