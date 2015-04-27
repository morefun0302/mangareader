var args = arguments[0] || {},
http = require('http'),
parserModule = require('pl.tkrz.mangareader.parser'),
string = require('alloy/string');

$.mangaList.search = Alloy.Globals.searchView;

function init(){
    var list = Ti.App.Properties.getObject('list', null);
    if(list == null && Ti.Network.online) refreshList();
    else displayList(list);
}

function refreshList(){
	$.mangaList.hide();
    $.activityIndicator.show();
    http.list(loadData);
};

function loadData(data){
	var string = JSON.stringify(data);
    var list = parserModule.parseMangaList(data);
    list = JSON.parse(list);
    displayList(list);
    Ti.App.Properties.setObject('list', list);
}

function displayList(list){
	Ti.API.info(JSON.stringify(list));
	var manga = Ti.UI.createListSection({
	    items: list
	});
	$.mangaList.appendSection(manga);
    $.activityIndicator.hide();
    $.mangaList.show();
}

function noresults() {
    Ti.UI.createNotification({
        message: 'Nothing found'
    }).show();
}

function openTitle(e){
	var list = Ti.App.Properties.getObject('list');
	// alert("Manga title: " + list[e.itemIndex].properties.title + " Manga url: " + Alloy.CFG.links.base + list[e.itemIndex].properties.url);
	Alloy.createController('win/manga_details', {url: list[e.itemIndex].properties.url, title: list[e.itemIndex].properties.title}).getView().open();
};
