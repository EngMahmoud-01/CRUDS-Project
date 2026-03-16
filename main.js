const url="https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLknwEmKsW8OuTqUDaFRBiAViDZ5uI3VcE&maxResults=28&key=APIKEY";
fetch(url).then(response =>{return response.json()}).then(data =>{
    getData(data.items)
}).catch(error=>{
    console.log(error);
})

function getData(data){
data.forEach(element => {
    var title=element.snippet.title;
    var videoId=element.snippet.resourceId.videoId;
    var image=element.snippet.thumbnails.standard.url;
    var description=element.snippet.description;
    document.getElementById("content").innerHTML += 
    
'<div onclick="loadVid(\''+videoId+ '\')" style="cursor:pointer; margin-top: 15px;" class="shadow p-3 mb-5 bg-body-tertiary rounded"> ' + title+ '</div>'

});
}

function loadVid(videoId){
document.getElementById("player").src="https://www.youtube.com/embed/"+videoId+"/";
}