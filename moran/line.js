"ui";
auto();
setScreenMetrics(1080, 1920);



log("start  .........")

// alert("出现错误~", "出现未知错误，请联系脚本作者")

// swipe(500, 1200, 500, 200, 100)

var thread = threads.start(function () {

    clickAsync(200, 200)
    sleep(22)
    clickAsync(200, 200)


    desc("关注").click()
});
//等待该线程完成
thread.join();

