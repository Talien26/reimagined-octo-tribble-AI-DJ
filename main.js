var song = '';
var leftWristX = '';
var leftWristY = '';
var rightWristX = '';
var rightWristy = '';
var scoreLeftWrist = ' ';

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses); 
}
function modelLoaded(){
    console.log('PoseNet is initialized!')
} 
function draw(){
    image(video, 0, 0, 600, 500);

    fill("#F4F5FF");
    stroke("#40E0D0");

    if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    innumberleftWristX = Number(leftWristX);
    set_decimal = floor(innumberleftWristX);
    Volume = set_decimal/500;
    document.getElementById("volume").innerHTML = "Volume = " + Volume;

}
}
function noise(){
    song.play();
    song.setVolume(1);
    song.rate(1)
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X = " + leftWristX + " And Left wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist X = " + rightWristX + " And right wrist Y = " + rightWristY);
    }
}