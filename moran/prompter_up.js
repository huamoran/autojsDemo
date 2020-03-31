/**
 * 作者:  moran
 * QQ:   ffhapp@qq.com 
 * name:    prompter_up
 * version:    1.0.2
 * 日期:   2020.3.31
 */
"ui";

var content = 'please input content.';
var g_speed = 60;
var g_flag = true; // close
var g_size = 30;
var g_color = "#ffffff";
var g_thread = null;

//load config
var preName = getPackageName("prompter_up");
var storage = storages.create(preName);
g_speed = storage.get("speed", 60);
g_color = storage.get("color", "#ffffff");
g_size = storage.get("size", 30);
content = storage.get("content", "");

var MarqueeView = (function () {
  //继承至ui.Widget
  util.extend(MarqueeView, ui.Widget);

  function MarqueeView() {
    //调用父类构造函数
    ui.Widget.call(this);
    //自定义属性key，定义在配置中保存时的key
    this.defineAttr("text", (view, attr, value, defineSetter) => {
      view.content.setText(value);
      log("set text");
    });

    this.defineAttr("textColor", (view, attr, value, defineSetter) => {
      view.content.setTextColor(value);
      // view.content.setTextColor(colors.parseColor(value));

      log("set text color");
    });

    this.defineAttr("bg", (view, attr, value, defineSetter) => {
      view.setBackgroundColor(value);
      log("set bg color");
    });
  }
  MarqueeView.prototype.render = function () {
    return (
      <frame id="background" h="*">
        <text id="content" layout_width='wrap_content' />
      </frame>
    );
  }

  MarqueeView.prototype.move = function () {
    var that = this;
    threads.start(
      function () {
        var sleepTime = rndNum(20, 100)
        var moveDistance = rndNum(6, 60)
        while (1) {
          var view = that.view.content
          if (view) {
            var x = view.x
            x = x - moveDistance
            ui.run(
              () => {
                view.setX(x)
              }
            )
            var right = view.x + view.getWidth()
            if (right <= 0) {
              ui.run(
                () => {
                  view.setX(device.width)
                }
              )
            }
          }
          sleep(sleepTime)
        }
      }
    )
  }

  MarqueeView.prototype.moveUp = function () {

    var that = this;
    g_thread = threads.start(
      function () {
        var sleepTime = g_speed;//rndNum(50, 120)
        var moveDistance = 3;//rndNum(3, 10)
        var first = true;
        while (1) {
          sleepTime = g_speed;
          var view = that.view.content
          if (view) {
            var y = view.y
            if (first) { //第一次从底开始滚动
              y = view.getHeight()
            }
            y = y - moveDistance
            ui.run(
              () => {
                view.setY(y)
              }
            )

            //again
            var bottom = view.y + view.getHeight()
            if (bottom <= 0) {
              ui.run(
                () => {
                  log("device.height=" + device.height);
                  // view.setY(device.height)
                  view.setY(view.parent.getHeight())
                }
              )
            }
          }
          sleep(sleepTime)
          // sleep(100)
          if (g_flag) {
            break;
          }
          first = false;
        }
      }
    )
  }


  function rndNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function rndColor() {
    return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
  }

  MarqueeView.prototype.setText = function (value) {
    var that = this;
    that.view.content.setText(value);
  }

  MarqueeView.prototype.setTextSize = function (value) {
    var that = this;
    that.view.content.setTextSize(value);
  }



  MarqueeView.prototype.changeSome = function () {
    var that = this;
    var viewbg = that.view
    var viewfont = that.view.content
    var color = null;
    var size = null;
    //改变背景颜色
    color = rndColor()
    // viewbg.setBackgroundColor(color)
    // viewbg.setBackgroundColor(colors.BLACK);
    // viewbg.setBackgroundColor(colors.TRANSPARENT);

    //改变字体颜色
    color = rndColor()
    // viewfont.setTextColor(color)
    viewfont.setTextColor(colors.WHITE);
    // viewfont.setTextColor(colors.BLACK);
    //改变字体大小
    size = g_size;// rndNum(40, 50)
    viewfont.setTextSize(size)

  }
  ui.registerWidget("MarqueeView", MarqueeView);
  return MarqueeView;
})();

var window = floaty.rawWindow(
  <vertical >
    <vertical id="parentView" h="350" bg="#7F000000" text="parent">
      <MarqueeView id="marq" h="*" text="{{content}}" />
    </vertical>
    <horizontal>
      <button id="start" w="60" text="star" />
      <button id="stop" w="60" text="stop" />
      <button id="setting" w="60" text="set" />
      <button id="speed" w="60" text="sped" />
      <button id="size" w="60" text="size" />
      <button id="exit" w="60" text="exit" />
    </horizontal>
  </vertical>

);
var marqView = window.marq;

window.setSize(-1, 1200);
// window.setTouchable(false);


window.start.on("click", () => {
  log("start click")

  if (!g_flag) { //running
    return;
  }

  marqView.widget.changeSome();
  marqView.widget.moveUp();

  g_flag = false;

});
window.stop.on("click", () => {

  g_flag = true
  if (g_thread) {
    g_thread.interrupt();
  }

});

window.setting.on("click", () => {
  // marqView.widget.setText(content);
  log("setting click");
  rawInput("设置内容", "").then(name => {

    log(name);
    if (name != "") {
      marqView.widget.setText(name);
      storage.put("content", name);
    }

  });


});

window.speed.on("click", () => {

  dialogs.input("请输入速度(1--100)", (100 - g_speed) + "").then(speed => {

    g_speed = 100 - speed;
    if (g_speed < 0) {
      g_speed = 1;
    }

    storage.put("speed", g_speed);

  });


});

window.size.on("click", () => {

  dialogs.input("请输入字体大小(10--80)", g_size + "").then(size => {

    g_size = size;

    marqView.widget.setTextSize(size);

    storage.put("size", g_size);

  });


});




window.exit.on("click", () => {
  if (g_thread) {
    g_thread.interrupt();
  }

  window.close();
  window.exitOnClose();

  floaty.closeAll();
  exit();
});


