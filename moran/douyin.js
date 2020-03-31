auto();

setScreenMetrics(1080, 1920);

// common function

//click area
function clickCtl(ctler) {
    //get area

    //click

}


//douyin object
////////////////////////////////////////////////////////////////////////////////

var douyin = {};

douyin.like = function () {

    click(800, 200);
    sleep(100)
    click(800, 200);
}


douyin.preview = function () {
    swipe(500, 1200, 500, 200, 100)
}


douyin.next = function () {

    swipe(500, 200, 500, 1200, 100)
}







// main
////////////////////////////////////////////////////////////////////////////////
log("main .. start...........")
douyin.next()
douyin.like()


