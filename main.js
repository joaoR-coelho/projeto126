song1 = "";
song2=""
song1_status = "";
song2_status = "";

leftWristX=0
leftWristY=0
rightWristY=0
rightWristX=0
scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload()
{
	song1 = loadSound("music.mp3");
    song2=loadSound("music2.mp3")
}

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();
	poseNet=ml5.posenet(video,modelLoaded);
	poseNet.on("pose",gotPoses)
} 
function modelLoaded() {
	console.log("modeloINICIALIZADO")	
}
function gotPoses(results) {
	if (reslts.lenght>0) {
		console.log(results)
		leftWristX=results[0].pose.leftWrist.x
		leftWristy=results[0].pose.leftWrist.y
		console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

		rightWristX=results[0].pose.rightWrist.x
		rightWristy=results[0].pose.rightWrist.y
		console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

		scoreRightWrist=results[0].pose.keypoints[10].score
		scoreLeftWrist=results[0].pose.keypoints[9].score
		console.log("scoreRightWrist = " + scoreRightWrist +" scoreLeftWrist= "+ scoreLeftWrist);
	}
	
}

function draw() {
	image(video, 0, 0, 600, 500);
	song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();
	fill("white")
	stroke("blue")
	if (scoreRightWrist>0.2) {
		circle(rightWristX,rightWristY,20)
		song2.stop()
		if (song1_status==false) {
			song1.play()
			document.getElementById("song").innerHTML="tocando harry potter"
			
		}
		
	}

	if (scoreRightWrist>0.2) {
		circle(leftWristX,lefttWristY,20)
		song1.stop()
		if (song2_status==false) {
			song2.play()
			document.getElementById("song").innerHTML="tocando peter pan"
			
		}
		
	}
}

function play()
{
	song.play();
	song.setVolume(0.5);
	song.rate(1)
}