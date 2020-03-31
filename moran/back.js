var w = floaty.rawWindow(
    <frame id="ok" gravity="center" bg="#44ffcc00"/>
);

w.setSize(100, 100);
w.setTouchable(true);
w.setPosition(400, 1100);


setTimeout(()=>{
    //w.close();
}, 1400000000);



w.ok.on("click", ()=>{
    //toast("傻瓜! " );
    w.disableFocus();
    back();
});

w.ok.on("long_click", ()=>{
    home();
    //w.setAdjustEnabled(!window.isAdjustEnabled());
});
