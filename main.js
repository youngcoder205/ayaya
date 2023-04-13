img = "";
status1 = "";
object = []

function setup()
{

    canvas = createCanvas(380,380 )
canvas.center()
video = createCapture(VIDEO)
video.size(380,380)
video.hide()

}

function start() {
  objectDetector = ml5.objectDetector('cocossd',modelloaded)
document.getElementById("status").innerHTML = "status:detecting objects"
}

function preload()
{
    img = loadImage("dog_cat.jpg")
}

function draw()
{
    image (video,0,0,380,380)
    if (status1 != "") {
      r = random(255)
      g = random(255)
      b = random(255)
      objectDetector.detect(img,gotresult)
      for(i=0;i<object.length;i++) {
        document.getElementById("status").innerHTML = "status:object detected"
        document.getElementById("number_objects").innerHTML = "number of objects detected are :" + object.length
        fill(r,g,b)
        percent = floor(object[i].confidence * 100)
        text (object[i].label + "" + percent + "%", object[i].x + 15, object[i].y + 15)
        noFill()
        stroke(r,g,b)
        rect(object[i].x, object[i].y, object[i].width, object[i].height)

      }

    }
}

function modelloaded() 
{

console.log("model is loaded")
status1 = true

}

function gotresult(error,results)  {

if (error)  {
    console.error(error)
}
console.log(results)
object = results
}